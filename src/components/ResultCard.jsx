import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addCollection } from "../redux/features/collectionSlice"
import { downloadMedia } from "../utils/downloadMedia"
import MediaPreview from "./MediaPreview"

const typeLabel = { photo: "Photo", video: "Video", gif: "GIF" }

export const ResultCard = ({ item }) => {
  const dispatch = useDispatch()
  const [downloading, setDownloading] = useState(false)
  const saved = useSelector((state) => state.collection.items.some((savedItem) => (savedItem.key || `${savedItem.type}:${savedItem.id}`) === (item.key || `${item.type}:${item.id}`)))

  const addToCollection = () => {
    if (saved) return
    dispatch(addCollection(item))
    toast.success("Added to collection", { autoClose: 1600, theme: "dark" })
  }

  const handleDownload = async () => {
    if (downloading) return
    setDownloading(true)
    try {
      const result = await downloadMedia(item)
      toast.info(result.fallback ? "Opened the source media" : "Download started", { autoClose: 1800, theme: "dark" })
    } catch (error) {
      toast.error(error.message || "Unable to download this media.", { autoClose: 2200, theme: "dark" })
    } finally {
      window.setTimeout(() => setDownloading(false), 500)
    }
  }

  return (
    <article className="group relative aspect-square overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0d111b] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-2xl hover:shadow-black/30">
      <a target="_blank" rel="noopener noreferrer" className="block h-full" href={item.url || item.src} aria-label={`Open ${item.title || item.type} on the source website`}>
        <MediaPreview item={item} alt={item.title || `${item.type} result`} />
      </a>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-16">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white/70 backdrop-blur">{typeLabel[item.type] || "Media"}</span>
        </div>
        <p className="mt-2 line-clamp-2 min-h-9 text-xs font-bold leading-5 text-white sm:text-sm">{item.title || "Untitled media"}</p>
        <div className="pointer-events-auto mt-3 flex gap-2">
          <button type="button" onClick={addToCollection} disabled={saved} className="flex-1 rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-[11px] font-extrabold text-white backdrop-blur transition hover:bg-white/[0.16] disabled:cursor-default disabled:text-indigo-200 disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/60">
            {saved ? "✓ Saved" : "+ Save"}
          </button>
          <button type="button" onClick={handleDownload} disabled={downloading} className="rounded-xl bg-indigo-500 px-3 py-2 text-[11px] font-extrabold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-300" aria-label={`Download ${item.title || item.type}`}>
            {downloading ? "…" : "↓ Download"}
          </button>
        </div>
      </div>
    </article>
  )
}
