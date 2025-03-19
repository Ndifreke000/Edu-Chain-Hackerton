"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Share2, CheckCircle, Copy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

interface CertificateViewProps {
  id: string
  studentName: string
  courseName: string
  completionDate: string
  instructorName?: string
}

export function CertificateView({
  id,
  studentName,
  courseName,
  completionDate,
  instructorName = "Dr. Aisha Mohammed",
}: CertificateViewProps) {
  const { toast } = useToast()
  const [claimCode, setClaimCode] = useState("")
  const [isClaiming, setIsClaiming] = useState(false)

  const handleDownload = () => {
    toast({
      title: "Certificate downloaded",
      description: "Your certificate has been downloaded successfully.",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${studentName}'s Blockchain Certificate`,
          text: `I've completed the ${courseName} course on BlockLearn!`,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: "Certificate shared",
            description: "Your certificate has been shared successfully.",
          })
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Share failed",
            description: "There was an error sharing your certificate.",
          })
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Certificate link copied to clipboard.",
      })
    }
  }

  const handleClaim = () => {
    setIsClaiming(true)
    setTimeout(() => {
      setIsClaiming(false)
      toast({
        title: "Certificate claimed",
        description: "Your certificate has been claimed on the blockchain.",
      })
    }, 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-3xl border-4 border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">Certificate of Completion</h1>
            <p className="text-muted-foreground">FITECH COMMUNITY</p>
          </div>

          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-2">This is to certify that</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{studentName}</h2>
            <p className="text-muted-foreground mb-4">has successfully completed the course</p>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{courseName}</h3>
            <p className="text-muted-foreground">on {formatDate(completionDate)}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-12 mb-4 gap-8">
            <div className="text-center">
              <div className="mb-2 border-b-2 border-gray-300 pb-1 w-48">
                <p className="italic text-primary">Ibrahim Suleiman</p>
              </div>
              <p className="text-sm text-muted-foreground">Course Instructor</p>
            </div>
            <div className="text-center">
              <div className="mb-2 border-b-2 border-gray-300 pb-1 w-48">
                <p className="italic text-primary">Dr. Amina Yusuf</p>
              </div>
              <p className="text-sm text-muted-foreground">EduChain Director</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-muted-foreground mb-2">Certificate ID: {id}</p>
            <p className="text-xs text-muted-foreground">Issued on {formatDate(new Date().toISOString())}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Button className="flex-1" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Certificate
          </Button>
        </div>

        <div className="p-6 border rounded-lg bg-muted/30">
          <h3 className="font-medium mb-4">Claim Your Certificate on StarkNet</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Enter your claim code"
              value={claimCode}
              onChange={(e) => setClaimCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleClaim} disabled={!claimCode || isClaiming} className="md:w-auto w-full">
              {isClaiming ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Claiming...
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Claim on Blockchain
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Claiming your certificate on the blockchain creates a permanent, verifiable record of your achievement.
          </p>
        </div>
      </div>
    </div>
  )
}

