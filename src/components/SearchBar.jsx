import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearResults, setQuery } from "../redux/features/searchSlice"

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

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="mb-7 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">MediaSearch</p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Find the right media, fast.</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">Search photos, videos and GIFs from multiple media providers, save favorites and download what you need.</p>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/20 sm:flex-row">
        <label htmlFor="media-search" className="sr-only">Search media</label>
        <input
          id="media-search"
          required
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
          type="search"
          placeholder="Search anything..."
          autoComplete="off"
          aria-describedby={query ? "current-search" : undefined}
        />
        {text && <button type="button" onClick={clearSearch} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">Clear</button>}
        <button type="submit" className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 active:scale-[0.98]">Search</button>
      </form>
      {query && <p id="current-search" className="sr-only">Current search: {query}</p>}
    </section>
  )
}

export default SearchBar
