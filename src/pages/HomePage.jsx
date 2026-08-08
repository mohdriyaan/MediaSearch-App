import { useSelector } from "react-redux"
import ResultGrid from "../components/ResultGrid"
import SearchBar from "../components/SearchBar"
import Tabs from "../components/Tabs"

const HomePage = () => {
  const { query, results, activeTab } = useSelector((state) => state.search)

  return (
    <main className="pb-10">
      <SearchBar />
      {query ? (
        <section aria-label="Search results">
          <Tabs />
          <div className="mx-auto mb-5 flex max-w-6xl items-end justify-between gap-4 px-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-600">{activeTab === "GIFS" ? "GIFs" : activeTab}</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-tight text-white sm:text-xl">Results for <span className="text-indigo-300">“{query}”</span></h2>
            </div>
            <p className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs font-semibold text-slate-500">{results.length} loaded</p>
          </div>
          <ResultGrid />
        </section>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 pb-8 sm:grid-cols-4">
          {["Photos", "Videos", "GIFs", "Collections"].map((label, index) => (
            <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5">
              <span className="text-2xl">{["▧", "▶", "GIF", "♡"][index]}</span>
              <p className="mt-4 text-sm font-bold text-white">{label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{index === 3 ? "Keep your best finds in one place." : `Explore ${label.toLowerCase()} from multiple sources.`}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default HomePage
