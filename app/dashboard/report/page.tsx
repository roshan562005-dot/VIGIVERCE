"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, AlertTriangle, Sparkles, Award } from "lucide-react";
import { saveReport, updatePoints } from "@/lib/storage";
import { analyzeReport } from "@/lib/ai";

export default function ReportPage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<"success" | "error" | null>(null);
    const [analysis, setAnalysis] = useState<{ score: number; feedback: string[] } | null>(null);

    const handleNext = () => {
        const drugName = (document.getElementById("drug-name") as HTMLInputElement).value;
        if (drugName) setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const drugName = (document.getElementById("drug-name") as HTMLInputElement).value;
        const batchNo = (document.getElementById("batch-no") as HTMLInputElement).value;
        const symptoms = (document.getElementById("symptoms") as HTMLTextAreaElement).value;
        const severity = (document.getElementById("severity") as HTMLSelectElement).value;
        const dateOfOnset = (document.getElementById("date") as HTMLInputElement).value;

        const analysisResult = await analyzeReport(drugName, symptoms, severity, dateOfOnset);
        setAnalysis(analysisResult);
        setIsSubmitting(false);

        saveReport({
            drugName,
            batchNumber: batchNo,
            symptoms,
            severity,
            dateOfOnset,
            aiScore: analysisResult.score,
            aiFeedback: analysisResult.feedback
        });

        updatePoints(Math.floor(analysisResult.score / 2));
        setResult("success");
        setStep(3);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-10 text-white">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-8 w-8" />
                        <span className="text-lg font-semibold">Adverse Drug Reaction Report</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Report a Reaction</h1>
                    <p className="text-orange-100 text-lg max-w-2xl">
                        Your report helps improve drug safety for everyone. AI analysis provides instant feedback.
                    </p>
                </div>
            </div>

            {/* Progress Stepper */}
            <div className="flex items-center justify-center gap-4">
                {[{ num: 1, name: "Drug Info" }, { num: 2, name: "Details" }, { num: 3, name: "Complete" }].map((s, idx) => (
                    <div key={s.num} className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= s.num
                                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                {s.num}
                            </div>
                            <span className="text-xs mt-1 font-medium">{s.name}</span>
                        </div>
                        {idx < 2 && <div className={`h-1 w-16 rounded mt-[-20px] ${step > s.num ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-muted'}`} />}
                    </div>
                ))}
            </div>

            {/* Step 1: Drug Info */}
            {step === 1 && (
                <Card className="border-2 hover:shadow-2xl transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                        <CardTitle className="text-2xl flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                1
                            </div>
                            Drug Information
                        </CardTitle>
                        <CardDescription className="text-base ml-15">Tell us which medication caused the reaction</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="drug-name" className="text-base font-semibold">Drug Name *</Label>
                            <Input id="drug-name" placeholder="e.g., Paracetamol, Aspirin, Metformin" className="h-12 text-lg border-2 focus:border-blue-500" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="batch-no" className="text-base">Batch Number (Optional)</Label>
                            <Input id="batch-no" placeholder="e.g., B12345" className="h-12 border-2 focus:border-blue-500" />
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 py-6">
                        <Button onClick={handleNext} size="lg" className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Next Step
                            <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {/* Step 2: Reaction Details */}
            {step === 2 && (
                <Card className="border-2 hover:shadow-2xl transition-shadow">
                    <form onSubmit={handleSubmit}>
                        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
                            <CardTitle className="text-2xl flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-white font-bold shadow-lg">
                                    2
                                </div>
                                Reaction Details
                            </CardTitle>
                            <CardDescription className="text-base ml-15">Describe what happened in detail</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="symptoms" className="text-base font-semibold">Symptoms *</Label>
                                <Textarea
                                    id="symptoms"
                                    placeholder="Describe your symptoms in detail (e.g., I felt dizzy and had a headache 30 minutes after taking the medication)..."
                                    className="min-h-32 border-2 focus:border-orange-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="severity" className="text-base font-semibold">Severity Level *</Label>
                                <select id="severity" className="flex h-12 w-full rounded-md border-2 border-input bg-background px-4 text-base focus:border-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                    <option value="mild">😊 Mild (No medical treatment needed)</option>
                                    <option value="moderate">⚠️ Moderate (Required medical attention)</option>
                                    <option value="severe">🚨 Severe (Hospitalization required)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-base font-semibold">Date of Onset *</Label>
                                <Input id="date" type="date" className="h-12 border-2 focus:border-orange-500" required />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between bg-muted/30 py-6">
                            <Button variant="outline" onClick={() => setStep(1)} type="button" size="lg" className="h-12">
                                Back
                            </Button>
                            <Button type="submit" disabled={isSubmitting} size="lg" className="h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analyzing with AI...
                                    </>
                                ) : (
                                    <>
                                        Submit Report
                                        <Sparkles className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            )}

            {/* Step 3: Success */}
            {step === 3 && result === "success" && (
                <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
                    <CardHeader className="text-center relative z-10 pt-12">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl">
                            <CheckCircle className="h-10 w-10 text-white" />
                        </div>
                        <CardTitle className="text-3xl text-green-700 dark:text-green-400 mb-3">Report Submitted Successfully!</CardTitle>
                        <CardDescription className="text-lg">
                            AI Confidence Score: <strong className="text-2xl text-green-600">{analysis?.score}%</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-6 relative z-10">
                        <div className="p-6 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl border-2 border-purple-300 dark:border-purple-700">
                            <Award className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                +{Math.floor((analysis?.score || 0) / 2)} Points Earned!
                            </p>
                            <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">Added to your profile</p>
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border-2 text-left">
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Sparkles className="h-5 w-5" />
                                AI Analysis Report
                            </h4>
                            <ul className="space-y-2">
                                {analysis?.feedback.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="relative z-10 pb-12">
                        <Button
                            onClick={() => { setStep(1); setResult(null); }}
                            size="lg"
                            className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            Submit Another Report
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
