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
    Pill,
    Activity,
    FlaskConical
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { translations } from "@/lib/translations";

const sidebarItems: { titleKey: keyof typeof translations['en']; href: string; icon: any }[] = [
    {
        titleKey: "dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        titleKey: "report",
        href: "/dashboard/report",
        icon: FilePlus,
    },
    {
        titleKey: "pill_id",
        href: "/dashboard/identifier",
        icon: Pill,
    },
    {
        titleKey: "symptoms",
        href: "/dashboard/symptoms",
        icon: Activity,
    },
    {
        titleKey: "interactions",
        href: "/dashboard/interactions",
        icon: FlaskConical,
    },
    {
        titleKey: "leaderboard",
        href: "/dashboard/leaderboard",
        icon: Trophy,
    },
    {
        titleKey: "profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { t, language, setLanguage } = useLanguage();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    return (
        <div className="flex h-full w-64 flex-col border-r bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center border-b px-6 justify-between">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <ShieldAlert className="h-6 w-6 text-primary" />
                    <span>VigiVerse</span>
                </Link>
                <button 
                  onClick={toggleLanguage}
                  className="text-[10px] font-bold px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {language === 'en' ? 'HINDI' : 'ENGLISH'}
                </button>
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
                            {t(item.titleKey)}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto border-t p-4 flex flex-col gap-2">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-destructive hover:bg-destructive/10 hover:shadow-sm hover:translate-x-1"
                >
                    <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    {t('logout')}
                </button>
            </div>
        </div>
    );
}
