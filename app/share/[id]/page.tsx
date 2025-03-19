"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CertificateView } from "@/components/certificate/certificate-view"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function SharePage() {
  const params = useParams()
  const shareId = params.id as string

  // Determine if this is a certificate share or a progress share
  const isCertificate = shareId !== "progress"

  // Mock data - in a real app, you would fetch this from your API
  const shareData = isCertificate
    ? {
        studentName: "John Doe",
        courseTitle: "Cairo Programming Fundamentals",
        issueDate: "2024-03-15",
        certificateId: shareId,
        progress: 100,
      }
    : {
        studentName: "John Doe",
        courseTitle: "Building dApps on StarkNet",
        progress: 75,
      }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isCertificate ? "Certificate of Completion" : "Learning Progress"}
              </CardTitle>
              <CardDescription>
                {isCertificate
                  ? `${shareData.studentName} has completed "${shareData.courseTitle}"`
                  : `${shareData.studentName} is ${shareData.progress}% through "${shareData.courseTitle}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCertificate ? (
                <CertificateView
                  studentName={shareData.studentName}
                  courseTitle={shareData.courseTitle}
                  issueDate={shareData.issueDate}
                  certificateId={shareData.certificateId}
                />
              ) : (
                <div className="text-center space-y-6 py-8">
                  <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-2">{shareData.courseTitle}</h2>
                    <div className="max-w-md mx-auto">
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${shareData.progress}%` }} />
                      </div>
                      <p className="mt-2 text-muted-foreground">{shareData.progress}% complete</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Join EduChain</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

