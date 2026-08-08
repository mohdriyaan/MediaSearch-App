import { useDispatch, useSelector } from "react-redux"
import { setActiveTabs } from "../redux/features/searchSlice"

const Tabs = () => {
  const tabs = ["photos", "GIFS", "videos"]

  const dispatch = useDispatch()

  const activeTab = useSelector((state)=>state.search.activeTab)
  
  return (
    <div className="flex gap-5 p-10">
      {tabs.map((element,index)=>{
        return <button
        onClick={()=>{
          dispatch(setActiveTabs(element))
        }}
        className={`${(activeTab === element) ? `bg-blue-700` : `bg-gray-600`} transition uppercase px-5 py-2 cursor-pointer rounded active:scale-95`} 
        key={index}>{element}</button>
      })}
    </div>
  )
}
export default Tabs
