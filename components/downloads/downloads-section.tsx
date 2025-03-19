"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Trash2, FileText, BookOpen, Video, FileCode } from "lucide-react"
import { DynamicLogo } from "@/components/ui/dynamic-logo"
import { useLocalStorage } from "@/hooks/use-local-storage"
import Link from "next/link"

interface DownloadedItem {
  id: string
  title: string
  type: "course" | "article" | "guide" | "video" | "code"
  downloadDate: string
  size: string
  path: string
}

export function DownloadsSection() {
  const [downloadedItems, setDownloadedItems] = useLocalStorage<DownloadedItem[]>("educhain-downloads", [])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // If we don't have any downloads yet, let's add some sample data
  useEffect(() => {
    if (isClient && (!downloadedItems || downloadedItems.length === 0)) {
      const sampleDownloads: DownloadedItem[] = [
        {
          id: "course-1",
          title: "Introduction to Blockchain",
          type: "course",
          downloadDate: new Date().toISOString(),
          size: "4.2 MB",
          path: "/learn/intro-to-blockchain",
        },
        {
          id: "article-1",
          title: "Understanding Smart Contracts",
          type: "article",
          downloadDate: new Date().toISOString(),
          size: "1.5 MB",
          path: "/resources/articles/understanding-smart-contracts",
        },
        {
          id: "guide-1",
          title: "Setting Up a StarkNet Wallet",
          type: "guide",
          downloadDate: new Date().toISOString(),
          size: "2.8 MB",
          path: "/resources/guides/setting-up-starknet-wallet",
        },
      ]
      setDownloadedItems(sampleDownloads)
    }
  }, [isClient, downloadedItems, setDownloadedItems])

  const handleDelete = (id: string) => {
    setDownloadedItems(downloadedItems.filter((item) => item.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      case "guide":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "code":
        return <FileCode className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Downloaded Content
        </CardTitle>
        <CardDescription>Content you've downloaded for offline access</CardDescription>
      </CardHeader>
      <CardContent>
        {downloadedItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You haven't downloaded any content yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {downloadedItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border">
                <DynamicLogo
                  text={item.title}
                  size="md"
                  variant={item.type === "course" ? "primary" : item.type === "article" ? "secondary" : "accent"}
                  seed={item.id.charCodeAt(0)}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
                  </div>
                  <h4 className="font-medium truncate">{item.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Downloaded: {new Date(item.downloadDate).toLocaleDateString()}</span>
                    <span>Size: {item.size}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={item.path}>Open</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

