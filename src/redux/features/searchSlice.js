import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  query: "",
  activeTab: "photos",
  results: [],
  loading: false,
  error: null,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    setActiveTabs(state, action) {
      state.activeTab = action.payload
      state.results = []
      state.error = null
    },
    setLoading(state) {
      state.loading = true
      state.error = null
    },
    setResults(state, action) {
      state.loading = false
      state.error = null
      state.results = action.payload
    },
    setError(state, action) {
      state.error = action.payload
      state.loading = false
      state.results = []
    },
    clearResults(state) {
      state.results = []
      state.error = null
    },
  },
})

export const {
  setQuery,
  setLoading,
  setResults,
  setActiveTabs,
  setError,
  clearResults,
} = searchSlice.actions

export default searchSlice.reducer
