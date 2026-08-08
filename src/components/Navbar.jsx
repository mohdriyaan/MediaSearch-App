import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-6 px-10 bg-(--c2)">
      <Link to="/" className="font-medium 
      text-xl">MediaSearch</Link>
      <div className="flex gap-5 text-xl items-center">
        <Link className="text-base font-medium bg(--c4) active:scale-95 text(--c1) rounded px-4 py-2" to="/">Search</Link>
        <Link className="text-base font-medium bg(--c4) active:scale-95 text(--c1) rounded px-4 py-2" to="/collection">Collection</Link>
      </div>
    </div>
  )
}
export default Navbar