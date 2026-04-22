"use client"

import { Menu, User } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type UserType = {
    name: string
    email: string
}

const Topbar = ({
    onMenuClick,
    user,
}: {
    onMenuClick?: () => void
    user: UserType
}) => {
    return (
        <header className="h-16 border-b border-sidebar-border bg-background/50 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">

            {/* Mobile menu */}
            <div className="flex md:hidden">
                <button
                    onClick={onMenuClick}
                    className="p-2 text-foreground hover:bg-sidebar-accent transition-colors rounded-lg"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* User section */}
            <div className="flex items-center gap-3 ml-auto">

                {/* Name */}
                <span className="hidden sm:block text-sm font-medium text-sidebar-foreground">
                    {user.name}
                </span>

                {/* Avatar + Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-10 w-10 rounded-full border border-sidebar-border p-0 hover:bg-sidebar-accent"
                        >
                            <User size={20} className="text-sidebar-primary" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-64 bg-sidebar border-sidebar-border text-sidebar-foreground"
                    >
                        {/* Email display */}
                        <DropdownMenuLabel className="font-display text-xs break-all">
                            {user.email}
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="bg-sidebar-border" />

                        {/* Logout only */}
                        <DropdownMenuItem className="hover:bg-card hover:text-primary cursor-pointer text-destructive">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default Topbar