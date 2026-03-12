"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Award, TrendingUp, Users, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getStats, getUserProfile } from "@/lib/storage";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', reports: 4 },
    { name: 'Tue', reports: 3 },
    { name: 'Wed', reports: 7 },
    { name: 'Thu', reports: 5 },
    { name: 'Fri', reports: 9 },
    { name: 'Sat', reports: 6 },
    { name: 'Sun', reports: 8 },
];

export default function DashboardPage() {
    const [stats, setStats] = useState({ total: 0, verified: 0 });
    const [points, setPoints] = useState(0);
    const [rank, setRank] = useState(0);

    useEffect(() => {
        const reportStats = getStats();
        const profile = getUserProfile();
        setStats({ total: reportStats.total, verified: reportStats.verified });
        setPoints(profile.points);

        const mockCommunityPoints = [120, 90, 450, 30, 200];
        const allPoints = [...mockCommunityPoints, profile.points].sort((a, b) => b - a);
        setRank(allPoints.indexOf(profile.points) + 1);
    }, []);

    return (
        <div className="flex flex-col gap-8 p-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
                <div className="absolute inset-0">
                    <img
                        src="/dashboard-banner.png"
                        alt="Dashboard Banner"
                        className="h-full w-full object-cover opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-cyan-600/80 mix-blend-multiply" />
                </div>

                <div className="relative z-10 p-10 md:p-14">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Sparkles className="h-5 w-5 text-yellow-300" />
                        </div>
                        <span className="text-sm font-medium tracking-wider uppercase opacity-90">Welcome Back</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Your Health Dashboard</h1>
                    <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
                        Track your contributions, analyze drug safety data, and earn rewards for making the world safer.
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Activity className="h-5 w-5 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</div>
                        <div className="flex items-center text-xs text-green-600 mt-1 font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            +12% from last week
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Points Earned</CardTitle>
                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Award className="h-5 w-5 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">{points}</div>
                        <div className="flex items-center text-xs text-purple-600 mt-1 font-medium">
                            Top 5% contributor
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Verified Reports</CardTitle>
                        <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">{stats.verified}</div>
                        <div className="flex items-center text-xs text-green-600 mt-1 font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            98% Accuracy Rate
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-cyan-50 dark:from-slate-900 dark:to-slate-800 hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Global Rank</CardTitle>
                        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users className="h-5 w-5 text-cyan-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">#{rank}</div>
                        <div className="flex items-center text-xs text-cyan-600 mt-1 font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            Rising Star
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts & Activity */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                            Reporting Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <Area type="monotone" dataKey="reports" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-cyan-600" />
                            Top Contributors
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { rank: 1, name: "Sarah K.", points: 1250, color: "from-yellow-400 to-yellow-600" },
                                { rank: 2, name: "Mike R.", points: 1100, color: "from-gray-400 to-gray-600" },
                                { rank: 3, name: "You", points: points, color: "from-orange-400 to-orange-600" },
                                { rank: 4, name: "Emma W.", points: 850, color: "from-blue-400 to-blue-600" },
                                { rank: 5, name: "David L.", points: 720, color: "from-green-400 to-green-600" }
                            ].map((user) => (
                                <div key={user.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform`}>
                                        {user.rank}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.points} pts</p>
                                    </div>
                                    <div className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                        View
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
