"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Loader2, AlertTriangle, CheckCircle, ShieldAlert, HeartPulse } from "lucide-react";
import { chatWithVigiBot } from "@/lib/ai";
import ReactMarkdown from 'react-markdown';

export default function SymptomCheckerPage() {
    const [isLoading, setIsLoading] = useState(false);
    
    // Form state
    const [medications, setMedications] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [duration, setDuration] = useState("");

    const [result, setResult] = useState<string | null>(null);

    const handleAnalyze = async () => {
        setIsLoading(true);
        setResult(null);
        
        try {
            const prompt = `Analyze a potential Adverse Drug Reaction (ADR). Act as the Master Pharmacologist. The patient is currently taking the following medications: "${medications}". They are experiencing the following new symptoms: "${symptoms}" which have lasted for "${duration}". Cross-reference these symptoms with the known adverse effect profiles of the provided medications. Determine the probability that this is an ADR. Format your response with clear sections for 1) Suspected Medications, 2) Mechanism of Reaction, 3) Severity/Risk Level, and 4) Recommended Clinical Action.`;

            const response = await chatWithVigiBot(prompt);
            setResult(response);
        } catch (error) {
            console.error("Failed to analyze symptoms:", error);
            setResult("An error occurred while connecting to the VigiBot diagnostic core. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-900 via-red-900 to-slate-900 p-10 text-white shadow-2xl border border-red-500/30">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
                    <HeartPulse className="h-96 w-96 text-red-300 transform rotate-12" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-red-500/20 backdrop-blur-md flex items-center justify-center border border-red-400/30">
                            <ShieldAlert className="h-6 w-6 text-red-300" />
                        </div>
                        <span className="text-xl font-medium tracking-wider text-red-300 uppercase">ADR Analysis Engine</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                        Symptom <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Checker</span>
                    </h1>
                    <p className="text-red-100/80 text-lg md:text-xl max-w-2xl font-light">
                        Cross-reference your current symptoms against global pharmacovigilance databases to determine the probability of an Adverse Drug Reaction (ADR).
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Input Column */}
                <div className="md:col-span-4 space-y-6">
                    <Card className="border-2 border-red-100 dark:border-red-900/50 shadow-lg">
                        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
                                Clinical Intake
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="medications" className="font-semibold text-slate-700 dark:text-slate-300">Current Medications</Label>
                                <Textarea 
                                    id="medications" 
                                    placeholder="List all medications, supplements, and doses you are currently taking..." 
                                    value={medications}
                                    onChange={(e) => setMedications(e.target.value)}
                                    className="min-h-[100px] resize-none"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="symptoms" className="font-semibold text-slate-700 dark:text-slate-300">New Symptoms</Label>
                                <Textarea 
                                    id="symptoms" 
                                    placeholder="Describe your symptoms in detail (e.g., severe headache, rash on arms, dizziness when standing)..." 
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    className="min-h-[120px] resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration" className="font-semibold text-slate-700 dark:text-slate-300">Symptom Duration</Label>
                                <Input 
                                    id="duration" 
                                    placeholder="e.g., 2 days, since this morning" 
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            
                            <Button 
                                className="w-full h-14 text-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-xl transition-all duration-300 mt-6"
                                onClick={handleAnalyze}
                                disabled={isLoading || !medications.trim() || !symptoms.trim()}
                            >
                                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <ShieldAlert className="mr-2 h-6 w-6" />}
                                Analyze ADR Risk
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Column */}
                <div className="md:col-span-8">
                    <Card className="h-full border-2 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative min-h-[600px]">
                        {!result && !isLoading ? (
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-slate-50 dark:bg-slate-900/20">
                                <div className="h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
                                    <Activity className="h-12 w-12 text-red-400" />
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Awaiting Clinical Data</h3>
                                <p className="text-slate-500 max-w-md">
                                    Input your current medication regimen and symptoms on the left. VigiBot will instantly cross-reference millions of global case safety reports.
                                </p>
                            </div>
                        ) : isLoading ? (
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 bg-slate-50 dark:bg-slate-900/20">
                                <div className="relative h-32 w-32 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-red-200 dark:border-red-900/50"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-red-600 dark:border-red-400 border-t-transparent animate-spin"></div>
                                    <HeartPulse className="h-8 w-8 text-red-600 dark:text-red-400 animate-pulse" />
                                </div>
                                <h3 className="text-xl font-bold mt-6 text-red-700 dark:text-red-400">Processing Pharmacovigilance Data...</h3>
                                <p className="text-sm text-slate-500 mt-2 text-center">Scanning WHO VigiBase and FDA FAERS arrays for matching symptomologies.</p>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950/50">
                                <div className="bg-red-600 text-white p-4 items-center flex justify-between shadow-md">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-red-200" />
                                        <span className="font-semibold tracking-wide">ADR ANALYSIS COMPLETE</span>
                                    </div>
                                    <div className="px-2 py-1 rounded bg-red-800/50 text-xs font-mono">CLINICAL MODE</div>
                                </div>
                                
                                <div className="p-6 md:p-8 overflow-y-auto prose dark:prose-invert max-w-none prose-red">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b-2 border-red-100 dark:border-red-900 pb-2 mb-4" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mt-6 mb-3" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2 flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-red-500"></div>{props.children}</h3>,
                                            strong: ({node, ...props}) => <strong className="font-bold text-red-900 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-1 rounded" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-none space-y-2 my-4 pl-0" {...props} />,
                                            li: ({node, children, ...props}) => (
                                                <li className="flex items-start" {...props}>
                                                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                                                    <span>{children}</span>
                                                </li>
                                            ),
                                        }}
                                    >
                                        {result || ""}
                                    </ReactMarkdown>
                                </div>
                                
                                <div className="mt-auto p-4 bg-orange-50 dark:bg-orange-950/20 border-t border-orange-200 dark:border-orange-900/30 flex gap-3 text-sm">
                                    <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                                    <p className="text-orange-800 dark:text-orange-300">
                                        <strong>MEDICAL DISCLAIMER:</strong> This tool utilizes AI for informational purposes and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. <strong>If you think you may have a medical emergency, call your doctor or emergency services immediately.</strong>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
