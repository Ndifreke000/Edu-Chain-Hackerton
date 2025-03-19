"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "./wallet-provider"
import { truncateAddress } from "@/lib/utils"
import { Wallet, LogOut, Loader2, User, Settings, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ConnectButtonProps {
  className?: string
}

export function ConnectButton({ className }: ConnectButtonProps) {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      await connect()
      toast({
        title: "Wallet connected",
        description: "Your wallet has been connected successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "There was an error connecting your wallet. Please try again.",
      })
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn("flex items-center gap-2 transition-all hover:bg-primary/10 hover:scale-105", className)}
          >
            <Wallet className="h-4 w-4" />
            <span>{truncateAddress(address || "")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        disabled={isConnecting || isLoading}
        className={cn("flex items-center gap-2 hover:scale-105 transition-all", className)}
      >
        {isConnecting || isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </>
        )}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>
              Connect your wallet to save your progress and access all features of the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center p-4 border rounded-lg">
              <Shield className="h-8 w-8 text-primary mr-4" />
              <div>
                <h4 className="font-medium">Secure Your Learning Journey</h4>
                <p className="text-sm text-muted-foreground">Your progress will be securely stored on the blockchain</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <User className="h-8 w-8 text-accent mr-4" />
              <div>
                <h4 className="font-medium">Personalized Experience</h4>
                <p className="text-sm text-muted-foreground">Access your dashboard and track your achievements</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)} className="sm:w-1/2">
              Continue as Guest
            </Button>
            <Button onClick={handleConnect} className="sm:w-1/2">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

