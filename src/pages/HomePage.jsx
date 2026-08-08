import { useSelector } from "react-redux"
import ResultGrid from "../components/ResultGrid"
import SearchBar from "../components/SearchBar"
import Tabs from "../components/Tabs"


const HomePage = () => {
  const query = useSelector((state)=>state.search.query)

  return (
    <div>
      
      <SearchBar />
      {query !== "" 
      ? 
        <div>
          <Tabs />
          <ResultGrid />
        </div>  
      :
        null      
      }
      
    </div>
  )
}
export default HomePage