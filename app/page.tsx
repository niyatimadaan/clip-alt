"use client"

import { useState } from "react"
import Header from "@/components/header"
import PasteArea from "@/components/paste-area"
import ImagePreview from "@/components/image-preview"
import AltTextOutput from "@/components/alt-text-output"
import ActionButtons from "@/components/action-buttons"
import { generateAltText } from "@/lib/api"

export default function Page() {
  const [image, setImage] = useState<string | null>(null)
  const [altText, setAltText] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleImagePaste = async (imageData: string) => {
    setImage(imageData)
    setLoading(true)
    setAltText("")

    try {
      const response = await generateAltText(imageData);
      setAltText(response || "Unable to generate alt text")
    } catch (error) {
      setAltText("Error generating alt text")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setImage(null)
    setAltText("")
  }

  const handleDownloadImage = () => {
    const link = document.createElement("a")
    link.href = image || ""
    link.download = altText.replaceAll(" ", "-") + ".png" || "image.png"
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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl">
        <Header />

        <div className="space-y-6">
          <PasteArea onImagePaste={handleImagePaste} />

          {image && (
            <>
              <ImagePreview image={image} onDownloadImage={handleDownloadImage} />

              <AltTextOutput altText={altText} loading={loading} />

              <ActionButtons onClear={handleClear} image={""} altText={""} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
