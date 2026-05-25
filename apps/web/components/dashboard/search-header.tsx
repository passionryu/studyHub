"use client"

import { Search, Command } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Kbd } from "@/components/ui/kbd"
import { ThemeSelector } from "@/components/theme-selector"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"

interface SearchHeaderProps {
  onNavigate?: (section: string) => void
  userName?: string
  userPlan?: string
}

export function SearchHeader({ onNavigate, userName, userPlan }: SearchHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search notes, questions, topics..."
          className="h-9 bg-secondary border-0 pl-9 pr-12 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
          <Kbd><Command className="h-3 w-3" /></Kbd>
          <Kbd>K</Kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <ThemeSelector />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 h-auto py-1.5 px-2 hover:bg-secondary">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{userName || "User"}</p>
                <p className="text-xs text-muted-foreground">{userPlan || "Free Plan"}</p>
              </div>
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src="" alt={userName || "User"} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {userName ? userName.split(" ").map(n => n[0]).join("").toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-secondary"
              onClick={() => onNavigate?.("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
