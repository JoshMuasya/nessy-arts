"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

const links = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/about", label: "About" },
    { to: "/pricing", label: "Pricing" },
    { to: "/order", label: "Order" },
]

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Link href="/" className="font-display text-2xl font-semibold tracking-wide">
                    <span className="text-gradient-gold">Nessy</span>{" "}
                    <span className="text-foreground">Art</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            href={link.to}
                            className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${pathname === link.to ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="flex flex-col gap-4 p-6">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    href={link.to}
                                    onClick={() => setOpen(false)}
                                    className={`text-lg font-display tracking-wide transition-colors ${pathname === link.to ? "text-primary" : "text-muted-foreground"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar