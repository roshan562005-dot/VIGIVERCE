"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Activity, ShieldAlert, BarChart3, Users, 
    ArrowUpRight, ArrowDownRight, ActivitySquare,
    Search, Download, Bell, Settings, Filter
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockSignalData = [
  { month: 'Jan', reports: 120, severity: 40 },
  { month: 'Feb', reports: 150, severity: 45 },
  { month: 'Mar', reports: 180, severity: 55 },
  { month: 'Apr', reports: 220, severity: 70 },
  { month: 'May', reports: 270, severity: 85 },
  { month: 'Jun', reports: 310, severity: 110 },
];

const mockDemographicData = [
  { age: '18-24', male: 45, female: 65 },
  { age: '25-34', male: 80, female: 110 },
  { age: '35-44', male: 120, female: 160 },
  { age: '45-54', male: 95, female: 130 },
  { age: '55-64', male: 60, female: 85 },
  { age: '65+', male: 140, female: 190 },
];

const recentAlerts = [
    { id: 1, drug: "Amlodipine", action: "Review Needed", type: "Novel Symptom: Tinnitus", severity: "high", time: "2 hours ago" },
    { id: 2, drug: "Metformin", action: "Monitoring", type: "Spike in GI distress reports (Northeast Region)", severity: "medium", time: "5 hours ago" },
    { id: 3, drug: "Lisinopril", action: "Resolved", type: "Dry cough correlation confirmed", severity: "low", time: "1 day ago" },
];

