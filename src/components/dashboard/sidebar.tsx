"use client"

import { LogOut, Image, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/firebase"
import { logoutUser } from "@/lib/actions/auth"

const navItems = [
    { label: "Gallery", href: "/dashboard/gallery", icon: Image },
    { label: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare },
]

const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
    const pathname = usePathname()
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        router.push("/login");
    };

    return (
        <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="p-6">
                <Link href="/" className="font-display text-2xl font-semibold tracking-wide">
                    <span className="text-gradient-gold">Nessy</span>{" "}
                    <span className="text-foreground">Art</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
                                ? "bg-sidebar-accent text-sidebar-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
                                }`}
                        >
                            <item.icon
                                size={20}
                                className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-primary"
                                    }`}
                            />
                            <span className="font-medium tracking-wide">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-sidebar-border">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-300 group"
                >
                    <LogOut
                        size={20}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    <span className="font-medium tracking-wide">Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
