"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            console.log("DashboardLayout: Checking auth...");
            try {
                const authenticated = await isAuthenticated();
                console.log("DashboardLayout: Is authenticated?", authenticated);
                if (!authenticated) {
                    console.log("DashboardLayout: Not authenticated, redirecting to /login");
                    router.replace("/login");
                } else {
                    console.log("DashboardLayout: Authenticated, allowing access");
                    setIsChecking(false);
                }
            } catch (error) {
                console.error("DashboardLayout: Auth check CRASHED:", error);
                router.replace("/login");
            }
        };
        checkAuth();
    }, [router]);

    if (isChecking) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <Sidebar />
            </div>
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
