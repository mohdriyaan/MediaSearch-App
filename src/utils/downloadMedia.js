const sanitizeFilename = (value) =>
  String(value || "media")
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "media"

const extensionFromType = (type) => {
  if (type === "video") return "mp4"
  if (type === "gif") return "gif"
  return "jpg"
}

export const downloadMedia = async (item) => {
  if (!item?.src) throw new Error("This media does not have a downloadable URL.")

  const filename = `${sanitizeFilename(item.title || `${item.type}-media`)}.${extensionFromType(item.type)}`

  try {
    const response = await fetch(item.src, { mode: "cors" })
    if (!response.ok) throw new Error(`Download failed with status ${response.status}.`)

    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = objectUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
    return { downloaded: true }
  } catch {
    // Some third-party CDNs intentionally block browser-side CORS requests.
    // Opening the source URL is the safest fallback and lets the provider handle access.
    window.open(item.src, "_blank", "noopener,noreferrer")
    return { downloaded: false, fallback: true }
  }
}
