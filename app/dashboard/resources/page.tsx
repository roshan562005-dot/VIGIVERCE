"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Pill, Search, AlertTriangle, FileText, Activity, Stethoscope, Baby, DollarSign,
    HelpCircle, BookOpen, ShieldAlert, Database, Bot, ArrowRight, Sparkles, Loader2
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchDrugs, DrugInfo } from "@/lib/drug-database";

const quickResources = [
    { title: "My Med List", icon: FileText, description: "Track your current medications", color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-900/20", href: "/dashboard/resources/med-list" },
    { title: "Drugs A-Z", icon: Database, description: "Comprehensive drug database", color: "text-cyan-600", bgColor: "bg-cyan-100 dark:bg-cyan-900/20", href: "/dashboard/resources/drugs-a-z" },
    { title: "Drugs by Condition", icon: Activity, description: "Find treatments for conditions", color: "text-indigo-600", bgColor: "bg-indigo-100 dark:bg-indigo-900/20", href: "/dashboard/resources/conditions" },
    { title: "Discount Card", icon: DollarSign, description: "Save on prescriptions", color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/20", href: "/dashboard/resources/discounts" },
    { title: "FDA Alerts", icon: AlertTriangle, description: "Latest safety warnings", color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/20", href: "/dashboard/resources/alerts" },
    { title: "Pill Identifier", icon: Search, description: "Identify pills by shape/color", color: "text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-900/20", href: "/dashboard/resources/pill-identifier" },
    { title: "Side Effects", icon: ShieldAlert, description: "Detailed side effect profiles", color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-900/20", href: "/dashboard/resources/side-effects" },
    { title: "Interactions Checker", icon: Pill, description: "Check drug-drug interactions", color: "text-teal-600", bgColor: "bg-teal-100 dark:bg-teal-900/20", href: "/dashboard/resources/interactions" },
    { title: "Compare Drugs", icon: BookOpen, description: "Compare effectiveness & cost", color: "text-sky-600", bgColor: "bg-sky-100 dark:bg-sky-900/20", href: "/dashboard/resources/compare" },
    { title: "Pregnancy & Breastfeeding", icon: Baby, description: "Safety info for mothers", color: "text-pink-600", bgColor: "bg-pink-100 dark:bg-pink-900/20", href: "/dashboard/resources/pregnancy" },
    { title: "Symptom Checker", icon: Stethoscope, description: "Check your symptoms", color: "text-rose-600", bgColor: "bg-rose-100 dark:bg-rose-900/20", href: "/dashboard/resources/symptoms" },
    { title: "Questions & Answers", icon: HelpCircle, description: "Community Q&A", color: "text-slate-600", bgColor: "bg-slate-100 dark:bg-slate-900/20", href: "/dashboard/resources/qa" }
];

export default function ResourcesPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<DrugInfo[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const executeSearch = async (searchTerm: string) => {
        if (!searchTerm.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        try {
            const drugs = await searchDrugs(searchTerm);
            setResults(drugs);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        executeSearch(query);
    };

    const getSourceBadge = (source: string) => {
        const badges = {
            openfda: { label: "US FDA", class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
            rxnorm: { label: "RxNorm", class: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
            local: { label: "International", class: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" }
        };
        const badge = badges[source as keyof typeof badges] || badges.local;
        return <span className={`text-xs px-2 py-0.5 rounded-full ${badge.class}`}>{badge.label}</span>;
    };

    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto p-6 animate-in fade-in duration-700">
            {/* Hero Header with 3D image */}
            <div className="relative overflow-hidden rounded-3xl text-white shadow-2xl min-h-[220px]">
                <div className="absolute inset-0">
                    <img
                        src="/resources-header-3d.png"
                        alt="Drug Database"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-cyan-950/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>

                <div className="relative z-10 p-10 md:p-14">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-white/15 rounded-lg backdrop-blur-sm border border-white/20">
                            <Database className="h-5 w-5 text-cyan-300" />
                        </div>
                        <span className="text-sm font-semibold tracking-widest uppercase text-cyan-200">Global Drug Database</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Drug Resources Hub</h1>
                    <p className="text-blue-100/80 text-lg max-w-3xl leading-relaxed">
                        Access <span className="font-bold text-cyan-300">1,000+ local medications</span> + OpenFDA + RxNorm.
                        Brand names from 50+ countries, powered by AI intelligence.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {["US/FDA", "RxNorm/NIH", "WHO Essential", "Indian Brands", "EU Brands"].map((src) => (
                            <span key={src} className="text-xs font-semibold bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-white">{src}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Search Card */}
            <Card className="border-none shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Bot className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">AI-Powered Drug Search</CardTitle>
                            <CardDescription className="text-base">Search across multiple global databases instantly</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Try: Paracetamol, Metformin, Aspirin..."
                                className="pl-12 h-14 text-lg border-2 focus:border-blue-500 bg-white dark:bg-slate-950 rounded-xl"
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="h-14 px-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg group rounded-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Search
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Quick Examples */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground self-center mr-2">Popular Searches:</span>
                        {["Paracetamol", "Ibuprofen", "Metformin", "Amoxicillin", "Atorvastatin", "Omeprazole", "Dolo", "Crocin", "Ozempic", "Lexapro"].map((drug) => (
                            <button
                                key={drug}
                                onClick={() => { 
                                    setQuery(drug); 
                                    executeSearch(drug);
                                }}
                                className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium border border-transparent hover:border-blue-200"
                            >
                                {drug}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {hasSearched && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            {isLoading ? "Searching Global Sources..." : `Found ${results.length} Result${results.length !== 1 ? 's' : ''}`}
                        </h2>
                        <Button variant="ghost" onClick={() => { setQuery(""); setHasSearched(false); setResults([]); }} size="sm" className="text-muted-foreground hover:text-foreground">Clear Results</Button>
                    </div>

                    {results.length === 0 && !isLoading ? (
                        <Card className="bg-muted/30 border-2 border-dashed border-muted">
                            <CardContent className="flex flex-col items-center justify-center p-16 text-center">
                                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <HelpCircle className="h-10 w-10 text-muted-foreground opacity-50" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                                <p className="text-muted-foreground mb-1">No drugs found matching "{query}"</p>
                                <p className="text-sm text-muted-foreground">Try a different name or check spelling</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {results.map((drug) => (
                                <Card key={drug.id} className="group hover:border-blue-500 hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden bg-card/50 backdrop-blur-sm">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CardHeader className="relative z-10 pb-3">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors truncate" title={drug.name}>
                                                    {drug.name}
                                                </CardTitle>
                                                {drug.genericName && (
                                                    <p className="text-sm text-muted-foreground mt-1 truncate">
                                                        {drug.genericName}
                                                    </p>
                                                )}
                                            </div>
                                            {getSourceBadge(drug.source)}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-sm relative z-10">
                                        <p className="text-muted-foreground line-clamp-2 h-10">
                                            {drug.description}
                                        </p>

                                        <div className="space-y-2">
                                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                                                <div className="flex items-start gap-2">
                                                    <Pill className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <span className="font-semibold text-blue-900 dark:text-blue-100 block mb-0.5">Uses</span>
                                                        <span className="text-blue-700 dark:text-blue-300 line-clamp-1">{drug.uses}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {drug.sideEffects && (
                                                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50">
                                                    <div className="flex items-start gap-2">
                                                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <span className="font-semibold text-red-900 dark:text-red-100 block mb-0.5">Side Effects</span>
                                                            <span className="text-red-700 dark:text-red-300 line-clamp-1">{drug.sideEffects}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {!hasSearched && (
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <h2 className="text-2xl font-bold">Quick Access Tools</h2>
                            <p className="text-muted-foreground">Everything you need for drug safety and information</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {quickResources.map((resource, index) => (
                            <Link key={index} href={resource.href || "#"} className="block h-full group">
                                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-none shadow-md h-full bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${resource.bgColor.split(' ')[0].replace('bg-', 'bg-')}`} />
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4 h-full relative z-10">
                                        <div className={`p-4 rounded-2xl ${resource.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                            <resource.icon className={`h-8 w-8 ${resource.color}`} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-base group-hover:text-blue-600 transition-colors">{resource.title}</h3>
                                            <p className="text-xs text-muted-foreground hidden md:block line-clamp-2">{resource.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
