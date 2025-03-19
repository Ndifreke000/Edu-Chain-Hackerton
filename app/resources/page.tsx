"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  FileText,
  BookOpen,
  Download,
  Search,
  Filter,
  Globe,
  Bookmark,
  ExternalLink,
  Clock,
  ThumbsUp,
  Languages,
  Lightbulb,
  Tractor,
  Building,
  Landmark,
  GraduationCap,
  ShoppingCart,
  Home,
  Zap,
} from "lucide-react"
import { useConnection } from "@/components/connection/connection-provider"
import { useToast } from "@/components/ui/use-toast"
import { generateLocalUseCase } from "@/lib/gemini-api"

export default function ResourcesPage() {
  const { isOnline } = useConnection()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"articles" | "guides" | "glossary" | "use-cases">("articles")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedUseCase, setGeneratedUseCase] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("agriculture")

  // Emoji mapping for article categories
  const categoryEmojis: Record<string, string> = {
    Fundamentals: "🧩",
    Cryptocurrency: "💰",
    Applications: "🔧",
    Finance: "💳",
    Security: "🔒",
    Development: "💻",
    Technical: "⚙️",
    "Digital Assets": "🖼️",
  }

  // Industry icons mapping
  const industryIcons: Record<string, React.ReactNode> = {
    agriculture: <Tractor className="h-10 w-10 text-green-600" />,
    finance: <Landmark className="h-10 w-10 text-blue-600" />,
    healthcare: <span className="text-5xl">🏥</span>,
    education: <GraduationCap className="h-10 w-10 text-purple-600" />,
    supply_chain: <ShoppingCart className="h-10 w-10 text-orange-600" />,
    real_estate: <Home className="h-10 w-10 text-red-600" />,
    energy: <Zap className="h-10 w-10 text-yellow-600" />,
    government: <Building className="h-10 w-10 text-gray-600" />,
  }

  // Mock articles data
  const articles = [
    {
      id: 1,
      title: "Understanding Blockchain Technology: A Beginner's Guide",
      description: "An introduction to blockchain technology and its fundamental concepts",
      category: "Fundamentals",
      readTime: "10 min read",
      language: "English/Hausa",
      author: "Ibrahim Mohammed",
      date: "May 15, 2024",
      emoji: "🔗",
      featured: true,
    },
    {
      id: 2,
      title: "Cryptocurrency Adoption in Northern Nigeria: Challenges and Opportunities",
      description: "Exploring the current state of cryptocurrency adoption in Northern Nigeria",
      category: "Cryptocurrency",
      readTime: "15 min read",
      language: "English",
      author: "Amina Yusuf",
      date: "May 10, 2024",
      emoji: "💰",
      featured: false,
    },
    {
      id: 3,
      title: "Blockchain for Agricultural Supply Chains in Nigeria",
      description: "How blockchain technology can transform agricultural supply chains in Nigeria",
      category: "Applications",
      readTime: "12 min read",
      language: "English/Hausa",
      author: "Mohammed Bello",
      date: "May 5, 2024",
      emoji: "🌾",
      featured: true,
    },
    {
      id: 4,
      title: "Digital Identity Solutions Using Blockchain",
      description: "Exploring how blockchain can provide secure digital identities for underserved populations",
      category: "Applications",
      readTime: "8 min read",
      language: "English",
      author: "Fatima Ibrahim",
      date: "April 28, 2024",
      emoji: "🪪",
      featured: false,
    },
    {
      id: 5,
      title: "Financial Inclusion Through Blockchain Technology",
      description: "How blockchain enables financial services for the unbanked in Northern Nigeria",
      category: "Finance",
      readTime: "14 min read",
      language: "English/Hausa",
      author: "Yusuf Abdullahi",
      date: "April 20, 2024",
      emoji: "💳",
      featured: false,
    },
  ]

  // Mock guides data
  const guides = [
    {
      id: 1,
      title: "Setting Up Your First Cryptocurrency Wallet",
      description: "A step-by-step guide to creating and securing your first cryptocurrency wallet",
      difficulty: "Beginner",
      steps: 8,
      language: "English/Hausa",
      downloadable: true,
      emoji: "👛",
    },
    {
      id: 2,
      title: "Understanding Blockchain Transactions",
      description: "Learn how transactions work on a blockchain network",
      difficulty: "Beginner",
      steps: 6,
      language: "English",
      downloadable: true,
      emoji: "🔄",
    },
    {
      id: 3,
      title: "Securing Your Digital Assets",
      description: "Best practices for keeping your cryptocurrencies and digital assets safe",
      difficulty: "Intermediate",
      steps: 10,
      language: "English/Hausa",
      downloadable: true,
      emoji: "🔒",
    },
    {
      id: 4,
      title: "Participating in Decentralized Finance (DeFi)",
      description: "A guide to understanding and participating in DeFi protocols",
      difficulty: "Advanced",
      steps: 12,
      language: "English",
      downloadable: false,
      emoji: "💹",
    },
    {
      id: 5,
      title: "Creating a Simple Smart Contract",
      description: "Introduction to writing and deploying a basic smart contract",
      difficulty: "Advanced",
      steps: 15,
      language: "English",
      downloadable: false,
      emoji: "📝",
    },
  ]

  // Mock glossary terms
  const glossaryTerms = [
    {
      term: "Blockchain",
      definition:
        "A distributed, decentralized, public ledger that records transactions across many computers so that the record cannot be altered retroactively without the alteration of all subsequent blocks and the consensus of the network.",
      category: "Fundamentals",
    },
    {
      term: "Cryptocurrency",
      definition:
        "A digital or virtual currency that uses cryptography for security and operates independently of a central bank.",
      category: "Fundamentals",
    },
    {
      term: "Smart Contract",
      definition:
        "Self-executing contracts with the terms of the agreement directly written into code. They automatically execute when predetermined conditions are met.",
      category: "Development",
    },
    {
      term: "Decentralized Finance (DeFi)",
      definition:
        "Financial services and applications built on blockchain technology that operate without centralized intermediaries like banks.",
      category: "Finance",
    },
    {
      term: "Non-Fungible Token (NFT)",
      definition:
        "A unique digital asset that represents ownership of a specific item or piece of content, such as art, music, or in-game items.",
      category: "Digital Assets",
    },
    {
      term: "Consensus Mechanism",
      definition:
        "The process by which a blockchain network reaches agreement on the state of the ledger. Common mechanisms include Proof of Work and Proof of Stake.",
      category: "Technical",
    },
    {
      term: "Public Key",
      definition:
        "A cryptographic code that allows users to receive cryptocurrency transactions. It's shared with others and acts like an address.",
      category: "Security",
    },
    {
      term: "Private Key",
      definition:
        "A secure cryptographic code that enables access to your cryptocurrency holdings. It should never be shared with others.",
      category: "Security",
    },
    {
      term: "Decentralized Application (dApp)",
      definition:
        "An application that runs on a distributed computing system, typically a blockchain network, rather than a single computer or server.",
      category: "Development",
    },
    {
      term: "Gas Fee",
      definition: "A fee paid to network validators for processing transactions on blockchain networks like Ethereum.",
      category: "Technical",
    },
  ]

  // Industry options for use cases
  const industries = [
    { value: "agriculture", label: "Agriculture" },
    { value: "finance", label: "Finance & Banking" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "supply_chain", label: "Supply Chain" },
    { value: "real_estate", label: "Real Estate" },
    { value: "energy", label: "Energy" },
    { value: "government", label: "Government Services" },
  ]

  const handleGenerateUseCase = async () => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Cannot generate content",
        description: "You need to be online to generate content. Please connect to the internet and try again.",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedUseCase("")

    try {
      const useCase = await generateLocalUseCase(selectedIndustry)
      setGeneratedUseCase(useCase)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "There was an error generating the use case. Please try again later.",
      })
      console.error("Failed to generate use case:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = (resourceName: string) => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Cannot download",
        description: "You need to be online to download resources. Please connect to the internet and try again.",
      })
      return
    }

    toast({
      title: "Download started",
      description: `${resourceName} is being downloaded for offline use.`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Learning Resources</h1>
              <p className="text-muted-foreground">
                Explore our collection of blockchain educational resources tailored for Northern Nigeria
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search resources..."
                  className="pl-8 h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="articles" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="articles">
                <FileText className="mr-2 h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="guides">
                <BookOpen className="mr-2 h-4 w-4" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="glossary">
                <Globe className="mr-2 h-4 w-4" />
                Glossary
              </TabsTrigger>
              <TabsTrigger value="use-cases">
                <Lightbulb className="mr-2 h-4 w-4" />
                Use Cases
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="mt-6">
              {/* Featured Articles */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles
                    .filter((article) => article.featured)
                    .map((article) => (
                      <Card key={article.id} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden bg-muted flex items-center justify-center">
                          <span className="text-8xl">{article.emoji}</span>
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge>
                              {article.category} {categoryEmojis[article.category] || ""}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              {article.readTime}
                            </div>
                          </div>
                          <CardTitle>{article.title}</CardTitle>
                          <CardDescription>{article.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              By {article.author} • {article.date}
                            </div>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Languages className="h-3 w-3" />
                              {article.language}
                            </Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm" onClick={() => handleDownload(article.title)}>
                            <Download className="mr-2 h-4 w-4" />
                            Save Offline
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/resources/articles/${article.id}`}>Read Article</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </div>

              {/* All Articles */}
              <h2 className="text-2xl font-bold mb-6">All Articles</h2>
              <div className="space-y-4">
                {articles.map((article) => (
                  <Card key={article.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-40 md:h-auto overflow-hidden bg-muted flex items-center justify-center">
                        <span className="text-8xl">{article.emoji}</span>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge>
                            {article.category} {categoryEmojis[article.category] || ""}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {article.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4">{article.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            By {article.author} • {article.date}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(article.title)}
                              disabled={!isOnline}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Save Offline
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/resources/articles/${article.id}`}>Read Article</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Step-by-Step Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card key={guide.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={
                            guide.difficulty === "Beginner"
                              ? "default"
                              : guide.difficulty === "Intermediate"
                                ? "accent"
                                : "info"
                          }
                        >
                          {guide.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Languages className="h-3 w-3" />
                          {guide.language}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-4xl">{guide.emoji}</span>
                        <CardTitle>{guide.title}</CardTitle>
                      </div>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="mr-1 h-4 w-4" />
                          {guide.steps} steps
                        </div>
                        {guide.downloadable && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Offline Available
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {guide.downloadable && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(guide.title)}
                          disabled={!isOnline}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Save Offline
                        </Button>
                      )}
                      <Button size="sm" className={!guide.downloadable ? "w-full" : ""} asChild>
                        <Link href={`/resources/guides/${guide.id}`}>View Guide</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="glossary" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Glossary</CardTitle>
                  <CardDescription>
                    A comprehensive glossary of blockchain terms and definitions to help you understand the technology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input placeholder="Search terms..." />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Button variant="outline" className="rounded-full" size="sm">
                      All Categories
                    </Button>
                    <Button variant="outline" className="rounded-full" size="sm">
                      Fundamentals
                    </Button>
                    <Button variant="outline" className="rounded-full" size="sm">
                      Technical
                    </Button>
                    <Button variant="outline" className="rounded-full" size="sm">
                      Finance
                    </Button>
                    <Button variant="outline" className="rounded-full" size="sm">
                      Security
                    </Button>
                    <Button variant="outline" className="rounded-full" size="sm">
                      Development
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {glossaryTerms.map((term, index) => (
                      <div key={index} className="pb-4 border-b last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold">{term.term}</h3>
                          <Badge variant="outline">
                            {term.category} {categoryEmojis[term.category] || ""}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{term.definition}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDownload("Blockchain Glossary")}
                    disabled={!isOnline}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Complete Glossary
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="use-cases" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Generate Use Case</CardTitle>
                      <CardDescription>
                        Generate a blockchain use case for a specific industry in Northern Nigeria
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Select Industry</label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          disabled={isGenerating}
                        >
                          {industries.map((industry) => (
                            <option key={industry.value} value={industry.value}>
                              {industry.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex justify-center">{industryIcons[selectedIndustry]}</div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={handleGenerateUseCase} disabled={isGenerating || !isOnline}>
                        {isGenerating ? (
                          <>
                            <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Generate Use Case
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  {generatedUseCase ? (
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="capitalize">
                            Blockchain for {selectedIndustry.replace("_", " ")}
                          </CardTitle>
                          <Badge variant="accent">AI Generated</Badge>
                        </div>
                        <CardDescription>
                          A practical use case for blockchain technology in Northern Nigeria
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="prose max-w-none dark:prose-invert">
                          {generatedUseCase.split("\n\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => handleDownload(`Blockchain for ${selectedIndustry} Use Case`)}
                          disabled={!isOnline}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Save Offline
                        </Button>
                        <Button variant="outline">
                          <Bookmark className="mr-2 h-4 w-4" />
                          Bookmark
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Generate a Use Case</h3>
                        <p className="text-muted-foreground mb-6">
                          Select an industry and click "Generate Use Case" to create a practical blockchain application
                          example for Northern Nigeria.
                        </p>
                        {!isOnline && (
                          <div className="p-4 bg-destructive/10 rounded-md text-destructive text-sm">
                            You need to be online to generate use cases. Please connect to the internet and try again.
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Pre-generated use cases */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">Popular Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>Blockchain for Agricultural Supply Chains</CardTitle>
                        <Badge>Agriculture</Badge>
                      </div>
                      <CardDescription>
                        Improving transparency and efficiency in agricultural supply chains
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center mb-4">
                        <span className="text-6xl">🌾</span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        A blockchain-based system that tracks agricultural products from farm to market, ensuring fair
                        prices for farmers and quality assurance for consumers in Northern Nigeria.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>128 found this useful</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/resources/use-cases/agriculture">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload("Blockchain for Agricultural Supply Chains")}
                        disabled={!isOnline}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Save Offline
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>Digital Identity for Financial Inclusion</CardTitle>
                        <Badge>Finance</Badge>
                      </div>
                      <CardDescription>
                        Providing secure digital identities to enable access to financial services
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center mb-4">
                        <span className="text-6xl">💳</span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        A blockchain-based digital identity system that allows unbanked populations in Northern Nigeria
                        to access financial services without traditional documentation.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>95 found this useful</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/resources/use-cases/finance">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload("Digital Identity for Financial Inclusion")}
                        disabled={!isOnline}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Save Offline
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

