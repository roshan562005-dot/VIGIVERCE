"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Mail, Phone, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { login, verifyOtp, getCurrentUser } from "@/lib/auth";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        getCurrentUser().then(user => {
            if (user) router.push("/dashboard");
        });
    }, [router]);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showEmailOtpInput, setShowEmailOtpInput] = useState(false);
    const [showPhoneOtpInput, setShowPhoneOtpInput] = useState(false);

    const handleLogin = async (provider: 'google' | 'email' | 'phone', identifier: string) => {
        setIsLoading(true);
        try {
            if (provider === 'phone' && !showPhoneOtpInput) {
                await login('phone', identifier);
                setShowPhoneOtpInput(true);
            } else if (provider === 'phone' && showPhoneOtpInput) {
                await verifyOtp(identifier, otp, 'sms');
                router.push("/dashboard");
            } else if (provider === 'email' && !showEmailOtpInput) {
                await login('email', identifier);
                setShowEmailOtpInput(true);
            } else if (provider === 'email' && showEmailOtpInput) {
                await verifyOtp(identifier, otp, 'email');
                router.push("/dashboard");
            } else if (provider === 'google') {
                await login('google', '');
            }
        } catch (error: any) {
            console.error("Login error:", error);
            alert(error.message || "Authentication failed. Please check your details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <Tabs defaultValue="email" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="email">Email / Google</TabsTrigger>
                            <TabsTrigger value="phone">Mobile Number</TabsTrigger>
                        </TabsList>

                        <TabsContent value="email" className="space-y-4">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={showEmailOtpInput || isLoading}
                                    />
                                </div>
                                {showEmailOtpInput && (
                                    <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor="email-otp">Verification Code passed to email</Label>
                                        <Input
                                            id="email-otp"
                                            type="text"
                                            placeholder="123456"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                )}
                                <Button className="w-full" onClick={() => handleLogin('email', email)} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                                    {showEmailOtpInput ? "Verify Email Code" : "Sign In with Email"}
                                </Button>
                                {showEmailOtpInput && (
                                    <button 
                                        onClick={() => setShowEmailOtpInput(false)}
                                        className="text-xs text-center text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Change Email Address
                                    </button>
                                )}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full" onClick={() => handleLogin('google', 'Google User')} disabled={isLoading}>
                                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                    </svg>
                                    Login with Google
                                </Button>
                                
                                <Button 
                                    variant="secondary" 
                                    className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 font-semibold" 
                                    onClick={() => router.push('/dashboard')}
                                    disabled={isLoading}
                                >
                                    Bypass Login (Presentation Mode)
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="phone" className="space-y-4">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Mobile Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={showPhoneOtpInput || isLoading}
                                    />
                                </div>
                                {showPhoneOtpInput && (
                                    <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor="otp">Verification Code (OTP)</Label>
                                        <Input
                                            id="otp"
                                            type="text"
                                            placeholder="123456"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                )}
                                <Button className="w-full" onClick={() => handleLogin('phone', phone)} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Phone className="mr-2 h-4 w-4" />}
                                    {showPhoneOtpInput ? "Verify Phone Code" : "Send SMS OTP"}
                                </Button>
                                {showPhoneOtpInput && (
                                    <button 
                                        onClick={() => setShowPhoneOtpInput(false)}
                                        className="text-xs text-center text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Change Phone Number
                                    </button>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="underline">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block relative">
                <div className="absolute inset-0 bg-zinc-900/20 z-10" />
                {/* Placeholder for the image. Will replace with generated image. */}
                <img
                    src="/login-visual.png"
                    alt="VigiVerse Visual"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-blue-600', 'to-teal-500');
                    }}
                />
                <div className="absolute bottom-10 left-10 z-20 text-white">
                    <h2 className="text-4xl font-bold mb-4">VigiVerse</h2>
                    <p className="text-lg max-w-md">
                        Empowering you to track, report, and understand your health journey with advanced AI assistance.
                    </p>
                </div>
            </div>
        </div>
    );
}
