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
      const result = await downloadMedia(item)
      toast.success(result.method === "file-picker" ? `Saved ${result.filename}` : "Download started", { autoClose: 2000, theme: "dark" })
    } catch (error) {
      toast.error(error.message || "Unable to download this media.", { autoClose: 2600, theme: "dark" })
    } finally {
      window.setTimeout(() => setDownloading(false), 500)
    }
  }

  return (
    <article className="group relative aspect-square overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0d111b] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16]">
      <a target="_blank" rel="noopener noreferrer" className="block h-full" href={item.url || item.src} aria-label={`Open ${item.title || item.type} on the source website`}>
        <MediaPreview item={item} alt={item.title || `Saved ${item.type}`} />
      </a>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-16">
        <p className="line-clamp-2 min-h-9 text-xs font-bold leading-5 text-white sm:text-sm">{item.title || "Untitled media"}</p>
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={handleDownload} disabled={downloading} className="flex-1 rounded-xl bg-indigo-500 px-3 py-2 text-[11px] font-extrabold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-300">{downloading ? "…" : "↓ Download"}</button>
          <button type="button" onClick={removeFromCollection} className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-[11px] font-extrabold text-white transition hover:bg-red-500/20 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-300">Remove</button>
        </div>
      </div>
    </article>
  )
}

export default CollectionCard
