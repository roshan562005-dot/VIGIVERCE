import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Bot, Database, TrendingUp, Users, Sparkles, ArrowRight, Activity, Globe, HeartPulse } from "lucide-react";
import { VideoPlayer } from "@/components/landing/VideoPlayer";
import { MockVigiBot } from "@/components/landing/MockVigiBot";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Deployment Verification Banner */}
            <div className="bg-red-600 text-white py-4 text-center font-bold text-xl animate-pulse">
                DEPLOYMENT TEST: SEC_GATE_V2_PROD - IF YOU SEE THIS, UPDATE IS LIVE
            </div>
            {/* Hero Section */}
            <section className="relative overflow-hidden min-h-[90vh] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 -z-10">
                    <img
                        src="/landing-hero.png"
                        alt="VigiVerse Hero"
                        className="h-full w-full object-cover opacity-20 dark:opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
                </div>

                <div className="container mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-start text-left space-y-8 max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 animate-in fade-in slide-in-from-left-8 duration-700">
                                <Sparkles className="h-4 w-4" />
                                AI-Powered Drug Safety Platform
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-left-8 duration-700 delay-150">
                                The Future of <br />
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                                    Pharmacovigilance
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-muted-foreground animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                                Join the global community monitoring drug safety. Report reactions, earn rewards, and access real-time AI insights.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-left-8 duration-700 delay-500">
                                <Link
                                    href="/login"
                                    className={cn(buttonVariants({ size: "lg" }), "group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all")}
                                >
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/dashboard/resources"
                                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-lg px-8 py-6 rounded-full border-2 hover:bg-accent transition-all bg-background/50 backdrop-blur-sm")}
                                >
                                    Explore Database
                                </Link>
                            </div>
                        </div>

                        {/* Interactive Hero Element: Mock VigiBot */}
                        <div className="hidden lg:flex justify-end items-center relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
                            <MockVigiBot />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Band */}
            <section className="py-8 bg-black dark:bg-black border-y border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 w-full h-full pointer-events-none" />
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm font-semibold text-slate-400 mb-6 uppercase tracking-widest">
                        Cross-Referencing Global Health Data
                    </p>
                    <div className="flex justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                        {/* Mock Logos for Trust */}
                        <div className="text-2xl font-black text-white whitespace-nowrap"><Globe className="inline mr-2 h-6 w-6"/> OpenFDA</div>
                        <div className="text-2xl font-black text-white whitespace-nowrap"><Database className="inline mr-2 h-6 w-6"/> RxNorm</div>
                        <div className="text-2xl font-black text-white whitespace-nowrap"><Activity className="inline mr-2 h-6 w-6"/> DrugBank</div>
                        <div className="text-2xl font-black text-white whitespace-nowrap hidden md:block"><Shield className="inline mr-2 h-6 w-6"/> WHO-UMC</div>
                    </div>
                </div>
            </section>

            {/* Problem vs Solution Section */}
            <section className="py-24 bg-slate-950 text-slate-50 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full point-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full point-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The Pharmacovigilance Gap</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            The current system for tracking Adverse Drug Reactions is broken. We rebuilt it from the ground up.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
                        {/* The Problem (Old Way) */}
                        <div className="space-y-8 bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                            <div className="flex items-center gap-4 text-red-400 mb-6">
                                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">The Old Standard</h3>
                            </div>
                            
                            <ul className="space-y-6">
                                <li className="flex gap-4 items-start">
                                    <span className="text-red-400 mt-1">✕</span>
                                    <div>
                                        <h4 className="font-semibold text-slate-200">Paper-Based & Slow</h4>
                                        <p className="text-slate-500 text-sm mt-1">Months pass before critical safety signals are identified by regulators.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-red-400 mt-1">✕</span>
                                    <div>
                                        <h4 className="font-semibold text-slate-200">One-Way Street</h4>
                                        <p className="text-slate-500 text-sm mt-1">Patients submit data into a void and never learn if their reaction is common.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-red-400 mt-1">✕</span>
                                    <div>
                                        <h4 className="font-semibold text-slate-200">Complex Medical Jargon</h4>
                                        <p className="text-slate-500 text-sm mt-1">Forms require deep clinical knowledge, discouraging patient participation.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* The Solution (VigiVerse Way) */}
                        <div className="space-y-8 bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-3xl border border-blue-500/30 relative">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20" />
                            
                            <div className="relative">
                                <div className="flex items-center gap-4 text-blue-400 mb-6">
                                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold">The VigiVerse Way</h3>
                                </div>
                                
                                <ul className="space-y-6">
                                    <li className="flex gap-4 items-start">
                                        <span className="text-blue-400 mt-1">✓</span>
                                        <div>
                                            <h4 className="font-semibold text-white">Real-Time AI Processing</h4>
                                            <p className="text-blue-100/70 text-sm mt-1">Gemini AI analyzes your report instantly, checking against global databases in milliseconds.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <span className="text-blue-400 mt-1">✓</span>
                                        <div>
                                            <h4 className="font-semibold text-white">Gamified & Rewarding</h4>
                                            <p className="text-blue-100/70 text-sm mt-1">Earn reputation points, unlock badges, and track your impact on the global leaderboard.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <span className="text-blue-400 mt-1">✓</span>
                                        <div>
                                            <h4 className="font-semibold text-white">VigiBot Personal Assistant</h4>
                                            <p className="text-blue-100/70 text-sm mt-1">Chat in plain English. The AI understands complex polypharmacy and explains it simply.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose VigiVerse?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Advanced technology meets community-driven healthcare.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-blue-500 bg-card/50 backdrop-blur">
                            <CardContent className="p-8">
                                <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Bot className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">AI-Powered Analysis</h3>
                                <p className="text-muted-foreground">
                                    Gemini 2.0 Flash AI analyzes drug interactions and safety in under 2 seconds with medical-grade accuracy.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-purple-500 bg-card/50 backdrop-blur">
                            <CardContent className="p-8">
                                <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Award className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Gamified Rewards</h3>
                                <p className="text-muted-foreground">
                                    Earn points, unlock badges, and climb leaderboards. Your contribution matters and gets rewarded!
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-cyan-500 bg-card/50 backdrop-blur">
                            <CardContent className="p-8">
                                <div className="h-14 w-14 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Database className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Global Database</h3>
                                <p className="text-muted-foreground">
                                    Access 100,000+ drugs from OpenFDA, RxNorm, and international sources. Search any medication instantly.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 dark:bg-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/landing-hero.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Make Healthcare Safer?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join the community of healthcare professionals and patients making a difference today.
                    </p>
                    <Link href="/login">
                        <Button size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group">
                            Start Your Journey
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Founder & Demo Section */}
            <section className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Founder Profile */}
                    <div className="space-y-8 animate-in slide-in-from-left duration-700">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-2xl" />
                            <div className="relative flex items-center gap-6">
                                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                                    <img
                                        src="/founder-roshan.jpg"
                                        alt="Roshan - Founder"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold">Roshan</h2>
                                    <p className="text-blue-600 font-medium text-lg">Founder & Visionary</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">Revolutionizing Drug Safety</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                "Our mission at VigiVerse is simple yet ambitious: to democratize healthcare safety. By combining the power of artificial intelligence with community-driven reporting, we are building a world where every patient's voice contributes to a safer tomorrow."
                            </p>
                            <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                                <Sparkles className="h-4 w-4" />
                                <span>Leading the AI Healthcare Revolution</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button variant="outline" className="rounded-full">
                                Read Full Bio
                            </Button>
                            <Button variant="ghost" className="rounded-full">
                                Connect on LinkedIn <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Video Demo */}
                    <VideoPlayer />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-200 py-12 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xl font-bold text-white">
                                <HeartPulse className="h-6 w-6 text-blue-500" />
                                VigiVerse
                            </div>
                            <p className="text-slate-400 text-sm">
                                Empowering global health through AI-driven pharmacovigilance and community reporting.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Platform</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
                                <li><Link href="/dashboard/resources" className="hover:text-blue-400">Drug Database</Link></li>
                                <li><Link href="/dashboard/leaderboard" className="hover:text-blue-400">Leaderboard</Link></li>
                                <li><Link href="/enterprise" className="hover:text-blue-400 text-blue-300 font-semibold">Enterprise Solutions</Link></li>
                                <li><Link href="/login" className="hover:text-blue-400">Login</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link href="#" className="hover:text-blue-400">Documentation</Link></li>
                                <li><Link href="#" className="hover:text-blue-400">API Access</Link></li>
                                <li><Link href="#" className="hover:text-blue-400">Community Guidelines</Link></li>
                                <li><Link href="#" className="hover:text-blue-400">Help Center</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link href="#" className="hover:text-blue-400">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-blue-400">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-blue-400">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} VigiVerse. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
