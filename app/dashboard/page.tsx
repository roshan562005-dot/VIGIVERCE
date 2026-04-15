"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Award, TrendingUp, Users, Sparkles, ArrowUpRight, ArrowRight, BarChart3, Zap, Globe, Database, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { getStats, getUserProfile } from "@/lib/storage";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Link from "next/link";

const activityData = [
    { name: 'Mon', reports: 4, verified: 3 },
    { name: 'Tue', reports: 3, verified: 2 },
    { name: 'Wed', reports: 7, verified: 6 },
    { name: 'Thu', reports: 5, verified: 4 },
    { name: 'Fri', reports: 9, verified: 8 },
    { name: 'Sat', reports: 6, verified: 5 },
    { name: 'Sun', reports: 8, verified: 7 },
];

const quickLinks = [
    { href: "/dashboard/report", label: "File Report", icon: Activity, color: "from-blue-500 to-blue-700", desc: "Report an ADR" },
    { href: "/dashboard/resources", label: "Drug Database", icon: Database, color: "from-purple-500 to-purple-700", desc: "Search drugs" },
    { href: "/dashboard/vigibot", label: "VigiBot AI", icon: Zap, color: "from-cyan-500 to-cyan-700", desc: "Ask AI anything" },
    { href: "/dashboard/interactions", label: "Drug Interactions", icon: Shield, color: "from-orange-500 to-orange-700", desc: "Check interactions" },
    { href: "/dashboard/leaderboard", label: "Leaderboard", icon: TrendingUp, color: "from-green-500 to-green-700", desc: "See rankings" },
    { href: "/dashboard/symptoms", label: "Symptom Checker", icon: Globe, color: "from-pink-500 to-pink-700", desc: "Check symptoms" },
];

export default function DashboardPage() {
    const [stats, setStats] = useState({ total: 0, verified: 0 });
    const [points, setPoints] = useState(0);
    const [rank, setRank] = useState(0);
    const [displayTotal, setDisplayTotal] = useState(0);
    const [displayPoints, setDisplayPoints] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            const reportStats = await getStats();
            const profile = await getUserProfile();
            setStats({ total: reportStats.total, verified: reportStats.verified });
            setPoints(profile.points);

            const mockCommunityPoints = [120, 90, 450, 30, 200];
            const allPoints = [...mockCommunityPoints, profile.points].sort((a, b) => b - a);
            setRank(allPoints.indexOf(profile.points) + 1);

            // Animate counters
            const animateCounter = (target: number, setter: (v: number) => void) => {
                let current = 0;
                const step = Math.ceil(target / 30);
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    setter(current);
                    if (current >= target) clearInterval(timer);
                }, 40);
            };
            animateCounter(reportStats.total, setDisplayTotal);
            animateCounter(profile.points, setDisplayPoints);
        };
        loadData();
    }, []);

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
            {/* Welcome Banner — 3D image */}
            <div className="relative overflow-hidden rounded-3xl text-white shadow-2xl min-h-[200px]">
                <div className="absolute inset-0">
                    <img
                        src="/dashboard-banner-3d.png"
                        alt="VigiVerse Dashboard"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>

                <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-1.5 bg-white/15 rounded-lg backdrop-blur-sm border border-white/20">
                                <Sparkles className="h-4 w-4 text-yellow-300" />
                            </div>
                            <span className="text-sm font-semibold tracking-wider uppercase text-blue-200">Welcome Back</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Your Health Dashboard</h1>
                        <p className="text-blue-100/80 text-lg max-w-xl leading-relaxed">
                            Track contributions, analyze drug safety, and earn rewards for making the world safer.
                        </p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <Link href="/dashboard/report" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-all shadow-lg text-sm">
                            <Activity className="h-4 w-4" /> File Report
                        </Link>
                        <Link href="/dashboard/vigibot" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-white/20 transition-all text-sm">
                            <Zap className="h-4 w-4 text-yellow-300" /> Ask VigiBot
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        label: "Total Reports", value: displayTotal, sub: "+12% from last week",
                        icon: Activity, gradient: "from-blue-500/10 to-blue-600/5", iconColor: "text-blue-600", subColor: "text-green-600", border: "hover:border-blue-400"
                    },
                    {
                        label: "Points Earned", value: displayPoints, sub: "Top 5% contributor",
                        icon: Award, gradient: "from-purple-500/10 to-purple-600/5", iconColor: "text-purple-600", subColor: "text-purple-600", border: "hover:border-purple-400"
                    },
                    {
                        label: "Verified Reports", value: stats.verified, sub: "98% Accuracy Rate",
                        icon: TrendingUp, gradient: "from-green-500/10 to-green-600/5", iconColor: "text-green-600", subColor: "text-green-600", border: "hover:border-green-400"
                    },
                    {
                        label: "Global Rank", value: `#${rank}`, sub: "Rising Star",
                        icon: Users, gradient: "from-cyan-500/10 to-cyan-600/5", iconColor: "text-cyan-600", subColor: "text-cyan-600", border: "hover:border-cyan-400"
                    },
                ].map((card, i) => (
                    <Card key={i} className={`relative overflow-hidden border-2 border-transparent ${card.border} shadow-md bg-gradient-to-br ${card.gradient} hover:shadow-xl transition-all duration-300 group`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                            <div className={`h-10 w-10 rounded-xl bg-background/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{card.value}</div>
                            <div className={`flex items-center text-xs ${card.subColor} mt-1.5 font-medium`}>
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                {card.sub}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" /> Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {quickLinks.map((link, i) => (
                        <Link key={i} href={link.href} className="group">
                            <div className="relative overflow-hidden rounded-2xl p-4 bg-card border border-border hover:border-transparent hover:shadow-xl transition-all duration-300 text-center">
                                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                                <div className="relative z-10">
                                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-md`}>
                                        <link.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <p className="text-xs font-bold text-foreground group-hover:text-white transition-colors">{link.label}</p>
                                    <p className="text-xs text-muted-foreground group-hover:text-white/70 transition-colors">{link.desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Charts & Activity */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border border-border shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            Reporting Activity
                            <span className="ml-auto text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">This Week</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <Area type="monotone" dataKey="reports" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReports)" name="Reports" />
                                    <Area type="monotone" dataKey="verified" stroke="#7c3aed" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVerified)" name="Verified" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 border border-border shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-cyan-600" />
                            Top Contributors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { rank: 1, name: "Sarah K.", points: 1250, color: "from-yellow-400 to-yellow-600", badge: "🥇" },
                                { rank: 2, name: "Mike R.", points: 1100, color: "from-gray-400 to-gray-600", badge: "🥈" },
                                { rank: 3, name: "You", points: points, color: "from-blue-500 to-blue-700", badge: "⭐" },
                                { rank: 4, name: "Emma W.", points: 850, color: "from-orange-400 to-orange-600", badge: "" },
                                { rank: 5, name: "David L.", points: 720, color: "from-green-400 to-green-600", badge: "" },
                            ].map((user) => (
                                <div key={user.rank} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                                    <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`}>
                                        {user.badge || user.rank}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold truncate">{user.name}</p>
                                        <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                                            <div
                                                className={`h-1.5 rounded-full bg-gradient-to-r ${user.color}`}
                                                style={{ width: `${(user.points / 1250) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-muted-foreground flex-shrink-0">
                                        {user.points}<span className="text-[10px] ml-0.5">pts</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
