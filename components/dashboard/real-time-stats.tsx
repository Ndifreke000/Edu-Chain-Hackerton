"use client"

import { useRealTimeData, formatLastUpdated } from "@/lib/real-time-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, BookOpen, Award, Clock } from "lucide-react"

export function RealTimeStats() {
  const { data, isLoading } = useRealTimeData()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardDescription>
                  <Skeleton className="h-4 w-24" />
                </CardDescription>
                <Skeleton className="h-7 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  // Calculate total enrollments and completions
  const totalEnrollments = Object.values(data.courseEnrollments).reduce((sum, val) => sum + val, 0)
  const totalCompletions = Object.values(data.completedCourses).reduce((sum, val) => sum + val, 0)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Real-Time Platform Statistics</h2>
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: {formatLastUpdated(data.lastUpdated)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Online Users</CardDescription>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              {data.onlineUsers}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Active learners on the platform right now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Course Enrollments</CardDescription>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-accent" />
              {totalEnrollments}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total enrollments across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Courses</CardDescription>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-info" />
              {totalCompletions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Successfully completed course instances</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Issued Certificates</CardDescription>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-green-500" />
              {data.issuedCertificates}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Blockchain-verified certificates issued</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

