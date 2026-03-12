"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth";
import {
    LayoutDashboard,
    FilePlus,
    Trophy,
    User,
    ShieldAlert,
    LogOut,
    BookOpen,
} from "lucide-react";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Report ADR",
        href: "/dashboard/report",
        icon: FilePlus,
    },
    {
        title: "Drug Resources",
        href: "/dashboard/resources",
        icon: BookOpen,
    },
    {
        title: "Leaderboard",
        href: "/dashboard/leaderboard",
        icon: Trophy,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };
    return (
        <div className="flex h-full w-64 flex-col border-r bg-card">
            <div className="flex h-14 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <ShieldAlert className="h-6 w-6 text-primary" />
                    <span>VigiVerse</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                pathname === item.href && "bg-muted text-primary"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-destructive"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
}
