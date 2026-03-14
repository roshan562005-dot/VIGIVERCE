"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award, TrendingUp, Sparkles, Crown, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/storage";

export default function LeaderboardPage() {
    const [userPoints, setUserPoints] = useState(0);
    const [userRank, setUserRank] = useState(0);
    const [topPlayers, setTopPlayers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch the actual current user's profile
                const profile = await getUserProfile();
                setUserPoints(profile.points);
                
                // Fetch the dynamic leaderboard from Supabase
                const { getLeaderboard } = await import("@/lib/storage");
                const leaderboardData = await getLeaderboard(20);
                setTopPlayers(leaderboardData);

                // Find the current user's rank in this list
                // If they have 0 points, they might be at the very bottom or not listed
                const myRankIndex = leaderboardData.findIndex(p => p.name === profile.name && p.points === profile.points);
                if (myRankIndex !== -1) {
                    setUserRank(leaderboardData[myRankIndex].rank);
                } else {
                    // Estimate rank if not in top 20
                    setUserRank(leaderboardData.length > 0 ? leaderboardData.length + 1 : 1);
                }
            } catch (error) {
                console.error("Failed to load leaderboard data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const getRankColor = (rank: number) => {
        if (rank === 1) return "from-yellow-400 to-yellow-600";
        if (rank === 2) return "from-gray-300 to-gray-500";
        if (rank === 3) return "from-orange-400 to-orange-600";
        return "from-blue-400 to-blue-600";
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
        if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
        if (rank === 3) return <Trophy className="h-6 w-6 text-orange-500" />;
        return <Star className="h-5 w-5 text-blue-500" />;
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Hero Header - Simplified */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-10 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Trophy className="h-8 w-8" />
                        <span className="text-lg font-semibold">Community Rankings</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Leaderboard</h1>
                    <p className="text-orange-100 text-lg max-w-2xl">
                        Top contributors making healthcare safer worldwide. Earn points by submitting quality reports!
                    </p>
                </div>
            </div>

            {/* Stats Overview - Simplified */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Your Rank</p>
                                <p className="text-4xl font-bold text-purple-600">
                                    {isLoading ? "..." : (userRank > 0 ? `#${userRank}` : "Unranked")}
                                </p>
                            </div>
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <TrendingUp className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Your Points</p>
                                <p className="text-4xl font-bold text-blue-600">
                                    {isLoading ? "..." : userPoints}
                                </p>
                            </div>
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <Award className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Current Badge</p>
                                <p className="text-xl font-bold text-green-600">
                                    {isLoading ? "..." : (
                                        userPoints >= 2000 ? "💎 Platinum" :
                                        userPoints >= 1500 ? "🥇 Gold" :
                                        userPoints >= 1000 ? "🥈 Silver" :
                                        userPoints >= 500 ? "⭐ Rising Star" : 
                                        "✨ Beginner"
                                    )}
                                </p>
                            </div>
                            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top 3 Podium - Simplified */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* 2nd Place */}
                <div className="md:order-1">
                    {topPlayers.length > 1 ? (
                        <Card className="border-2 border-gray-400">
                            <CardContent className="p-6 text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="relative">
                                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                                            {topPlayers[1].avatar}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center border-4 border-white shadow-lg">
                                            <span className="text-white font-bold">2</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1">{topPlayers[1].name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{topPlayers[1].badge}</p>
                                <div className="space-y-2">
                                    <p className="text-3xl font-bold text-gray-600">{topPlayers[1].points}</p>
                                    <p className="text-xs text-muted-foreground">{topPlayers[1].reports} Reports</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-muted rounded-xl bg-slate-50 dark:bg-slate-900/50">
                            <p className="text-muted-foreground text-sm text-center">Rank #2 slot open! Start reporting to claim it.</p>
                        </div>
                    )}
                </div>

                {/* 1st Place - Center */}
                <div className="md:order-2">
                    {topPlayers.length > 0 ? (
                        <Card className="border-4 border-yellow-400 md:-mt-6">
                            <CardContent className="p-8 text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="relative">
                                        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                            {topPlayers[0].avatar}
                                        </div>
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <Crown className="h-12 w-12 text-yellow-500" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-4 border-white shadow-lg">
                                            <span className="text-white font-bold text-lg">1</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{topPlayers[0].name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{topPlayers[0].badge}</p>
                                <div className="space-y-2">
                                    <p className="text-4xl font-bold text-yellow-600">{topPlayers[0].points}</p>
                                    <p className="text-sm text-muted-foreground">{topPlayers[0].reports} Reports</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-4 border-yellow-400/50 md:-mt-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center min-h-[300px]">
                            <Crown className="h-16 w-16 text-yellow-500/50 mb-4" />
                            <p className="text-muted-foreground font-medium text-center px-6">The throne is empty. Be the first to start reporting!</p>
                        </Card>
                    )}
                </div>

                {/* 3rd Place */}
                <div className="md:order-3">
                    {topPlayers.length > 2 ? (
                        <Card className="border-2 border-orange-400">
                            <CardContent className="p-6 text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="relative">
                                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                                            {topPlayers[2].avatar}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-white shadow-lg">
                                            <span className="text-white font-bold">3</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1">{topPlayers[2].name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{topPlayers[2].badge}</p>
                                <div className="space-y-2">
                                    <p className="text-3xl font-bold text-orange-600">{topPlayers[2].points}</p>
                                    <p className="text-xs text-muted-foreground">{topPlayers[2].reports} Reports</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-muted rounded-xl bg-slate-50 dark:bg-slate-900/50">
                            <p className="text-muted-foreground text-sm text-center">Rank #3 slot open! Keep climbing the charts.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Full Leaderboard - Simplified */}
            <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-blue-600" />
                        Top Contributors
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {isLoading ? (
                            <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center space-y-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p>Loading live rankings...</p>
                            </div>
                        ) : topPlayers.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">
                                <p>No reporters yet. Be the first to earn points!</p>
                            </div>
                        ) : (
                            topPlayers.map((player, idx) => (
                                <div
                                    key={player.id || idx}
                                    className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${userRank === player.rank ? "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500" : ""
                                        }`}
                                >
                                    <div className="flex-shrink-0">
                                        <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${getRankColor(player.rank)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                            {player.rank <= 3 ? getRankIcon(player.rank) : player.rank}
                                        </div>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center text-white font-bold shadow">
                                        {player.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-lg truncate">{player.name}</h4>
                                        <p className="text-sm text-muted-foreground">{player.badge}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-600">{player.points}</p>
                                        <p className="text-xs text-muted-foreground">{player.reports} reports</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
