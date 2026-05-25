"use client"

import { useAppTheme, type AppTheme } from "./theme-provider"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Palette, Check } from "lucide-react"

const themes: { id: AppTheme; label: string; preview: { bg: string; accent: string } }[] = [
  { 
    id: "black", 
    label: "Black", 
    preview: { bg: "#141418", accent: "#6366f1" }
  },
  { 
    id: "white", 
    label: "White", 
    preview: { bg: "#fafafa", accent: "#4f46e5" }
  },
  { 
    id: "sky", 
    label: "Sky Blue", 
    preview: { bg: "#0f172a", accent: "#38bdf8" }
  },
  { 
    id: "wood", 
    label: "Wood Tone", 
    preview: { bg: "#1c1917", accent: "#d97706" }
  },
]

export function ThemeSelector() {
  const { theme, setTheme, mounted } = useAppTheme()

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 text-muted-foreground"
      >
        <Palette className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Palette className="h-4 w-4" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                <div
                  className="h-5 w-5 rounded-l-md border border-border"
                  style={{ backgroundColor: t.preview.bg }}
                />
                <div
                  className="h-5 w-5 rounded-r-md border border-border"
                  style={{ backgroundColor: t.preview.accent }}
                />
              </div>
              <span className="text-sm">{t.label}</span>
            </div>
            {theme === t.id && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
