"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, Calendar, MapPin, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AlertResult {
    id: string;
    product_description: string;
    reason_for_recall: string;
    recall_initiation_date: string;
    status: string;
    classification: string;
    city: string;
    state: string;
}

export default function FDAAlertsPage() {
    const [alerts, setAlerts] = useState<AlertResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                // Fetch latest enforcement reports
                const response = await fetch('https://api.fda.gov/drug/enforcement.json?limit=10&sort=recall_initiation_date:desc');

                if (!response.ok) {
                    throw new Error("Failed to fetch alerts");
                }

                const data = await response.json();

                const mappedAlerts = data.results.map((item: any, index: number) => ({
                    id: item.recall_number || `alert-${index}`,
                    product_description: item.product_description,
                    reason_for_recall: item.reason_for_recall,
                    recall_initiation_date: item.recall_initiation_date,
                    status: item.status,
                    classification: item.classification,
                    city: item.city,
                    state: item.state
                }));

                setAlerts(mappedAlerts);
            } catch (err) {
                console.error(err);
                setError("Failed to load FDA alerts. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    const formatDate = (dateString: string) => {
        if (!dateString) return "Unknown Date";
        // FDA date format is YYYYMMDD
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${month}/${day}/${year}`;
    };

    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-8 w-8" />
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">FDA Safety Alerts & Recalls</h1>
                </div>
                <p className="text-muted-foreground">
                    Latest drug recalls and safety alerts directly from the FDA.
                </p>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">Loading latest alerts...</p>
                </div>
            ) : error ? (
                <Card className="bg-red-50 border-red-200 text-red-600">
                    <CardContent className="p-6 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {error}
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <Card key={alert.id} className="border-l-4 border-l-red-500">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg font-semibold leading-tight">
                                            {alert.product_description.split(',')[0]}...
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 text-xs">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(alert.recall_initiation_date)}
                                            <span className="mx-1">•</span>
                                            <MapPin className="h-3 w-3" />
                                            {alert.city}, {alert.state}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={alert.status === "Ongoing" ? "destructive" : "secondary"}>
                                        {alert.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-semibold text-sm">Reason for Recall:</span>
                                        <p className="text-sm text-muted-foreground">{alert.reason_for_recall}</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-2">
                                        Classification: {alert.classification}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
