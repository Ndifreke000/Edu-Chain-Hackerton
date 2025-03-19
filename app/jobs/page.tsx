"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/components/wallet/wallet-provider"
import { Search, Filter, MapPin, Building, Award, ChevronRight, DropletsIcon as DragDropIcon } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const { isConnected } = useWallet()
  const [activeTab, setActiveTab] = useState<"jobs" | "profile">("jobs")

  // Mock job listings
  const jobs = [
    {
      id: 1,
      title: "Cairo Smart Contract Developer",
      company: "StarkWare",
      location: "Remote",
      type: "Full-time",
      skills: ["Cairo", "StarkNet", "Blockchain"],
      description: "We're looking for a Cairo developer to build secure and efficient smart contracts on StarkNet...",
      certificates: ["Cairo Programming Fundamentals", "StarkNet Smart Contract Security"],
    },
    {
      id: 2,
      title: "StarkNet Frontend Engineer",
      company: "Argent",
      location: "London / Remote",
      type: "Full-time",
      skills: ["React", "TypeScript", "StarkNet.js"],
      description: "Help build the next generation of StarkNet wallet interfaces and dApp integrations...",
      certificates: ["React Development for StarkNet", "Building dApps on StarkNet"],
    },
    {
      id: 3,
      title: "StarkNet Integration Specialist",
      company: "Immutable",
      location: "Remote",
      type: "Contract",
      skills: ["Cairo", "Gaming", "API Integration"],
      description: "Help game developers integrate StarkNet for NFTs and in-game assets...",
      certificates: ["Gaming on StarkNet", "Cairo Programming Fundamentals"],
    },
    {
      id: 4,
      title: "DeFi Protocol Engineer",
      company: "ZKSwap",
      location: "Remote",
      type: "Full-time",
      skills: ["Cairo", "DeFi", "AMM Design"],
      description: "Build decentralized exchange protocols on StarkNet with a focus on capital efficiency...",
      certificates: ["DeFi Trading on StarkNet", "StarkNet Smart Contract Security"],
    },
  ]

  // Mock user certificates
  const userCertificates = [
    {
      id: 1,
      title: "Cairo Programming Fundamentals",
      issueDate: "2023-12-15",
      tokenId: "0x123abc",
    },
    {
      id: 2,
      title: "Building dApps on StarkNet",
      issueDate: "2024-01-20",
      tokenId: "0x456def",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Job Board</h1>
              <p className="text-muted-foreground">Find opportunities that match your skills and certificates</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant={activeTab === "jobs" ? "default" : "outline"} onClick={() => setActiveTab("jobs")}>
                Browse Jobs
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "outline"}
                onClick={() => setActiveTab("profile")}
                disabled={!isConnected}
              >
                Talent Profile
              </Button>
            </div>
          </div>

          {activeTab === "jobs" && (
            <>
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search jobs by title, skill, or company..."
                    className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">All Locations</option>
                    <option value="london">London</option>
                    <option value="remote">Remote</option>
                  </select>
                  <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">All Job Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="contract">Contract</option>
                  </select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">More filters</span>
                  </Button>
                </div>
              </div>

              {/* Job Listings */}
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {job.company} •
                            <MapPin className="h-4 w-4 mx-1" />
                            {job.location}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={job.type === "Full-time" ? "default" : job.type === "Contract" ? "accent" : "info"}
                        >
                          {job.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{job.description}</p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Preferred Certificates:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.certificates.map((cert, index) => (
                              <Badge key={index} variant="outline" className="flex items-center">
                                <Award className="h-3 w-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href={`/jobs/${job.id}`}>View Details</Link>
                      </Button>
                      <Button disabled={!isConnected}>Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "profile" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Talent Profile</CardTitle>
                    <CardDescription>Showcase your skills and certificates to potential employers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Profile Visibility</label>
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div>
                          <p className="font-medium">Privacy Settings</p>
                          <p className="text-sm text-muted-foreground">
                            Choose how your profile data is shared with employers
                          </p>
                        </div>
                        <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                          <option value="public">Public Profile</option>
                          <option value="private">Private (ZK-Proof Only)</option>
                          <option value="selective">Selective Sharing</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">About Me</label>
                      <textarea
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Write a short bio highlighting your skills and experience..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Skills</label>
                      <div className="p-4 border rounded-md">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge>Cairo</Badge>
                          <Badge>React</Badge>
                          <Badge>TypeScript</Badge>
                          <Badge>StarkNet.js</Badge>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Add a skill..."
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm flex-1"
                          />
                          <Button size="sm">Add</Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Certificate Showcase</label>
                      <div className="border-2 border-dashed rounded-md p-6">
                        <p className="text-center text-muted-foreground mb-4">
                          Drag and drop your certificates to arrange them
                        </p>

                        <div className="space-y-3">
                          {userCertificates.map((cert) => (
                            <div
                              key={cert.id}
                              className="p-3 border rounded-md bg-card flex items-center justify-between cursor-move"
                            >
                              <div className="flex items-center">
                                <Award className="h-5 w-5 text-primary mr-2" />
                                <div>
                                  <p className="font-medium">{cert.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Issued on {new Date(cert.issueDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Badge variant="outline" className="mr-2 text-xs">
                                  Token ID: {cert.tokenId}
                                </Badge>
                                <DragDropIcon className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Save Profile</Button>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Job Matches</CardTitle>
                    <CardDescription>Jobs that match your skills and certificates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {jobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{job.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {job.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {job.company} • {job.location}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex gap-1">
                            {job.skills.slice(0, 2).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("jobs")}>
                      View All Jobs
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

