import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGifs, fetchPhotos, fetchVideos } from "../api/mediaApi"
import { setError, setLoading, setResults } from "../redux/features/searchSlice"
import { ResultCard } from "./ResultCard"

const ResultGrid = () => {
  const { query, activeTab, results, loading, error } = useSelector((store) => store.search)
  const dispatch = useDispatch()
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (!query.trim()) return undefined

    const controller = new AbortController()

    const getData = async () => {
      dispatch(setLoading())
      try {
        let data = []

        if (activeTab === "photos") {
          const response = await fetchPhotos(query.trim(), 1, 20, controller.signal)
          data = response.results.map((item) => ({
            id: item.id,
            key: `photo:${item.id}`,
            type: "photo",
            title: item.alt_description || item.description || "Untitled photo",
            thumbnail: item.urls?.small,
            src: item.urls?.full || item.urls?.regular,
            url: item.links?.html,
          })).filter((item) => item.thumbnail && item.src)
        }

        if (activeTab === "videos") {
          const response = await fetchVideos(query.trim(), 20, controller.signal)
          data = response.videos.map((item) => {
            const file = [...(item.video_files || [])]
              .filter((candidate) => candidate?.link)
              .sort((a, b) => (b.width || 0) - (a.width || 0))[0]

            return {
              id: item.id,
              key: `video:${item.id}`,
              type: "video",
              title: item.user?.name ? `Video by ${item.user.name}` : "Untitled video",
              thumbnail: item.image,
              src: file?.link,
              url: item.url,
            }
          }).filter((item) => item.thumbnail && item.src)
        }

        if (activeTab === "GIFS") {
          const response = await fetchGifs(query.trim(), 20, controller.signal)
          data = response.data.map((item) => ({
            id: item.id,
            key: `gif:${item.id}`,
            type: "gif",
            title: item.title || "Untitled GIF",
            thumbnail: item.images?.fixed_width_small?.url || item.images?.preview_gif?.url,
            src: item.images?.original?.url || item.images?.original_mp4?.mp4,
            url: item.url,
          })).filter((item) => item.thumbnail && item.src)
        }

        dispatch(setResults(data))
      } catch (requestError) {
        if (!axios.isCancel(requestError)) {
          dispatch(setError(requestError?.message || "Unable to load media right now."))
        }
      }
    }

    getData()
    return () => controller.abort()
  }, [query, activeTab, retry, dispatch])

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 px-4 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:px-8" aria-live="polite">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="aspect-square animate-pulse rounded-2xl bg-slate-800" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-4 mb-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center lg:mx-8">
        <p className="font-semibold text-red-200">We couldn't load those results.</p>
        <p className="mt-1 text-sm text-red-200/70">{error}</p>
        <button
          type="button"
          onClick={() => setRetry((value) => value + 1)}
          className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!results.length) {
    return (
      <div className="mx-4 mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center lg:mx-8">
        <p className="text-lg font-semibold">No results found</p>
        <p className="mt-1 text-sm text-slate-400">Try a different search term or media type.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:px-8">
      {results.map((item) => <ResultCard key={item.key || `${item.type}:${item.id}`} item={item} />)}
    </div>
  )
}

export default ResultGrid
