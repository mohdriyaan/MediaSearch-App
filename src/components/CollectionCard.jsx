import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { getItemKey, removeCollection } from "../redux/features/collectionSlice"
import { downloadMedia } from "../utils/downloadMedia"

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch()

  const removeFromCollection = () => {
    dispatch(removeCollection(getItemKey(item)))
    toast.info("Removed from collection", { autoClose: 1600, theme: "dark" })
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
      <a target="_blank" rel="noopener noreferrer" className="block h-full" href={item.url || item.src} aria-label={`Open ${item.title || item.type} on the source website`}>
        {item.type === "photo" && <img src={item.thumbnail} alt={item.title || "Saved photo"} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
        {item.type === "video" && <video autoPlay loop muted playsInline src={item.src} poster={item.thumbnail} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
        {item.type === "gif" && <img src={item.thumbnail || item.src} alt={item.title || "Saved GIF"} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
      </a>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-3 pt-12">
        <p className="line-clamp-2 min-h-10 text-sm font-semibold text-white">{item.title || "Untitled media"}</p>
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={handleDownload} className="flex-1 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300">Download</button>
          <button type="button" onClick={removeFromCollection} className="rounded-lg bg-red-500/80 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300">Remove</button>
        </div>
      </div>
    </article>
  )
}

export default CollectionCard
