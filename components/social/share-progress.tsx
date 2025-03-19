"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Twitter, Linkedin, Copy, Check } from "lucide-react"

interface ShareProgressProps {
  courseTitle: string
  progress: number
  certificateId?: string
}

export function ShareProgress({ courseTitle, progress, certificateId }: ShareProgressProps) {
  const [copied, setCopied] = useState(false)

  const baseMessage = certificateId
    ? `I just earned a certificate for completing "${courseTitle}" on EduChain! Building my StarkNet skills one course at a time. 🚀 #StarkNet #EduChain #BlockchainEducation`
    : `I'm ${progress}% through "${courseTitle}" on EduChain! Learning StarkNet development one step at a time. 🚀 #StarkNet #EduChain #BlockchainEducation`

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/share/${certificateId || "progress"}`
      : "https://educhain.example.com/share"

  const fullMessage = `${baseMessage}\n\n${shareUrl}`

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(baseMessage)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank")
  }

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(baseMessage)}`
    window.open(linkedinUrl, "_blank")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Share Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your progress</DialogTitle>
          <DialogDescription>Let your network know about your learning journey on StarkNet</DialogDescription>
        </DialogHeader>

        <div className="p-4 border rounded-md bg-muted/30 my-4">
          <p className="text-sm">{fullMessage}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={handleTwitterShare} className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1a94df]">
            <Twitter className="h-4 w-4" />
            Share on Twitter
          </Button>

          <Button onClick={handleLinkedInShare} className="flex items-center gap-2 bg-[#0077B5] hover:bg-[#006699]">
            <Linkedin className="h-4 w-4" />
            Share on LinkedIn
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button variant="outline" onClick={handleCopyLink} className="flex items-center gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Message
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

