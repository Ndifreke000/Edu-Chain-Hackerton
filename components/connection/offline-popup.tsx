"use client"

import { useState } from "react"
import { AlertCircle, Wifi, WifiOff, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface OfflinePopupProps {
  contentTitle: string
  contentType: string
}

export function OfflinePopup({ contentTitle, contentType }: OfflinePopupProps) {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  const handleGoToOffline = () => {
    router.push("/offline")
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <WifiOff className="h-5 w-5 text-destructive" />
            No Internet Connection
          </DialogTitle>
          <DialogDescription>
            You're currently offline and this content hasn't been downloaded for offline access.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-start gap-4 rounded-lg border p-4">
            <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium leading-none mb-2">Unable to access "{contentTitle}"</h4>
              <p className="text-sm text-muted-foreground">
                This {contentType} requires an internet connection or needs to be downloaded first for offline access.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Try Again
          </Button>
          <Button onClick={handleGoToOffline} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            View Offline Content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

