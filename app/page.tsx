import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  WifiOff,
  Download,
  Globe,
  Wallet,
  Zap,
  BookOpenCheck,
  FileText,
} from "lucide-react"
import { OfflineNotice } from "@/components/connection/offline-notice"

export default function Home() {
  // Course category emojis
  const categoryEmojis: Record<string, string> = {
    fundamentals: "🧩",
    cryptocurrency: "💰",
    applications: "🔧",
    finance: "💳",
    development: "💻",
    agriculture: "🌾",
  }

  // Difficulty level icons
  const difficultyIcons: Record<string, React.ReactNode> = {
    Beginner: <span className="text-green-500">●</span>,
    Intermediate: <span className="text-yellow-500">●</span>,
    Advanced: <span className="text-red-500">●</span>,
  }

  // Mock data for courses
  const featuredCourses = [
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
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary dark:bg-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-primary to-primary/80 dark:from-gray-900 dark:to-gray-800"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 dark:opacity-20"></div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 py-28 md:py-36">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-md">
              Blockchain Education for Northern Nigeria
            </h1>
            <p className="text-xl text-white mb-10 leading-relaxed drop-shadow-md">
              Learn blockchain technology with courses designed for Northern Nigeria's unique context, available online
              and offline.
            </p>
            <div className="flex flex-wrap gap-5">
              <Button
                className="bg-white text-primary hover:bg-white/90 hover:scale-105 border-none dark:bg-white dark:text-primary dark:hover:bg-white/90 text-base px-6 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/courses">
                  <span className="flex items-center">
                    <BookOpenCheck className="mr-2 h-5 w-5" />
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20 hover:scale-105 border-white/20 transition-all dark:bg-white/20 dark:border-white/30 dark:hover:bg-white/30 dark:text-white text-base px-6 py-6 h-auto shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/community">
                  <span className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Join Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Offline Notice */}
      <OfflineNotice />

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-accent to-accent/90 dark:from-accent/90 dark:to-accent/80 py-16 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div
              className="space-y-3 animate-slide-up p-6 rounded-lg bg-white/10 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
              style={{ animationDelay: "0ms" }}
            >
              <h3 className="text-4xl font-bold">1,200+</h3>
              <p className="text-white/90 dark:text-white/95 text-lg">Students Enrolled</p>
            </div>
            <div
              className="space-y-3 animate-slide-up p-6 rounded-lg bg-white/10 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
              style={{ animationDelay: "100ms" }}
            >
              <h3 className="text-4xl font-bold">15+</h3>
              <p className="text-white/90 dark:text-white/95 text-lg">Communities Reached</p>
            </div>
            <div
              className="space-y-3 animate-slide-up p-6 rounded-lg bg-white/10 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="text-4xl font-bold">85%</h3>
              <p className="text-white/90 dark:text-white/95 text-lg">Completion Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Link href="/courses" className="text-primary hover:underline flex items-center group">
              View All <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <Card
                key={course.id}
                className="overflow-hidden border-border/40 hover:border-border hover:shadow-lg card-hover animate-fade-in transition-all hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
                  <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary" asChild>
                    <Link href={`/courses/${course.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      Learn More
                    </Link>
                  </Button>
                  <Button size="sm" className="hover:scale-105" asChild>
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
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/50 dark:bg-gray-900/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16">How BlockLearn Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              className="bg-card p-10 rounded-xl text-center shadow-md hover:shadow-lg transition-all animate-fade-in dark:shadow-lg border border-border/40 hover:scale-105 hover:border-primary/30"
              style={{ animationDelay: "0ms" }}
            >
              <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-subtle">
                <Download className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Download</h3>
              <p className="text-muted-foreground leading-relaxed">
                Download courses for offline learning, perfect for areas with limited internet connectivity.
              </p>
            </div>

            <div
              className="bg-card p-10 rounded-xl text-center shadow-md hover:shadow-lg transition-all animate-fade-in dark:shadow-lg border border-border/40 hover:scale-105 hover:border-accent/30"
              style={{ animationDelay: "100ms" }}
            >
              <div className="w-20 h-20 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-subtle">
                <BookOpen className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Learn</h3>
              <p className="text-muted-foreground leading-relaxed">
                Study interactive content with AI-powered explanations in both English and Hausa.
              </p>
            </div>

            <div
              className="bg-card p-10 rounded-xl text-center shadow-md hover:shadow-lg transition-all animate-fade-in dark:shadow-lg border border-border/40 hover:scale-105 hover:border-info/30"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-20 h-20 bg-info/10 dark:bg-info/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-subtle">
                <Users className="h-10 w-10 text-info" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join a community of learners across Northern Nigeria to share knowledge and opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Focus */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Tailored for Northern Nigeria</h2>
              <p className="text-lg mb-8 leading-relaxed">
                Our platform addresses the unique challenges and opportunities in Northern Nigeria:
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mr-5 mt-1 bg-primary/10 p-2.5 rounded-full">
                    <WifiOff className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Offline Learning</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Download courses for areas with limited internet connectivity
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-5 mt-1 bg-primary/10 p-2.5 rounded-full">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Multilingual Content</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Content available in English and Hausa to improve accessibility
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-5 mt-1 bg-primary/10 p-2.5 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Community Learning</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Group-based learning approach that aligns with local cultural values
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-muted flex items-center justify-center">
                <span className="text-9xl">🧠</span>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-card p-6 rounded-xl shadow-xl max-w-xs">
                <p className="text-base font-medium leading-relaxed">
                  "BlockLearn has transformed how we understand digital technology in our community."
                </p>
                <p className="text-sm text-muted-foreground mt-3">— Ibrahim, Student from Kano</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign In Section */}
      <section className="py-16 bg-muted/30 dark:bg-gray-900/50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-card rounded-xl shadow-lg border border-border/40">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Track Your Learning Progress</h2>
              <p className="text-muted-foreground leading-relaxed">
                Connect your wallet to save your progress, track completed courses, and earn certificates. Your learning
                journey is secure on the blockchain.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Button size="lg" className="hover:scale-105 transition-all shadow-md hover:shadow-lg">
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/80 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-sm">
              Ready to Start Your Blockchain Journey?
            </h2>
            <p className="text-white/90 dark:text-white/95 text-lg mb-10 leading-relaxed">
              Join our platform to learn blockchain technology with content designed specifically for Northern Nigeria.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Button
                className="bg-white text-primary hover:bg-white/90 hover:scale-105 border-none dark:bg-white dark:text-primary dark:hover:bg-white/90 text-base px-6 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/courses">
                  <span className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Browse Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20 hover:scale-105 border-white/20 dark:bg-white/20 dark:border-white/30 dark:hover:bg-white/30 dark:text-white text-base px-6 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/community">
                  <span className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Join Community
                    <Zap className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

