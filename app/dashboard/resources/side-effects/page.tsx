"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Search, Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SideEffectResult {
    id: string;
    name: string;
    sideEffects: string;
    warnings: string;
}

export default function SideEffectsPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SideEffectResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError("");
        setHasSearched(true);
        setResults([]);

        try {
            const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}+OR+openfda.generic_name:${query}&limit=5`);

            if (!response.ok) {
                if (response.status === 404) {
                    setResults([]);
                    return;
                }
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();

            const mappedResults: SideEffectResult[] = data.results.map((item: any, index: number) => {
                const name = item.openfda?.brand_name?.[0] || item.openfda?.generic_name?.[0] || "Unknown Drug";
                const sideEffects = item.adverse_reactions?.[0] || "No detailed side effects information available.";
                const warnings = item.boxed_warning?.[0] || item.warnings?.[0] || "No specific warnings available.";

                return {
                    id: item.id || `drug-${index}`,
                    name: name,
                    sideEffects: sideEffects,
                    warnings: warnings
                };
            });

            setResults(mappedResults);

        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto p-6 animate-in fade-in duration-700">
            <div className="flex flex-col gap-4">
                <Link href="/dashboard/resources" className="flex items-center text-sm text-muted-foreground hover:text-blue-600 transition-colors w-fit">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Resources
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                        <ShieldAlert className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Side Effects & Safety</h1>
                        <p className="text-muted-foreground">
                            Search for a drug to view detailed side effects and safety warnings.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <CardContent className="p-6">
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <Input
                            placeholder="Enter drug name (e.g., Lisinopril)..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="text-lg h-12 border-2 focus:border-orange-500 rounded-xl"
                        />
                        <Button type="submit" size="lg" className="h-12 px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-xl" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {hasSearched && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {error && (
                        <Card className="bg-red-50 border-red-200 text-red-600">
                            <CardContent className="p-6 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                {error}
                            </CardContent>
                        </Card>
                    )}

                    {!isLoading && results.length === 0 && !error ? (
                        <div className="text-center p-12 text-muted-foreground bg-muted/30 rounded-2xl border-2 border-dashed border-muted">
                            <p>No drugs found matching "{query}".</p>
                        </div>
                    ) : (
                        results.map((drug) => (
                            <Card key={drug.id} className="overflow-hidden border-none shadow-md">
                                <CardHeader className="bg-muted/30 border-b">
                                    <CardTitle className="text-xl text-blue-700 dark:text-blue-300">{drug.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    {drug.warnings !== "No specific warnings available." && (
                                        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl">
                                            <h3 className="font-semibold text-red-800 dark:text-red-200 flex items-center gap-2 mb-2">
                                                <AlertTriangle className="h-5 w-5" />
                                                Boxed Warnings / Important Safety Info
                                            </h3>
                                            <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                                                {drug.warnings}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                            <ShieldAlert className="h-5 w-5 text-orange-500" />
                                            Adverse Reactions
                                        </h3>
                                        <div className="prose dark:prose-invert max-w-none text-sm text-muted-foreground bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <p className="whitespace-pre-wrap leading-relaxed">{drug.sideEffects}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
