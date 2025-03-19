"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollText, Menu, Home, BookOpen, Users, FileText, LayoutDashboard } from "lucide-react"
import { ConnectButton } from "@/components/wallet/connect-button"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/",
    },
    {
      href: "/courses",
      label: "Courses",
      icon: <BookOpen className="h-5 w-5" />,
      active: pathname.startsWith("/courses"),
    },
    {
      href: "/community",
      label: "Community",
      icon: <Users className="h-5 w-5" />,
      active: pathname.startsWith("/community"),
    },
    {
      href: "/resources",
      label: "Resources",
      icon: <FileText className="h-5 w-5" />,
      active: pathname.startsWith("/resources"),
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname.startsWith("/dashboard"),
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="flex items-center">
            <ScrollText className="h-5 w-5 mr-2" />
            BlockLearn
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-base font-medium transition-colors hover:text-foreground/80",
                route.active ? "text-foreground" : "text-foreground/60",
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t">
          <ConnectButton className="w-full justify-center" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

