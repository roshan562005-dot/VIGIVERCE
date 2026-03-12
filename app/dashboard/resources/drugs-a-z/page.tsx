"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Database, AlertTriangle } from "lucide-react";
import Link from "next/link";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface DrugResult {
    id: string;
    name: string;
    genericName: string;
    description: string;
    uses: string;
    sideEffects: string;
}

export default function DrugsAZPage() {
    const [selectedLetter, setSelectedLetter] = useState("A");
    const [drugs, setDrugs] = useState<DrugResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDrugs(selectedLetter);
    }, [selectedLetter]);

    const fetchDrugs = async (letter: string) => {
        setIsLoading(true);
        setError("");
        setDrugs([]);

        try {
            // Query OpenFDA for drugs starting with the selected letter (Brand OR Generic)
            const response = await fetch(`https://api.fda.gov/drug/label.json?search=(openfda.brand_name:${letter}*+OR+openfda.generic_name:${letter}*)&limit=24`);

            if (!response.ok) {
                if (response.status === 404) {
                    setDrugs([]);
                    return;
                }
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();

            const mappedResults: DrugResult[] = data.results.map((item: any, index: number) => {
                const brandName = item.openfda?.brand_name?.[0] || "Generic/Unknown";
                const genericName = item.openfda?.generic_name?.[0] || "";
                // Use brand name as primary, but if it's missing (rare for this query), use generic
                const displayName = brandName !== "Generic/Unknown" ? brandName : genericName;

                const description = item.description?.[0] || "No description available.";
                const uses = item.indications_and_usage?.[0] || "Usage information not available.";
                const sideEffects = item.adverse_reactions?.[0] || "Side effect information not available.";

                // Helper to truncate text
                const truncate = (text: string, length: number) =>
                    text.length > length ? text.substring(0, length) + "..." : text;

                return {
                    id: item.id || `drug-${index}`,
                    name: displayName,
                    genericName: genericName,
                    description: truncate(description, 100),
                    uses: truncate(uses, 150),
                    sideEffects: truncate(sideEffects, 150)
                };
            });

            // Filter to ensure they actually start with the letter (API wildcard can be fuzzy)
            // We check if EITHER brand OR generic starts with the letter
            const filtered = mappedResults.filter(d =>
                d.name.toUpperCase().startsWith(letter) ||
                d.genericName.toUpperCase().startsWith(letter)
            );
            setDrugs(filtered);

        } catch (err) {
            console.error(err);
            setError("Failed to load drugs. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                    <Database className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight">Drugs A-Z</h1>
                </div>
                <p className="text-muted-foreground">
                    Browse thousands of medications by their brand or generic name.
                </p>
            </div>

            {/* Alphabet Navigation */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {alphabet.map((letter) => (
                            <Button
                                key={letter}
                                variant={selectedLetter === letter ? "default" : "outline"}
                                onClick={() => setSelectedLetter(letter)}
                                className="w-10 h-10 p-0 font-bold"
                            >
                                {letter}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Results Grid */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    {isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Loading drugs starting with "{selectedLetter}"...
                        </>
                    ) : (
                        <>Drugs starting with "{selectedLetter}" ({drugs.length})</>
                    )}
                </h2>

                {error && (
                    <Card className="bg-red-50 dark:bg-red-900/10 border-red-200">
                        <CardContent className="flex items-center justify-center p-6 text-red-600">
                            <AlertTriangle className="mr-2 h-5 w-5" />
                            {error}
                        </CardContent>
                    </Card>
                )}

                {!isLoading && drugs.length === 0 && !error ? (
                    <Card className="bg-muted/50 border-dashed">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                            <p>No common drugs found starting with "{selectedLetter}".</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {drugs.map((drug) => (
                            <Card key={drug.id} className="group hover:border-primary/50 transition-colors flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex flex-col gap-1 leading-tight">
                                        <div className="flex items-center justify-between">
                                            <span className="truncate mr-2" title={drug.name}>{drug.name}</span>
                                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary flex-shrink-0" />
                                        </div>
                                        {drug.genericName && (
                                            <span className="text-xs font-normal text-muted-foreground truncate">
                                                ({drug.genericName})
                                            </span>
                                        )}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">{drug.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm flex-1">
                                    <div>
                                        <span className="font-semibold text-foreground block mb-1">Indications:</span>
                                        <span className="text-muted-foreground line-clamp-3">{drug.uses}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
