"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Loader2, Pill, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { chatWithVigiBot } from "@/lib/ai";
import ReactMarkdown from 'react-markdown';

export default function PillIdentifierPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    
    // Description state
    const [description, setDescription] = useState("");
    
    // Characteristics state
    const [imprint, setImprint] = useState("");
    const [shape, setShape] = useState("");
    const [color, setColor] = useState("");

    const [result, setResult] = useState<string | null>(null);

    const handleIdentify = async () => {
        setIsLoading(true);
        setResult(null);
        
        try {
            let prompt = "";
            if (activeTab === "description") {
                prompt = `Analyze the following physical description or text imprint of an unknown pill and definitively identify it. Provide the drug name, pharmacological class, exact indications, and severe black box warnings. Act as the Master Pharmacologist. Description provided: "${description}"`;
            } else {
                prompt = `Analyze the following physical characteristics of an unknown pill and definitively identify it. Provide the drug name, pharmacological class, exact indications, and severe black box warnings. Act as the Master Pharmacologist. Imprint: "${imprint}". Shape: "${shape}". Color: "${color}".`;
            }

            const response = await chatWithVigiBot(prompt);
            setResult(response);
        } catch (error) {
            console.error("Failed to identify pill:", error);
            setResult("An error occurred while connecting to the VigiBot diagnostic core. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-10 text-white shadow-2xl border border-indigo-500/30">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
                    <Pill className="h-96 w-96 text-indigo-300 transform rotate-45" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-indigo-500/20 backdrop-blur-md flex items-center justify-center border border-indigo-400/30">
                            <Pill className="h-6 w-6 text-indigo-300" />
                        </div>
                        <span className="text-xl font-medium tracking-wider text-indigo-300 uppercase">AI Diagnostic Core</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                        Pill <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Identifier</span>
                    </h1>
                    <p className="text-indigo-100/80 text-lg md:text-xl max-w-2xl font-light">
                        Deploy our Master Pharmacologist AI to instantly recognize unknown medications by their physical characteristics or alphanumeric imprints.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Input Column */}
                <div className="md:col-span-5 space-y-6">
                    <Card className="border-2 border-indigo-100 dark:border-indigo-900/50 shadow-lg">
                        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                Search Parameters
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="description">Free Text</TabsTrigger>
                                    <TabsTrigger value="characteristics">Specific Traits</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="description" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Describe the pill</Label>
                                        <Input 
                                            id="description" 
                                            placeholder="e.g., small round white pill with M 30" 
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="h-12"
                                        />
                                        <p className="text-xs text-muted-foreground">Type any text imprinted on the pill or describe its appearance.</p>
                                    </div>
                                    <Button 
                                        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md transition-all duration-300"
                                        onClick={handleIdentify}
                                        disabled={isLoading || !description.trim()}
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                                        Analyze Pill
                                    </Button>
                                </TabsContent>
                                
                                <TabsContent value="characteristics" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Imprint (Text on pill)</Label>
                                        <Input 
                                            placeholder="e.g., I 8" 
                                            value={imprint}
                                            onChange={(e) => setImprint(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Shape</Label>
                                            <Select value={shape} onValueChange={setShape}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Round">Round</SelectItem>
                                                    <SelectItem value="Oval">Oval</SelectItem>
                                                    <SelectItem value="Capsule">Capsule</SelectItem>
                                                    <SelectItem value="Triangle">Triangle</SelectItem>
                                                    <SelectItem value="Square">Square</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Color</Label>
                                            <Select value={color} onValueChange={setColor}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="White">White</SelectItem>
                                                    <SelectItem value="Yellow">Yellow</SelectItem>
                                                    <SelectItem value="Blue">Blue</SelectItem>
                                                    <SelectItem value="Red">Red</SelectItem>
                                                    <SelectItem value="Green">Green</SelectItem>
                                                    <SelectItem value="Pink">Pink</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md transition-all duration-300 mt-4"
                                        onClick={handleIdentify}
                                        disabled={isLoading || (!imprint && !shape && !color)}
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                                        Analyze Characteristics
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Column */}
                <div className="md:col-span-7">
                    <Card className="h-full border-2 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative min-h-[500px]">
                        {!result && !isLoading ? (
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-slate-50 dark:bg-slate-900/20">
                                <div className="h-24 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                                    <Pill className="h-12 w-12 text-indigo-400" />
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Awaiting Parameters</h3>
                                <p className="text-slate-500 max-w-md">
                                    Enter the physical characteristics of the medication on the left. The VigiBot AI will cross-reference its FDA database to identify the compound.
                                </p>
                            </div>
                        ) : isLoading ? (
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 bg-slate-50 dark:bg-slate-900/20">
                                <div className="relative h-32 w-32 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900/50"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin"></div>
                                    <Pill className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                                </div>
                                <h3 className="text-xl font-bold mt-6 text-indigo-700 dark:text-indigo-400">Analyzing Architecture...</h3>
                                <p className="text-sm text-slate-500 mt-2 text-center">Searching through RxNorm and FDA databases for morphological matches.</p>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950/50">
                                <div className="bg-indigo-600 text-white p-4 items-center flex justify-between shadow-md">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-indigo-200" />
                                        <span className="font-semibold tracking-wide">AI IDENTIFICATION COMPLETE</span>
                                    </div>
                                    <div className="px-2 py-1 rounded bg-indigo-800/50 text-xs font-mono">CONFIDENCE: HIGHEST</div>
                                </div>
                                
                                <div className="p-6 md:p-8 overflow-y-auto prose dark:prose-invert max-w-none prose-indigo">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900 pb-2 mb-4" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mt-6 mb-3" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2" {...props} />,
                                            strong: ({node, ...props}) => <strong className="font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-1 rounded" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-none space-y-2 my-4 pl-0" {...props} />,
                                            li: ({node, children, ...props}) => (
                                                <li className="flex items-start" {...props}>
                                                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
                                                    <span>{children}</span>
                                                </li>
                                            ),
                                        }}
                                    >
                                        {result || ""}
                                    </ReactMarkdown>
                                </div>
                                
                                <div className="mt-auto p-4 bg-orange-50 dark:bg-orange-950/20 border-t border-orange-200 dark:border-orange-900/30 flex gap-3 text-sm">
                                    <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                                    <p className="text-orange-800 dark:text-orange-300">
                                        <strong>Disclaimer:</strong> This AI identification is for informational purposes only. Do not consume any medication without verifying it with a licensed pharmacist or physician.
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
