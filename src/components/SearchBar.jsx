import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearResults, setQuery } from "../redux/features/searchSlice"

const suggestions = ["cinematic mountains", "funny cats", "cyberpunk", "reaction"]

const SearchBar = () => {
  const query = useSelector((state) => state.search.query)
  const [text, setText] = useState(query)
  const dispatch = useDispatch()

  const submitHandler = (event) => {
    event.preventDefault()
    const value = text.trim()
    if (!value) return
    dispatch(setQuery(value))
  }

  const clearSearch = () => {
    setText("")
    dispatch(setQuery(""))
    dispatch(clearResults())
  }

  const handleSuggestion = (suggestion) => {
    setText(suggestion)
    dispatch(setQuery(suggestion))
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-indigo-200">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 shadow-[0_0_12px_rgba(129,140,248,.9)]" />
          Search. Preview. Save.
        </div>
        <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-7xl">
          Find media without
          <span className="block bg-gradient-to-r from-indigo-300 via-white to-fuchsia-300 bg-clip-text text-transparent">the friction.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Discover photos, videos and GIFs from multiple sources. Preview what matters, save your favorites, and download in a couple of clicks.
        </p>

        <form onSubmit={submitHandler} className="mx-auto mt-9 max-w-3xl rounded-[22px] border border-white/10 bg-white/[0.055] p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="media-search" className="sr-only">Search media</label>
            <div className="relative flex min-w-0 flex-1 items-center">
              <span className="pointer-events-none absolute left-4 text-lg text-slate-500" aria-hidden="true">⌕</span>
              <input
                id="media-search"
                required
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="min-w-0 w-full rounded-2xl border border-white/[0.08] bg-[#090d17] py-4 pl-11 pr-12 text-sm font-medium text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10 sm:text-base"
                type="search"
                placeholder="Search for anything..."
                autoComplete="off"
                aria-describedby={query ? "current-search" : undefined}
              />
              {text && <button type="button" onClick={clearSearch} className="absolute right-3 rounded-lg px-2 py-1 text-xs font-bold text-slate-500 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40">Clear</button>}
            </div>
            <button type="submit" className="rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 active:scale-[0.98]">Search</button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs font-medium text-slate-600">Try</span>
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => handleSuggestion(suggestion)} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs font-semibold text-slate-400 transition hover:border-indigo-400/30 hover:bg-indigo-400/10 hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300/50">
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      {query && <p id="current-search" className="sr-only">Current search: {query}</p>}
    </section>
  )
}

export default SearchBar
