"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, ImageIcon } from "lucide-react"
import { generateImage } from "@/lib/gemini-api"
import { useToast } from "@/components/ui/use-toast"

interface CourseImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void
}

export function CourseImageGenerator({ onImageGenerated }: CourseImageGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Empty prompt",
        description: "Please enter a description for the image you want to generate.",
      })
      return
    }

    setIsGenerating(true)
    try {
      // Add Northern Nigeria context to the prompt
      const enhancedPrompt = `${prompt} - in the context of Northern Nigeria, blockchain education, digital style`
      const imageUrl = await generateImage(enhancedPrompt)

      if (imageUrl) {
        setGeneratedImage(imageUrl)
        if (onImageGenerated) {
          onImageGenerated(imageUrl)
        }
        toast({
          title: "Image generated",
          description: "Your course image has been successfully generated.",
        })
      } else {
        throw new Error("Failed to generate image")
      }
    } catch (error) {
      console.error("Image generation error:", error)
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "There was an error generating the image. Please try again with a different prompt.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="image-prompt" className="text-sm font-medium">
            Describe the course image you want to generate
          </label>
          <Input
            id="image-prompt"
            placeholder="e.g., A visual representation of blockchain technology for agriculture"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        <Button onClick={handleGenerateImage} disabled={isGenerating || !prompt.trim()} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Generate Course Image
            </>
          )}
        </Button>

        {generatedImage && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Generated Image:</p>
            <div className="relative aspect-video rounded-md overflow-hidden border">
              <img
                src={generatedImage || "/placeholder.svg"}
                alt="Generated course image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

