"use client"

import Link from "next/link"
import { ConnectButton } from "@/components/wallet/connect-button"
import { useWallet } from "@/components/wallet/wallet-provider"
import { Button } from "@/components/ui/button"
import { BookOpen, User } from "lucide-react"

export function Header() {
  const { isConnected } = useWallet()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduChain</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/courses" className="text-sm font-medium hover:text-primary">
              Courses
            </Link>
            <Link href="/scholarships" className="text-sm font-medium hover:text-primary">
              Scholarships
            </Link>
            <Link href="/jobs" className="text-sm font-medium hover:text-primary">
              Jobs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ConnectButton />
          {isConnected && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <User className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

