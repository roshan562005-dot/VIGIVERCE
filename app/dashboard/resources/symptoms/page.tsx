"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stethoscope, Search, ArrowRight } from "lucide-react";

export default function SymptomCheckerPage() {
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query) setShowResults(true);
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-600">
                    <Stethoscope className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Symptom Checker</h1>
                </div>
                <p className="text-muted-foreground">
                    Enter your symptoms to find potential causes and treatments.
                </p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            placeholder="e.g. Headache, Fever, Cough..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="text-lg h-12"
                        />
                        <Button type="submit" size="lg" className="h-12 px-8">
                            <Search className="mr-2 h-4 w-4" />
                            Check
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {showResults ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-2">Potential Causes for "{query}"</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Based on common medical data. This is for informational purposes only.
                            </p>
                            <div className="space-y-2">
                                {["Common Cold", "Flu (Influenza)", "Allergies", "Sinus Infection"].map((cause, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                                        <span>{cause}</span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-center text-xs text-muted-foreground mt-8">
                        Disclaimer: This tool does not provide medical advice. Always consult a healthcare professional.
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {["Headache", "Stomach Pain", "Back Pain", "Cough", "Fatigue", "Sore Throat"].map((symptom) => (
                        <Button key={symptom} variant="outline" className="h-24 flex flex-col gap-2" onClick={() => { setQuery(symptom); setShowResults(true); }}>
                            <Stethoscope className="h-6 w-6 text-rose-500" />
                            {symptom}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}
