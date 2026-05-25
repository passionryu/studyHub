"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Flame,
  Trophy,
  Target,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Award,
  Brain,
  Settings,
  User,
} from "lucide-react"

interface ProfileSectionProps {
  onNavigate?: (section: string) => void
  userData?: {
    name?: string
    title?: string
    plan?: string
    streak?: number
    avatar?: string
  }
  stats?: {
    totalNotes?: number
    interviewsDone?: number
    questionsAsked?: number
    answersGiven?: number
  }
  studyStats?: Array<{
    subject: string
    percentage: number
    sessions: number
  }>
  achievements?: Array<{
    id: string
    title: string
    description: string
    icon: string
    earned: boolean
    date?: string
    progress?: number
  }>
  recentActivity?: Array<{
    id: string
    action: string
    subject: string
    time: string
    type: "note" | "interview" | "question" | "answer"
  }>
  activityData?: number[][]
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  MessageSquare,
  Award,
  Flame,
  Brain,
  Trophy,
}

export function ProfileSection({ 
  onNavigate,
  userData,
  stats,
  studyStats = [],
  achievements = [],
  recentActivity = [],
  activityData = []
}: ProfileSectionProps) {
  const userStats = [
    { label: "Total Notes", value: stats?.totalNotes ?? 0, icon: BookOpen, color: "text-chart-1" },
    { label: "Interviews Done", value: stats?.interviewsDone ?? 0, icon: MessageSquare, color: "text-chart-2" },
    { label: "Questions Asked", value: stats?.questionsAsked ?? 0, icon: Target, color: "text-chart-3" },
    { label: "Answers Given", value: stats?.answersGiven ?? 0, icon: Award, color: "text-chart-4" },
  ]

  const defaultActivity = Array(12).fill(null).map(() => 
    Array(7).fill(0)
  )

  const activity = activityData.length > 0 ? activityData : defaultActivity
  const weekDays = ["Mon", "Wed", "Fri", "Sun"]
  const months = ["Jan", "Feb", "Mar"]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "note": return BookOpen
      case "interview": return MessageSquare
      case "question": return Target
      case "answer": return Award
      default: return BookOpen
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <CardContent className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
            <div className="flex items-end gap-4">
              <Avatar className="h-24 w-24 border-4 border-card">
                <AvatarImage src={userData?.avatar} alt={userData?.name || "User"} />
                <AvatarFallback className="bg-secondary text-2xl text-secondary-foreground">
                  {userData?.name ? userData.name.split(" ").map(n => n[0]).join("").toUpperCase() : <User className="h-10 w-10" />}
                </AvatarFallback>
              </Avatar>
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-foreground">{userData?.name || "User"}</h1>
                <p className="text-muted-foreground">{userData?.title || "CS Learner"}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary border-0">{userData?.plan || "Free Plan"}</Badge>
                  {(userData?.streak ?? 0) > 0 && (
                    <Badge className="bg-chart-3/10 text-chart-3 border-0">
                      <Flame className="mr-1 h-3 w-3" />
                      {userData?.streak} day streak
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-border bg-card text-foreground hover:bg-secondary">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity graph */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-foreground">Study Activity</CardTitle>
            <span className="text-xs text-muted-foreground">Contributions in the last 12 weeks</span>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1">
              <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2 py-1">
                {weekDays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="flex-1">
                <div className="flex gap-1">
                  {activity.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className="h-3 w-3 rounded-sm"
                          style={{
                            backgroundColor:
                              day === 0
                                ? "var(--secondary)"
                                : day === 1
                                ? "color-mix(in oklch, var(--primary) 25%, var(--secondary))"
                                : day === 2
                                ? "color-mix(in oklch, var(--primary) 50%, var(--secondary))"
                                : day === 3
                                ? "color-mix(in oklch, var(--primary) 75%, var(--secondary))"
                                : "var(--primary)",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  {months.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
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

        {/* Recent activity */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.slice(0, 4).map((activity) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                  </div>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-muted-foreground">No recent activity</p>
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

        {/* Subject mastery */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-foreground">Subject Mastery</CardTitle>
            {studyStats.length > 0 && (
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                Improving
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {studyStats.length > 0 ? (
              studyStats.map((stat, index) => {
                const colors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]
                return (
                  <div key={stat.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${colors[index % colors.length]}`} />
                        <span className="text-sm font-medium text-foreground">{stat.subject}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground">{stat.sessions} sessions</span>
                        <span className="font-medium text-primary">{stat.percentage}%</span>
                      </div>
                    </div>
                    <Progress
                      value={stat.percentage}
                      className="h-2 bg-secondary [&>div]:bg-primary"
                    />
                  </div>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Brain className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No study data yet</p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-primary mt-1"
                  onClick={() => onNavigate?.("interview")}
                >
                  Start practicing
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Trophy className="h-4 w-4 text-chart-3" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.length > 0 ? (
              achievements.slice(0, 4).map((achievement) => {
                const Icon = iconMap[achievement.icon] || Award
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 rounded-lg p-2 ${
                      achievement.earned ? "bg-primary/5" : "bg-secondary/30"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        achievement.earned ? "bg-primary/10" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          achievement.earned ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                        {achievement.title}
                      </p>
                      {achievement.earned ? (
                        <p className="text-xs text-primary">Earned {achievement.date}</p>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Progress value={achievement.progress || 0} className="h-1 flex-1 bg-secondary [&>div]:bg-primary" />
                          <span className="text-xs text-muted-foreground">{achievement.progress || 0}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Trophy className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">No achievements yet</p>
                <p className="text-xs text-muted-foreground mt-1">Start learning to earn badges</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
