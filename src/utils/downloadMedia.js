const sanitizeFilename = (value) =>
  String(value || "media")
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "media"

const extensionFromUrl = (url, type) => {
  const cleanUrl = String(url || "").split("?")[0].toLowerCase()
  const match = cleanUrl.match(/\.([a-z0-9]{2,5})$/)

  if (match) return match[1] === "jpeg" ? "jpg" : match[1]
  if (type === "video") return "mp4"
  if (type === "gif") return "gif"
  return "jpg"
}

export const downloadMedia = async (item) => {
  const url = item?.downloadUrl || item?.src
  if (!url) throw new Error("This media does not have a downloadable URL.")

  const filename = `${sanitizeFilename(item.title || `${item.type}-media`)}.${extensionFromUrl(url, item.type)}`
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.target = "_blank"
  link.rel = "noopener noreferrer"
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  link.remove()

  return { downloaded: true, native: true }
}
