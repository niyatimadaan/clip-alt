"use client"

import type React from "react"

import { useRef, useEffect } from "react"

interface PasteAreaProps {
  onImagePaste: (imageData: string) => void
}

export default function PasteArea({ onImagePaste }: PasteAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Document-level paste event listener for global paste support (e.g., from Google Docs)
  useEffect(() => {
    const handleDocumentPaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      let imageFound = false

      // First, try to find direct image files
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile()
          if (!file) continue

          const reader = new FileReader()
          reader.onload = (event) => {
            const base64 = event.target?.result as string
            onImagePaste(base64)
          }
          reader.readAsDataURL(file)
          imageFound = true
          break
        }
      }

      // If no direct image, check for HTML content (Google Docs/Slides)
      if (!imageFound) {
        for (const item of items) {
          if (item.type === "text/html") {
            item.getAsString((html) => {
              const parser = new DOMParser()
              const doc = parser.parseFromString(html, "text/html")
              const img = doc.querySelector("img")

              if (img?.src) {
                // If it's a data URL, use it directly
                if (img.src.startsWith("data:")) {
                  onImagePaste(img.src)
                } else {
                  // If it's a regular URL, fetch and convert to base64
                  fetch(img.src)
                    .then((res) => res.blob())
                    .then((blob) => {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string
                        onImagePaste(base64)
                      }
                      reader.readAsDataURL(blob)
                    })
                    .catch((err) => console.error("Failed to fetch image:", err))
                }
              }
            })
            break
          }
        }
      }
    }

    document.addEventListener("paste", handleDocumentPaste)
    return () => document.removeEventListener("paste", handleDocumentPaste)
  }, [onImagePaste])

  const handlePaste = (e: React.ClipboardEvent | React.MouseEvent) => {
    if (e instanceof ClipboardEvent || (e as React.ClipboardEvent).clipboardData) {
      const clipboardEvent = e as React.ClipboardEvent
      const items = clipboardEvent.clipboardData?.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile()
          if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
              const base64 = event.target?.result as string
              onImagePaste(base64)
            }
            reader.readAsDataURL(file)
          }
          break
        }
      }
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    if (containerRef.current) {
      const pasteEvent = new ClipboardEvent("paste", {
        clipboardData: new DataTransfer(),
      })
      containerRef.current.dispatchEvent(pasteEvent)

      // Read from clipboard API
      navigator.clipboard.read().then((items) => {
        for (const item of items) {
          if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
            item.getType(item.types.find((t) => t.startsWith("image/")) || "image/png").then((blob) => {
              const reader = new FileReader()
              reader.onload = (event) => {
                const base64 = event.target?.result as string
                onImagePaste(base64)
              }
              reader.readAsDataURL(blob)
            })
            break
          }
        }
      })
    }
  }

  return (
    <div
      ref={containerRef}
      onPaste={handlePaste}
      onContextMenu={handleContextMenu}
      className="group relative rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center transition-all hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "v" && e.ctrlKey) {
          handlePaste(e as any)
        }
      }}
    >
      <div className="space-y-3">
        <div className="text-4xl text-gray-400 group-hover:text-blue-400 transition-colors">📌</div>
        <p className="text-gray-700 font-medium">
          Paste an image with <span className="font-bold">CTRL+V</span>
        </p>
        <p className="text-sm text-gray-500">Or right-click and select "Paste"</p>
        <p className="text-xs text-gray-400 mt-2">Works with images from Google Docs and other sources</p>
      </div>
    </div>
  )
}
