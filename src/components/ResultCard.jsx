import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addCollection } from "../redux/features/collectionSlice"
import { downloadMedia } from "../utils/downloadMedia"
import MediaPreview from "./MediaPreview"

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
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        href={item.url || item.src}
        aria-label={`Open ${item.title || item.type} on the source website`}
      >
        <MediaPreview item={item} alt={item.title || `${item.type} result`} />
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
            disabled={downloading}
            className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label={`Download ${item.title || item.type}`}
          >
            {downloading ? "Starting…" : "Download"}
          </button>
        </div>
      </div>
    </article>
  )
}
