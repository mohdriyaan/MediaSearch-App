import { useDispatch, useSelector } from "react-redux"
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from "../redux/features/collectionSlice"

const CollectionPage = () => {
  
  const collection = useSelector(state=>state.collection.items)

  const dispatch = useDispatch()

  const clearAll = () => {
    dispatch(clearCollection())
  }
  
  return (
    <div className="overflow-auto px-10 py-6">
      {collection.length > 0 
      ? 
       <div className="flex justify-between">
        <h2 className="text-xl font-medium mb-6">
          Your Collection
        </h2>
        <button onClick={()=>{
          clearAll()
        }} className="bg-red-600 px-5 py-2 text-base font-medium rounded cursor-pointer active:scale-95 transition">Clear Collection</button>
      </div>
      : 
      <h2 className="text-xl font-medium mb-6">
          Collection is Empty
      </h2>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full px-10 py-6">
        {collection.map((item,index)=>{
          return <div key={index}>
            <CollectionCard item={item}/>
          </div>
        })}
      </div>
    </div>
    
  )
}
export default CollectionPage