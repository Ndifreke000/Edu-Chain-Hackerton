"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  Share,
  Bookmark,
  Clock,
  Calendar,
  User,
  Languages,
  ThumbsUp,
  MessageSquare,
} from "lucide-react"
import { useConnection } from "@/components/connection/connection-provider"
import { useToast } from "@/components/ui/use-toast"
import { DynamicLogo } from "@/components/ui/dynamic-logo"
import { LanguageToggle } from "@/components/language-toggle"
import { OfflinePopup } from "@/components/connection/offline-popup"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id as string
  const { isOnline } = useConnection()
  const { toast } = useToast()

  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [showOfflinePopup, setShowOfflinePopup] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "hausa">("english")
  const [articleContent, setArticleContent] = useState<string>("")

  // Mock article data
  const article = {
    id: articleId,
    title: "Understanding Blockchain Technology: A Beginner's Guide",
    description: "An introduction to blockchain technology and its fundamental concepts",
    content: `
      Blockchain technology has emerged as one of the most transformative innovations of the 21st century. At its core, blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography.

      ## What is Blockchain?

      A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across an entire network of computer systems. Each block in the chain contains a number of transactions, and every time a new transaction occurs on the blockchain, a record of that transaction is added to every participant's ledger.

      This decentralized nature is what makes blockchain particularly valuable. Unlike traditional systems where a central authority (like a bank) maintains a single ledger, blockchain distributes the ledger across the network, making it much more difficult to tamper with records.

      ## Key Features of Blockchain

      1. **Decentralization**: No single entity has control over the entire blockchain, reducing the risk of central points of failure.
      
      2. **Transparency**: All transactions are visible to anyone with access to the network, creating an unprecedented level of transparency.
      
      3. **Immutability**: Once data is recorded in a blockchain, it is extremely difficult to change, providing a secure and permanent record.
      
      4. **Security**: Cryptographic principles ensure that data cannot be tampered with, making blockchain highly secure.

      ## How Blockchain Works in Simple Terms

      Imagine a book where each page (block) contains a list of transactions. Once a page is filled, it is sealed with a special stamp (hash) that includes information about the previous page. This creates a chain of pages where each new page references the one before it.

      If someone tries to alter a transaction on a previous page, the stamp on that page would change, which would make all subsequent stamps invalid. This is how blockchain maintains its integrity - any attempt to change historical data would be immediately apparent.

      ## Applications in Northern Nigeria

      In Northern Nigeria, blockchain technology has the potential to address several challenges:

      - **Agricultural Supply Chains**: Tracking the journey of agricultural products from farm to market, ensuring fair prices for farmers and quality assurance for consumers.
      
      - **Land Registry**: Creating secure, tamper-proof records of land ownership to reduce disputes and fraud.
      
      - **Financial Inclusion**: Providing banking services to the unbanked population through blockchain-based financial solutions.
      
      - **Digital Identity**: Establishing secure digital identities for citizens, enabling access to various services without traditional documentation.

      ## Getting Started with Blockchain

      Understanding blockchain doesn't require deep technical knowledge. Start by familiarizing yourself with basic concepts, explore simple applications, and gradually build your understanding. The BlockLearn platform offers courses specifically designed for beginners in Northern Nigeria, taking into account local context and applications.

      As blockchain technology continues to evolve, its potential to transform various sectors in Northern Nigeria grows. By understanding the fundamentals now, you'll be well-positioned to leverage these opportunities in the future.
    `,
    author: "Ibrahim Mohammed",
    date: "May 15, 2024",
    readTime: "10 min read",
    category: "Fundamentals",
    language: "English/Hausa",
    image: "/placeholder.svg?height=400&width=800",
    relatedArticles: [
      {
        id: "2",
        title: "Cryptocurrency Adoption in Northern Nigeria",
        category: "Cryptocurrency",
      },
      {
        id: "3",
        title: "Blockchain for Agricultural Supply Chains",
        category: "Applications",
      },
    ],
  }

  useEffect(() => {
    // Check if article is downloaded
    const downloadedItems = JSON.parse(localStorage.getItem("downloaded-items") || "[]")
    const isDownloaded = downloadedItems.some((item: any) => item.type === "article" && item.id === articleId)
    setIsDownloaded(isDownloaded)

    // Set article content
    setArticleContent(article.content)

    // Show offline popup if needed
    if (!isOnline && !isDownloaded) {
      setShowOfflinePopup(true)
    }
  }, [articleId, isOnline])

  const handleDownload = () => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "You need to be online to download this article for offline use",
      })
      return
    }

    setIsDownloading(true)

    // Simulate download
    setTimeout(() => {
      setIsDownloading(false)

      // Add to downloaded items
      const downloadedItems = JSON.parse(localStorage.getItem("downloaded-items") || "[]")
      downloadedItems.push({
        id: articleId,
        title: article.title,
        type: "article",
        downloadedAt: new Date().toISOString(),
        size: "2 MB",
      })
      localStorage.setItem("downloaded-items", JSON.stringify(downloadedItems))

      setIsDownloaded(true)

      toast({
        title: "Download complete",
        description: "This article is now available for offline reading",
      })
    }, 1500)
  }

  const handleLanguageChange = (content: string, language: "english" | "hausa") => {
    setCurrentLanguage(language)
    setArticleContent(content)
  }

  const renderMarkdown = (content: string) => {
    // Simple markdown renderer
    const sections = content.split("\n\n").map((section, index) => {
      // Handle headers
      if (section.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-6 mb-4">
            {section.replace("## ", "")}
          </h2>
        )
      }

      // Handle lists
      if (section.includes("\n- ")) {
        const [listTitle, ...items] = section.split("\n- ")
        return (
          <div key={index} className="my-4">
            {listTitle && <p className="mb-2">{listTitle}</p>}
            <ul className="list-disc pl-6 space-y-2">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )
      }

      // Handle numbered lists
      if (section.includes("\n1. ")) {
        const [listTitle, ...items] = section.split("\n")
        return (
          <div key={index} className="my-4">
            {listTitle && <p className="mb-2">{listTitle}</p>}
            <ol className="list-decimal pl-6 space-y-2">
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^\d+\.\s/, "")}</li>
              ))}
            </ol>
          </div>
        )
      }

      // Regular paragraphs
      return (
        <p key={index} className="my-4">
          {section}
        </p>
      )
    })

    return sections
  }

  return (
    <div className="flex min-h-screen flex-col">
      {showOfflinePopup && !isOnline && !isDownloaded && (
        <OfflinePopup contentTitle={article.title} contentType="article" redirectPath="/resources" />
      )}

      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <Badge>{article.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {article.readTime}
                </div>
              </div>

              <LanguageToggle
                originalContent={articleContent}
                targetLanguage="hausa"
                onLanguageChange={handleLanguageChange}
                className="shrink-0"
              />
            </div>

            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <p className="text-muted-foreground mb-4">{article.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                By {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {article.date}
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Languages className="h-3 w-3" />
                {article.language}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <DynamicLogo
                    text={article.title}
                    size="xl"
                    variant="secondary"
                    className="w-full h-full rounded-none"
                  />
                </div>

                <CardContent className="pt-6">
                  <div className="prose max-w-none dark:prose-invert">{renderMarkdown(articleContent)}</div>

                  <div className="flex items-center justify-between mt-8 pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Comment
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Share className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Article Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleDownload}
                      disabled={isDownloading || isDownloaded || !isOnline}
                    >
                      {isDownloading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Downloading...
                        </>
                      ) : isDownloaded ? (
                        <>
                          <Download className="h-4 w-4" />
                          Downloaded
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Save for Offline
                        </>
                      )}
                    </Button>

                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      Bookmark Article
                    </Button>

                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Share className="h-4 w-4" />
                      Share Article
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {article.relatedArticles.map((relatedArticle) => (
                      <div
                        key={relatedArticle.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <DynamicLogo text={relatedArticle.title} size="sm" variant="muted" />
                        <div>
                          <Link
                            href={`/resources/articles/${relatedArticle.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {relatedArticle.title}
                          </Link>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {relatedArticle.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href="/resources">View All Articles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

