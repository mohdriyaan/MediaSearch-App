import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./components/Navbar"
import CollectionPage from "./pages/CollectionPage"
import HomePage from "./pages/HomePage"

const App = () => (
  <div className="min-h-screen bg-slate-950 text-white">
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
