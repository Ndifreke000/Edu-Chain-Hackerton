"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type ConnectionContextType = {
  isOnline: boolean
  lastSynced: Date | null
  syncData: () => Promise<void>
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined)

export function ConnectionProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)
  const [lastSynced, setLastSynced] = useState<Date | null>(null)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Set up event listeners for online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Get last synced time from localStorage
    const storedLastSynced = localStorage.getItem("lastSynced")
    if (storedLastSynced) {
      setLastSynced(new Date(storedLastSynced))
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const syncData = async () => {
    if (!isOnline) {
      throw new Error("Cannot sync data while offline")
    }

    // Simulate syncing data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const now = new Date()
    setLastSynced(now)
    localStorage.setItem("lastSynced", now.toISOString())
  }

  return <ConnectionContext.Provider value={{ isOnline, lastSynced, syncData }}>{children}</ConnectionContext.Provider>
}

export function useConnection() {
  const context = useContext(ConnectionContext)
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider")
  }
  return context
}

