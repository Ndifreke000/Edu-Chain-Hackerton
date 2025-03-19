"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, Search, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useConnection } from "@/components/connection/connection-provider"
import { useToast } from "@/components/ui/use-toast"
import { ConnectButton } from "@/components/wallet/connect-button"

export function SiteHeader() {
  const pathname = usePathname()
  const { isOnline, syncData } = useConnection()
  const { toast } = useToast()
  const isHomePage = pathname === "/"

  const handleSync = async () => {
    try {
      await syncData()
      toast({
        title: "Sync successful",
        description: "Your learning progress has been synchronized",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sync failed",
        description: "Please check your internet connection and try again",
      })
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur transition-all",
        isHomePage
          ? "bg-primary/90 border-primary/20 dark:bg-gray-900 dark:border-gray-800"
          : "bg-background/95 border-border dark:bg-gray-900/95",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Link
            href="/"
            className={cn("flex items-center gap-2", !isHomePage && "hover:opacity-80 transition-opacity")}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <span className={cn("text-xl font-bold", isHomePage ? "text-white" : "text-foreground dark:text-white")}>
              BlockLearn
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors",
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-foreground/80 hover:text-foreground dark:text-white dark:hover:text-white/80",
                pathname === "/" && "text-white font-semibold",
              )}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={cn(
                "text-sm font-medium transition-colors",
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-foreground/80 hover:text-foreground dark:text-white dark:hover:text-white/80",
                pathname.startsWith("/courses") && "text-white font-semibold",
              )}
            >
              Courses
            </Link>
            <Link
              href="/community"
              className={cn(
                "text-sm font-medium transition-colors",
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-foreground/80 hover:text-foreground dark:text-white dark:hover:text-white/80",
                pathname.startsWith("/community") && "text-white font-semibold",
              )}
            >
              Community
            </Link>
            <Link
              href="/resources"
              className={cn(
                "text-sm font-medium transition-colors",
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-foreground/80 hover:text-foreground dark:text-white dark:hover:text-white/80",
                pathname.startsWith("/resources") && "text-white font-semibold",
              )}
            >
              Resources
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors",
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-foreground/80 hover:text-foreground dark:text-white dark:hover:text-white/80",
                pathname.startsWith("/dashboard") && "text-white font-semibold",
              )}
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden md:flex",
              isHomePage && "text-white hover:text-white hover:bg-white/10",
              "dark:text-white",
            )}
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                ctrlKey: true,
              })
              document.dispatchEvent(event)
            }}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(isHomePage && "text-white hover:text-white hover:bg-white/10", "dark:text-white")}
            onClick={handleSync}
          >
            {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5 text-destructive" />}
            <span className="sr-only">{isOnline ? "Online" : "Offline"}</span>
          </Button>

          <ConnectButton
            className={cn("hidden md:flex", isHomePage && "text-white hover:text-white hover:bg-white/10")}
          />

          <ModeToggle className={isHomePage ? "text-white" : "dark:text-white"} />

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

