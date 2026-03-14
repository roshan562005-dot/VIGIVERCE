"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Zap, Plus, X, AlertTriangle, CheckCircle, AlertCircle, ShieldAlert,
    FlaskConical, Loader2, Sparkles, ArrowRight
} from "lucide-react";
import { checkDrugInteraction } from "@/lib/gemini";

interface Drug {
    id: string;
    name: string;
}

interface InteractionResult {
    drug1: string;
    drug2: string;
    severity: 'None' | 'Mild' | 'Moderate' | 'Severe';
    description: string;
    recommendation: string;
}

const SEVERITY_CONFIG = {
    None: {
        color: "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700",
        badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        icon: CheckCircle,
        iconColor: "text-green-500",
        label: "No Interaction",
    },
    Mild: {
        color: "bg-yellow-50 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-700",
        badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
        icon: AlertCircle,
        iconColor: "text-yellow-500",
        label: "Mild Interaction",
    },
    Moderate: {
        color: "bg-orange-50 border-orange-300 dark:bg-orange-900/20 dark:border-orange-700",
        badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
        icon: AlertTriangle,
        iconColor: "text-orange-500",
        label: "Moderate Interaction",
    },
    Severe: {
        color: "bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700",
        badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
        icon: ShieldAlert,
        iconColor: "text-red-500",
        label: "⚠️ Severe Interaction",
    },
};

const PRESET_COMBOS = [
    { label: "Warfarin + Aspirin", drugs: ["Warfarin", "Aspirin"] },
    { label: "Sertraline + Tramadol", drugs: ["Sertraline", "Tramadol"] },
    { label: "Metformin + Alcohol", drugs: ["Metformin", "Alcohol"] },
    { label: "Lisinopril + Potassium", drugs: ["Lisinopril", "Potassium Supplement"] },
];

