"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet/wallet-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet, BookOpen } from "lucide-react"

interface DashboardPopupProps {
  redirectPath?: string
}

export function DashboardPopup({ redirectPath = "/" }: DashboardPopupProps) {
  const [open, setOpen] = useState(false)
  const { isConnected, connect } = useWallet()
  const router = useRouter()

  useEffect(() => {
    // Only show popup if user is not connected and trying to access dashboard
    if (!isConnected) {
      setOpen(true)
    }
  }, [isConnected])

  const handleConnect = async () => {
    try {
      await connect()
      setOpen(false)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleContinueAsGuest = () => {
    setOpen(false)
    router.push(redirectPath)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet to Track Progress</DialogTitle>
          <DialogDescription>
            To save your learning progress and access all dashboard features, you need to connect your wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
            <div className="mr-4 bg-primary text-primary-foreground p-2 rounded-full">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Save Your Progress</h4>
              <p className="text-sm text-muted-foreground">
                Your learning journey will be securely stored on the blockchain
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-accent/10 dark:bg-accent/20 rounded-lg">
            <div className="mr-4 bg-accent text-accent-foreground p-2 rounded-full">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Access All Features</h4>
              <p className="text-sm text-muted-foreground">
                Unlock certificates, achievements, and personalized recommendations
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleContinueAsGuest} className="sm:flex-1">
            Continue as Guest
          </Button>
          <Button onClick={handleConnect} className="sm:flex-1">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

