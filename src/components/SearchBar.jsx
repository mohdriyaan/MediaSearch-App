import { useState } from "react"
import { useDispatch } from "react-redux"
import { setQuery } from "../redux/features/searchSlice"

const SearchBar = () => {
  const [text, setText] = useState("")

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setQuery(text))
    setText("")
  }

  return (
    <div>
      <form 
      className="flex gap-5 p-19 bg-(--c1)"
      onSubmit={(e)=>submitHandler(e)}>
        <input
        required
        className="border-2 px-4 py-2 text-xl rounded outline-none w-full" 
        type="text" 
        placeholder="Search anything..." onChange={(e)=>setText(e.target.value)}
        value={text} />
        <button
        type = "submit"
        className="active:scale-95 cursor-pointer text-xl px-4 py-2 border-2 outline-none rounded"
        >Search</button>
      </form>
    </div>
  )
}
export default SearchBar