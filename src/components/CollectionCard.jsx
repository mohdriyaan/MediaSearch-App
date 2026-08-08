import { useDispatch } from "react-redux"
import { removeCollection, removeToast } from "../redux/features/collectionSlice"

const CollectionCard = ({item}) => {
  const dispatch = useDispatch()

  const removeFromCollection = () =>{
    dispatch(removeCollection(item.id))
    dispatch(removeToast())
  }

  return (
    <div>
      <div className="relative aspect-square w-full rounded overflow-hidden bg-white group">
        <a target="_blank" className="h-full block" href={item.url}>
          {item?.type === "photo" && (
            <img
              src={item.thumbnail}
              alt={item.title || "result"}
              className="h-full w-full object-cover"
            />
          )}

          {item?.type === "video" && (
            <video
              autoPlay
              loop
              muted
              src={item.src}
              className="h-full w-full object-cover"
            />
          )}

          {item?.type === "gif" && (
            <img
              src={item.src}
              alt={item.title || "result"}
              className="h-full w-full object-cover"
            />
          )}
        </a>

        {item?.title && (
          <div className="flex justify-between items-end gap-2 absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 pt-8 pb-2">
            <h3 className="text-white text-sm font-semibold line-clamp-2">
              {item.title}
            </h3>
            <button
              className="shrink-0 bg-indigo-600 text-white text-xs rounded px-3 py-1.5 font-medium cursor-pointer active:scale-95"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                removeFromCollection(item)
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default CollectionCard