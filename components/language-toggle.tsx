"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useConnection } from "@/components/connection/connection-provider"
import { translateContent } from "@/lib/gemini-api"

interface LanguageToggleProps {
  originalContent: string
  targetLanguage?: "hausa" | "english"
  onLanguageChange: (content: string, language: "hausa" | "english") => void
  className?: string
}

export function LanguageToggle({
  originalContent,
  targetLanguage = "hausa",
  onLanguageChange,
  className,
}: LanguageToggleProps) {
  const [isTranslating, setIsTranslating] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "hausa">("english")
  const [translatedContent, setTranslatedContent] = useState<string | null>(null)
  const { toast } = useToast()
  const { isOnline } = useConnection()

  const toggleLanguage = async () => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Cannot translate",
        description: "You need to be online to translate content. Please connect to the internet and try again.",
      })
      return
    }

    // If we already have the translation, just toggle between them
    if (translatedContent && currentLanguage === "english") {
      setCurrentLanguage("hausa")
      onLanguageChange(translatedContent, "hausa")
      toast({
        title: "Switched to Hausa",
        description: "Content is now displayed in Hausa.",
      })
      return
    } else if (currentLanguage === "hausa") {
      // Switch back to English
      setCurrentLanguage("english")
      onLanguageChange(originalContent, "english")
      toast({
        title: "Switched to English",
        description: "Content is now displayed in English.",
      })
      return
    }

    // Otherwise, we need to translate
    setIsTranslating(true)
    try {
      const translated = await translateContent(originalContent, "hausa")
      setTranslatedContent(translated)
      setCurrentLanguage("hausa")
      onLanguageChange(translated, "hausa")

      toast({
        title: "Switched to Hausa",
        description: "Content has been translated to Hausa.",
      })
    } catch (error) {
      console.error("Translation error:", error)
      toast({
        variant: "destructive",
        title: "Translation failed",
        description: "There was an error translating the content. Please try again later.",
      })
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      disabled={isTranslating || !isOnline}
      className={className}
    >
      {isTranslating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Translating...
        </>
      ) : (
        <>
          <Globe className="mr-2 h-4 w-4" />
          {currentLanguage === "english" ? "Switch to Hausa" : "Switch to English"}
        </>
      )}
    </Button>
  )
}

