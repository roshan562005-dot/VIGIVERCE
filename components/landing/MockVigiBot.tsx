"use client";

import { useEffect, useState } from "react";
import { Bot, User, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export function MockVigiBot() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const fullQuestion = "Is it safe to take Ibuprofen with Warfarin?";
    const fullAnswer = "⚠️ High Risk Interaction Detected\n\nMixing Ibuprofen and Warfarin significantly increases the risk of severe gastrointestinal bleeding. Please consult your physician immediately for a safer pain management alternative.";

    useEffect(() => {
        let isMounted = true;

        const startSequence = async () => {
            // Wait 1 second before starting
            await new Promise(r => setTimeout(r, 1000));
            if (!isMounted) return;

            // Type the user question
            setMessages([{ role: 'user', text: '' }]);
            for (let i = 0; i <= fullQuestion.length; i++) {
                if (!isMounted) return;
                setMessages([{ role: 'user', text: fullQuestion.substring(0, i) }]);
                await new Promise(r => setTimeout(r, 50));
            }

            // Show typing indicator
            await new Promise(r => setTimeout(r, 500));
            if (!isMounted) return;
            setIsTyping(true);

            // Wait 1.5 seconds for "AI thinking"
            await new Promise(r => setTimeout(r, 1500));
            if (!isMounted) return;
            setIsTyping(false);

            // Show AI response
            setMessages([
                { role: 'user', text: fullQuestion },
                { role: 'assistant', text: fullAnswer }
            ]);
        };

        startSequence();

        return () => { isMounted = false; };
    }, []);

    return (
        <Card className="w-full max-w-md bg-white/10 dark:bg-black/20 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center gap-3 text-white">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                    <Bot className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold flex items-center gap-2">
                        VigiBot AI <Sparkles className="h-3 w-3 text-yellow-300" />
                    </h3>
                    <p className="text-xs text-blue-100 opacity-90">Powered by Vigi AI</p>
                </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-4 min-h-[250px] bg-gradient-to-b from-white/5 to-transparent">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                                <Bot className="h-4 w-4 text-white" />
                            </div>
                        )}
                        
                        <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm shadow-md animate-in fade-in slide-in-from-bottom-2 ${
                            msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-tr-sm' 
                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm'
                        }`}>
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            {msg.role === 'user' && msg.text !== fullQuestion && (
                                <span className="inline-block w-1.5 h-4 ml-1 bg-white/70 animate-pulse align-middle" />
                            )}
                        </div>

                        {msg.role === 'user' && (
                            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                                <User className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3 justify-start animate-in fade-in">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-md">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                    </div>
                )}
            </div>
            
            {/* Fake Input */}
            <div className="p-3 border-t border-white/10 bg-black/5">
                <div className="w-full bg-white/50 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-full px-4 py-2 text-sm text-muted-foreground flex items-center justify-between">
                    <span>Ask about drug safety...</span>
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-white" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
