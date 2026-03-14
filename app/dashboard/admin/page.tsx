"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Activity, CheckCircle, Clock, AlertTriangle, Eye, RefreshCw, Layers, TrendingUp } from "lucide-react";
import { getReports, getStats, updateReportStatus, Report } from "@/lib/storage";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminDashboardPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [stats, setStats] = useState({ total: 0, verified: 0, investigating: 0, verifiedRate: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const loadData = async () => {
        setIsRefreshing(true);
        try {
            const fetchedReports = await getReports();
            setReports(fetchedReports);
            
            const fetchedStats = await getStats();
            setStats(fetchedStats);
        } catch (error) {
            console.error("Failed to load admin data:", error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: Report['status']) => {
        try {
            await updateReportStatus(id, newStatus);
            // Optimistically update the UI
            setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
            
            // Background refresh stats
            const fetchedStats = await getStats();
            setStats(fetchedStats);
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const getStatusColor = (status: Report['status']) => {
        switch (status) {
            case 'Verified': return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-400 dark:border-green-800';
            case 'Investigating': return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-800';
            case 'Dismissed': return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900/40 dark:text-gray-400 dark:border-gray-800';
            case 'Pending': default: return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800';
        }
    };

    const getSeverityIcon = (severity: string) => {
        if (severity.toLowerCase().includes('severe')) return <AlertTriangle className="h-4 w-4 text-red-500" />;
        if (severity.toLowerCase().includes('moderate')) return <Activity className="h-4 w-4 text-yellow-500" />;
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="text-muted-foreground font-medium">Loading command center...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <ShieldAlert className="h-8 w-8 text-indigo-600" />
                        Admin Command Center
                    </h1>
                    <p className="text-muted-foreground mt-1">Review, investigate, and verify all incoming clinical reports.</p>
                </div>
                <Button 
                    variant="outline" 
                    className="gap-2" 
                    onClick={loadData}
                    disabled={isRefreshing}
                >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh Feed
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-2 border-l-4 border-l-blue-500 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                            <Layers className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-3xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-l-4 border-l-green-500 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">Verified</p>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold">{stats.verified}</div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-l-4 border-l-yellow-500 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">Investigating</p>
                            <Eye className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div className="text-3xl font-bold">{stats.investigating}</div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-l-4 border-l-gray-500 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">Pending Action</p>
                            <Clock className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="text-3xl font-bold">{stats.total - stats.verified - stats.investigating - reports.filter(r => r.status === 'Dismissed').length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Data Visualization */}
            {reports.length > 0 && (
                <Card className="border-2 shadow-sm overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-indigo-500" />
                            Report Distribution Status
                        </CardTitle>
                        <CardDescription>Visual breakdown of current pharmacovigilance caseload.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[250px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { name: 'Verified', count: stats.verified, fill: '#22c55e' },
                                        { name: 'Investigating', count: stats.investigating, fill: '#eab308' },
                                        { name: 'Pending', count: reports.filter(r => r.status === 'Pending').length, fill: '#3b82f6' },
                                        { name: 'Dismissed', count: reports.filter(r => r.status === 'Dismissed').length, fill: '#6b7280' },
                                    ]}
                                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-slate-800" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs font-medium" />
                                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} className="text-xs font-medium" />
                                    <Tooltip 
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                        {
                                            [
                                                { name: 'Verified', count: stats.verified, fill: '#22c55e' },
                                                { name: 'Investigating', count: stats.investigating, fill: '#eab308' },
                                                { name: 'Pending', count: reports.filter(r => r.status === 'Pending').length, fill: '#3b82f6' },
                                                { name: 'Dismissed', count: reports.filter(r => r.status === 'Dismissed').length, fill: '#6b7280' },
                                            ].map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Reports Feed */}
            <Card className="border-2 shadow-md">
                <CardHeader className="bg-muted/30 border-b">
                    <CardTitle>Live Report Feed</CardTitle>
                    <CardDescription>Most recent submissions automatically sorted by time.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {reports.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center">
                            <CheckCircle className="h-12 w-12 text-green-500 mb-4 opacity-50" />
                            <h3 className="text-lg font-medium">Inbox Zero</h3>
                            <p className="text-muted-foreground">No reports have been submitted to the platform yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {reports.map((report) => (
                                <div key={report.id} className="p-6 hover:bg-muted/10 transition-colors flex flex-col md:flex-row gap-6">
                                    
                                    {/* Left: Metadata */}
                                    <div className="w-full md:w-1/4 space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-lg text-primary truncate" title={report.drugName}>
                                                    {report.drugName}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Onset: {report.dateOfOnset}</p>
                                        </div>
                                        
                                        <div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(report.status)}`}>
                                                {report.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-sm font-medium border rounded-md p-2 bg-background w-fit">
                                            {getSeverityIcon(report.severity)}
                                            <span className="capitalize">{report.severity.split(' ')[0]}</span>
                                        </div>
                                    </div>

                                    {/* Middle: Clinical Details */}
                                    <div className="w-full md:w-2/4 space-y-4">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Patient Symptoms</h4>
                                            <p className="text-sm leading-relaxed">{report.symptoms}</p>
                                        </div>

                                        {report.aiFeedback && report.aiFeedback.length > 0 && (
                                            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-lg p-4 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-400 flex items-center gap-1.5">
                                                        <Activity className="h-4 w-4" />
                                                        AI Risk Assessment
                                                    </h4>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${report.aiScore > 75 ? 'bg-red-100 text-red-700' : report.aiScore > 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                        {report.aiScore} / 100 Risk
                                                    </span>
                                                </div>
                                                <ul className="text-xs space-y-1">
                                                    {report.aiFeedback.slice(0, 3).map((feedback, idx) => (
                                                        <li key={idx} className="flex items-start gap-1.5 text-indigo-900/80 dark:text-indigo-200/80">
                                                            <span className="text-indigo-500 mt-0.5">•</span>
                                                            {feedback}
                                                        </li>
                                                    ))}
                                                    {report.aiFeedback.length > 3 && (
                                                        <li className="text-indigo-500/80 italic pl-3">...plus {report.aiFeedback.length - 3} more notes</li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="w-full md:w-1/4 flex flex-col md:items-end justify-center gap-2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 pb-2 md:pl-6 border-border/50">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 self-start md:self-auto">Taking Action</h4>
                                        <Button 
                                            size="sm" 
                                            variant={report.status === 'Verified' ? 'default' : 'outline'}
                                            className="w-full justify-start md:justify-center"
                                            onClick={() => handleUpdateStatus(report.id, 'Verified')}
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" /> Mark Verified
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant={report.status === 'Investigating' ? 'secondary' : 'outline'}
                                            className="w-full justify-start md:justify-center"
                                            onClick={() => handleUpdateStatus(report.id, 'Investigating')}
                                        >
                                            <Eye className="h-4 w-4 mr-2" /> Investigate
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant={report.status === 'Dismissed' ? 'destructive' : 'outline'}
                                            className={`w-full justify-start md:justify-center ${report.status !== 'Dismissed' ? 'hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50' : ''}`}
                                            onClick={() => handleUpdateStatus(report.id, 'Dismissed')}
                                        >
                                            Dismiss Case
                                        </Button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
