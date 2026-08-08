import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { getItemKey, removeCollection } from "../redux/features/collectionSlice"
import { downloadMedia } from "../utils/downloadMedia"
import MediaPreview from "./MediaPreview"

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch()
  const [downloading, setDownloading] = useState(false)

  const removeFromCollection = () => {
    dispatch(removeCollection(getItemKey(item)))
    toast.info("Removed from collection", { autoClose: 1600, theme: "dark" })
  }

  const handleDownload = async () => {
    if (downloading) return
    setDownloading(true)
    try {
      await downloadMedia(item)
      toast.info("Download started", { autoClose: 1800, theme: "dark" })
    } catch (error) {
      toast.error(error.message || "Unable to download this media.", { autoClose: 2200, theme: "dark" })
    } finally {
      window.setTimeout(() => setDownloading(false), 500)
    }
  }

  return (
    <article className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-black/10">
      <a target="_blank" rel="noopener noreferrer" className="block h-full" href={item.url || item.src} aria-label={`Open ${item.title || item.type} on the source website`}>
        <MediaPreview item={item} alt={item.title || `Saved ${item.type}`} />
      </a>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-3 pt-12">
        <p className="line-clamp-2 min-h-10 text-sm font-semibold text-white">{item.title || "Untitled media"}</p>
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={handleDownload} disabled={downloading} className="flex-1 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-300">
            {downloading ? "Starting…" : "Download"}
          </button>
          <button type="button" onClick={removeFromCollection} className="rounded-lg bg-red-500/80 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300">Remove</button>
        </div>
      </div>
    </article>
  )
}

export default CollectionCard
