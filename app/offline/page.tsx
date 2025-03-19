"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BookOpen, Clock, WifiOff, Wifi } from "lucide-react"
import { useConnection } from "@/components/connection/connection-provider"
import { useToast } from "@/components/ui/use-toast"

export default function OfflinePage() {
  const { isOnline, syncData } = useConnection()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"courses" | "resources">("courses")
  const [isSyncing, setIsSyncing] = useState(false)

  // Mock downloaded courses
  const downloadedCourses = [
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "Learn the core concepts of blockchain technology and how it works",
      progress: 45,
      lastLesson: "Key Components of a Blockchain",
      lastAccessed: "2 days ago",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Cryptocurrency Basics",
      description: "Understand digital currencies and how they can be used in Northern Nigeria",
      progress: 20,
      lastLesson: "What is Cryptocurrency?",
      lastAccessed: "1 week ago",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  // Mock downloaded resources
  const downloadedResources = [
    {
      id: 1,
      title: "Blockchain Glossary",
      type: "PDF",
      size: "2.4 MB",
      downloadDate: "May 15, 2024",
    },
    {
      id: 2,
      title: "Introduction to Blockchain (Hausa)",
      type: "Video",
      size: "45 MB",
      downloadDate: "May 10, 2024",
    },
    {
      id: 3,
      title: "Cryptocurrency Safety Guide",
      type: "PDF",
      size: "1.8 MB",
      downloadDate: "May 5, 2024",
    },
  ]

  const handleSync = async () => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Cannot sync",
        description: "You need to be online to sync your progress. Please connect to the internet and try again.",
      })
      return
    }

    setIsSyncing(true)
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
        description: "There was an error syncing your progress. Please try again.",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Offline Learning</h1>
              <p className="text-muted-foreground">Access your downloaded courses and resources</p>
            </div>

            <Button
              variant={isOnline ? "default" : "outline"}
              onClick={handleSync}
              disabled={isSyncing || !isOnline}
              className="flex items-center gap-2"
            >
              {isSyncing ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Syncing...
                </>
              ) : isOnline ? (
                <>
                  <Wifi className="h-4 w-4" />
                  Sync Progress
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4" />
                  Offline Mode
                </>
              )}
            </Button>
          </div>

          {!isOnline && (
            <Card className="mb-6 border-destructive">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-destructive/10 p-2 rounded-full">
                    <WifiOff className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-medium">You are currently offline</h3>
                    <p className="text-sm text-muted-foreground">
                      You can access your downloaded content, but some features are limited. Connect to the internet to
                      access all features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="courses" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Downloaded Courses
              </TabsTrigger>
              <TabsTrigger value="resources">
                <Download className="mr-2 h-4 w-4" />
                Downloaded Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="mt-6">
              {downloadedCourses.length > 0 ? (
                <div className="space-y-6">
                  {downloadedCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="flex p-4 border-b">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{course.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="mr-1 h-4 w-4" />
                            Last accessed: {course.lastAccessed}
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span className="text-primary font-medium">{course.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardFooter className="flex justify-between p-4">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Last lesson:</span> {course.lastLesson}
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/learn/${course.id}`}>Continue Learning</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Downloaded Courses</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't downloaded any courses for offline learning yet.
                    </p>
                    <Button asChild disabled={!isOnline}>
                      <Link href="/courses">Browse Courses to Download</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              {downloadedResources.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Downloaded Resources</CardTitle>
                    <CardDescription>Access your offline learning materials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {downloadedResources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              {resource.type === "PDF" ? (
                                <FileIcon className="h-5 w-5 text-primary" />
                              ) : (
                                <VideoIcon className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline">{resource.type}</Badge>
                                <span>{resource.size}</span>
                                <span>Downloaded: {resource.downloadDate}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Open
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Downloaded Resources</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't downloaded any resources for offline access yet.
                    </p>
                    <Button asChild disabled={!isOnline}>
                      <Link href="/resources">Browse Resources to Download</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// Custom icons
function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  )
}

