"use client"

import * as React from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Ensure hydration doesn't break due to SSR
    React.useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    const handleToggle = (checked: boolean) => {
        setTheme(checked ? "dark" : "light")
    }

    return (
        <Switch checked={isDark} onCheckedChange={handleToggle} className="relative flex items-center">
            <Sun className={`h-4 w-4 mr-2 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`} />
            <Moon className={`h-4 w-4 ml-2 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`} />
        </Switch>
    )
}