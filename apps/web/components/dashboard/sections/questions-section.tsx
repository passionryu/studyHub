"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  MessageSquare,
  ThumbsUp,
  Eye,
  Clock,
  CheckCircle2,
  TrendingUp,
  Tag,
  HelpCircle,
  X,
} from "lucide-react"

interface QuestionsSectionProps {
  onNavigate?: (section: string) => void
  questions?: Array<{
    id: string
    title: string
    author: string
    authorAvatar?: string
    tags: string[]
    answers: number
    likes: number
    views: number
    time: string
    solved: boolean
  }>
  trendingTags?: Array<{
    name: string
    count: number
  }>
  topContributors?: Array<{
    name: string
    avatar?: string
    answers: number
  }>
}

export function QuestionsSection({ 
  onNavigate,
  questions = [],
  trendingTags = [],
  topContributors = []
}: QuestionsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    tags: "",
    content: "",
  })

  const filteredQuestions = questions.filter((q) => {
    const matchesFilter = 
      activeFilter === "all" || 
      (activeFilter === "unsolved" && !q.solved) ||
      (activeFilter === "trending" && q.likes > 20)
    const matchesSearch = 
      searchQuery === "" || 
      q.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleCreateQuestion = () => {
    // This would connect to backend later
    setIsCreateModalOpen(false)
    setNewQuestion({ title: "", tags: "", content: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Question Board</h1>
          <p className="text-muted-foreground">Ask questions and help others in the community</p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ask Question
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main content */}
        <div className="space-y-4 lg:col-span-3">
          {/* Search and filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 bg-secondary border-0 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("all")}
                className={activeFilter === "all" ? "bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-secondary"}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "unsolved" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("unsolved")}
                className={activeFilter === "unsolved" ? "bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-secondary"}
              >
                Unsolved
              </Button>
              <Button
                variant={activeFilter === "trending" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("trending")}
                className={activeFilter === "trending" ? "bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-secondary"}
              >
                <TrendingUp className="mr-1 h-3 w-3" />
                Trending
              </Button>
            </div>
          </div>

          {/* Questions list */}
          {filteredQuestions.length > 0 ? (
            <div className="space-y-3">
              {filteredQuestions.map((question) => (
                <Card
                  key={question.id}
                  className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Stats */}
                      <div className="hidden sm:flex flex-col items-center gap-2 text-center min-w-[60px]">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-foreground">{question.likes}</p>
                          <p className="text-xs text-muted-foreground">likes</p>
                        </div>
                        <div className={`text-center rounded-md px-2 py-1 ${question.solved ? "bg-success/10" : "bg-secondary"}`}>
                          <p className={`text-lg font-semibold ${question.solved ? "text-success" : "text-foreground"}`}>
                            {question.answers}
                          </p>
                          <p className={`text-xs ${question.solved ? "text-success" : "text-muted-foreground"}`}>
                            answers
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                            {question.title}
                          </h3>
                          {question.solved && (
                            <Badge className="shrink-0 bg-success/10 text-success border-0">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Solved
                            </Badge>
                          )}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {question.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={question.authorAvatar} alt={question.author} />
                              <AvatarFallback className="bg-secondary text-xs">{question.author[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{question.author}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 sm:hidden">
                              <ThumbsUp className="h-3 w-3" />
                              {question.likes}
                            </span>
                            <span className="flex items-center gap-1 sm:hidden">
                              <MessageSquare className="h-3 w-3" />
                              {question.answers}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {question.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {question.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No questions yet</h3>
                <p className="text-muted-foreground mb-4 max-w-sm">
                  Be the first to ask a question and start the conversation.
                </p>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ask Your First Question
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4 lg:col-span-1">
          {/* Trending tags */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                Trending Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendingTags.length > 0 ? (
                trendingTags.map((tag, index) => (
                  <div
                    key={tag.name}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 hover:bg-secondary cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">#{index + 1}</span>
                      <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag.name}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{tag.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No trending tags yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Top contributors */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topContributors.length > 0 ? (
                topContributors.map((contributor, index) => (
                  <div
                    key={contributor.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-primary">#{index + 1}</span>
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={contributor.avatar} alt={contributor.name} />
                        <AvatarFallback className="bg-secondary text-xs">{contributor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">{contributor.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{contributor.answers} answers</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No contributors yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Question Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>
              Share your question with the community to get help.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                placeholder="What's your question?"
                value={newQuestion.title}
                onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <Input
                placeholder="Add tags separated by commas..."
                value={newQuestion.tags}
                onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
                className="bg-secondary border-0"
              />
              <p className="text-xs text-muted-foreground">Add up to 5 tags to help others find your question</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                placeholder="Provide more details about your question..."
                value={newQuestion.content}
                onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                className="min-h-[150px] bg-secondary border-0 resize-none"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleCreateQuestion}
            >
              Post Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
