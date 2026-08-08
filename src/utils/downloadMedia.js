const sanitizeFilename = (value) =>
  String(value || "media")
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "media"

const extensionFromUrl = (url, type, contentType = "") => {
  const cleanUrl = String(url || "").split("?")[0].toLowerCase()
  const match = cleanUrl.match(/\.([a-z0-9]{2,5})$/)

  if (match) return match[1] === "jpeg" ? "jpg" : match[1]
  if (contentType.includes("webm")) return "webm"
  if (contentType.includes("mp4")) return "mp4"
  if (contentType.includes("gif")) return "gif"
  if (contentType.includes("png")) return "png"
  if (type === "video") return "mp4"
  if (type === "gif") return "gif"
  return "jpg"
}

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

const fetchWithRetry = async (url, attempts = 2) => {
  let lastError

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 30000)

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        credentials: "omit",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Media server returned HTTP ${response.status}.`)
      }

      const blob = await response.blob()
      if (!blob.size) throw new Error("The media server returned an empty file.")
      return blob
    } catch (error) {
      lastError = error
      if (attempt < attempts - 1) await wait(500 * (attempt + 1))
    } finally {
      window.clearTimeout(timeoutId)
    }
  }

  throw lastError || new Error("Unable to fetch the media file.")
}

export const downloadMedia = async (item) => {
  const url = item?.downloadUrl || item?.src
  if (!url) throw new Error("This media does not have a downloadable URL.")

  let blob
  try {
    blob = await fetchWithRetry(url)
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("The download timed out. Please try again.")
    }
    throw new Error("This provider blocked the browser download. Please try again or use another result.")
  }

  const extension = extensionFromUrl(url, item.type, blob.type)
  const filename = `${sanitizeFilename(item.title || `${item.type}-media`)}.${extension}`
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = objectUrl
  link.download = filename
  link.rel = "noopener"
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)

  return { downloaded: true, native: true, filename }
}
