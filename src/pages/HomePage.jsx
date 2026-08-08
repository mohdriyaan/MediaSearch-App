import { useSelector } from "react-redux"
import ResultGrid from "../components/ResultGrid"
import SearchBar from "../components/SearchBar"
import Tabs from "../components/Tabs"

const HomePage = () => {
  const { query, results } = useSelector((state) => state.search)

  return (
    <main>
      <SearchBar />
      {query && (
        <section>
          <Tabs />
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 pb-5">
            <p className="text-sm text-slate-400">Results for <span className="font-semibold text-slate-200">“{query}”</span></p>
            <p className="text-xs text-slate-500">{results.length} loaded</p>
          </div>
          <ResultGrid />
        </section>
      )}
    </main>
  )
}

export default HomePage
