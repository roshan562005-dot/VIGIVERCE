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
    Pill,
    Activity,
    Shield
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
        title: "Pill Identifier",
        href: "/dashboard/identifier",
        icon: Pill,
    },
    {
        title: "Symptom Checker",
        href: "/dashboard/symptoms",
        icon: Activity,
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
    {
        title: "Admin Review",
        href: "/dashboard/admin",
        icon: Shield,
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
        <div className="flex h-full w-64 flex-col border-r bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <ShieldAlert className="h-6 w-6 text-primary" />
                    <span>VigiVerse</span>
                </Link>
            </div>
            <div className="flex-1 py-4 flex flex-col items-center">
                <nav className="grid w-full items-start px-4 text-sm font-medium gap-1">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10 hover:shadow-sm hover:translate-x-1",
                                pathname === item.href && "bg-primary/15 text-primary shadow-sm font-semibold"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4 transition-transform duration-300", pathname === item.href && "scale-110")} />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-destructive hover:bg-destructive/10 hover:shadow-sm hover:translate-x-1"
                >
                    <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    Logout
                </button>
            </div>
        </div>
    );
}
