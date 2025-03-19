"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@/components/wallet/wallet-provider"
import { DashboardPopup } from "@/components/dashboard-popup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RealTimeStats } from "@/components/dashboard/real-time-stats"
import { BookOpen, Award, Clock, Download, User, FileText } from "lucide-react"

export default function DashboardPage() {
  const { isConnected, address } = useWallet()
  const [showPopup, setShowPopup] = useState(false)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    // Show popup if not connected
    if (!isConnected) {
      setShowPopup(true)
    }
  }, [isConnected])

  const handleContinueAsGuest = () => {
    setIsGuest(true)
    setShowPopup(false)
  }

  // Mock user data
  const userData = {
    name: isGuest ? "Guest User" : "Ibrahim Mohammed",
    enrolledCourses: 3,
    completedCourses: 1,
    certificates: 1,
    progress: {
      "Blockchain Fundamentals": 75,
      "Cryptocurrency Basics": 40,
      "Blockchain for Agriculture": 10,
    },
  }

  return (
    <div className="container py-8">
      <DashboardPopup open={showPopup} onOpenChange={setShowPopup} onContinueAsGuest={handleContinueAsGuest} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {isConnected
              ? `Welcome back, ${userData.name}`
              : isGuest
                ? "Welcome, Guest User"
                : "Connect your wallet to access all features"}
          </p>
        </div>

        {isConnected && (
          <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
        )}
      </div>

      {/* Real-time stats */}
      <div className="mb-8">
        <RealTimeStats />
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Enrolled Courses</CardDescription>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  {userData.enrolledCourses}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You are currently enrolled in {userData.enrolledCourses} courses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Completed Courses</CardDescription>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-accent" />
                  {userData.completedCourses}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">You have completed {userData.completedCourses} courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Certificates Earned</CardDescription>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-info" />
                  {userData.certificates}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You have earned {userData.certificates} blockchain certificates
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Track your progress across all enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(userData.progress).map(([course, progress]) => (
                  <div key={course} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{course}</span>
                      <span className="text-sm text-muted-foreground">{progress}% complete</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Manage your enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(userData.progress).map(([course, progress]) => (
                  <div key={course} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">{course}</h3>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="inline-block h-3 w-3 mr-1" />
                          Last accessed: March 15, 2025
                        </p>
                      </div>
                      <Button size="sm">Continue Learning</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle>My Certificates</CardTitle>
              <CardDescription>View and share your earned certificates</CardDescription>
            </CardHeader>
            <CardContent>
              {userData.certificates > 0 ? (
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Blockchain Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">Issued on March 10, 2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm">View Certificate</Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Award className="h-4 w-4 mr-1 text-green-500" />
                    Verified on StarkNet blockchain
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Certificates Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete a course to earn your first blockchain certificate
                  </p>
                  <Button>Browse Courses</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle>Downloaded Content</CardTitle>
              <CardDescription>Manage your offline content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Blockchain Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">Downloaded on March 12, 2025</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Remove Download
                    </Button>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Download className="h-4 w-4 mr-1" />
                    250 MB • Available offline
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Cryptocurrency Basics</h3>
                      <p className="text-sm text-muted-foreground">Downloaded on March 14, 2025</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Remove Download
                    </Button>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Download className="h-4 w-4 mr-1" />
                    180 MB • Available offline
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

