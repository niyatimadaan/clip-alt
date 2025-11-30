"use client"

import { useState } from "react"

interface ActionButtonsProps {
  image: string
  altText: string
  onClear: () => void
}

export default function ActionButtons({ image, altText, onClear }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAltText = () => {
    navigator.clipboard.writeText(altText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadImage = () => {
    const link = document.createElement("a")
    link.href = image
    link.download = "image.png"
    link.click()
  }

  const handleDownloadAltText = () => {
    const element = document.createElement("a")
    const file = new Blob([altText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "alt-text.txt"
    element.click()
  }

  return (
    <div className="animate-in fade-in duration-300 flex justify-center sm:justify-start">
      {/* Simplified to only clear button since copy buttons moved to image and alt text sections */}
      <button
        onClick={onClear}
        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear
      </button>
    </div>
  )
}
