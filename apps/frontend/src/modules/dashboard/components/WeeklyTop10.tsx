import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PremiumGameCard } from './PremiumGameCard';
import { cn } from '../../../lib/utils';

interface TopGame {
    id: string;
    name: string;
    type: 'skill' | 'luck';
    thumbnail?: string;
    players?: number;
    dailyDrops?: string;
    rank: number;
}

const topGames: TopGame[] = [
    { id: '1', name: 'Sugar Rush 1000', type: 'luck', rank: 1, players: 2450 },
    { id: '2', name: 'Le King', type: 'skill', rank: 2, players: 1890 },
    { id: '3', name: 'Barbarossa Empire', type: 'luck', rank: 3, players: 1650 },
    { id: '4', name: 'Sea of Spirits', type: 'luck', rank: 4, players: 1420 },
    { id: '5', name: 'Gates of Olympus', type: 'luck', rank: 5, players: 1380 },
    { id: '6', name: 'Treasure Hunt', type: 'skill', rank: 6, players: 1200 },
    { id: '7', name: 'Kraken Deep', type: 'luck', rank: 7, players: 1150 },
    { id: '8', name: 'Golden Galleon', type: 'luck', rank: 8, players: 980 },
    { id: '9', name: 'Pirate\'s Bounty', type: 'skill', rank: 9, players: 870 },
    { id: '10', name: 'Captain\'s Fortune', type: 'luck', rank: 10, players: 760 },
];

export function WeeklyTop10() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Check scroll position and update button states
    const updateScrollState = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px threshold
    };

    // Initial check and on resize
    useEffect(() => {
        updateScrollState();
        window.addEventListener('resize', updateScrollState);
        return () => window.removeEventListener('resize', updateScrollState);
    }, []);

    // Scroll handlers
    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <section className="py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                    This Week's <span className="text-pirate-gold">Top 10</span>
                </h2>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-navy-void/80 p-1 rounded-lg border border-white/10">
                        <button
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            className={cn(
                                "p-1.5 rounded-md transition-colors",
                                canScrollLeft
                                    ? "bg-pirate-gold text-pirate-void shadow-sm"
                                    : "text-white/20 cursor-not-allowed"
                            )}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                            className={cn(
                                "p-1.5 rounded-md transition-colors",
                                canScrollRight
                                    ? "bg-pirate-gold text-pirate-void shadow-sm"
                                    : "text-white/20 cursor-not-allowed"
                            )}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable Cards Container with Rank Numbers */}
            <div
                ref={scrollContainerRef}
                onScroll={updateScrollState}
                className="relative overflow-x-auto overflow-y-hidden -mx-4 px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex gap-2 pb-4">
                    {topGames.map((game) => (
                        <div
                            key={game.id}
                            className="flex items-end flex-shrink-0"
                        >
                            {/* Giant Rank Number (Visible on Left) */}
                            <span
                                className="text-[100px] font-black leading-none select-none mr-[-20px] mb-2 text-white/10"
                                style={{
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    textShadow: '0 0 40px rgba(255,255,255,0.05)',
                                }}
                            >
                                {game.rank}
                            </span>

                            {/* Use Existing PremiumGameCard */}
                            <div className="relative z-10" style={{ width: '160px' }}>
                                <PremiumGameCard
                                    id={game.id}
                                    name={game.name}
                                    type={game.type}
                                    thumbnail={game.thumbnail}
                                    players={game.players}
                                    dailyDrops={game.dailyDrops}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
