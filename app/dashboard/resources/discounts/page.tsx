"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Printer, Share2 } from "lucide-react";

export default function DiscountCardPage() {
    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-green-600">
                    <DollarSign className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Prescription Discount Card</h1>
                </div>
                <p className="text-muted-foreground">
                    Save up to 80% on your prescriptions at over 35,000 pharmacies nationwide.
                </p>
            </div>

            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl max-w-2xl mx-auto w-full">
                <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">VigiVerse Rx</h2>
                            <p className="text-green-100">Prescription Savings Card</p>
                        </div>
                        <div className="text-right">
                            <p className="font-mono text-sm opacity-80">BIN: 610300</p>
                            <p className="font-mono text-sm opacity-80">PCN: VIGI</p>
                            <p className="font-mono text-sm opacity-80">GRP: VIGIVERSE</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Member ID</p>
                            <p className="font-mono text-xl tracking-widest">VIGI 8832 9901</p>
                        </div>
                        <p className="text-xs text-center opacity-70 mt-4">
                            This is not insurance. Valid at participating pharmacies only.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
                <Button size="lg" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print Card
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Text to Phone
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">1. Show Card</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Show this card to your pharmacist every time you fill a prescription.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">2. Save Money</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Save up to 80% on generic and brand name drugs.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">3. Share</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Share this card with family and friends. Everyone qualifies!
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
