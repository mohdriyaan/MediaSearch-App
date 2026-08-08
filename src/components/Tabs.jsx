import { useDispatch, useSelector } from "react-redux"
import { setActiveTabs } from "../redux/features/searchSlice"

const tabs = [
  { id: "photos", label: "Photos", icon: "▧" },
  { id: "videos", label: "Videos", icon: "▶" },
  { id: "GIFS", label: "GIFs", icon: "GIF" },
]

const Tabs = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.search.activeTab)

  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pb-5" role="tablist" aria-label="Media type">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1.5">
        {tabs.map((tab) => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => dispatch(setActiveTabs(tab.id))}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${active ? "bg-white text-slate-950 shadow-lg" : "text-slate-500 hover:bg-white/10 hover:text-white"}`}
            >
              <span className="text-[10px] font-black opacity-70">{tab.icon}</span>
              {tab.label}
            </button>
          )
        })}
      </div>
      <span className="hidden text-xs font-semibold text-slate-600 sm:block">Fast previews · HD downloads</span>
    </div>
  )
}

export default Tabs
