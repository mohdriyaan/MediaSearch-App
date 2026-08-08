import { useState } from "react"

const MediaPreview = ({ item, alt }) => {
  const [videoActive, setVideoActive] = useState(false)

  if (item.type === "photo" || item.type === "gif") {
    return (
      <img
        src={item.thumbnail}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    )
  }

  if (item.type === "video" && !videoActive) {
    return (
      <div
        className="relative block h-full w-full cursor-pointer"
        onMouseEnter={() => setVideoActive(true)}
        onFocus={() => setVideoActive(true)}
        tabIndex={0}
        role="button"
        aria-label="Preview video"
      >
        <img
          src={item.thumbnail}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          Video preview
        </span>
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-black/65 text-white shadow-xl backdrop-blur transition group-hover:scale-105">
            ▶
          </span>
        </span>
      </div>
    )
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={item.thumbnail}
      src={item.previewSrc || item.src}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      onMouseLeave={() => setVideoActive(false)}
    />
  )
}

export default MediaPreview
