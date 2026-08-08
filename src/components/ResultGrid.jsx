import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGifs, fetchPhotos, fetchVideos } from "../api/mediaApi"
import { setError, setLoading, setResults } from "../redux/features/searchSlice"
import { ResultCard } from "./ResultCard"

const RESULT_LIMIT = 16

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
          const response = await fetchPhotos(query.trim(), 1, RESULT_LIMIT, controller.signal)
          data = response.results.map((item) => ({
            id: item.id,
            key: `photo:${item.id}`,
            type: "photo",
            title: item.alt_description || item.description || "Untitled photo",
            thumbnail: item.urls?.small,
            src: item.urls?.full || item.urls?.regular,
            downloadUrl: item.urls?.full || item.urls?.regular,
            url: item.links?.html,
          })).filter((item) => item.thumbnail && item.src)
        }

        if (activeTab === "videos") {
          const response = await fetchVideos(query.trim(), RESULT_LIMIT, controller.signal)
          data = response.videos.map((item) => {
            const files = [...(item.video_files || [])]
              .filter((candidate) => candidate?.link && candidate?.width)
              .sort((a, b) => (a.width || 0) - (b.width || 0))
            const previewFile = files.find((file) => file.width >= 480 && file.width <= 960) || files[0]
            const downloadFile = files[files.length - 1] || previewFile
            return {
              id: item.id,
              key: `video:${item.id}`,
              type: "video",
              title: item.user?.name ? `Video by ${item.user.name}` : "Untitled video",
              thumbnail: item.image,
              previewSrc: previewFile?.link,
              src: downloadFile?.link,
              downloadUrl: downloadFile?.link,
              url: item.url,
            }
          }).filter((item) => item.thumbnail && item.src)
        }

        if (activeTab === "GIFS") {
          const response = await fetchGifs(query.trim(), RESULT_LIMIT, controller.signal)
          data = response.data.map((item) => ({
            id: item.id,
            key: `gif:${item.id}`,
            type: "gif",
            title: item.title || "Untitled GIF",
            thumbnail: item.images?.fixed_width?.url || item.images?.fixed_width_small?.url || item.images?.preview_gif?.url,
            src: item.images?.original?.url || item.images?.original_mp4?.mp4,
            downloadUrl: item.images?.original?.url || item.images?.original_mp4?.mp4,
            url: item.url,
          })).filter((item) => item.thumbnail && item.src)
        }

        dispatch(setResults(data))
      } catch (requestError) {
        if (!axios.isCancel(requestError)) dispatch(setError(requestError?.message || "Unable to load media right now."))
      }
    }

    getData()
    return () => controller.abort()
  }, [query, activeTab, retry, dispatch])

  if (loading) {
    return (
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" aria-live="polite">
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025]">
            <div className="h-full w-full animate-pulse bg-gradient-to-br from-white/[0.04] via-white/[0.08] to-white/[0.03]" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-4 mb-10 rounded-3xl border border-red-400/15 bg-red-400/[0.06] p-10 text-center lg:mx-auto lg:max-w-6xl">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-400/10 text-red-300">!</div>
        <p className="mt-4 font-bold text-red-100">We couldn't load those results.</p>
        <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-red-100/55">{error}</p>
        <button type="button" onClick={() => setRetry((value) => value + 1)} className="mt-5 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white/60">Try again</button>
      </div>
    )
  }

  if (!results.length) {
    return (
      <div className="mx-4 mb-10 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-12 text-center lg:mx-auto lg:max-w-6xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl text-slate-500">⌕</div>
        <p className="mt-5 text-lg font-bold text-white">No results found</p>
        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-600">Try a broader search term or switch to another media type.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {results.map((item) => <ResultCard key={item.key || `${item.type}:${item.id}`} item={item} />)}
    </div>
  )
}

export default ResultGrid
