import { Link, NavLink } from "react-router-dom"

const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#070a12]/75 px-4 py-3 backdrop-blur-2xl sm:px-8">
    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4" aria-label="Primary navigation">
      <Link to="/" className="group flex items-center gap-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-[#070a12]">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-sm font-black text-white shadow-lg shadow-indigo-500/20">M</span>
        <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">MediaSearch<span className="text-indigo-400">.</span></span>
      </Link>

      <div className="flex items-center gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-1 shadow-xl shadow-black/10">
        <NavLink to="/" end className={({ isActive }) => `rounded-xl px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${isActive ? "bg-white text-slate-950 shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}>
          Discover
        </NavLink>
        <NavLink to="/collection" className={({ isActive }) => `rounded-xl px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${isActive ? "bg-white text-slate-950 shadow-lg" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}>
          Collection
        </NavLink>
      </div>
    </nav>
  </header>
)

export default Navbar
