import { Route, Routes } from "react-router-dom"
import ResultGrid from "./components/ResultGrid"
import SearchBar from "./components/SearchBar"
import Tabs from "./components/Tabs"
import HomePage from "./pages/HomePage"
import CollectionPage from "./pages/CollectionPage"
import Navbar from "./components/Navbar"
import { ToastContainer, toast } from "react-toastify"
const App = () => {
  return <div className= "min-w-screen min-h-screen bg-gray-950 text-white">
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>

      <ToastContainer />
    </div>
  </div>
  
}
export default App