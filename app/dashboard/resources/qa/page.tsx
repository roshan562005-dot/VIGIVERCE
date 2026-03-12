"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, MessageCircle, ThumbsUp, User } from "lucide-react";

const questions = [
    {
        id: 1,
        question: "Can I take Ibuprofen with coffee?",
        author: "User123",
        answers: 12,
        votes: 45,
        tags: ["Interactions", "Caffeine"]
    },
    {
        id: 2,
        question: "Best time of day to take Lisinopril?",
        author: "HeartHealth_Mike",
        answers: 8,
        votes: 32,
        tags: ["Dosage", "Blood Pressure"]
    },
    {
        id: 3,
        question: "Side effects of Metformin vs Glipizide?",
        author: "DiabetesWarrior",
        answers: 15,
        votes: 28,
        tags: ["Diabetes", "Comparison"]
    },
    {
        id: 4,
        question: "Is it safe to split 500mg Amoxicillin tablets?",
        author: "NewMom22",
        answers: 5,
        votes: 19,
        tags: ["Pills", "Safety"]
    }
];

export default function QAPage() {
    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-600">
                    <HelpCircle className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Community Q&A</h1>
                </div>
                <p className="text-muted-foreground">
                    Ask questions and get answers from the VigiVerse community and pharmacists.
                </p>
            </div>

            <div className="flex gap-4">
                <Input placeholder="Search questions..." className="flex-1" />
                <Button>Ask Question</Button>
            </div>

            <div className="space-y-4">
                {questions.map((q) => (
                    <Card key={q.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center gap-1 text-muted-foreground min-w-[60px]">
                                    <span className="font-bold text-lg text-foreground">{q.votes}</span>
                                    <span className="text-xs">votes</span>
                                    <ThumbsUp className="h-4 w-4 mt-1" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="font-semibold text-lg hover:text-primary">{q.question}</h3>
                                    <div className="flex gap-2">
                                        {q.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            {q.author}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageCircle className="h-3 w-3" />
                                            {q.answers} answers
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
