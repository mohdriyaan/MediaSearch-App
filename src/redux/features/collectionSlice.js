import { createSlice } from "@reduxjs/toolkit"

const getStorageItems = () => {
  try {
    const value = JSON.parse(localStorage.getItem("collection") || "[]")
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

const getItemKey = (item) => item.key || `${item.type || "media"}:${item.id}`

const initialState = {
  items: getStorageItems().map((item) => ({ ...item, key: getItemKey(item) })),
}

const persist = (items) => localStorage.setItem("collection", JSON.stringify(items))

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCollection: (state, action) => {
      const item = { ...action.payload, key: getItemKey(action.payload) }
      const alreadyExists = state.items.some((saved) => getItemKey(saved) === item.key)

      if (!alreadyExists) {
        state.items.push(item)
        persist(state.items)
      }
    },
    removeCollection: (state, action) => {
      state.items = state.items.filter((item) => getItemKey(item) !== action.payload)
      persist(state.items)
    },
    clearCollection: (state) => {
      state.items = []
      localStorage.removeItem("collection")
    },
  },
})

export const { addCollection, removeCollection, clearCollection } = collectionSlice.actions
export { getItemKey }
export default collectionSlice.reducer
