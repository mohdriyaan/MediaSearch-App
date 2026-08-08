# MediaSearch

> A fast, modern media discovery application for searching, previewing, saving, and downloading photos, videos, and GIFs from multiple media providers.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## Overview

**MediaSearch** is a React-based media discovery application that brings photos, videos, and GIFs from multiple external APIs into a single responsive interface.

The application is designed around a simple workflow:

**Search → Preview → Save → Download**

It includes optimized media previews, browser-based downloads, local collections, responsive layouts, loading states, error handling, and automated CI validation.

---

## Features

### 🔎 Multi-source media search

Search for media using multiple providers:

- **Unsplash** — photos
- **Pexels** — photos and videos
- **GIPHY** — GIFs

Results are normalized into a common structure so the UI can work consistently across providers.

### 🖼️ Photos

- High-quality image results
- Responsive image previews
- Lazy loading
- Optimized rendering
- Save to collection
- Download media
- Open original source

### 🎬 Videos

- Lightweight thumbnail-first previews
- Avoids loading every video immediately
- Loads video content only when needed
- Multiple video resolutions are handled intelligently
- Download support
- Save to collection

### 🎞️ GIFs

- Optimized GIF previews
- Original media available for downloading
- Save to collection
- Responsive media cards

### ⬇️ Reliable downloads

The application includes a dedicated browser download flow rather than simply navigating to the original media URL.

Where supported by the browser, media can be saved directly to the user's device using the File System Access API.

The download flow includes:

- User-controlled save location
- Streaming media to disk
- MIME-type-aware file extensions
- Download error handling
- Cancellation handling
- Provider/CORS error handling
- Cleanup of temporary resources

> Browser security restrictions can prevent a frontend-only application from downloading media from providers that do not allow cross-origin access. The application handles these failures explicitly rather than falsely reporting a successful download.

### ❤️ Collections

Save media locally without requiring an account.

Collections support:

- Add/remove media
- Persistent browser storage
- Photo/video/GIF items
- Download saved media
- Clear entire collection
- Duplicate prevention
- Provider/type-aware item IDs

Collection data is stored locally in the browser using `localStorage`.

### ⚡ Performance

Media-heavy applications can become slow quickly, so the application uses several performance techniques:

- Lazy-loaded images
- Thumbnail-first video rendering
- Reduced video preload behavior
- Deferred media loading
- Request cancellation
- Defensive API response mapping
- Limited result sets
- Lightweight loading skeletons
- Avoidance of unnecessary full-resolution media downloads

### 🎨 Modern UI/UX

The interface includes:

- Premium dark visual design
- Responsive layouts
- Glass-style surfaces
- Responsive media grids
- Loading skeletons
- Empty states
- Error states
- Retry actions
- Accessible controls
- Keyboard-focus states
- Mobile-friendly navigation
- Toast notifications

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Development server and build tooling |
| Redux Toolkit | Application state management |
| React Router | Client-side routing |
| Axios | API requests |
| Tailwind CSS | Styling |
| React Toastify | Notifications |
| ESLint | Code quality |
| GitHub Actions | CI |

---

## Architecture

The application follows a component-based React architecture with Redux handling shared application state.

```text
src/
├── api/
│   └── mediaApi.js
│
├── components/
│   ├── CollectionCard.jsx
│   ├── MediaPreview.jsx
│   ├── Navbar.jsx
│   ├── ResultCard.jsx
│   ├── ResultGrid.jsx
│   ├── SearchBar.jsx
│   └── Tabs.jsx
│
├── pages/
│   ├── CollectionPage.jsx
│   └── HomePage.jsx
│
├── redux/
│   └── features/
│       ├── collectionSlice.js
│       └── searchSlice.js
│
├── utils/
│   └── downloadMedia.js
│
├── App.jsx
├── index.css
└── main.jsx
```

### Data flow

```text
User Search
     │
     ▼
SearchBar
     │
     ▼
Redux Search State
     │
     ▼
ResultGrid
     │
     ├── Unsplash
     ├── Pexels
     └── GIPHY
     │
     ▼
Normalized Media Objects
     │
     ▼
ResultCard
     │
     ├── Preview
     ├── Save
     └── Download
```

