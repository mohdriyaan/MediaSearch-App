import { useDispatch, useSelector } from "react-redux"
import { setActiveTabs } from "../redux/features/searchSlice"

const tabs = ["photos", "videos", "GIFS"]

const Tabs = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.search.activeTab)

  return (
    <div className="mx-auto flex max-w-5xl flex-wrap gap-2 px-4 pb-6" role="tablist" aria-label="Media type">
      {tabs.map((tab) => {
        const active = activeTab === tab
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => dispatch(setActiveTabs(tab))}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-indigo-300 ${active ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"}`}
          >
            {tab === "GIFS" ? "GIFs" : tab}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
