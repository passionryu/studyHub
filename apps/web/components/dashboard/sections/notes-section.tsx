"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Plus,
  Filter,
  Grid3X3,
  List,
  Clock,
  Tag,
  Folder,
  BookOpen,
  X,
} from "lucide-react"

interface NotesSectionProps {
  onNavigate?: (section: string) => void
  notes?: Array<{
    id: string
    title: string
    content: string
    category: string
    tags: string[]
    updated: string
  }>
  categories?: Array<{
    id: string
    label: string
    count?: number
  }>
}

const defaultCategories = [
  { id: "all", label: "All Notes" },
  { id: "cs", label: "Computer Science" },
  { id: "math", label: "Mathematics" },
  { id: "history", label: "History" },
  { id: "physics", label: "Physics" },
  { id: "philosophy", label: "Philosophy" },
  { id: "biology", label: "Biology" },
  { id: "language", label: "Language Learning" },
  { id: "law", label: "Law" },
  { id: "medicine", label: "Medicine" },
  { id: "economics", label: "Economics" },
  { id: "custom", label: "Custom" },
]

const categoryColors: Record<string, string> = {
  "Computer Science": "border-chart-1",
  "Mathematics": "border-chart-2",
  "History": "border-chart-3",
  "Physics": "border-chart-4",
  "Philosophy": "border-chart-5",
  "Biology": "border-primary",
  "Language Learning": "border-chart-1",
  "Law": "border-chart-2",
  "Medicine": "border-chart-3",
  "Economics": "border-chart-4",
  "Custom": "border-muted-foreground",
}

export function NotesSection({ 
  onNavigate, 
  notes = [],
  categories = defaultCategories 
}: NotesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    category: "",
    tags: "",
    content: "",
  })

  const filteredNotes = notes.filter((note) => {
    const matchesCategory = activeCategory === "all" || 
      note.category.toLowerCase().includes(activeCategory.toLowerCase())
    const matchesSearch = searchQuery === "" || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryCounts = () => {
    return categories.map((cat) => ({
      ...cat,
      count: cat.id === "all" 
        ? notes.length 
        : notes.filter((n) => n.category.toLowerCase().includes(cat.label.toLowerCase())).length
    }))
  }

  const handleCreateNote = () => {
    // This would connect to backend later
    setIsCreateModalOpen(false)
    setNewNote({ title: "", category: "", tags: "", content: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Study Notes</h1>
          <p className="text-muted-foreground">Organize and review your study materials</p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 bg-secondary border-0 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border bg-card text-foreground hover:bg-secondary">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {getCategoryCounts().map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <Folder className="h-4 w-4" />
            {cat.label}
            {cat.count !== undefined && (
              <Badge
                variant="secondary"
                className={`${
                  activeCategory === cat.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                } text-xs`}
              >
                {cat.count}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Notes grid */}
      {filteredNotes.length > 0 ? (
        <div className={`grid gap-4 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className={`border-l-4 ${categoryColors[note.category] || "border-border"} border-border bg-card hover:bg-card/80 transition-colors cursor-pointer group`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                    {note.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {note.updated}
                  </div>
                </div>
                <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  {note.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {note.content}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No notes yet</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Start building your knowledge base by creating your first study note.
            </p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Note
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Note Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Add a new study note to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                placeholder="Enter note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select 
                value={newNote.category} 
                onValueChange={(value) => setNewNote({ ...newNote, category: value })}
              >
                <SelectTrigger className="bg-secondary border-0">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {defaultCategories.filter(c => c.id !== "all").map((cat) => (
                    <SelectItem key={cat.id} value={cat.label}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <Input
                placeholder="Enter tags separated by commas..."
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                className="bg-secondary border-0"
              />
              <p className="text-xs text-muted-foreground">Separate multiple tags with commas</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Content</label>
              <Textarea
                placeholder="Write your note content here..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
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
              onClick={handleCreateNote}
            >
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
