"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useWallet } from "@/components/wallet/wallet-provider"
import { ModeToggle } from "@/components/mode-toggle"
import {
  BookOpen,
  Home,
  Layers,
  Award,
  Briefcase,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Code,
  BarChart,
  Gamepad2,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()
  const { isConnected, disconnect } = useWallet()

  const mainNavItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: BookOpen,
      children: [
        {
          title: "Cairo Programming",
          href: "/courses/1",
        },
        {
          title: "Building dApps",
          href: "/courses/2",
        },
        {
          title: "Smart Contract Security",
          href: "/courses/3",
        },
        {
          title: "React for StarkNet",
          href: "/courses/4",
        },
        {
          title: "Data Analysis",
          href: "/courses/5",
        },
        {
          title: "Gaming on StarkNet",
          href: "/courses/6",
        },
        {
          title: "DeFi Trading",
          href: "/courses/7",
        },
      ],
    },
    {
      title: "Scholarships",
      href: "/scholarships",
      icon: Award,
    },
    {
      title: "Jobs",
      href: "/jobs",
      icon: Briefcase,
    },
  ]

  const userNavItems = isConnected
    ? [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: Layers,
        },
        {
          title: "Profile",
          href: "/profile",
          icon: User,
        },
        {
          title: "Settings",
          href: "/settings",
          icon: Settings,
        },
      ]
    : []

  const resourceNavItems = [
    {
      title: "StarkNet Documentation",
      href: "https://docs.starknet.io/",
      icon: Code,
      external: true,
    },
    {
      title: "StarkNet Explorer",
      href: "https://starkscan.co/",
      icon: BarChart,
      external: true,
    },
    {
      title: "StarkNet Ecosystem",
      href: "https://www.starknet-ecosystem.com/",
      icon: Gamepad2,
      external: true,
    },
    {
      title: "Help & Support",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">EduChain</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isConnected && userNavItems.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <Link href={item.href}>
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex items-center justify-between p-2">
          <ModeToggle />
          {isConnected && (
            <Button
              variant="ghost"
              size="icon"
              onClick={disconnect}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          )}
          {!isConnected && (
            <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
              <Link href="/connect">
                <Wallet className="h-5 w-5" />
                <span className="sr-only">Connect wallet</span>
              </Link>
            </Button>
          )}
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

