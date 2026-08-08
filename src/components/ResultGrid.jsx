import { useDispatch, useSelector } from "react-redux"
import { fetchPhotos, fetchVideos, fetchGifs } from "../api/mediaApi"
import { setLoading, setError, setResults } from "../redux/features/searchSlice"
import { useEffect } from "react"
import { ResultCard } from "./ResultCard"


const ResultGrid = () => {
  
  const {query, activeTab, results, loading, error} = useSelector((store)=>store.search)
  const dispatch = useDispatch()

  const getData = async() => {
    try {
      if(!query) return;
      dispatch(setLoading())
      let data=[] 
      
      if(activeTab === "photos"){
        let response = await fetchPhotos(query)
        data = response.results.map((item)=>({
          id : item.id,
          type : "photo",
          title : item.alt_description,
          thumbnail : item.urls.small,
          src : item.urls.full,
          url: item.links.html 
        }))  
      }
      
      if(activeTab === "videos"){
        let response = await fetchVideos(query)
        data = response.videos.map((item)=>({
          id : item.id,
          type : "video",
          title : item.user.name || "video",
          thumbnail : item.image,
          src : item.video_files[0].link,
          url : item.url
        }))
      }

      if(activeTab === "GIFS"){
        let response = await fetchGifs(query)
        data = response.data.map((item)=>({
          id : item.id,
          type : "gif",
          title : item.title,
          thumbnail : item.images.fixed_width_small?.url,
          src : item.images.original.url,
          url: item.url
        }))
      }

      // console.log(data)
      
      dispatch(setResults(data))
    } catch (error) {
      dispatch(setError(error))
    }
  }

  useEffect(()=>{
    getData()
  },[query, activeTab])


  if(error) return <h1>Error</h1>
  if(loading) return <h1>Loading...</h1>
  

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full px-10">
      {results.map((item, index) => (
        <a target="_blank" href={item.url}><ResultCard key={index} item={item} /></a>
      ))}
  </div>
  )
}
export default ResultGrid