import axios from "axios"

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY

const assertKey = (key, name) => {
  if (!key) throw new Error(`${name} API key is not configured.`)
}

export const fetchPhotos = async (query, page = 1, per_page = 20, signal) => {
  assertKey(UNSPLASH_KEY, "Unsplash")
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    signal,
  })
  return res.data
}

export const fetchVideos = async (query, per_page = 20, signal) => {
  assertKey(PEXELS_KEY, "Pexels")
  const res = await axios.get("https://api.pexels.com/v1/videos/search", {
    params: { query, per_page },
    headers: { Authorization: PEXELS_KEY },
    signal,
  })
  return res.data
}

export const fetchGifs = async (query, limit = 20, signal) => {
  assertKey(GIPHY_KEY, "GIPHY")
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { q: query, api_key: GIPHY_KEY, limit },
    signal,
  })
  return res.data
}
