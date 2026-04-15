"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

export function VideoPlayer() {
    return (
        <div className="relative group animate-in slide-in-from-right duration-700 delay-200">
            {/* Animated glow ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse" />
            {/* Secondary glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />

            <Card className="relative overflow-hidden border border-white/10 bg-slate-950 aspect-video group-hover:scale-[1.02] transition-transform duration-500 shadow-2xl">
                {/* 3D Hero Image */}
                <Image
                    src="/vigiverse-3d-hero.png"
                    alt="VigiVerse Platform – Futuristic Drug Safety Intelligence"
                    fill
                    className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
                    priority
                />

                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 pointer-events-none" />

                {/* Floating badge top-right */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                    </span>
                    <span className="text-xs font-semibold text-white tracking-wide">LIVE PLATFORM</span>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Next-Gen Pharmacovigilance</p>
                            <h3 className="text-2xl font-bold text-white leading-tight">VigiVerse Intelligence</h3>
                            <p className="text-blue-200/80 text-sm mt-1">AI-powered drug safety monitoring & reporting</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">v2.0</div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
