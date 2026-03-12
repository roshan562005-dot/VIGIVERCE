"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Baby, Search, Loader2, AlertCircle } from "lucide-react";

interface PregnancyInfo {
    name: string;
    pregnancy: string;
    nursing: string;
}

export default function PregnancyPage() {
    const [query, setQuery] = useState("");
    const [info, setInfo] = useState<PregnancyInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError("");
        setInfo(null);

        try {
            const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}+OR+openfda.generic_name:${query}&limit=1`);

            if (!response.ok) throw new Error("Not found");

            const data = await response.json();
            const item = data.results[0];

            setInfo({
                name: item.openfda?.brand_name?.[0] || item.openfda?.generic_name?.[0] || "Unknown Drug",
                pregnancy: item.pregnancy?.[0] || item.pregnancy_or_breast_feeding?.[0] || "No specific pregnancy section found in label.",
                nursing: item.nursing_mothers?.[0] || "No specific nursing section found in label."
            });

        } catch (err) {
            setError("Drug not found or no data available.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-pink-600">
                    <Baby className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Pregnancy & Breastfeeding</h1>
                </div>
                <p className="text-muted-foreground">
                    Safety information for expectant and nursing mothers.
                </p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            placeholder="Enter drug name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="text-lg h-12"
                        />
                        <Button type="submit" size="lg" className="h-12 px-8" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    {error}
                </div>
            )}

            {info && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-2xl font-bold">{info.name}</h2>

                    <Card>
                        <CardHeader className="bg-pink-50 dark:bg-pink-900/10">
                            <CardTitle className="text-pink-700 dark:text-pink-300 flex items-center gap-2">
                                <Baby className="h-5 w-5" />
                                Pregnancy Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 prose dark:prose-invert max-w-none">
                            <p className="whitespace-pre-wrap text-sm">{info.pregnancy}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="bg-purple-50 dark:bg-purple-900/10">
                            <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                                <Baby className="h-5 w-5" />
                                Nursing / Breastfeeding
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 prose dark:prose-invert max-w-none">
                            <p className="whitespace-pre-wrap text-sm">{info.nursing}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
