"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { SearchHeader } from "./search-header"
import { HomeSection } from "./sections/home-section"
import { NotesSection } from "./sections/notes-section"
import { InterviewSection } from "./sections/interview-section"
import { QuestionsSection } from "./sections/questions-section"
import { ProfileSection } from "./sections/profile-section"

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("home")

  const handleNavigate = (section: string) => {
    setActiveSection(section)
  }

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection onNavigate={handleNavigate} />
      case "notes":
        return <NotesSection onNavigate={handleNavigate} />
      case "interview":
        return <InterviewSection />
      case "questions":
        return <QuestionsSection onNavigate={handleNavigate} />
      case "profile":
        return <ProfileSection onNavigate={handleNavigate} />
      default:
        return <HomeSection onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={handleNavigate} />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <SearchHeader onNavigate={handleNavigate} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 pb-12">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  )
}
