"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Search, Loader2, ArrowRight } from "lucide-react";

interface DrugResult {
    id: string;
    name: string;
    uses: string;
}

export default function ConditionsPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<DrugResult[]>([]);
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
            // Search for drugs that treat a specific condition (indication)
            const response = await fetch(`https://api.fda.gov/drug/label.json?search=indications_and_usage:${query}&limit=12`);

            if (!response.ok) {
                if (response.status === 404) {
                    setResults([]);
                    return;
                }
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();

            const mappedResults: DrugResult[] = data.results.map((item: any, index: number) => {
                const name = item.openfda?.brand_name?.[0] || item.openfda?.generic_name?.[0] || "Unknown Drug";
                const uses = item.indications_and_usage?.[0] || "";

                // Snippet of the usage text
                const snippet = uses.length > 150 ? uses.substring(0, 150) + "..." : uses;

                return {
                    id: item.id || `drug-${index}`,
                    name: name,
                    uses: snippet
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
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                    <Activity className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight">Drugs by Condition</h1>
                </div>
                <p className="text-muted-foreground">
                    Find medications used to treat specific medical conditions.
                </p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            placeholder="Enter condition (e.g., Hypertension, Asthma)..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="text-lg h-12"
                        />
                        <Button type="submit" size="lg" className="h-12 px-8" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Find Drugs
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {hasSearched && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        {isLoading ? "Searching..." : `Found ${results.length} Treatment${results.length !== 1 ? 's' : ''}`}
                    </h2>

                    {!isLoading && results.length === 0 && !error ? (
                        <div className="text-center p-12 text-muted-foreground">
                            <p>No treatments found for "{query}". Try a more general term.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {results.map((drug) => (
                                <Card key={drug.id} className="group hover:border-primary/50 transition-colors flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <span className="truncate" title={drug.name}>{drug.name}</span>
                                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-sm text-muted-foreground line-clamp-4">
                                            {drug.uses}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
