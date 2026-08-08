import { Link, NavLink } from "react-router-dom"

const Navbar = () => (
  <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/85 px-4 py-4 backdrop-blur-xl sm:px-8">
    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4" aria-label="Primary navigation">
      <Link to="/" className="text-lg font-bold tracking-tight text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-950 rounded">MediaSearch<span className="text-indigo-400">.</span></Link>
      <div className="flex items-center gap-2">
        <NavLink to="/" end className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-300 ${isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}>Search</NavLink>
        <NavLink to="/collection" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-300 ${isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}>Collection</NavLink>
      </div>
    </nav>
  </header>
)

export default Navbar
