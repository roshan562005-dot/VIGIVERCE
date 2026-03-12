"use client";

import { Card } from "@/components/ui/card";
import { useRef, useState } from "react";

export function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked, which is fine
            });
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="relative group animate-in slide-in-from-right duration-700 delay-200">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <Card className="relative overflow-hidden border-none bg-slate-900 aspect-video group-hover:scale-[1.02] transition-transform duration-500">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover cursor-pointer"
                    poster="/dashboard-banner.png"
                    controls
                    preload="metadata"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <source src="/demo-video.webm" type="video/webm" />
                    {/* Fallback content */}
                    <div className="absolute inset-0 bg-[url('/dashboard-banner.png')] bg-cover bg-center opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="relative z-10 flex flex-col items-center gap-4 text-center p-6">
                        <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-blue-600 border-b-[10px] border-b-transparent ml-1" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">See VigiVerse in Action</h3>
                            <p className="text-blue-200">Watch how our platform works</p>
                        </div>
                    </div>
                </video>

                {/* Video overlay with title - only show when not playing */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent p-6 pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                    <h3 className="text-xl font-bold text-white">VigiVerse Platform Demo</h3>
                    <p className="text-blue-200 text-sm">Explore the features and interface</p>
                </div>
            </Card>
        </div>
    );
}
