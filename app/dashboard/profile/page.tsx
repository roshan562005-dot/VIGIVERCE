"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    User, Award, TrendingUp, CheckCircle, Trophy,
    Star, Zap, Target, Calendar, Mail, Shield,
    Sparkles, Crown, Medal
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUserProfile, getReports } from "@/lib/storage";

export default function ProfilePage() {
    const [profile, setProfile] = useState({ points: 0, badges: [] as string[] });
    const [reports, setReports] = useState<any[]>([]);

    useEffect(() => {
        const userProfile = getUserProfile();
        const userReports = getReports();
        setProfile(userProfile);
        setReports(userReports);
    }, []);

    const achievements = [
        { id: 1, name: "First Report", description: "Submit your first ADR report", icon: Star, color: "from-blue-500 to-cyan-500", earned: reports.length > 0 },
        { id: 2, name: "Safety Champion", description: "Earn 100 points", icon: Shield, color: "from-purple-500 to-pink-500", earned: profile.points >= 100 },
        { id: 3, name: "Top Contributor", description: "Submit 5 verified reports", icon: Trophy, color: "from-yellow-500 to-orange-500", earned: reports.filter(r => r.aiScore > 70).length >= 5 },
        { id: 4, name: "Quick Learner", description: "Complete 3 educational modules", icon: Zap, color: "from-green-500 to-emerald-500", earned: false },
        { id: 5, name: "Team Player", description: "Help 10 community members", icon: Target, color: "from-red-500 to-rose-500", earned: false },
        { id: 6, name: "Vigilant Guardian", description: "Maintain 30-day streak", icon: Medal, color: "from-indigo-500 to-violet-500", earned: false },
    ];

    const stats = [
        { label: "Total Reports", value: reports.length, icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
        { label: "Points Earned", value: profile.points, icon: Award, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
        { label: "Verified Reports", value: reports.filter(r => r.aiScore > 70).length, icon: TrendingUp, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
        { label: "Rank", value: "#5", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Hero Header with Profile */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-10 text-white">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-sm p-1 shadow-2xl">
                            <div className="h-full w-full rounded-full border-4 border-white/30 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                <span className="text-4xl font-bold text-white">
                                    {profile.points > 0 ? "U" : "?"}
                                </span>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-white shadow-lg">
                            <Crown className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                            <Sparkles className="h-6 w-6" />
                            <span className="text-lg font-semibold">Active Contributor</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">Your Profile</h1>
                        <p className="text-pink-100 text-lg mb-4">
                            Making healthcare safer, one report at a time
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                                <Mail className="h-3 w-3 mr-1" />
                                user@vigiverse.com
                            </Badge>
                            <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                Joined Nov 2025
                            </Badge>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-3">
                        <Button className="bg-white text-purple-600 hover:bg-white/90 shadow-lg">
                            <User className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                        <Button className="bg-white/20 text-white hover:bg-white/30 border border-white/40 shadow-lg backdrop-blur-sm">
                            View Public Profile
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="border-2">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold mb-1">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Achievements */}
            <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-yellow-600" />
                        Achievements & Badges
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className={`relative rounded-2xl p-6 border-2 transition-all ${achievement.earned
                                    ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
                                    : "border-muted bg-muted/30 opacity-60"
                                    }`}
                            >
                                {achievement.earned && (
                                    <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                        <CheckCircle className="h-5 w-5 text-white" />
                                    </div>
                                )}
                                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 shadow-lg`}>
                                    <achievement.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {reports.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No Activity Yet</h3>
                            <p className="text-muted-foreground mb-4">Start contributing to see your activity here!</p>
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                Submit Your First Report
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reports.slice(0, 5).map((report, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">Report: {report.drugName}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            AI Score: {report.aiScore}% • {report.severity} severity
                                        </p>
                                    </div>
                                    <Badge className={`${report.aiScore > 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30" :
                                        report.aiScore > 60 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30" :
                                            "bg-red-100 text-red-700 dark:bg-red-900/30"
                                        }`}>
                                        {report.aiScore > 80 ? "Verified" : report.aiScore > 60 ? "Under Review" : "Needs Info"}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