---

## API Providers

MediaSearch currently integrates with:

### Unsplash

Used for photo search.

Official documentation: https://unsplash.com/developers

### Pexels

Used for photo and video search.

Official documentation: https://www.pexels.com/api/

### GIPHY

Used for GIF search.

Official documentation: https://developers.giphy.com/

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
VITE_PEXELS_API_KEY=your_pexels_api_key
VITE_GIPHY_API_KEY=your_giphy_api_key
```

Do **not** commit your `.env` file.

For production applications requiring truly private credentials, API requests should be moved behind a backend or serverless proxy.

---

## Getting Started

### Prerequisites

Make sure you have:

- Node.js
- npm
- Git

Check your versions:

```bash
node --version
npm --version
git --version
```

### Clone the repository

```bash
git clone https://github.com/mohdriyaan/MediaSearch-App.git
cd MediaSearch-App
```

### Install dependencies

```bash
npm ci
```

### Configure environment variables

Create `.env` and add your API keys as described above.

### Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Code Quality

Run ESLint:

```bash
npm run lint
```

The repository also includes GitHub Actions CI that automatically validates:

```text
Install dependencies
        ↓
      ESLint
        ↓
   Production Build
```

A pull request should pass these checks before being merged.

---

## Download Architecture

The download system is intentionally separated from the UI.

```text
Download Button
      │
      ▼
downloadMedia()
      │
      ▼
Browser File System Access API
      │
      ▼
Fetch Media
      │
      ▼
Stream Response
      │
      ▼
Write File
      │
      ▼
Save to Device
```

The implementation avoids treating navigation to a third-party URL as a successful download.

Browser security restrictions can still prevent a web application from downloading arbitrary cross-origin resources. Such failures are surfaced to the user rather than reported as successful downloads.

---

## Error Handling

The application is designed to fail gracefully in cases such as:

- API request failures
- Cancelled requests
- Invalid API responses
- Missing media URLs
- Missing thumbnails
- Empty search results
- Download failures
- Download cancellation
- Provider/CORS restrictions
- Invalid `localStorage` data

The UI provides appropriate error, empty, loading, and retry states rather than allowing these conditions to crash the application.

---

## Performance Strategy

Video and GIF-heavy search pages can consume significant bandwidth and memory. MediaSearch therefore avoids immediately loading every original media file.

For videos:

```text
Search Results
     │
     ▼
Thumbnail
     │
     ▼
User Interaction
     │
     ▼
Video Preview
```

This keeps initial searches lightweight and improves perceived performance.

Images are also lazy-loaded where appropriate.

---

## Browser Storage

Collections are stored locally using `localStorage`.

No user account is required.

This means:

- Data remains on the user's device
- Collections persist between sessions
- No collection backend is required
- Clearing browser storage removes the collection

---

## Security Considerations

API credentials used by Vite environment variables are exposed to the browser at build time.

Therefore:

> **Do not treat frontend API keys as secret credentials.**

For production applications requiring private credentials, use a backend or serverless proxy.

---

## Future Improvements

Potential future versions could include:

- Meme-focused search mode
- Semantic search
- Trending media
- Advanced filters
- Search history
- Infinite scrolling
- Full-screen media viewer
- Keyboard navigation
- Social sharing
- Copy media to clipboard
- User accounts and cloud collections
- Backend download proxy
- Download queue and progress
- PWA/offline capabilities
- Automated component testing
- End-to-end browser testing

---

## Contributing

Contributions are welcome.

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Install dependencies:

```bash
npm ci
```

Run the application:

```bash
npm run dev
```

Before submitting changes:

```bash
npm run lint
npm run build
```

Create a pull request against `main`.

---

## License

This project is available under the MIT License.

---

## Author

**Mohammed Riyaan**

GitHub: https://github.com/mohdriyaan

Repository: https://github.com/mohdriyaan/MediaSearch-App

---

## Acknowledgements

MediaSearch is powered by APIs and services provided by:

- Unsplash
- Pexels
- GIPHY
- React
- Vite
- Redux Toolkit
- Tailwind CSS

MediaSearch is an independent project and is not affiliated with or endorsed by the media providers listed above.
