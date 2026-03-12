"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Loader2, ArrowRightLeft, X } from "lucide-react";

interface DrugData {
    name: string;
    description: string;
    uses: string;
    sideEffects: string;
    warnings: string;
}

export default function CompareDrugsPage() {
    const [drug1, setDrug1] = useState<DrugData | null>(null);
    const [drug2, setDrug2] = useState<DrugData | null>(null);
    const [query1, setQuery1] = useState("");
    const [query2, setQuery2] = useState("");
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const fetchDrug = async (query: string, setDrug: (d: DrugData | null) => void, setLoading: (l: boolean) => void) => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}+OR+openfda.generic_name:${query}&limit=1`);
            if (!response.ok) throw new Error("Not found");
            const data = await response.json();
            const item = data.results[0];

            setDrug({
                name: item.openfda?.brand_name?.[0] || item.openfda?.generic_name?.[0] || "Unknown",
                description: item.description?.[0]?.substring(0, 300) + "..." || "N/A",
                uses: item.indications_and_usage?.[0]?.substring(0, 300) + "..." || "N/A",
                sideEffects: item.adverse_reactions?.[0]?.substring(0, 300) + "..." || "N/A",
                warnings: item.boxed_warning?.[0] || item.warnings?.[0] || "No specific warnings."
            });
        } catch (e) {
            console.error(e);
            // In a real app, handle error UI
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                    <BookOpen className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight">Compare Drugs</h1>
                </div>
                <p className="text-muted-foreground">
                    Compare two medications side-by-side to understand their differences.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Drug 1 Column */}
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter first drug..."
                            value={query1}
                            onChange={e => setQuery1(e.target.value)}
                        />
                        <Button onClick={() => fetchDrug(query1, setDrug1, setLoading1)} disabled={loading1}>
                            {loading1 ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </Button>
                    </div>

                    {drug1 ? (
                        <Card className="h-full border-primary/20">
                            <CardHeader className="bg-primary/5">
                                <div className="flex justify-between items-start">
                                    <CardTitle>{drug1.name}</CardTitle>
                                    <Button variant="ghost" size="sm" onClick={() => setDrug1(null)}><X className="h-4 w-4" /></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 p-6">
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-1">Indications</h4>
                                    <p className="text-sm">{drug1.uses}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-1">Side Effects</h4>
                                    <p className="text-sm">{drug1.sideEffects}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-1">Warnings</h4>
                                    <p className="text-sm text-red-600 dark:text-red-400">{drug1.warnings}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-64 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
                            Select first drug
                        </div>
                    )}
                </div>

                {/* Drug 2 Column */}
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter second drug..."
                            value={query2}
                            onChange={e => setQuery2(e.target.value)}
                        />
                        <Button onClick={() => fetchDrug(query2, setDrug2, setLoading2)} disabled={loading2}>
                            {loading2 ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </Button>
                    </div>

                    {drug2 ? (
                        <Card className="h-full border-primary/20">
                            <CardHeader className="bg-primary/5">
                                <div className="flex justify-between items-start">
                                    <CardTitle>{drug2.name}</CardTitle>
                                    <Button variant="ghost" size="sm" onClick={() => setDrug2(null)}><X className="h-4 w-4" /></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 p-6">
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-1">Indications</h4>
                                    <p className="text-sm">{drug2.uses}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-1">Side Effects</h4>
                                    <p className="text-sm">{drug2.sideEffects}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-1">Warnings</h4>
                                    <p className="text-sm text-red-600 dark:text-red-400">{drug2.warnings}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-64 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
                            Select second drug
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
