"use client"

import { useConnection } from "@/components/connection/connection-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Download, WifiOff } from "lucide-react"
import Link from "next/link"

export function OfflineNotice() {
  const { isOnline } = useConnection()

  if (isOnline) {
    return null
  }

  return (
    <Alert variant="destructive" className="rounded-none border-x-0">
      <WifiOff className="h-4 w-4" />
      <AlertTitle>You are currently offline</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span>Some features may be limited. Access your downloaded courses to continue learning.</span>
        <Button size="sm" variant="outline" asChild>
          <Link href="/offline">
            <Download className="mr-2 h-4 w-4" />
            View Offline Content
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  )
}

