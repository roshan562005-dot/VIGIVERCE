import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Bot, Database, TrendingUp, Users, Sparkles, ArrowRight, Activity, Globe, HeartPulse } from "lucide-react";
import { VideoPlayer } from "@/components/landing/VideoPlayer";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
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
                    <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 animate-in fade-in slide-in-from-top-4 duration-700">
                            <Sparkles className="h-4 w-4" />
                            AI-Powered Drug Safety Platform
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                            The Future of <br />
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                                Pharmacovigilance
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            Join the global community monitoring drug safety. Report reactions, earn rewards, and access real-time AI insights.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
                            <Link
                                href="/login"
                                className={cn(buttonVariants({ size: "lg" }), "group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all")}
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/dashboard/resources"
                                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-lg px-8 py-6 rounded-full border-2 hover:bg-accent transition-all")}
                            >
                                Explore Database
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How VigiVerse Works</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            A seamless ecosystem connecting patients, AI, and global health databases.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent -translate-y-1/2 z-0" />

                        {/* Step 1 */}
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-background border-4 border-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Activity className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">1. Report Reaction</h3>
                            <p className="text-muted-foreground">
                                Easily log adverse drug reactions through our intuitive interface or voice assistant.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-background border-4 border-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Bot className="h-10 w-10 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">2. AI Analysis</h3>
                            <p className="text-muted-foreground">
                                Our Gemini-powered AI instantly verifies data, checks for interactions, and assesses severity.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-background border-4 border-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Globe className="h-10 w-10 text-cyan-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">3. Global Impact</h3>
                            <p className="text-muted-foreground">
                                Verified data contributes to global safety alerts, helping protect millions worldwide.
                            </p>
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
