import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./components/Navbar"
import CollectionPage from "./pages/CollectionPage"
import HomePage from "./pages/HomePage"

const App = () => (
  <div className="min-h-screen overflow-x-hidden bg-[#070a12] text-white selection:bg-indigo-500/30">
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="absolute right-0 top-80 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_35%)]" />
    </div>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
    <ToastContainer position="top-center" newestOnTop theme="dark" closeOnClick pauseOnHover />
  </div>
)

export default App
