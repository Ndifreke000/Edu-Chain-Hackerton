"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { ConnectionProvider } from "@/components/connection/connection-provider"
import { WalletProvider } from "@/components/wallet/wallet-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ConnectionProvider>
        <WalletProvider>{children}</WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  )
}

