"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sparkles,
  Send,
  RotateCcw,
  Clock,
  Target,
  CheckCircle2,
  Lightbulb,
  User,
  Play,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Award,
  BarChart3,
  Brain,
} from "lucide-react"

type InterviewStep = "setup" | "loading" | "interview" | "report"

interface Message {
  id: string
  role: "ai" | "user"
  content: string
  isFeedback?: boolean
  timestamp: Date
}

const subjects = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "History",
  "Philosophy",
  "Biology",
  "Language Learning",
  "Law",
  "Medicine",
  "Economics",
  "Chemistry",
  "Psychology",
  "Custom Topic",
]

const sessionTypes = [
  { value: "interview", label: "Technical Interview" },
  { value: "oral-exam", label: "Oral Exam" },
  { value: "tutoring", label: "Tutoring Session" },
  { value: "discussion", label: "Academic Discussion" },
  { value: "debate", label: "Debate Practice" },
]

const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"]

export function InterviewSection() {
  const [step, setStep] = useState<InterviewStep>("setup")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedSessionType, setSelectedSessionType] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [elapsedTime, setElapsedTime] = useState(0)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Timer effect for interview
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (step === "interview") {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [step])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getSessionTypeLabel = () => {
    return sessionTypes.find(s => s.value === selectedSessionType)?.label || "Session"
  }

  const handleStartInterview = () => {
    if (!selectedSubject || !selectedDifficulty || !selectedSessionType) return
    setStep("loading")
    
    // Simulate loading
    setTimeout(() => {
      setStep("interview")
      const sessionLabel = getSessionTypeLabel()
      setMessages([
        {
          id: "1",
          role: "ai",
          content: `Welcome to your ${selectedDifficulty.toLowerCase()} ${selectedSubject} ${sessionLabel.toLowerCase()}. I'll be your AI assistant today.${customPrompt ? `\n\nSession focus: ${customPrompt}` : ""}\n\nLet's begin.`,
          timestamp: new Date(),
        },
      ])
    }, 2500)
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setUserInput("")
    setQuestionsAnswered((prev) => prev + 1)
  }

  const handleFinishInterview = () => {
    setStep("report")
  }

  const handleNewSession = () => {
    setStep("setup")
    setSelectedSubject("")
    setSelectedSessionType("")
    setSelectedDifficulty("")
    setCustomPrompt("")
    setMessages([])
    setUserInput("")
    setElapsedTime(0)
    setQuestionsAnswered(0)
  }

  // Setup Step
  if (step === "setup") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Interviewer</h1>
          <p className="text-muted-foreground">Configure your AI-powered learning session</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-border bg-card">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Session Setup</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Customize your AI learning experience
              </p>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              {/* Session Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Session Type</label>
                <Select value={selectedSessionType} onValueChange={setSelectedSessionType}>
                  <SelectTrigger className="bg-secondary border-0 text-foreground h-12">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {sessionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-foreground hover:bg-secondary">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject / Academic Field</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="bg-secondary border-0 text-foreground h-12">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject} className="text-foreground hover:bg-secondary">
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Difficulty</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-secondary border-0 text-foreground h-12">
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff} className="text-foreground hover:bg-secondary">
                        {diff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Prompt */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Custom Instructions <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Textarea
                  placeholder="Examples:
- 'Act like a strict senior backend engineer.'
- 'Conduct this like a university oral exam.'
- 'Teach calculus step by step.'
- 'Focus on critical thinking and debate.'
- 'Ask questions about machine learning algorithms.'"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="min-h-[120px] resize-none bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Define interview style, learning goals, AI personality, topic scope, or questioning style
                </p>
              </div>

              {/* Start Button */}
              <Button
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base"
                disabled={!selectedSubject || !selectedDifficulty || !selectedSessionType}
                onClick={handleStartInterview}
              >
                <Play className="mr-2 h-5 w-5" />
                Start Session
              </Button>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-border bg-card mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
                <Lightbulb className="h-5 w-5 text-chart-3" />
                Session Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                Structure your answers clearly with introduction, explanation, and examples
              </p>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                Take your time to think before answering - quality over speed
              </p>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                {"Don't"} hesitate to ask for clarification on ambiguous questions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Loading Step
  if (step === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mx-auto">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Preparing Your Session</h2>
            <p className="text-muted-foreground">
              Setting up {selectedDifficulty.toLowerCase()} {selectedSubject} {getSessionTypeLabel().toLowerCase()}...
            </p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    )
  }

  // Interview Step
  if (step === "interview") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Interviewer</h1>
            <p className="text-muted-foreground">
              {selectedSubject} - {getSessionTypeLabel()} - {selectedDifficulty}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-border bg-card text-foreground hover:bg-secondary"
              onClick={handleNewSession}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              New Session
            </Button>
            <Button 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleFinishInterview}
            >
              Finish Session
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Stats Sidebar */}
          <div className="space-y-4 lg:col-span-1">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground">Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Time</span>
                  </div>
                  <span className="text-sm font-mono font-medium text-foreground">{formatTime(elapsedTime)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Responses</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{questionsAnswered}</span>
                </div>
                <div className="pt-2">
                  <Badge className="w-full justify-center bg-success/10 text-success border-0 py-1">
                    <div className="h-2 w-2 rounded-full bg-success mr-2 animate-pulse" />
                    Session Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Lightbulb className="h-4 w-4 text-chart-3" />
                  Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Structure your answers clearly
                </p>
                <p className="text-xs text-muted-foreground">
                  Use specific examples when possible
                </p>
                <p className="text-xs text-muted-foreground">
                  {"Don't"} rush - take time to think
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <Card className="border-border bg-card lg:col-span-3 flex flex-col">
            <CardHeader className="border-b border-border pb-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-foreground">AI Assistant</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {selectedSubject} - {selectedDifficulty}
                    </p>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success border-0">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col flex-1 min-h-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={message.role === "ai" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}>
                        {message.role === "ai" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.isFeedback
                          ? "bg-chart-2/10 border border-chart-2/20"
                          : "bg-secondary"
                      }`}
                    >
                      <p className={`text-sm whitespace-pre-wrap ${message.role === "ai" && !message.isFeedback ? "text-foreground" : ""}`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-border p-4 flex-shrink-0">
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Type your response here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[80px] resize-none bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
                  />
                  <div className="flex flex-col gap-2">
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 h-full px-4"
                      onClick={handleSendMessage}
                      disabled={!userInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Press Enter to send, Shift + Enter for new line</span>
                  <span>{userInput.length} characters</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Report Step
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Session Report</h1>
          <p className="text-muted-foreground">
            {selectedSubject} - {getSessionTypeLabel()} - {selectedDifficulty} - {formatTime(elapsedTime)}
          </p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleNewSession}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Session
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-muted text-muted-foreground border-0">Pending</Badge>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-foreground">--/100</p>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-foreground">{questionsAnswered}</p>
              <p className="text-sm text-muted-foreground">Responses Given</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-foreground">{formatTime(elapsedTime)}</p>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-foreground">{selectedDifficulty}</p>
              <p className="text-sm text-muted-foreground">Difficulty Level</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Strengths */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
              <TrendingUp className="h-5 w-5 text-success" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <p className="text-sm text-muted-foreground">
                Connect to AI backend to see your strengths analysis
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
              <TrendingDown className="h-5 w-5 text-warning" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10 mb-3">
                <Brain className="h-6 w-6 text-warning" />
              </div>
              <p className="text-sm text-muted-foreground">
                Connect to AI backend to see improvement areas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Topics */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
            <BookOpen className="h-5 w-5 text-primary" />
            Recommended Study Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connect to AI backend to get personalized study recommendations
            </p>
            <Button 
              variant="outline" 
              className="border-border bg-card text-foreground hover:bg-secondary"
              onClick={() => {}}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Study Notes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Feedback */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Connect to AI backend to receive detailed feedback on your performance
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
