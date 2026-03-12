import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, ShieldCheck, Database, BarChart3, ChevronRight, Globe, Lock, Workflow } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function EnterprisePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                <Link className="flex items-center justify-center gap-2" href="/">
                    <ShieldCheck className="h-6 w-6 text-blue-600" />
                    <span className="font-bold text-xl tracking-tight">VigiVerse</span>
                </Link>
                <nav className="hidden md:flex gap-6 items-center">
                    <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#solutions">Solutions</Link>
                    <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#features">Features</Link>
                    <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#security">Security & Compliance</Link>
                </nav>
                <div className="flex gap-4 items-center">
                    <Link href="/">
                        <Button variant="ghost" className="hidden sm:flex">Back to Consumer</Button>
                    </Link>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700">Contact Sales</Button>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-20 md:py-32 lg:py-40 bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950" />
                    <div className="absolute -left-40 top-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    
                    <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                            <div className="flex flex-col justify-center space-y-8">
                                <div className="space-y-4">
                                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 w-fit">VigiVerse for Enterprise</Badge>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                                        Transforming Pharmacovigilance with AI
                                    </h1>
                                    <p className="max-w-[600px] text-slate-300 md:text-xl leading-relaxed">
                                        Empower your pharmaceutical organization or regulatory agency with real-time, AI-verified adverse drug reaction intelligence gathered directly from patients.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/20">
                                        Request Early Access <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                                        View Case Studies
                                    </Button>
                                </div>
                            </div>
                            <div className="hidden lg:flex items-center justify-center p-8 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl mix-blend-overlay" />
                                {/* Abstract Dashboard Representation */}
                                <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-5 w-5 text-blue-400" />
                                            <span className="font-semibold text-sm">Real-time Signals</span>
                                        </div>
                                        <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">Live</Badge>
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <BarChart3 className="h-5 w-5 text-blue-400" />
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                                                    <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solutions Section */}
                <section id="solutions" className="w-full py-20 bg-slate-50 dark:bg-slate-900/50">
                    <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">Built for Industry Leaders</h2>
                            <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-lg mx-auto">
                                Tailored solutions designed to solve the data gap in post-market surveillance.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="border-none shadow-xl bg-white dark:bg-slate-900 hover:-translate-y-2 transition-transform duration-300">
                                <CardContent className="p-8 space-y-6">
                                    <div className="h-14 w-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <Database className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold">Pharma Companies</h3>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Meet post-market surveillance requirements efficiently. Access an exclusive dashboard of real-time, anonymized patient data specific to your drug portfolio.
                                    </p>
                                    <ul className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-blue-500"/> Early warning signal detection</li>
                                        <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-blue-500"/> Competitive baseline comparisons</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-xl bg-white dark:bg-slate-900 hover:-translate-y-2 transition-transform duration-300">
                                <CardContent className="p-8 space-y-6">
                                    <div className="h-14 w-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                        <Globe className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-bold">Regulatory Agencies</h3>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Augment traditional reporting pipelines (like FAERS) with a modern, consumer-friendly portal. Increase the volume and quality of public submissions.
                                    </p>
                                    <ul className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-purple-500"/> AI-structured narrative reports</li>
                                        <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-purple-500"/> Regional demographic analytics</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-xl bg-white dark:bg-slate-900 hover:-translate-y-2 transition-transform duration-300 md:col-span-2 lg:col-span-1">
                                <CardContent className="p-8 space-y-6">
                                    <div className="h-14 w-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                        <Workflow className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h3 className="text-xl font-bold">Healthcare Providers</h3>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Monitor patient cohorts and reduce liability. Integrate our reporting API directly into your Electronic Health Record (EHR) systems.
                                    </p>
                                    <ul className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-emerald-500"/> EPIC & Cerner integration ready</li>
                                        <li className="flex items-center"><ChevronRight className="h-4 w-4 mr-2 text-emerald-500"/> Streamlined workflow management</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section id="security" className="w-full py-20 bg-white dark:bg-slate-950">
                    <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative relative-h">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-2xl" />
                                
                                <Card className="relative z-10 border border-slate-200 dark:border-slate-800 shadow-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
                                    <CardContent className="p-10 text-center space-y-6">
                                        <div className="mx-auto w-20 h-20 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center shadow-xl">
                                            <Lock className="h-10 w-10 text-white dark:text-slate-900" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">Enterprise-Grade Security</h3>
                                            <p className="text-slate-500 dark:text-slate-400">Your patients' data is our top priority.</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-left">
                                            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                                                <span className="font-bold text-blue-600 dark:text-blue-400">HIPAA</span>
                                                <p className="text-xs text-slate-500 mt-1">Fully Compliant</p>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                                                <span className="font-bold text-blue-600 dark:text-blue-400">GDPR</span>
                                                <p className="text-xs text-slate-500 mt-1">Ready Architecture</p>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                                                <span className="font-bold text-blue-600 dark:text-blue-400">SOC 2</span>
                                                <p className="text-xs text-slate-500 mt-1">Type II Certified</p>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                                                <span className="font-bold text-blue-600 dark:text-blue-400">E2E</span>
                                                <p className="text-xs text-slate-500 mt-1">Zero-Knowledge Encryption</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            
                            <div className="space-y-6">
                                <Badge variant="outline" className="text-blue-600 border-blue-600/30">Trust & Privacy</Badge>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
                                    Uncompromising Data Protection
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 md:text-lg leading-relaxed">
                                    VigiVerse employs state-of-the-art security measures to ensure that all patient-reported outcomes are anonymized and securely transmitted.
                                    We handle the regulatory compliance burden so you can focus on the insights.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    <li className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                                            <div className="h-3 w-3 rounded-full bg-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">De-identification Engine</h4>
                                            <p className="text-slate-500 text-sm mt-1">Our AI automatically scrubs Personally Identifiable Information (PII) before it ever reaches the analytics dashboard.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                                            <div className="h-3 w-3 rounded-full bg-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">Role-Based Access Control (RBAC)</h4>
                                            <p className="text-slate-500 text-sm mt-1">Granular permissions ensure your team members only see the data they are authorized to access.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-20 bg-blue-600 dark:bg-blue-900 text-white">
                    <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Modernize Your Safety Protocols?</h2>
                        <p className="text-blue-100 md:text-xl max-w-2xl mx-auto">
                            Join the leading pharmaceutical organizations already using VigiVerse to stay ahead of adverse drug reactions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/enterprise/dashboard">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8">
                                    Schedule a Demo (View Prototype)
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800">
                                Contact Sales Team
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
                <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-slate-900 dark:text-white">VigiVerse Enterprise</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        © 2026 VigiVerse Inc. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link className="text-sm text-slate-500 hover:text-blue-600" href="#">Terms</Link>
                        <Link className="text-sm text-slate-500 hover:text-blue-600" href="#">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
