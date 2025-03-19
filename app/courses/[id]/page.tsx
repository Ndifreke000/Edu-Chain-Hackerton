"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Users, CheckCircle, Download, Wifi, WifiOff } from "lucide-react"
import { useConnection } from "@/components/connection/connection-provider"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function CourseDetailsPage() {
  const params = useParams()
  const courseId = params.id as string
  const { isOnline } = useConnection()
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)

  // In a real application, you would fetch this data from your API
  const courseData = {
    id: courseId,
    title: "Blockchain Fundamentals",
    description:
      "Learn the core concepts of blockchain technology and how it works. This comprehensive course will take you from the basics to understanding how blockchain can be applied in Northern Nigeria.",
    difficulty: "Beginner",
    language: "English/Hausa",
    duration: "4 weeks",
    lessons: 12,
    students: 320,
    instructor: "Dr. Amina Ibrahim",
    lastUpdated: "2024-02-15",
    image: "/placeholder.svg?height=400&width=600",
    offlineAvailable: true,
    prerequisites: ["Basic computer literacy", "Interest in technology"],
    whatYouWillLearn: [
      "Understand what blockchain is and how it works",
      "Learn about cryptocurrencies and digital assets",
      "Explore blockchain applications relevant to Northern Nigeria",
      "Understand the potential of blockchain for financial inclusion",
      "Learn about the challenges and limitations of blockchain technology",
    ],
    syllabus: [
      {
        week: 1,
        title: "Introduction to Blockchain",
        lessons: [
          "What is blockchain technology?",
          "The history and evolution of blockchain",
          "Key components of a blockchain",
        ],
      },
      {
        week: 2,
        title: "Blockchain Fundamentals",
        lessons: ["Cryptography basics", "Consensus mechanisms", "Types of blockchains"],
      },
      {
        week: 3,
        title: "Cryptocurrencies and Digital Assets",
        lessons: ["Introduction to cryptocurrencies", "Digital wallets", "Cryptocurrency safety and security"],
      },
      {
        week: 4,
        title: "Blockchain Applications",
        lessons: [
          "Blockchain in agriculture",
          "Digital identity solutions",
          "Financial inclusion applications",
          "Final assessment",
        ],
      },
    ],
  }

  const handleDownload = () => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "You need to be online to download this course for offline use",
      })
      return
    }

    setIsDownloading(true)

    // Simulate download
    setTimeout(() => {
      setIsDownloading(false)
      toast({
        title: "Download complete",
        description: "This course is now available for offline learning",
      })
    }, 3000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
                <p className="text-muted-foreground">{courseData.description}</p>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={courseData.image || "/placeholder.svg"}
                  alt={courseData.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>What You Will Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseData.whatYouWillLearn.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Course Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courseData.syllabus.map((week, index) => (
                      <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                        <h3 className="text-lg font-bold mb-2">
                          Week {week.week}: {week.title}
                        </h3>
                        <ul className="space-y-2">
                          {week.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">{lessonIndex + 1}</span>
                              </div>
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {courseData.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Enrollment Card */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Free</CardTitle>
                      <CardDescription>Enroll now to start learning</CardDescription>
                    </div>
                    <Badge variant="accent">{courseData.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{courseData.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{courseData.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{courseData.students.toLocaleString()} Students</span>
                    </div>
                    <div className="flex items-center">
                      {isOnline ? (
                        <Wifi className="h-4 w-4 text-muted-foreground mr-2" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-destructive mr-2" />
                      )}
                      <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full mb-3" asChild>
                      <Link href={`/learn/${courseId}`}>Start Learning</Link>
                    </Button>

                    {courseData.offlineAvailable && (
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={handleDownload}
                        disabled={isDownloading || !isOnline}
                      >
                        {isDownloading ? (
                          <>
                            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            Download for Offline Use
                          </>
                        )}
                      </Button>
                    )}

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      This course is available in both English and Hausa
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2 border-t pt-6">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm font-medium">Course Materials Included</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Access all lessons, quizzes, and interactive content</p>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Related Courses */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Courses</h2>
              <Link href="/courses" className="text-primary hover:underline flex items-center">
                View All Courses
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Cryptocurrency Basics"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge variant="accent">Beginner</Badge>
                  <CardTitle className="text-lg">Cryptocurrency Basics</CardTitle>
                  <CardDescription>
                    Understand digital currencies and how they can be used in Northern Nigeria
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link href="/courses/2">View Course</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Introduction to Web3"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge variant="accent">Beginner</Badge>
                  <CardTitle className="text-lg">Introduction to Web3</CardTitle>
                  <CardDescription>
                    Learn about the decentralized web and its potential impact on Northern Nigeria
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link href="/courses/8">View Course</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Financial Inclusion with Blockchain"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge variant="accent">Intermediate</Badge>
                  <CardTitle className="text-lg">Financial Inclusion with Blockchain</CardTitle>
                  <CardDescription>Discover how blockchain enables financial services for the unbanked</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link href="/courses/5">View Course</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

