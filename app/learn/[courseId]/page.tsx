"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  ChevronRight,
  Play,
  FileText,
  MessageSquare,
  CheckSquare,
  Download,
  Lightbulb,
  HelpCircle,
} from "lucide-react"
import { useConnection } from "@/components/connection/connection-provider"
import { generateExplanation, generateQuiz } from "@/lib/gemini-api"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { DynamicLogo } from "@/components/ui/dynamic-logo"
import { LanguageToggle } from "@/components/language-toggle"
import { OfflinePopup } from "@/components/connection/offline-popup"

export default function CourseLearnPage() {
  const params = useParams()
  const courseId = params.courseId
  const { isOnline } = useConnection()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState<"video" | "text" | "quiz" | "discussion">("text")
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false)
  const [quiz, setQuiz] = useState<any>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false)
  const [explanation, setExplanation] = useState("")
  const [currentConcept, setCurrentConcept] = useState("blockchain")
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "hausa">("english")
  const [lessonContent, setLessonContent] = useState<string>("")
  const [showOfflinePopup, setShowOfflinePopup] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  // Check if course is downloaded
  useEffect(() => {
    // Mock check for downloaded status
    const downloadedItems = JSON.parse(localStorage.getItem("downloaded-items") || "[]")
    const isDownloaded = downloadedItems.some(
      (item: any) => item.type === "course" && item.title === "Blockchain Fundamentals",
    )
    setIsDownloaded(isDownloaded)
  }, [])

  // Mock course data
  const course = {
    id: courseId,
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology and how it works",
    currentLesson: 2,
    totalLessons: 12,
  }

  // Mock lessons data
  const lessons = [
    { id: 1, title: "What is Blockchain Technology?", completed: true },
    { id: 2, title: "Key Components of a Blockchain", completed: false, current: true },
    { id: 3, title: "Types of Blockchain Networks", completed: false },
    { id: 4, title: "Consensus Mechanisms", completed: false },
    { id: 5, title: "Cryptography in Blockchain", completed: false },
    { id: 6, title: "Blockchain vs. Traditional Databases", completed: false },
    { id: 7, title: "Introduction to Cryptocurrencies", completed: false },
    { id: 8, title: "Digital Wallets", completed: false },
    { id: 9, title: "Blockchain Applications in Agriculture", completed: false },
    { id: 10, title: "Digital Identity Solutions", completed: false },
    { id: 11, title: "Financial Inclusion Applications", completed: false },
    { id: 12, title: "Final Assessment", completed: false },
  ]

  // Key concepts for the current lesson
  const keyConcepts = [
    { id: 1, title: "Blockchain", description: "The fundamental technology behind cryptocurrencies" },
    { id: 2, title: "Blocks", description: "Units of data in a blockchain" },
    { id: 3, title: "Nodes", description: "Computers that maintain the blockchain" },
    { id: 4, title: "Consensus", description: "How agreement is reached on the blockchain" },
    { id: 5, title: "Decentralization", description: "Distribution of control in a blockchain network" },
  ]

  // Get lesson content for language toggle
  useEffect(() => {
    const content = `
      A blockchain is made up of several key components that work together to create a secure,
      transparent, and decentralized system. In this lesson, we'll explore these components and
      understand how they function.

      At its core, a blockchain is a chain of blocks that contain data. Each block is connected to
      the previous one, forming a continuous chain. This structure is what gives blockchain its name
      and its security features.

      Key Components:
      - Blocks: Containers that store transaction data and other important information.
      - Nodes: Computers that maintain copies of the blockchain and validate transactions.
      - Consensus Mechanism: The process by which nodes agree on the state of the blockchain.
      - Cryptography: Mathematical techniques that secure the data and transactions.
      - Decentralization: The distribution of control across the network rather than a central authority.

      These components work together to create a system that is transparent, secure, and resistant
      to tampering or fraud. In Northern Nigeria, these features could be particularly valuable for
      applications like secure land registries, transparent agricultural supply chains, and
      financial services for the unbanked.
    `
    setLessonContent(content)
  }, [])

  useEffect(() => {
    if (activeTab === "quiz" && !quiz && isOnline) {
      loadQuiz()
    }
  }, [activeTab, quiz, isOnline])

  const loadQuiz = async () => {
    if (!isOnline && !isDownloaded) {
      setShowOfflinePopup(true)
      return
    }

    setIsLoadingQuiz(true)
    try {
      const quizData = await generateQuiz("blockchain fundamentals", "beginner")
      setQuiz(quizData)
    } catch (error) {
      console.error("Failed to load quiz:", error)
      toast({
        variant: "destructive",
        title: "Failed to load quiz",
        description: "There was an error generating the quiz. Please try again later.",
      })
      // Set fallback quiz
      setQuiz({
        questions: [
          {
            question: "What is blockchain?",
            options: [
              "A type of cryptocurrency",
              "A distributed ledger technology",
              "A programming language",
              "A cloud storage service",
            ],
            correctAnswer: 1,
            explanation:
              "Blockchain is a distributed ledger technology that maintains a continuously growing list of records called blocks.",
          },
        ],
      })
    } finally {
      setIsLoadingQuiz(false)
    }
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (quizSubmitted) return

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex,
    })
  }

  const handleSubmitQuiz = () => {
    if (!quiz) return

    let correctAnswers = 0
    quiz.questions.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / quiz.questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)

    toast({
      title: `Quiz Score: ${score}%`,
      description:
        score >= 70 ? "Great job! You've mastered this content." : "Keep learning and try again to improve your score.",
    })
  }

  const loadExplanation = async (concept: string) => {
    if (!isOnline && !isDownloaded) {
      setShowOfflinePopup(true)
      return
    }

    setCurrentConcept(concept)
    setIsLoadingExplanation(true)
    try {
      const text = await generateExplanation(concept)
      setExplanation(text)
    } catch (error) {
      console.error("Failed to load explanation:", error)
      toast({
        variant: "destructive",
        title: "Failed to load explanation",
        description: "There was an error generating the explanation. Please try again later.",
      })
      setExplanation(`We couldn't generate an explanation for "${concept}" at this time. Please try again later.`)
    } finally {
      setIsLoadingExplanation(false)
    }
  }

  const handleLanguageChange = (content: string, language: "english" | "hausa") => {
    setCurrentLanguage(language)
    setLessonContent(content)
  }

  const handleDownloadCourse = () => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Cannot download",
        description: "You need to be online to download this course for offline use.",
      })
      return
    }

    // Mock download process
    toast({
      title: "Downloading course",
      description: "The course is being downloaded for offline use.",
    })

    setTimeout(() => {
      // Add to downloaded items
      const downloadedItems = JSON.parse(localStorage.getItem("downloaded-items") || "[]")
      downloadedItems.push({
        id: Date.now().toString(),
        title: "Blockchain Fundamentals",
        type: "course",
        downloadedAt: new Date().toISOString(),
        size: "15 MB",
      })
      localStorage.setItem("downloaded-items", JSON.stringify(downloadedItems))

      setIsDownloaded(true)
      toast({
        title: "Download complete",
        description: "The course is now available for offline use.",
      })
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {showOfflinePopup && !isOnline && !isDownloaded && (
        <OfflinePopup contentTitle="Blockchain Fundamentals" contentType="course" redirectPath="/offline" />
      )}

      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Lesson List */}
            <div className="w-full lg:w-64 shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>
                    Lesson {course.currentLesson} of {course.totalLessons}
                  </CardDescription>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(course.currentLesson / course.totalLessons) * 100}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1 max-h-[60vh] overflow-y-auto p-4">
                    {lessons.map((lesson) => (
                      <Button
                        key={lesson.id}
                        variant={lesson.current ? "default" : "ghost"}
                        className={`w-full justify-start ${lesson.completed ? "text-primary" : ""}`}
                        size="sm"
                      >
                        {lesson.completed ? (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border mr-2 inline-flex items-center justify-center">
                            {lesson.id}
                          </span>
                        )}
                        {lesson.title}
                        {lesson.current && <ChevronRight className="ml-auto h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadCourse}
                    disabled={!isOnline || isDownloaded}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isDownloaded ? "Downloaded" : "Save Offline"}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Key Components of a Blockchain</CardTitle>
                    <LanguageToggle
                      originalContent={lessonContent}
                      targetLanguage="hausa"
                      onLanguageChange={handleLanguageChange}
                    />
                  </div>
                  <Tabs defaultValue="text" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="video" disabled={!isOnline && !isDownloaded}>
                        <Play className="mr-1 h-4 w-4" /> Video
                      </TabsTrigger>
                      <TabsTrigger value="text">
                        <FileText className="mr-1 h-4 w-4" /> Text
                      </TabsTrigger>
                      <TabsTrigger value="quiz">
                        <CheckSquare className="mr-1 h-4 w-4" /> Quiz
                      </TabsTrigger>
                      <TabsTrigger value="discussion" disabled={!isOnline}>
                        <MessageSquare className="mr-1 h-4 w-4" /> Discussion
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  {activeTab === "video" && (
                    <div className="aspect-video bg-muted rounded-md overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-4">
                          <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Video content requires an internet connection.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "text" && (
                    <div className="space-y-6">
                      <div className="prose max-w-none dark:prose-invert">
                        {lessonContent.split("\n").map((paragraph, index) => (
                          <p key={index}>{paragraph.trim()}</p>
                        ))}
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center">
                          <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                          Key Concepts Explained
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {keyConcepts.map((concept) => (
                            <Card key={concept.id} className="overflow-hidden">
                              <CardHeader className="p-4">
                                <div className="flex items-center gap-3">
                                  <DynamicLogo text={concept.title} size="sm" variant="accent" />
                                  <div>
                                    <CardTitle className="text-md">{concept.title}</CardTitle>
                                    <CardDescription>{concept.description}</CardDescription>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardFooter className="p-4 pt-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => loadExplanation(concept.title.toLowerCase())}
                                  disabled={
                                    (!isOnline && !isDownloaded) ||
                                    (isLoadingExplanation && currentConcept === concept.title.toLowerCase())
                                  }
                                >
                                  {isLoadingExplanation && currentConcept === concept.title.toLowerCase() ? (
                                    <>
                                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                                      Loading...
                                    </>
                                  ) : (
                                    <>
                                      <HelpCircle className="mr-2 h-4 w-4" />
                                      Explain in Simple Terms
                                    </>
                                  )}
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>

                        {explanation && (
                          <div className="mt-6 p-4 bg-primary/5 rounded-lg border">
                            <h4 className="font-bold mb-2 capitalize">{currentConcept} Explained:</h4>
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                              {explanation.split("\n").map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "quiz" && (
                    <div className="space-y-6">
                      {isLoadingQuiz ? (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <div className="space-y-2">
                              <Skeleton className="h-12 w-full" />
                              <Skeleton className="h-12 w-full" />
                              <Skeleton className="h-12 w-full" />
                              <Skeleton className="h-12 w-full" />
                            </div>
                          </div>
                          <Skeleton className="h-10 w-full" />
                        </div>
                      ) : quiz ? (
                        <>
                          {quiz.questions.map((question: any, questionIndex: number) => (
                            <div key={questionIndex} className="space-y-3">
                              <h3 className="font-medium">
                                {questionIndex + 1}. {question.question}
                              </h3>
                              <div className="space-y-2">
                                {question.options.map((option: string, optionIndex: number) => (
                                  <div
                                    key={optionIndex}
                                    className={`p-3 border rounded-md cursor-pointer hover:bg-muted ${
                                      selectedAnswers[questionIndex] === optionIndex
                                        ? quizSubmitted
                                          ? optionIndex === question.correctAnswer
                                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                            : "border-red-500 bg-red-50 dark:bg-red-900/20"
                                          : "border-primary bg-primary/10"
                                        : ""
                                    }`}
                                    onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                                  >
                                    {option}
                                    {quizSubmitted && optionIndex === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 text-green-500 inline ml-2" />
                                    )}
                                  </div>
                                ))}
                              </div>
                              {quizSubmitted && (
                                <div className="text-sm p-3 bg-muted rounded-md">
                                  <p className="font-medium">Explanation:</p>
                                  <p>{question.explanation}</p>
                                </div>
                              )}
                            </div>
                          ))}

                          {quizSubmitted ? (
                            <div className="p-4 rounded-md border text-center">
                              <h3 className="text-xl font-bold mb-2">Your Score: {quizScore}%</h3>
                              <p className="mb-4">
                                {quizScore >= 70
                                  ? "Great job! You've mastered this content."
                                  : "Keep learning and try again to improve your score."}
                              </p>
                              <Button
                                onClick={() => {
                                  setQuizSubmitted(false)
                                  setSelectedAnswers({})
                                  loadQuiz()
                                }}
                              >
                                Try Another Quiz
                              </Button>
                            </div>
                          ) : (
                            <Button
                              className="w-full"
                              onClick={handleSubmitQuiz}
                              disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
                            >
                              Submit Quiz
                            </Button>
                          )}
                        </>
                      ) : (
                        <div className="text-center p-8">
                          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">Quiz Not Available</h3>
                          <p className="text-muted-foreground mb-4">
                            {isOnline
                              ? "There was an error loading the quiz. Please try again."
                              : "Quizzes require an internet connection to generate. Please connect to the internet and try again."}
                          </p>
                          {isOnline && <Button onClick={loadQuiz}>Retry Loading Quiz</Button>}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "discussion" && (
                    <div className="text-center p-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Discussion Forum</h3>
                      <p className="text-muted-foreground mb-4">
                        The discussion forum requires an internet connection. Please connect to participate in
                        discussions.
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t">
                  <Button variant="outline">Previous Lesson</Button>
                  <Button>Next Lesson</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

