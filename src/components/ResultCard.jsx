import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addCollection } from "../redux/features/collectionSlice"
import { downloadMedia } from "../utils/downloadMedia"

export const ResultCard = ({ item }) => {
  const dispatch = useDispatch()
  const saved = useSelector((state) => state.collection.items.some((savedItem) => (savedItem.key || `${savedItem.type}:${savedItem.id}`) === (item.key || `${item.type}:${item.id}`)))

  const addToCollection = () => {
    if (saved) return
    dispatch(addCollection(item))
    toast.success("Added to collection", { autoClose: 1600, theme: "dark" })
  }

  const handleDownload = async () => {
    try {
      const result = await downloadMedia(item)
      toast.info(result.fallback ? "Opened the media source because direct download is blocked by the provider." : "Download started", {
        autoClose: 2200,
        theme: "dark",
      })
    } catch (error) {
      toast.error(error.message || "Unable to download this media.", { autoClose: 2200, theme: "dark" })
    }
  }

  return (
    <article className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-black/10">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        href={item.url || item.src}
        aria-label={`Open ${item.title || item.type} on the source website`}
      >
        {item.type === "photo" && <img src={item.thumbnail} alt={item.title || "Photo result"} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
        {item.type === "video" && <video autoPlay loop muted playsInline src={item.src} poster={item.thumbnail} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
        {item.type === "gif" && <img src={item.thumbnail || item.src} alt={item.title || "GIF result"} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
      </a>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-3 pt-12">
        <p className="line-clamp-2 min-h-10 text-sm font-semibold text-white">{item.title || "Untitled media"}</p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={addToCollection}
            disabled={saved}
            className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20 disabled:cursor-default disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            {saved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label={`Download ${item.title || item.type}`}
          >
            Download
          </button>
        </div>
      </div>
    </article>
  )
}