export default function InteractionsPage() {
    const [drugs, setDrugs] = useState<Drug[]>([
        { id: '1', name: '' },
        { id: '2', name: '' },
    ]);
    const [newDrugInput, setNewDrugInput] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [results, setResults] = useState<InteractionResult[]>([]);
    const [checked, setChecked] = useState(false);

    const addDrug = (name?: string) => {
        const drugName = name || newDrugInput.trim();
        if (!drugName) return;
        setDrugs(prev => [...prev, { id: Date.now().toString(), name: drugName }]);
        setNewDrugInput('');
        setChecked(false);
        setResults([]);
    };

    const removeDrug = (id: string) => {
        if (drugs.length <= 2) return;
        setDrugs(prev => prev.filter(d => d.id !== id));
        setChecked(false);
        setResults([]);
    };

    const updateDrug = (id: string, value: string) => {
        setDrugs(prev => prev.map(d => d.id === id ? { ...d, name: value } : d));
        setChecked(false);
        setResults([]);
    };

    const loadPreset = (combo: { label: string; drugs: string[] }) => {
        setDrugs(combo.drugs.map((name, i) => ({ id: String(i + 1), name })));
        setResults([]);
        setChecked(false);
    };

    const checkAllInteractions = async () => {
        const validDrugs = drugs.filter(d => d.name.trim());
        if (validDrugs.length < 2) return;

        setIsChecking(true);
        setResults([]);
        setChecked(false);

        const pairs: [string, string][] = [];
        for (let i = 0; i < validDrugs.length; i++) {
            for (let j = i + 1; j < validDrugs.length; j++) {
                pairs.push([validDrugs[i].name, validDrugs[j].name]);
            }
        }

        const pairResults: InteractionResult[] = [];
        for (const [d1, d2] of pairs) {
            const result = await checkDrugInteraction(d1, d2);
            pairResults.push({ drug1: d1, drug2: d2, ...result });
        }

        setResults(pairResults);
        setChecked(true);
        setIsChecking(false);
    };

    const validDrugs = drugs.filter(d => d.name.trim());
    const hasSevere = results.some(r => r.severity === 'Severe');
    const hasModerate = results.some(r => r.severity === 'Moderate');
    const totalPairs = validDrugs.length > 1 ? (validDrugs.length * (validDrugs.length - 1)) / 2 : 0;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-8 text-white shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm p-3 shadow-2xl border-2 border-white/30 flex-shrink-0">
                        <div className="h-full w-full bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                            <FlaskConical className="h-10 w-10 text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="h-5 w-5 text-yellow-300" />
                            <span className="text-sm font-bold text-yellow-300 tracking-wider uppercase">Powered by Gemini AI</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-2">Drug Interaction Checker</h1>
                        <p className="text-orange-100 text-lg">
                            Instantly identify dangerous drug combinations across your full medication list.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Left Panel: Input */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Combos */}
                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                Try Common Combinations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {PRESET_COMBOS.map((combo) => (
                                <button
                                    key={combo.label}
                                    onClick={() => loadPreset(combo)}
                                    className="w-full text-left px-3 py-2 rounded-lg text-sm bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 flex items-center justify-between group"
                                >
                                    <span>{combo.label}</span>
                                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Drug List */}
                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Your Medications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {drugs.map((drug, idx) => (
                                <div key={drug.id} className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-muted-foreground w-5">{idx + 1}.</span>
                                    <Input
                                        value={drug.name}
                                        onChange={(e) => updateDrug(drug.id, e.target.value)}
                                        placeholder={`Drug ${idx + 1} name…`}
                                        className="flex-1 h-9"
                                    />
                                    {drugs.length > 2 && (
                                        <button
                                            onClick={() => removeDrug(drug.id)}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {/* Add more */}
                            <div className="flex gap-2 pt-1">
                                <Input
                                    value={newDrugInput}
                                    onChange={e => setNewDrugInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addDrug()}
                                    placeholder="Add another drug…"
                                    className="flex-1 h-9"
                                />
                                <Button size="sm" variant="outline" onClick={() => addDrug()} className="px-3">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button
                                onClick={checkAllInteractions}
                                disabled={isChecking || validDrugs.length < 2}
                                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
                            >
                                {isChecking ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing {totalPairs} pair{totalPairs !== 1 ? 's' : ''}…
                                    </>
                                ) : (
                                    <>
                                        <FlaskConical className="mr-2 h-4 w-4" />
                                        Check {totalPairs > 0 ? totalPairs : ''} Interaction{totalPairs !== 1 ? 's' : ''}
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel: Results */}
                <div className="lg:col-span-3 space-y-4">
                    {!checked && !isChecking && (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed p-12 text-muted-foreground">
                            <FlaskConical className="h-16 w-16 mb-4 opacity-30" />
                            <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                            <p className="text-sm">Enter your medications on the left, then click "Check Interactions" to get an instant AI safety assessment.</p>
                        </div>
                    )}

                    {isChecking && (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center rounded-2xl border-2 p-12">
                            <div className="h-16 w-16 mb-4 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Analyzing Polypharmacy…</h3>
                            <p className="text-sm text-muted-foreground">VigiBot is cross-referencing {validDrugs.length} medications against global clinical databases.</p>
                        </div>
                    )}

                    {checked && results.length > 0 && (
                        <>
                            {/* Summary Banner */}
                            <div className={`rounded-2xl border-2 p-4 flex items-center gap-4 ${
                                hasSevere ? 'bg-red-50 border-red-300 dark:bg-red-900/20' :
                                hasModerate ? 'bg-orange-50 border-orange-300 dark:bg-orange-900/20' :
                                'bg-green-50 border-green-300 dark:bg-green-900/20'
                            }`}>
                                <div className="flex-shrink-0">
                                    {hasSevere ? <ShieldAlert className="h-8 w-8 text-red-500" /> :
                                     hasModerate ? <AlertTriangle className="h-8 w-8 text-orange-500" /> :
                                     <CheckCircle className="h-8 w-8 text-green-500" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">
                                        {hasSevere ? '⚠️ Critical Interactions Found' :
                                         hasModerate ? 'Moderate Interactions Detected' :
                                         'No Major Interactions Found'}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Analyzed {results.length} drug pair{results.length !== 1 ? 's' : ''} • Always consult your doctor before changing medications.
                                    </p>
                                </div>
                            </div>

                            {/* Individual Results */}
                            {results.map((result, idx) => {
                                const cfg = SEVERITY_CONFIG[result.severity];
                                const Icon = cfg.icon;
                                return (
                                    <div key={idx} className={`rounded-2xl border-2 p-5 ${cfg.color} transition-all hover:shadow-md`}>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Icon className={`h-6 w-6 ${cfg.iconColor} flex-shrink-0`} />
                                                <div>
                                                    <span className="font-bold text-base">{result.drug1}</span>
                                                    <span className="text-muted-foreground mx-2 font-light">+</span>
                                                    <span className="font-bold text-base">{result.drug2}</span>
                                                </div>
                                            </div>
                                            <Badge className={`${cfg.badge} border-0 text-xs font-bold`}>
                                                {cfg.label}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-foreground/90 mb-3 leading-relaxed">{result.description}</p>
                                        <div className="bg-background/60 rounded-xl p-3 flex items-start gap-2">
                                            <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-muted-foreground"><strong>Recommendation:</strong> {result.recommendation}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
