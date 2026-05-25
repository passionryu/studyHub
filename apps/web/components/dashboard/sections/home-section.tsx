"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Clock,
  Target,
  Flame,
  ArrowRight,
} from "lucide-react"

interface HomeSectionProps {
  onNavigate?: (section: string) => void
  userData?: {
    name?: string
    streak?: number
    stats?: {
      notesCreated?: number
      notesChange?: string
      mockInterviews?: number
      interviewsChange?: string
      questionsAnswered?: number
      questionsChange?: string
    }
  }
  recentNotes?: Array<{
    id: string
    title: string
    subject: string
    updated: string
  }>
  learningProgress?: Array<{
    id: string
    topic: string
    category: string
    progress: number
  }>
  activityData?: number[][]
}

export function HomeSection({ 
  onNavigate, 
  userData,
  recentNotes = [],
  learningProgress = [],
  activityData = []
}: HomeSectionProps) {
  const stats = [
    { 
      label: "Notes Created", 
      value: userData?.stats?.notesCreated ?? 0, 
      icon: BookOpen, 
      change: userData?.stats?.notesChange || "Start writing" 
    },
    { 
      label: "Mock Interviews", 
      value: userData?.stats?.mockInterviews ?? 0, 
      icon: Sparkles, 
      change: userData?.stats?.interviewsChange || "Start practicing" 
    },
    { 
      label: "Questions Answered", 
      value: userData?.stats?.questionsAnswered ?? 0, 
      icon: HelpCircle, 
      change: userData?.stats?.questionsChange || "Join community" 
    },
    { 
      label: "Study Streak", 
      value: `${userData?.streak ?? 0} days`, 
      icon: Flame, 
      change: userData?.streak ? "Keep it up!" : "Start today!" 
    },
  ]

  const defaultActivity = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]

  const activity = activityData.length > 0 ? activityData : defaultActivity

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-xl border border-border bg-gradient-to-r from-card to-card/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome{userData?.name ? `, ${userData.name}` : ""}!
            </h1>
            <p className="mt-1 text-muted-foreground">
              {userData?.streak 
                ? `You're on a ${userData.streak}-day streak. Keep up the great work!`
                : "Start your learning journey today."
              }
            </p>
          </div>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onNavigate?.("notes")}
          >
            Continue Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Notes */}
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-foreground">Recent Notes</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-primary/80 text-sm"
              onClick={() => onNavigate?.("notes")}
            >
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNotes.length > 0 ? (
              recentNotes.slice(0, 3).map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{note.title}</p>
                      <p className="text-xs text-muted-foreground">{note.subject}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{note.updated}</span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No notes yet</p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-primary mt-1"
                  onClick={() => onNavigate?.("notes")}
                >
                  Create your first note
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-foreground">Learning Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            {learningProgress.length > 0 ? (
              learningProgress.slice(0, 3).map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.topic}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="text-sm font-medium text-primary">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2 bg-secondary [&>div]:bg-primary" />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Target className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No progress tracked yet</p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-primary mt-1"
                  onClick={() => onNavigate?.("interview")}
                >
                  Start an interview
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Graph */}
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-foreground">Activity</CardTitle>
            <span className="text-xs text-muted-foreground">Last 7 weeks</span>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {activity.map((week, weekIndex) => (
                <div key={weekIndex} className="flex gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="h-4 w-4 rounded-sm"
                      style={{
                        backgroundColor:
                          day === 0
                            ? "var(--secondary)"
                            : day === 1
                            ? "oklch(0.35 0.08 var(--primary))"
                            : day === 2
                            ? "oklch(0.45 0.12 var(--primary))"
                            : day === 3
                            ? "oklch(0.55 0.15 var(--primary))"
                            : "var(--primary)",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="h-3 w-3 rounded-sm"
                    style={{
                      backgroundColor:
                        level === 0
                          ? "var(--secondary)"
                          : level === 4
                          ? "var(--primary)"
                          : `color-mix(in oklch, var(--primary) ${level * 25}%, var(--secondary))`,
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group"
          onClick={() => onNavigate?.("notes")}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">New Note</p>
              <p className="text-sm text-muted-foreground">Start writing</p>
            </div>
          </CardContent>
        </Card>
        <Card 
          className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group"
          onClick={() => onNavigate?.("interview")}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Mock Interview</p>
              <p className="text-sm text-muted-foreground">Practice with AI</p>
            </div>
          </CardContent>
        </Card>
        <Card 
          className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group"
          onClick={() => onNavigate?.("questions")}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Ask Question</p>
              <p className="text-sm text-muted-foreground">Get community help</p>
            </div>
          </CardContent>
        </Card>
        <Card 
          className="border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group"
          onClick={() => onNavigate?.("profile")}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">View Analytics</p>
              <p className="text-sm text-muted-foreground">Track progress</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
