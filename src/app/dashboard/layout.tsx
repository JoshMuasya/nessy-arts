
import DashboardClient from "@/components/dashboard/DashboardClient"
import { AuthProvider } from "@/lib/context/AuthProvider"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full bg-background font-sans antialiased">
            <AuthProvider>
                <DashboardClient>{children}</DashboardClient>
            </AuthProvider>
        </div>
    )
}