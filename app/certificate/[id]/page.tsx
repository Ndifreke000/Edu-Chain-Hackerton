"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { CertificateView } from "@/components/certificate/certificate-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Shield, Award } from "lucide-react"
import Link from "next/link"

export default function CertificatePage() {
  const params = useParams()
  const id = params.id as string

  // In a real app, you would fetch this data from your API or database
  const certificateData = {
    studentName: "Ibrahim Mohammed",
    courseTitle: "Blockchain Fundamentals",
    certificateId: id || "CERT-12345",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Certificate Verification</h1>
            <p className="text-muted-foreground">
              This certificate has been issued on StarkNet blockchain and can be independently verified
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CertificateView
                studentName={certificateData.studentName}
                courseTitle={certificateData.courseTitle}
                certificateId={certificateData.certificateId}
              />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Verification Details
                  </CardTitle>
                  <CardDescription>This certificate is verified on StarkNet blockchain</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Certificate ID</p>
                    <p className="font-mono text-sm">{certificateData.certificateId}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Token ID</p>
                    <p className="font-mono text-sm">{certificateData.tokenId}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Issuer</p>
                    <p>{certificateData.issuer}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Issue Date</p>
                    <p>{new Date(certificateData.issueDate).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Transaction Hash</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs truncate">{certificateData.transactionHash}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                        <Link href={`https://starkscan.co/tx/${certificateData.transactionHash}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full mt-4" asChild>
                    <Link href={`https://starkscan.co/nft/${certificateData.tokenId}`} target="_blank">
                      Verify on StarkScan
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/courses">Explore More Courses</Link>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/jobs">Browse Job Opportunities</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

