"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/components/wallet/wallet-provider"
import {
  Building,
  MapPin,
  Calendar,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Globe,
  DollarSign,
} from "lucide-react"

export default function JobDetailsPage() {
  const params = useParams()
  const jobId = params.id as string
  const { isConnected, connect } = useWallet()

  // In a real application, you would fetch this data from your API
  const jobData = {
    id: jobId,
    title: "Cairo Smart Contract Developer",
    company: "StarkWare",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $130,000",
    postedDate: "2024-03-01",
    applicationDeadline: "2024-04-15",
    companyLogo: "/placeholder.svg?height=100&width=100",
    companyWebsite: "https://starkware.co/",
    description:
      "We're looking for a Cairo developer to build secure and efficient smart contracts on StarkNet. You'll be working on cutting-edge ZK technology and helping to scale Ethereum through our Layer 2 solution.",
    responsibilities: [
      "Design and implement smart contracts in Cairo",
      "Audit and optimize existing contracts for security and gas efficiency",
      "Collaborate with the research team on new protocol features",
      "Write comprehensive tests and documentation",
      "Stay up-to-date with the latest developments in the StarkNet ecosystem",
    ],
    requirements: [
      "Strong understanding of blockchain technology and smart contracts",
      "Experience with Cairo programming language (or willingness to learn quickly)",
      "Background in Solidity or other smart contract languages",
      "Knowledge of cryptographic principles and zero-knowledge proofs",
      "Excellent problem-solving skills and attention to detail",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Remote-first work environment",
      "Flexible working hours",
      "Professional development budget",
      "Regular team retreats",
    ],
    skills: ["Cairo", "StarkNet", "Blockchain", "Smart Contracts", "Zero-Knowledge Proofs"],
    certificates: ["Cairo Programming Fundamentals", "StarkNet Smart Contract Security"],
    relatedJobs: [
      {
        id: 2,
        title: "StarkNet Frontend Engineer",
        company: "Argent",
        type: "Full-time",
      },
      {
        id: 4,
        title: "DeFi Protocol Engineer",
        company: "ZKSwap",
        type: "Full-time",
      },
    ],
  }

  const handleApply = () => {
    if (!isConnected) {
      connect()
    } else {
      // In a real application, this would submit an application
      alert(
        "Your application has been submitted! In a real implementation, this would call a smart contract to record your application.",
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                    <img
                      src={jobData.companyLogo || "/placeholder.svg"}
                      alt={jobData.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{jobData.title}</h1>
                    <div className="flex items-center text-muted-foreground">
                      <Building className="h-4 w-4 mr-1" />
                      {jobData.company} •
                      <MapPin className="h-4 w-4 mx-1" />
                      {jobData.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="default">{jobData.type}</Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Posted {new Date(jobData.postedDate).toLocaleDateString()}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Apply by {new Date(jobData.applicationDeadline).toLocaleDateString()}
                  </Badge>
                </div>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">{jobData.description}</p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-2">Responsibilities</h3>
                      <ul className="space-y-2">
                        {jobData.responsibilities.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-2">Requirements</h3>
                      <ul className="space-y-2">
                        {jobData.requirements.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-2">Benefits</h3>
                      <ul className="space-y-2">
                        {jobData.benefits.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {jobData.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferred Certificates</CardTitle>
                  <CardDescription>
                    Having these certificates from EduChain will strengthen your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobData.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-primary mr-2" />
                          <span>{cert}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/courses/${index + 1}`}>View Course</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Card */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Apply for this position</CardTitle>
                  <CardDescription>Your application will be verified on StarkNet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm font-medium">Salary Range</span>
                      </div>
                      <span>{jobData.salary}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm font-medium">Company Website</span>
                      </div>
                      <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                        <a href={jobData.companyWebsite} target="_blank" rel="noopener noreferrer">
                          Visit
                        </a>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm font-medium">Job Type</span>
                      </div>
                      <span>{jobData.type}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full mb-3" onClick={handleApply}>
                      {isConnected ? "Apply Now" : "Connect Wallet to Apply"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Your application will be recorded on StarkNet blockchain
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2 border-t pt-6">
                  <h3 className="text-sm font-medium">Similar Jobs</h3>
                  <div className="space-y-2 w-full">
                    {jobData.relatedJobs.map((job, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{job.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {job.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
                        <div className="flex justify-end mt-3">
                          <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
                            <Link href={`/jobs/${job.id}`}>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

