'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme as useNextTheme,
} from 'next-themes'

export type AppTheme = "black" | "white" | "sky" | "wood"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      themes={["black", "white", "sky", "wood"]}
      defaultTheme="black"
      attribute="data-theme"
      storageKey="devprep-theme"
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export function useAppTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return {
    theme: (mounted ? theme : "black") as AppTheme,
    setTheme: (t: AppTheme) => setTheme(t),
    resolvedTheme: (mounted ? resolvedTheme : "black") as AppTheme | undefined,
    mounted,
  }
}
