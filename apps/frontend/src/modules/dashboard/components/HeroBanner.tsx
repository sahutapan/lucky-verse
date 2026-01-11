import { Button } from '@/components/ui/Button';
import pirateBannerImage from '@/assets/banners/pirate_home_page_banner.png';
import { ArrowRight, Trophy } from 'lucide-react';

interface HeroBannerProps {
    isLoggedIn?: boolean;
    userName?: string;
}

export function HeroBanner({ isLoggedIn = false, userName }: HeroBannerProps) {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Main Content Container */}
            <div className="relative container mx-auto max-w-casino px-6 py-6">
                {/* Full-Width Banner with Image Background */}
                <div className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    {/* Background Image */}
                    <img
                        src={pirateBannerImage}
                        alt="Pirate Adventure"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                        style={{ objectPosition: 'center 10%' }}
                    />

                    {/* Dark Gradient Overlay for better text readability - Deeper for premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-void via-navy-void/80 to-transparent"></div>

                    {/* Content Overlay */}
                    <div className="relative h-full flex items-center px-8 md:px-12 lg:px-16">
                        <div className="max-w-xl space-y-6">
                            {/* Pirate Main Title */}
                            <div>
                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight drop-shadow-lg">
                                    <span className="text-white block">PLAY BOLD.</span>
                                    <span className="text-gradient-gold block">SAIL WILD.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-white/90 max-w-md font-medium">
                                    Win legendary loot in the high seas casino.
                                </p>
                            </div>

                            {/* Context-Aware CTA Section */}
                            <div className="flex flex-col items-start gap-3">
                                <Button
                                    size="lg"
                                    className="relative group bg-gradient-to-r from-pirate-gold via-pirate-gold-light to-pirate-gold text-pirate-void font-bold px-10 py-6 text-xl border-2 border-pirate-gold-light shadow-glow-treasure hover:shadow-glow-treasure-strong animate-pulse-slow transition-all duration-300 hover:-translate-y-1"
                                >
                                    <span className="flex items-center gap-2">
                                        {isLoggedIn ? 'Start Playing' : 'Get Bonus & Play'}
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>

                                {/* Trust-First Microcopy */}
                                <div className="flex flex-col gap-1">
                                    <span className="flex items-center gap-2 text-sm text-pirate-gold/90 font-medium">
                                        <Trophy className="w-4 h-4" />
                                        {isLoggedIn
                                            ? "Start with your free bonus coins"
                                            : "🎁 Get 5,000 bonus coins on signup"
                                        }
                                    </span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
