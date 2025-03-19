"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet/wallet-provider"
import { Award, DollarSign, Upload, Info } from "lucide-react"

export default function ScholarshipsPage() {
  const { isConnected, connect } = useWallet()
  const [activeTab, setActiveTab] = useState<"available" | "apply">("available")

  // Mock scholarship data
  const scholarships = [
    {
      id: 1,
      title: "StarkNet Developer Grant",
      description: "For students pursuing Cairo and StarkNet development courses",
      amount: 0.1,
      currency: "ETH",
      deadline: "2025-04-15",
      requirements: ["Complete at least 2 StarkNet courses", "Submit a sample Cairo project"],
    },
    {
      id: 2,
      title: "ZK Innovation Fund",
      description: "Supporting students learning zero-knowledge proofs and StarkNet",
      amount: 0.15,
      currency: "ETH",
      deadline: "2025-05-01",
      requirements: ["Complete Cairo Programming Fundamentals", "Submit a ZK-related project proposal"],
    },
    {
      id: 3,
      title: "StarkNet Ecosystem Grant",
      description: "For developers building tools and applications on StarkNet",
      amount: 0.2,
      currency: "ETH",
      deadline: "2025-04-30",
      requirements: ["Complete Building dApps on StarkNet course", "Submit a project plan"],
    },
  ]

  // Mock pool data
  const poolData = {
    totalFunds: 1.5,
    currency: "ETH",
    contributors: 24,
    recipients: 12,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Scholarships</h1>
              <p className="text-muted-foreground">Apply for funding to support your education</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === "available" ? "default" : "outline"}
                onClick={() => setActiveTab("available")}
              >
                Available Scholarships
              </Button>
              <Button variant={activeTab === "apply" ? "default" : "outline"} onClick={() => setActiveTab("apply")}>
                Apply for Funding
              </Button>
            </div>
          </div>

          {activeTab === "available" && (
            <>
              {/* Scholarship Pool Overview */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Scholarship Pool</CardTitle>
                  <CardDescription>Current funding available for distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Total Funds</p>
                      <p className="text-3xl font-bold">
                        {poolData.totalFunds} {poolData.currency}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Contributors</p>
                      <p className="text-3xl font-bold">{poolData.contributors}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Recipients</p>
                      <p className="text-3xl font-bold">{poolData.recipients}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Contribute to Pool
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Scholarships */}
              <h2 className="text-2xl font-bold mb-4">Available Scholarships</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarships.map((scholarship) => (
                  <Card key={scholarship.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{scholarship.title}</CardTitle>
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <CardDescription>{scholarship.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Amount:</p>
                          <p className="text-2xl font-bold">
                            {scholarship.amount} {scholarship.currency}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Deadline:</p>
                          <p>{new Date(scholarship.deadline).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Requirements:</p>
                          <ul className="list-disc pl-5 text-sm">
                            {scholarship.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => setActiveTab("apply")}>
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "apply" && (
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Application</CardTitle>
                <CardDescription>
                  Complete the form below to apply for a scholarship. All information is verified using zero-knowledge
                  proofs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Connect Your Wallet to Apply</h3>
                    <p className="text-muted-foreground mb-6">
                      You need to connect your StarkNet wallet to submit a scholarship application
                    </p>
                    <Button onClick={connect}>Connect Wallet</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Scholarship</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="">Select a scholarship</option>
                        {scholarships.map((scholarship) => (
                          <option key={scholarship.id} value={scholarship.id}>
                            {scholarship.title} - {scholarship.amount} {scholarship.currency}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Age Verification</label>
                      <div className="p-4 border rounded-md bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Info className="h-5 w-5 text-muted-foreground mr-2" />
                            <span>Prove you are at least 16 years old</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Generate ZK Proof
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location Verification</label>
                      <div className="p-4 border rounded-md bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Info className="h-5 w-5 text-muted-foreground mr-2" />
                            <span>Prove your residency in eligible region</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Generate ZK Proof
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Supporting Documents</label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop files here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Files will be uploaded to IPFS and the CID will be stored on-chain
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Upload Files
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Personal Statement</label>
                      <textarea
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Explain why you should receive this scholarship..."
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("available")}>
                  Back to Scholarships
                </Button>
                <Button disabled={!isConnected}>Submit Application</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

