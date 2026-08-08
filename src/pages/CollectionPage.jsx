import { useDispatch, useSelector } from "react-redux"
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from "../redux/features/collectionSlice"
import { toast } from "react-toastify"

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items)
  const dispatch = useDispatch()

  const clearAll = () => {
    if (!collection.length) return
    if (!window.confirm("Clear your entire collection?")) return
    dispatch(clearCollection())
    toast.info("Collection cleared", { autoClose: 1600, theme: "dark" })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Saved media</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Your Collection</h1>
          <p className="mt-1 text-sm text-slate-400">{collection.length} {collection.length === 1 ? "item" : "items"} saved locally in this browser.</p>
        </div>
        {collection.length > 0 && (
          <button type="button" onClick={clearAll} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-300">Clear collection</button>
        )}
      </div>

      {collection.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-12 text-center">
          <p className="text-lg font-semibold text-white">Your collection is empty</p>
          <p className="mt-2 text-sm text-slate-400">Save media from your search results and it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {collection.map((item) => <CollectionCard key={item.key || `${item.type}:${item.id}`} item={item} />)}
        </div>
      )}
    </main>
  )
}

export default CollectionPage
