import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
    themeColor: "#3b82f6",
};

export const metadata: Metadata = {
    title: "VigiVerse – World's #1 AI Pharmacovigilance Platform",
    description: "Report adverse drug reactions, search 1,000+ global medications, and get real-time AI drug safety insights. Trusted by communities in 150+ countries. Powered by Vigi AI.",
    manifest: "/manifest.json",
    keywords: ["pharmacovigilance", "adverse drug reaction", "drug safety", "drug interactions", "ADR reporting", "AI healthcare", "medication safety", "drug database"],
    openGraph: {
        title: "VigiVerse – AI-Powered Drug Safety Platform",
        description: "Join the global community monitoring drug safety. Report ADRs, earn rewards, and access real-time AI insights across 1,000+ medications.",
        url: "https://vigiverse.vercel.app",
        siteName: "VigiVerse",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "VigiVerse – AI-Powered Drug Safety Platform",
        description: "Report adverse drug reactions and access global drug safety intelligence powered by Vigi AI.",
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "VigiVerse"
    }
};

import { LanguageProvider } from "@/components/providers/LanguageProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.variable
                )}
            >
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}
