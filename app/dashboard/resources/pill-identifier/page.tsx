"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2, AlertTriangle, HelpCircle } from "lucide-react";

interface PillResult {
    id: string;
    name: string;
    description: string;
    imprint: string;
    color: string;
    shape: string;
}

export default function PillIdentifierPage() {
    const [imprint, setImprint] = useState("");
    const [color, setColor] = useState("");
    const [shape, setShape] = useState("");
    const [results, setResults] = useState<PillResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imprint && !color && !shape) return;

        setIsLoading(true);
        setError("");
        setHasSearched(true);
        setResults([]);

        try {
            // Construct query for OpenFDA
            // Note: OpenFDA doesn't have a dedicated "pill image" API, but we can search the SPL data
            // We'll search the 'description' or 'how_supplied' section for these keywords

            let queryParts = [];
            if (imprint) queryParts.push(imprint);
            if (color) queryParts.push(color);
            if (shape) queryParts.push(shape);

            const queryString = queryParts.join("+AND+");

            // Limit search to 'human_prescription_drug' to avoid noise
            const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.product_type:"HUMAN+PRESCRIPTION+DRUG"+AND+(description:${queryString}+OR+how_supplied:${queryString})&limit=12`);

            if (!response.ok) {
                if (response.status === 404) {
                    setResults([]);
                    return;
                }
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();

            const mappedResults: PillResult[] = data.results.map((item: any, index: number) => {
                const name = item.openfda?.brand_name?.[0] || item.openfda?.generic_name?.[0] || "Unknown Drug";

                // Try to extract description snippet
                const fullDesc = item.description?.[0] || item.how_supplied?.[0] || "";
                const snippet = fullDesc.length > 200 ? fullDesc.substring(0, 200) + "..." : fullDesc;

                return {
                    id: item.id || `pill-${index}`,
                    name: name,
                    description: snippet,
                    imprint: imprint || "Unknown", // Can't easily extract exact match from text blob
                    color: color || "Unknown",
                    shape: shape || "Unknown"
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
                    <Search className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight">Pill Identifier</h1>
                </div>
                <p className="text-muted-foreground">
                    Identify pills by imprint, color, or shape.
                </p>
            </div>

            <Card className="bg-gradient-to-br from-background to-muted/50">
                <CardHeader>
                    <CardTitle>Search Criteria</CardTitle>
                    <CardDescription>Enter as much information as you can see on the pill.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="grid gap-6 md:grid-cols-4 items-end">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Imprint Code</label>
                            <Input
                                placeholder="e.g., 'A 12', 'M 365'"
                                value={imprint}
                                onChange={(e) => setImprint(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Color</label>
                            <Select value={color} onValueChange={setColor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="white">White</SelectItem>
                                    <SelectItem value="blue">Blue</SelectItem>
                                    <SelectItem value="red">Red</SelectItem>
                                    <SelectItem value="yellow">Yellow</SelectItem>
                                    <SelectItem value="green">Green</SelectItem>
                                    <SelectItem value="orange">Orange</SelectItem>
                                    <SelectItem value="pink">Pink</SelectItem>
                                    <SelectItem value="purple">Purple</SelectItem>
                                    <SelectItem value="brown">Brown</SelectItem>
                                    <SelectItem value="black">Black</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Shape</label>
                            <Select value={shape} onValueChange={setShape}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select shape" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="round">Round</SelectItem>
                                    <SelectItem value="oval">Oval</SelectItem>
                                    <SelectItem value="capsule">Capsule</SelectItem>
                                    <SelectItem value="square">Square</SelectItem>
                                    <SelectItem value="triangle">Triangle</SelectItem>
                                    <SelectItem value="diamond">Diamond</SelectItem>
                                    <SelectItem value="pentagon">Pentagon</SelectItem>
                                    <SelectItem value="hexagon">Hexagon</SelectItem>
                                    <SelectItem value="octagon">Octagon</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="md:col-span-4 w-full md:w-auto md:ml-auto" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Identify Pill
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Results */}
            {hasSearched && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-semibold">
                        {isLoading ? "Searching Database..." : `Found ${results.length} Potential Match${results.length !== 1 ? 'es' : ''}`}
                    </h2>

                    {error && (
                        <Card className="bg-red-50 dark:bg-red-900/10 border-red-200">
                            <CardContent className="flex items-center justify-center p-6 text-red-600">
                                <AlertTriangle className="mr-2 h-5 w-5" />
                                {error}
                            </CardContent>
                        </Card>
                    )}

                    {!isLoading && results.length === 0 && !error ? (
                        <Card className="bg-muted/50 border-dashed">
                            <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                                <HelpCircle className="h-12 w-12 mb-4 opacity-20" />
                                <p>No pills found matching your criteria.</p>
                                <p className="text-sm">Try reducing the number of filters (e.g., search by imprint only).</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {results.map((pill) => (
                                <Card key={pill.id} className="group hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <CardTitle>{pill.name}</CardTitle>
                                        <CardDescription className="line-clamp-3 text-xs mt-2">
                                            {pill.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-2 text-sm">
                                            {color && <span className="px-2 py-1 bg-muted rounded capitalize">{color}</span>}
                                            {shape && <span className="px-2 py-1 bg-muted rounded capitalize">{shape}</span>}
                                            {imprint && <span className="px-2 py-1 bg-muted rounded uppercase">{imprint}</span>}
                                        </div>
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
