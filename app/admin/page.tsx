"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, TrendingUp, Activity, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getReports, getStats, updateReportStatus, Report } from "@/lib/storage";

export default function AdminPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [stats, setStats] = useState({ total: 0, verified: 0, investigating: 0, verifiedRate: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = async () => {
        setIsLoading(true);
        try {
            const fetchedReports = await getReports();
            const fetchedStats = await getStats();
            setReports(fetchedReports);
            setStats(fetchedStats);
        } catch (error) {
            console.error("Failed to refresh admin data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
        // Poll for updates every 30 seconds
        const interval = setInterval(refreshData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusUpdate = async (id: string, status: Report['status']) => {
        await updateReportStatus(id, status);
        await refreshData();
    };

    const formatTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Activity className="h-6 w-6 text-blue-600" />
                    <span>VigiVerse Regulatory Portal</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Logged in as: Dr. Admin (FDA/CDSCO)</span>
                    <Button size="sm" variant="outline">Logout</Button>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold md:text-2xl">Pharmacovigilance Overview</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button>Download Weekly Report</Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">Critical Alerts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                                {reports.filter(r => r.severity === 'severe' && r.status === 'Pending').length}
                            </div>
                            <p className="text-xs text-red-600/80 dark:text-red-400/80">Pending severe reports</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">AI Auto-Verified</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.verifiedRate}%</div>
                            <p className="text-xs text-muted-foreground">{stats.verified} reports verified</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Under Investigation</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.investigating}</div>
                            <p className="text-xs text-muted-foreground">Active cases</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Reports Stream</CardTitle>
                            <CardDescription>Real-time feed from VigiVerse App Users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {reports.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        No reports received yet.
                                    </div>
                                ) : (
                                    reports.map((report) => (
                                        <div key={report.id} className={`flex items-start gap-4 p-4 border rounded-lg ${report.status === 'Pending' ? 'bg-white dark:bg-zinc-900' : 'bg-muted/50 opacity-75'}`}>
                                            <div className={`h-2 w-2 mt-2 rounded-full ${report.severity === 'severe' ? 'bg-red-500' :
                                                report.severity === 'moderate' ? 'bg-orange-500' : 'bg-yellow-500'
                                                }`} />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium">{report.drugName} <span className="text-muted-foreground font-normal">- {report.severity} reaction</span></p>
                                                    <span className="text-xs text-muted-foreground">{formatTimeAgo(report.timestamp)}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                    {report.symptoms}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                                                        AI Score: {report.aiScore}
                                                    </span>
                                                    {report.batchNumber && <span>Batch: {report.batchNumber}</span>}
                                                    <span className={`ml-auto font-medium ${report.status === 'Verified' ? 'text-green-600' :
                                                        report.status === 'Investigating' ? 'text-blue-600' :
                                                            report.status === 'Dismissed' ? 'text-gray-500' : 'text-orange-600'
                                                        }`}>
                                                        {report.status}
                                                    </span>
                                                </div>

                                                {report.status === 'Pending' && (
                                                    <div className="flex gap-2 mt-3">
                                                        <Button size="sm" variant="default" onClick={() => handleStatusUpdate(report.id, 'Verified')} className="bg-green-600 hover:bg-green-700">
                                                            Verify
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(report.id, 'Investigating')}>
                                                            Investigate
                                                        </Button>
                                                        <Button size="sm" variant="ghost" onClick={() => handleStatusUpdate(report.id, 'Dismissed')}>
                                                            Dismiss
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Signal Detection</CardTitle>
                            <CardDescription>AI-Driven Insights</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 text-sm">Potential Recall Candidate</h4>
                                    <p className="text-xs mt-1 text-blue-600 dark:text-blue-300">
                                        Drug Z (Batch 404) shows 400% spike in nausea reports compared to historical baseline.
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                                    <h4 className="font-semibold text-green-700 dark:text-green-400 text-sm">System Health</h4>
                                    <p className="text-xs mt-1 text-green-600 dark:text-green-300">
                                        AI Verification Model accuracy is stable at 94.2%.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
