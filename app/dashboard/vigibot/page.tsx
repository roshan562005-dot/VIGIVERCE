"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Send, Loader2, Sparkles } from "lucide-react";
import { chatWithVigiBot } from "@/lib/ai";
import Image from "next/image";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function VigiBotPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await chatWithVigiBot(input);
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] max-w-5xl mx-auto p-6 gap-6">
            {/* Hero Header with Robot */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 p-8 text-white">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="relative z-10 flex items-center gap-6">
                    {/* Robot Avatar */}
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-2xl bg-white/20 backdrop-blur-sm p-3 shadow-2xl border-2 border-white/30">
                            <div className="h-full w-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <Bot className="h-12 w-12 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-6 w-6 text-yellow-300" />
                            <span className="text-lg font-bold text-yellow-300 tracking-wider">CLINICAL MODE ACTIVE</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-2">Chat with VigiBot</h1>
                        <p className="text-blue-100 text-lg">
                            The ultimate medical AI. Far more powerful than ChatGPT and Claude. Ask complex pharmacological queries.
                        </p>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <Card className="flex-1 flex flex-col border-2 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-b-2">
                    <CardTitle className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                            <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="text-xl">VigiBot Assistant</div>
                            <div className="text-sm text-muted-foreground font-normal">Powered by Gemini AI</div>
                        </div>
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center py-12">
                                <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                                    <Bot className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Start a Conversation</h3>
                                <p className="text-muted-foreground mb-6">Try asking:</p>
                                <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                                    {[
                                        "Analyze pharmacokinetic profile of Ozempic",
                                        "Warfarin and Ibuprofen polypharmacy interaction severity",
                                        "Detailed Hepatotoxicity Mechanism of Paracetamol"
                                    ].map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setInput(q)}
                                            className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2`}>
                                {msg.role === "assistant" && (
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                )}
                                <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-md ${msg.role === "user"
                                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                                        : "bg-muted border-2"
                                    }`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                                {msg.role === "user" && (
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <span className="text-white font-bold text-sm">U</span>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3 justify-start animate-pulse">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <Bot className="h-5 w-5 text-white" />
                                </div>
                                <div className="bg-muted border-2 rounded-2xl px-4 py-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>

                <CardFooter className="border-t-2 bg-muted/30 p-4">
                    <form onSubmit={handleSend} className="flex gap-3 w-full">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about drug interactions, side effects, or safety..."
                            disabled={isLoading}
                            className="flex-1 h-12 text-base border-2 focus:border-blue-500"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            size="lg"
                            className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Send
                                    <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-xs text-muted-foreground font-medium">
                            © 2026 A Roshan. All rights reserved. VigiBot Medical AI System.
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
