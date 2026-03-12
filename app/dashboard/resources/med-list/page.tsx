"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, FileText, Clock, Pill } from "lucide-react";

interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    notes: string;
}

export default function MedListPage() {
    const [meds, setMeds] = useState<Medication[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [notes, setNotes] = useState("");

    // Load from local storage on mount
    useEffect(() => {
        const savedMeds = localStorage.getItem("my-med-list");
        if (savedMeds) {
            setMeds(JSON.parse(savedMeds));
        }
    }, []);

    // Save to local storage whenever meds change
    useEffect(() => {
        localStorage.setItem("my-med-list", JSON.stringify(meds));
    }, [meds]);

    const handleAddMed = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        const newMed: Medication = {
            id: Date.now().toString(),
            name,
            dosage,
            frequency,
            notes
        };

        setMeds([...meds, newMed]);
        setIsAdding(false);
        resetForm();
    };

    const handleDelete = (id: string) => {
        setMeds(meds.filter(m => m.id !== id));
    };

    const resetForm = () => {
        setName("");
        setDosage("");
        setFrequency("");
        setNotes("");
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                    <FileText className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight">My Med List</h1>
                </div>
                <p className="text-muted-foreground">
                    Keep track of your current medications, dosages, and schedules.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr,2fr]">
                {/* Add New Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>{isAdding ? "Add Medication" : "Actions"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isAdding ? (
                            <form onSubmit={handleAddMed} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Drug Name</Label>
                                    <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Lisinopril" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dosage">Dosage</Label>
                                    <Input id="dosage" value={dosage} onChange={e => setDosage(e.target.value)} placeholder="e.g. 10mg" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="frequency">Frequency</Label>
                                    <Input id="frequency" value={frequency} onChange={e => setFrequency(e.target.value)} placeholder="e.g. Once daily" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Input id="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Take with food" />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button type="submit" className="flex-1">Save</Button>
                                    <Button type="button" variant="outline" onClick={() => { setIsAdding(false); resetForm(); }}>Cancel</Button>
                                </div>
                            </form>
                        ) : (
                            <Button onClick={() => setIsAdding(true)} className="w-full">
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Medication
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* List Section */}
                <div className="space-y-4">
                    {meds.length === 0 ? (
                        <Card className="bg-muted/50 border-dashed">
                            <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                                <Pill className="h-12 w-12 mb-4 opacity-20" />
                                <p>Your medication list is empty.</p>
                                <p className="text-sm">Click "Add New Medication" to get started.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        meds.map((med) => (
                            <Card key={med.id}>
                                <CardHeader className="flex flex-row items-start justify-between pb-2">
                                    <div>
                                        <CardTitle className="text-xl">{med.name}</CardTitle>
                                        <CardDescription>{med.dosage}</CardDescription>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(med.id)} className="text-muted-foreground hover:text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 sm:grid-cols-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>{med.frequency || "No frequency specified"}</span>
                                        </div>
                                        {med.notes && (
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                <span>{med.notes}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
