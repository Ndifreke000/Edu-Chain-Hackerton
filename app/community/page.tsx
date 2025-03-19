"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Users,
  Calendar,
  MapPin,
  ThumbsUp,
  Share2,
  Flag,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Clock,
} from "lucide-react"
import { useConnection } from "@/components/connection/connection-provider"
import { useToast } from "@/components/ui/use-toast"

export default function CommunityPage() {
  const { isOnline } = useConnection()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"discussions" | "events" | "groups">("discussions")
  const [newPost, setNewPost] = useState("")

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Cannot post while offline",
        description: "You need to be online to post in the community. Please connect to the internet and try again.",
      })
      return
    }

    if (!newPost.trim()) {
      toast({
        variant: "destructive",
        title: "Empty post",
        description: "Please write something before posting.",
      })
      return
    }

    toast({
      title: "Post submitted",
      description: "Your post has been submitted to the community.",
    })

    setNewPost("")
  }

  // Mock discussions data
  const discussions = [
    {
      id: 1,
      author: {
        name: "Ibrahim Mohammed",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Kano",
      },
      title: "How can blockchain help farmers in Northern Nigeria?",
      content:
        "I'm interested in learning how blockchain technology could help small-scale farmers in our region. Has anyone implemented any solutions or have ideas to share?",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      tags: ["Agriculture", "Use Cases"],
    },
    {
      id: 2,
      author: {
        name: "Amina Yusuf",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Kaduna",
      },
      title: "Offline learning resources for rural communities",
      content:
        "I'm working with a community in a rural area with limited internet access. What are the best ways to share blockchain education materials offline?",
      timestamp: "1 day ago",
      likes: 18,
      comments: 12,
      tags: ["Education", "Offline Learning"],
    },
    {
      id: 3,
      author: {
        name: "Mohammed Bello",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Sokoto",
      },
      title: "Cryptocurrency regulations in Nigeria",
      content:
        "Can someone explain the current regulatory environment for cryptocurrencies in Nigeria? I'm trying to understand what's allowed and what's not.",
      timestamp: "3 days ago",
      likes: 32,
      comments: 15,
      tags: ["Regulation", "Cryptocurrency"],
    },
  ]

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Blockchain Workshop for Beginners",
      description: "A hands-on workshop introducing blockchain concepts for complete beginners",
      date: "June 15, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Bayero University, Kano",
      organizer: "Northern Tech Hub",
      attendees: 45,
      type: "In-person",
    },
    {
      id: 2,
      title: "Virtual Meetup: Blockchain in Agriculture",
      description: "Online discussion about blockchain applications in agricultural supply chains",
      date: "June 20, 2024",
      time: "4:00 PM - 5:30 PM",
      location: "Zoom (Online)",
      organizer: "AgriTech Nigeria",
      attendees: 78,
      type: "Virtual",
    },
    {
      id: 3,
      title: "Blockchain Hackathon: Solutions for Northern Nigeria",
      description: "A weekend hackathon to build blockchain solutions addressing local challenges",
      date: "July 8-10, 2024",
      time: "All day",
      location: "Digital Innovation Hub, Kaduna",
      organizer: "Blockchain Nigeria User Group",
      attendees: 120,
      type: "In-person",
    },
  ]

  // Mock groups data
  const groups = [
    {
      id: 1,
      name: "Blockchain for Agriculture",
      description: "Exploring blockchain applications in agricultural supply chains",
      members: 156,
      activity: "Very Active",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Northern Nigeria Developers",
      description: "Community of blockchain developers from Northern Nigeria",
      members: 89,
      activity: "Active",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Blockchain Education Network",
      description: "Focused on spreading blockchain education across Northern Nigeria",
      members: 210,
      activity: "Very Active",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Women in Blockchain",
      description: "Supporting women interested in blockchain technology",
      members: 75,
      activity: "Active",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Community</h1>
              <p className="text-muted-foreground">Connect with other blockchain learners across Northern Nigeria</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search community..."
                  className="pl-8 h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="discussions" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discussions">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="groups">
                <Users className="mr-2 h-4 w-4" />
                Groups
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="mt-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Start a Discussion</CardTitle>
                  <CardDescription>Share your thoughts, questions, or ideas with the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Input placeholder="Discussion title" disabled={!isOnline} />
                      </div>
                      <div>
                        <Textarea
                          placeholder="What's on your mind?"
                          className="min-h-[100px]"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          disabled={!isOnline}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={!isOnline}>
                      Add Tags
                    </Button>
                  </div>
                  <Button type="submit" disabled={!isOnline || !newPost.trim()} onClick={handlePostSubmit}>
                    Post Discussion
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{discussion.author.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {discussion.author.location} • {discussion.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{discussion.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{discussion.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1" disabled={!isOnline}>
                          <ThumbsUp className="h-4 w-4" />
                          {discussion.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1" disabled={!isOnline}>
                          <MessageSquare className="h-4 w-4" />
                          {discussion.comments}
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" disabled={!isOnline}>
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm" disabled={!isOnline}>
                          <Flag className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
                <Button disabled={!isOnline}>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Event
                </Button>
              </div>

              <div className="space-y-6">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{event.title}</CardTitle>
                        <Badge variant={event.type === "Virtual" ? "info" : "accent"}>{event.type}</Badge>
                      </div>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Organized by: {event.organizer}</p>
                      <Button disabled={!isOnline}>Register</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="groups" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Learning Groups</h2>
                <Button disabled={!isOnline}>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Group
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                      <div className="w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={group.image || "/placeholder.svg"}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{group.members} members</span>
                        </div>
                        <Badge variant={group.activity === "Very Active" ? "accent" : "outline"}>
                          {group.activity}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" disabled={!isOnline}>
                        Join Group
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

