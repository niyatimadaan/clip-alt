"use client"

import { useState } from "react"

interface AltTextOutputProps {
  altText: string
  loading: boolean
  onCopyAltText?: () => void
}

export default function AltTextOutput({ altText, loading, onCopyAltText }: AltTextOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAltText = () => {
    navigator.clipboard.writeText(altText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Generated Alt Text</h2>
          {!loading && altText && (
            <button
              onClick={handleCopyAltText}
              className="px-3 py-1 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-600 transition-colors shadow-md"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></span>
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-100"></span>
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-200"></span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4 text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
            {altText || "Generating alt text..."}
          </div>
        )}
      </div>
    </div>
  )
}
