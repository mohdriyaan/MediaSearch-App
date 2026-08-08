import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from "../redux/features/collectionSlice"

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
    <main className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16">
      <div className="mb-8 flex flex-col gap-5 rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <span className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-indigo-200">Your library</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">Collection.</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">A private shelf for the media you want to keep close. Everything stays saved locally in this browser.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-xs font-bold text-slate-400">{collection.length} {collection.length === 1 ? "item" : "items"}</span>
          {collection.length > 0 && <button type="button" onClick={clearAll} className="rounded-xl border border-red-400/15 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-300">Clear all</button>}
        </div>
      </div>

      {collection.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.02] p-14 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl text-slate-500">♡</div>
          <p className="mt-5 text-lg font-bold text-white">Your collection is empty</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Save something you love from the Discover page and it will show up here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {collection.map((item) => <CollectionCard key={item.key || `${item.type}:${item.id}`} item={item} />)}
        </div>
      )}
    </main>
  )
}

export default CollectionPage
