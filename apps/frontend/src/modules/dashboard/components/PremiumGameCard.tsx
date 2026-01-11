import { Trophy } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PremiumGameCardProps {
    id: string;
    name: string;
    thumbnail?: string;
    type: 'skill' | 'luck';
    players?: number;
    dailyDrops?: string;
    onPlay?: () => void;
}

export function PremiumGameCard({
    name,
    thumbnail,
    type,
    players,
    dailyDrops = "$10k Drop", // Fallback for visual weight
    onPlay,
}: PremiumGameCardProps) {

    return (
        <div
            className={cn(
                // CORE STRUCTURE & SHAPE
                "group relative w-full aspect-[3/4] rounded-xl overflow-hidden cursor-pointer",
                "bg-[#0B0F19] border border-white/5", // Dark Base Panel

                // ANTI-GRAVITY PHYSICS (Idle -> Hover -> Active)
                "transition-all duration-200 ease-out", // Smooth premium feel
                "shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]", // Idle: Ambient shadow

                // Hover State: Lift & Glow
                "hover:scale-[1.03] hover:-translate-y-1.5",
                "hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]", // Deepened shadow
                "hover:border-pirate-gold/30 hover:ring-1 hover:ring-pirate-gold/20", // Subtle border glow

                // Active State: Tactile Press
                "active:scale-[0.98] active:translate-y-0 active:shadow-none"
            )}
            onClick={onPlay}
        >
            {/* 1. HERO AREA (Artwork) */}
            <div className="relative h-[72%] w-full overflow-hidden bg-navy-void">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                        <div className="text-6xl opacity-20 group-hover:rotate-12 transition-transform duration-500">
                            {type === 'skill' ? '🎯' : '🎰'}
                        </div>
                    </div>
                )}

                {/* Visual Depth: Vignette & Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/30 opacity-80" /> {/* Smooth blend to footer */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> {/* Dark hover overlay */}
            </div>

            {/* 3. CARD BODY (Info Panel) */}
            <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-b from-[#0B0F19] to-[#090C14] px-4 py-3 border-t border-white/5 flex flex-col justify-center z-10 group-hover:bg-[#0B0F19] transition-colors">

                {/* Identity & Trust */}
                <div className="flex flex-col gap-1.5 w-full">
                    {/* Game Title */}
                    <h3 className="font-display font-black text-base text-white uppercase tracking-tight truncate leading-none drop-shadow-sm group-hover:text-pirate-gold transition-colors duration-200">
                        {name}
                    </h3>

                    {/* Meta Row: Online + Rewards */}
                    <div className="flex items-center gap-3 text-[10px] font-medium text-white/40">
                        {players && (
                            <div className="flex items-center gap-1 text-emerald-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.5)]"></div>
                                <span>{players}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 text-pirate-gold/80">
                            <Trophy className="w-3 h-3" />
                            <span className="truncate max-w-[80px]">{dailyDrops}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
