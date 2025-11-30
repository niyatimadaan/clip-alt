"use client"

import { useState } from "react"

interface ImagePreviewProps {
  image: string
  onCopyImage?: () => void
  onDownloadImage?: () => void
}

export default function ImagePreview({ image, onCopyImage, onDownloadImage }: ImagePreviewProps) {
  const [copiedImage, setCopiedImage] = useState(false)

  const handleCopyImage = () => {
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]).then(() => {
          setCopiedImage(true)
          setTimeout(() => setCopiedImage(false), 2000)
        })
      })
      .catch(() => {
        setCopiedImage(false)
      })
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <p className="mb-4 text-sm text-gray-600">✓ Image detected from clipboard</p>
        <div className="relative w-full overflow-hidden rounded-lg bg-gray-100 group">
          <img src={image || "/placeholder.svg"} alt="Pasted preview" className="h-auto w-full object-cover" />
          {/* Overlay buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopyImage}
              className="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
            >
              {copiedImage ? "✓ Copied" : "Copy Image"}
            </button>
            <button
              onClick={onDownloadImage}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-lg flex items-center gap-2"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
