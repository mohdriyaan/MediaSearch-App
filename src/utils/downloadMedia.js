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
  if (contentType.includes("jpeg")) return "jpg"
  if (contentType.includes("svg")) return "svg"
  if (type === "video") return "mp4"
  if (type === "gif") return "gif"
  return "jpg"
}

const mimeForExtension = (extension) => ({
  jpg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webm: "video/webm",
  mp4: "video/mp4",
  svg: "image/svg+xml",
}[extension] || "application/octet-stream")

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

      return response
    } catch (error) {
      lastError = error
      if (attempt < attempts - 1) await wait(500 * (attempt + 1))
    } finally {
      window.clearTimeout(timeoutId)
    }
  }

  throw lastError || new Error("Unable to fetch the media file.")
}

const saveWithFilePicker = async (response, filename, extension) => {
  const handle = await window.showSaveFilePicker({
    suggestedName: filename,
    startIn: "downloads",
    types: [{
      description: "Media file",
      accept: { [mimeForExtension(extension)]: [`.${extension}`] },
    }],
  })

  const writable = await handle.createWritable()
  try {
    if (response.body) {
      await response.body.pipeTo(writable)
    } else {
      await writable.write(await response.blob())
      await writable.close()
    }
  } catch (error) {
    try {
      await writable.abort()
    } catch {
      // The writable may already be closed by pipeTo().
    }
    throw error
  }
}

const saveBlobWithDownload = async (blob, filename) => {
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = objectUrl
  link.download = filename
  link.rel = "noopener"
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30000)
}

export const downloadMedia = async (item) => {
  const url = item?.downloadUrl || item?.src
  if (!url) throw new Error("This media does not have a downloadable URL.")

  const cleanUrl = String(url).split("?")[0]
  const urlExtension = cleanUrl.match(/\.([a-z0-9]{2,5})$/i)?.[1]
  const initialExtension = extensionFromUrl(url, item.type)

  let response
  try {
    response = await fetchWithRetry(url)
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("The download timed out. Please try again.")
    }
    throw new Error("This provider blocked the browser download. Please try another result.")
  }

  const contentType = response.headers.get("content-type") || ""
  const extension = extensionFromUrl(url, item.type, contentType) || urlExtension || initialExtension
  const filename = `${sanitizeFilename(item.title || `${item.type}-media`)}.${extension}`

  if ("showSaveFilePicker" in window && window.isSecureContext) {
    try {
      await saveWithFilePicker(response, filename, extension)
      return { downloaded: true, native: true, filename, method: "file-picker" }
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error("Download cancelled.")
      }
      throw new Error("The file could not be saved to your device. Please try again.")
    }
  }

  try {
    const blob = await response.blob()
    if (!blob.size) throw new Error("The media server returned an empty file.")
    await saveBlobWithDownload(blob, filename)
    return { downloaded: true, native: true, filename, method: "browser-download" }
  } catch {
    throw new Error("The browser could not save this file. Please try another result.")
  }
}
