import { useState } from 'react';
import { HeroBanner } from './components/HeroBanner';
import { GameFilters } from './components/GameFilters';
import { WeeklyTop10 } from './components/WeeklyTop10';
import { PremiumGameCard } from './components/PremiumGameCard';
import { Flame, Sparkles, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

import pirateDice from '../../assets/game-thumbnail/prirate-dice.png';
import royalRoulette from '../../assets/game-thumbnail/royal-pirate-roulette.png';
import krakenTreasures from '../../assets/game-thumbnail/treasures-of-kraken.png';

// Sample game data
const hotGames = [
    {
        id: 'kraken-treasures',
        name: 'Treasures of Kraken',
        thumbnail: krakenTreasures,
        type: 'luck' as const,
        players: 1250,
        dailyDrops: '$10,000',
    },
    {
        id: 'royal-roulette',
        name: 'Royal Pirate Roulette',
        thumbnail: royalRoulette,
        type: 'luck' as const,
        players: 2100,
        dailyDrops: '500x',
    },
    {
        id: 'pirate-dice',
        name: 'Pirate Dice',
        thumbnail: pirateDice,
        type: 'skill' as const,
        players: 890,
        dailyDrops: '$5,000',
    },
    {
        id: 'blackjack-pro',
        name: 'Blackjack Pro',
        type: 'skill' as const,
        players: 890,
    },
];

const newGames = [
    {
        id: 'teen-patti-deluxe',
        name: 'Teen Patti Deluxe',
        type: 'skill' as const,
        players: 567,
    },
    {
        id: 'andar-bahar-premium',
        name: 'Andar Bahar Premium',
        type: 'luck' as const,
        players: 342,
        dailyDrops: '2x',
    },
    {
        id: 'baccarat-vip',
        name: 'Baccarat VIP',
        type: 'skill' as const,
        players: 423,
    },
    {
        id: 'lucky-slots-777',
        name: 'Lucky Slots 777',
        type: 'luck' as const,
        players: 1890,
    },
];

const allGames = [
    ...hotGames,
    ...newGames,
    {
        id: 'poker-classic',
        name: 'Classic Poker',
        type: 'skill' as const,
        players: 756,
    },
    {
        id: 'dice-rush',
        name: 'Dice Rush',
        type: 'luck' as const,
        players: 445,
    },
];

export default function DashboardPage() {
    // Mock Auth State for UX Demonstration
    const [isLoggedIn] = useState(false);

    const handleGamePlay = (gameId: string, gameName: string) => {
        console.log(`Playing ${gameName} (${gameId})`);
        // Navigate to game page
    };

    return (
        <div className="min-h-screen bg-navy-void relative">
            {/* Hero Banner with Context-Aware CTA */}
            <HeroBanner isLoggedIn={isLoggedIn} />

            {/* Game Filters (Search, Tags) */}
            <GameFilters />

            {/* Game Sections */}
            <div className="container mx-auto max-w-casino px-6 lg:px-10 py-8 space-y-12">
                {/* Hot Games Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Flame className="w-6 h-6 text-pirate-rust" />
                            <h2 className="font-display text-h2 font-bold text-gradient-gold">
                                Treasure Hunts
                            </h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-navy-void/80 p-1 rounded-lg border border-white/10">
                                <button className="p-1.5 rounded-md text-white/20 hover:text-pirate-gold hover:bg-white/5 transition-colors disabled:opacity-30">
                                    <ChevronLeft size={16} />
                                </button>
                                <button className="p-1.5 rounded-md bg-pirate-gold text-pirate-void shadow-sm">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-void/80 border border-white/10 hover:border-pirate-gold/30 transition-colors group">
                                <span className="text-xs font-bold text-white group-hover:text-pirate-gold transition-colors">View all</span>
                                <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/40 group-hover:bg-pirate-gold/10">16</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {hotGames.map((game) => (
                            <PremiumGameCard
                                key={game.id}
                                {...game}
                                onPlay={() => handleGamePlay(game.id, game.name)}
                            />
                        ))}
                    </div>
                </section>

                {/* Weekly Top 10 Section */}
                <WeeklyTop10 />

                {/* New Games Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-pirate-gold-light" />
                            <h2 className="font-display text-h2 font-bold text-white">
                                New Loot
                            </h2>
                        </div>
                        <button className="text-pirate-gold hover:text-pirate-gold-light text-sm font-medium transition-fast">
                            View All →
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {newGames.map((game) => (
                            <PremiumGameCard
                                key={game.id}
                                {...game}
                                onPlay={() => handleGamePlay(game.id, game.name)}
                            />
                        ))}
                    </div>
                </section>

                {/* All Games Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-pirate-gold" />
                            <h2 className="font-display text-h2 font-bold text-white">
                                All Adventures
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {allGames.map((game) => (
                            <PremiumGameCard
                                key={game.id}
                                {...game}
                                onPlay={() => handleGamePlay(game.id, game.name)}
                            />
                        ))}
                    </div>
                </section>
            </div>


        </div>
    );
}
