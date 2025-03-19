import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Filter, Search, Download, Users, Zap, BookOpen, FileText } from "lucide-react"

export default function CoursesPage() {
  // Course category emojis
  const categoryEmojis: Record<string, string> = {
    fundamentals: "🧩",
    cryptocurrency: "💰",
    applications: "🔧",
    finance: "💳",
    development: "💻",
    agriculture: "🌾",
    healthcare: "🏥",
    education: "🎓",
    supply_chain: "📦",
    real_estate: "🏠",
    energy: "⚡",
    government: "🏛️",
  }

  // Difficulty level icons
  const difficultyIcons: Record<string, React.ReactNode> = {
    Beginner: <span className="text-green-500">●</span>,
    Intermediate: <span className="text-yellow-500">●</span>,
    Advanced: <span className="text-red-500">●</span>,
  }

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "Learn the core concepts of blockchain technology and how it works",
      difficulty: "Beginner",
      language: "English/Hausa",
      duration: "4 weeks",
      category: "fundamentals",
      emoji: "🔗",
      image: "/placeholder.svg?height=200&width=300",
      offlineAvailable: true,
    },
    {
      id: 2,
      title: "Cryptocurrency Basics",
      description: "Understand digital currencies and how they can be used in Northern Nigeria",
      difficulty: "Beginner",
      language: "English/Hausa",
      duration: "3 weeks",
      category: "cryptocurrency",
      emoji: "💰",
      image: "/placeholder.svg?height=200&width=300",
      offlineAvailable: true,
    },
    {
      id: 3,
      title: "Blockchain for Agriculture",
      description: "Explore how blockchain can transform agricultural supply chains in Nigeria",
      difficulty: "Intermediate",
      language: "English/Hausa",
      duration: "5 weeks",
      category: "agriculture",
      emoji: "🌾",
      image: "/placeholder.svg?height=200&width=300",
      offlineAvailable: false,
    },
    {
      id: 4,
      title: "Digital Identity Solutions",
      description: "Learn how blockchain can provide secure digital identities for underserved populations",
      difficulty: "Intermediate",
      language: "English",
      duration: "4 weeks",
      category: "applications",
      emoji: "🪪",
      image: "/placeholder.svg?height=200&width=300",
      offlineAvailable: true,
    },
    {
      id: 5,
      title: "Financial Inclusion with Blockchain",
      description: "Discover how blockchain enables financial services for the unbanked",
      difficulty: "Intermediate",
      language: "English/Hausa",
      duration: "6 weeks",
      category: "finance",
      emoji: "💳",
      image: "/placeholder.svg?height=200&width=300",
      offlineAvailable: true,
    },
    {
      id: 6,
      title: "Smart Contracts Explained",
      description: "Understand how smart contracts work and their potential applications",
      difficulty: "Advanced",
      language: "English",
      duration: "5 weeks",
      category: "development",
      emoji: "📝",
      image: "/placeholder.svg?height=200&width=300",
      offlineAvailable: false,
    },
    {
      id: 7,
      title: "Blockchain for Healthcare",
      description: "Explore blockchain applications in healthcare delivery and records management",
      difficulty: "Intermediate",
      language: "English",
      duration: "4 weeks",
      category: "healthcare",
      emoji: "🏥",
      image: "/placeholder.svg?height=200&width=300",
      offlineAvailable: false,
    },
    {
      id: 8,
      title: "Introduction to Web3",
      description: "Learn about the decentralized web and its potential impact on Northern Nigeria",
      difficulty: "Beginner",
      language: "English/Hausa",
      duration: "3 weeks",
      category: "fundamentals",
      emoji: "🌐",
      image: "/placeholder.svg?height=200&width=300",
      offlineAvailable: true,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Courses</h1>
              <p className="text-muted-foreground">Discover blockchain courses tailored for Northern Nigeria</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8 h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" className="rounded-full" size="sm">
              All Categories
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Fundamentals {categoryEmojis["fundamentals"]}
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Cryptocurrency {categoryEmojis["cryptocurrency"]}
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Applications {categoryEmojis["applications"]}
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Finance {categoryEmojis["finance"]}
            </Button>
            <Button variant="outline" className="rounded-full" size="sm">
              Development {categoryEmojis["development"]}
            </Button>
          </div>

          {/* Featured Section */}
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 mix-blend-multiply" />
              <div className="relative z-10 p-8 md:p-12 text-white">
                <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white">Featured</Badge>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">{categoryEmojis["agriculture"]}</span>
                  <h2 className="text-2xl md:text-3xl font-bold">Blockchain for Agriculture</h2>
                </div>
                <p className="max-w-2xl mb-6">
                  Learn how blockchain technology can revolutionize agricultural supply chains in Northern Nigeria,
                  providing transparency, reducing fraud, and improving farmer livelihoods.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>320+ enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>Intermediate</span>
                  </div>
                </div>
                <Button className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="/courses/3">Explore Course</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden bg-muted flex items-center justify-center">
                  <span className="text-8xl">{course.emoji}</span>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="accent" className="flex items-center gap-1">
                      {difficultyIcons[course.difficulty]} {course.difficulty}
                    </Badge>
                    <Badge variant="info">{course.language}</Badge>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {course.duration}
                    </div>
                    {course.offlineAvailable && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Offline Available
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/courses/${course.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      Learn More
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/learn/${course.id}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Course
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

