"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pill, Plus, X, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

// Demo interactions map for common drugs
const demoInteractions: Record<string, string[]> = {
    "aspirin": ["warfarin", "ibuprofen", "heparin"],
    "warfarin": ["aspirin", "ibuprofen", "acetaminophen", "antibiotics"],
    "ibuprofen": ["aspirin", "warfarin", "lisinopril"],
    "lisinopril": ["ibuprofen", "potassium", "lithium"],
    "sildenafil": ["nitrates", "nitroglycerin"],
    "nitroglycerin": ["sildenafil", "tadalafil"],
};

export default function InteractionCheckerPage() {
    const [drugInput, setDrugInput] = useState("");
    const [drugList, setDrugList] = useState<string[]>([]);
    const [interactions, setInteractions] = useState<string[]>([]);
    const [isChecking, setIsChecking] = useState(false);

    const addDrug = (e: React.FormEvent) => {
        e.preventDefault();
        if (!drugInput.trim()) return;

        const drugName = drugInput.trim().toLowerCase();
        if (!drugList.includes(drugName)) {
            setDrugList([...drugList, drugName]);
        }
        setDrugInput("");
        setInteractions([]); // Reset results when list changes
    };

    const removeDrug = (drugToRemove: string) => {
        setDrugList(drugList.filter(d => d !== drugToRemove));
        setInteractions([]);
    };

    const checkInteractions = async () => {
        setIsChecking(true);
        setInteractions([]);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const foundInteractions: string[] = [];

        // Check against demo map
        for (let i = 0; i < drugList.length; i++) {
            for (let j = i + 1; j < drugList.length; j++) {
                const drug1 = drugList[i];
                const drug2 = drugList[j];

                if (demoInteractions[drug1]?.includes(drug2) || demoInteractions[drug2]?.includes(drug1)) {
                    foundInteractions.push(`Potential interaction found between ${drug1.toUpperCase()} and ${drug2.toUpperCase()}`);
                }
            }
        }

        // If no local interactions found, we could try to query OpenFDA for "drug interactions" section
        // But for this demo, we'll stick to the local map + a generic warning if list is long
        if (foundInteractions.length === 0 && drugList.length > 1) {
            // Optional: Add a note that this is a demo
        }

        setInteractions(foundInteractions);
        setIsChecking(false);
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                    <Pill className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight">Interaction Checker</h1>
                </div>
                <p className="text-muted-foreground">
                    Enter two or more drugs to check for potential interactions.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr,1.5fr]">
                {/* Input Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>My Drug List</CardTitle>
                        <CardDescription>Add medications to check.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={addDrug} className="flex gap-2">
                            <Input
                                placeholder="Enter drug name..."
                                value={drugInput}
                                onChange={(e) => setDrugInput(e.target.value)}
                            />
                            <Button type="submit" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </form>

                        <div className="space-y-2">
                            {drugList.length === 0 && (
                                <p className="text-sm text-muted-foreground italic">No drugs added yet.</p>
                            )}
                            {drugList.map((drug) => (
                                <div key={drug} className="flex items-center justify-between p-2 bg-muted rounded-md capitalize">
                                    <span>{drug}</span>
                                    <Button variant="ghost" size="sm" onClick={() => removeDrug(drug)} className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button
                            className="w-full"
                            disabled={drugList.length < 2 || isChecking}
                            onClick={checkInteractions}
                        >
                            {isChecking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Pill className="mr-2 h-4 w-4" />}
                            Check Interactions
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <Card className="h-full min-h-[300px]">
                    <CardHeader>
                        <CardTitle>Interaction Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isChecking ? (
                            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                                <p>Analyzing potential interactions...</p>
                            </div>
                        ) : interactions.length > 0 ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 rounded-lg text-red-800 dark:text-red-200 flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold">Interactions Found!</h3>
                                        <p className="text-sm mt-1">Please consult your healthcare provider about these potential interactions.</p>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {interactions.map((interaction, idx) => (
                                        <li key={idx} className="flex items-start gap-2 p-3 bg-card border rounded-md shadow-sm">
                                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-1" />
                                            <span>{interaction}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : drugList.length >= 2 && !isChecking ? (
                            <div className="flex flex-col items-center justify-center h-40 text-green-600">
                                <CheckCircle className="h-12 w-12 mb-2" />
                                <p className="font-medium">No major interactions found in our demo database.</p>
                                <p className="text-xs text-muted-foreground mt-2 text-center max-w-xs">
                                    Note: This is a demonstration tool. Always consult a pharmacist or doctor.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground opacity-50">
                                <Pill className="h-12 w-12 mb-2" />
                                <p>Add at least 2 drugs to check.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