export default function EnterpriseDashboard() {
    const [searchQuery, setSearchQuery] = useState("Amlodipine");

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Enterprise Header */}
            <header className="px-6 h-16 flex items-center justify-between border-b bg-white dark:bg-slate-900 sticky top-0 z-50 shadow-sm text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-6">
                    <Link className="flex items-center justify-center gap-2" href="/enterprise">
                        <ActivitySquare className="h-6 w-6 text-blue-600" />
                        <span className="font-bold text-xl tracking-tight">VigiVerse <span className="text-slate-500 font-medium text-sm ml-1">Enterprise Analytics</span></span>
                    </Link>
                    <div className="hidden md:flex items-center relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            className="w-[300px] pl-9 bg-slate-100 dark:bg-slate-800 border-none h-9 focus-visible:ring-1 focus-visible:ring-blue-500" 
                            placeholder="Search drug portfolio..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="hidden sm:flex border-slate-200 dark:border-slate-800">
                        <Download className="h-4 w-4 mr-2" /> Export PDF
                    </Button>
                    <div className="flex gap-2 border-l border-slate-200 dark:border-slate-800 pl-4 ml-2">
                        <Button variant="ghost" size="icon" className="text-slate-500 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-slate-900"></span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500">
                            <Settings className="h-5 w-5" />
                        </Button>
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-white dark:border-slate-800 ml-2 overflow-hidden shadow-sm flex items-center justify-center">
                            <span className="text-xs font-bold text-white">PH</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full space-y-6">
                
                {/* Global Metrics Row */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Overview</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Real-time surveillance data for actively tracked medications.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 backdrop-blur-sm">
                            Last Refreshed: Just now
                        </Badge>
                        <Button variant="secondary" size="sm" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <Filter className="h-4 w-4 mr-2 text-slate-500" /> Filter View
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-none shadow-sm dark:bg-slate-900 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Patient Reports</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">12,492</p>
                                </div>
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="flex items-center font-medium text-emerald-600">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    14.2%
                                </span>
                                <span className="text-slate-500 ml-2">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm dark:bg-slate-900 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">AI Verified Signals</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">348</p>
                                </div>
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <ShieldAlert className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="flex items-center font-medium text-emerald-600">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    8.1%
                                </span>
                                <span className="text-slate-500 ml-2">noise reduction</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm dark:bg-slate-900 hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Severe Reactions</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">18</p>
                                </div>
                                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                    <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="flex items-center font-medium text-red-600">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    2.4%
                                </span>
                                <span className="text-slate-500 ml-2">requires immediate review</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm dark:bg-slate-900 hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Compliance Rate</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">99.8%</p>
                                </div>
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                    <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="flex items-center font-medium text-emerald-600">
                                    FDA / EMA / MHRA
                                </span>
                                <span className="text-slate-500 ml-2">reporting SLA met</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <Card className="border-none shadow-sm dark:bg-slate-900 lg:col-span-2">
                        <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Signal Detection Trend</CardTitle>
                                    <CardDescription>Volume of AI-verified reports vs. Severe Flags over 6 months</CardDescription>
                                </div>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                                    Gemini Engine Active
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockSignalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorSeverity" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <Area type="monotone" dataKey="reports" name="Total Reports" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                                    <Area type="monotone" dataKey="severity" name="Severe Flags" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorSeverity)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Alerts Panel */}
                    <Card className="border-none shadow-sm dark:bg-slate-900 flex flex-col">
                        <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
                            <CardTitle className="text-lg flex items-center justify-between">
                                Action Required 
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center justify-center">3</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 overflow-auto">
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {recentAlerts.map(alert => (
                                    <div key={alert.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className={`
                                                ${alert.severity === 'high' ? 'border-red-500/50 text-red-600 bg-red-50 dark:bg-red-500/10' : ''}
                                                ${alert.severity === 'medium' ? 'border-orange-500/50 text-orange-600 bg-orange-50 dark:bg-orange-500/10' : ''}
                                                ${alert.severity === 'low' ? 'border-blue-500/50 text-blue-600 bg-blue-50 dark:bg-blue-500/10' : ''}
                                            `}>
                                                {alert.action}
                                            </Badge>
                                            <span className="text-xs text-slate-500">{alert.time}</span>
                                        </div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{alert.drug}</h4>
                                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{alert.type}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40">
                                View All Alerts <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Secondary Data Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
                     <Card className="border-none shadow-sm dark:bg-slate-900">
                        <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
                            <CardTitle className="text-lg">Demographic Distribution (Adverse Events)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockDemographicData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                    <Tooltip 
                                        cursor={{fill: 'rgba(148, 163, 184, 0.1)'}}
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                                    />
                                    <Bar dataKey="female" name="Female" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="male" name="Male" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm dark:bg-slate-900 bg-gradient-to-br from-slate-900 to-blue-950 text-white overflow-hidden relative">
                        {/* Decorative AI background */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                        
                        <CardHeader className="relative z-10 pb-0">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-blue-500/20 rounded-md backdrop-blur-sm">
                                    <ActivitySquare className="h-5 w-5 text-blue-400" />
                                </div>
                                <span className="text-sm font-medium tracking-wide text-blue-200">AI INSIGHTS</span>
                            </div>
                            <CardTitle className="text-2xl text-white">Gemini Narrative Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10 p-6 space-y-6">
                            <p className="text-blue-100/80 leading-relaxed">
                                Our AI has analyzed 1,429 recent unstructured patient narratives for <strong className="text-white">Amlodipine</strong>. 
                                It successfully structured 98.4% of reports into precise MedDRA codes, saving an estimated 140 hours of manual data entry this week.
                            </p>
                            
                            <div className="space-y-4">
                                <h4 className="font-semibold text-slate-300 text-sm uppercase tracking-wider">Top Structured Signals Generated:</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                        <span className="font-medium text-slate-200">Peripheral Edema</span>
                                        <Badge className="bg-blue-500 hover:bg-blue-600">842 Reports</Badge>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-lg" />
                                        <span className="font-medium text-slate-200 ml-2">Hypotension (Emerging)</span>
                                        <Badge variant="destructive">112 Reports <ArrowUpRight className="h-3 w-3 ml-1 inline" /></Badge>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold mt-4">
                                Run Deep Analysis
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
