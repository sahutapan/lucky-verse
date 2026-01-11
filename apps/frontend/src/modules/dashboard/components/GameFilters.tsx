import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../../lib/utils';

const tags = [
    { id: 'all', name: 'All' },
    { id: 'new', name: 'New' },
    { id: 'top', name: 'Top' },
    { id: 'hot', name: 'Hot' },
    { id: 'megaways', name: 'Megaways' },
    { id: 'jackpot', name: 'Jackpot' },
    { id: 'buy_bonus', name: 'Buy Bonus' },
    { id: 'recent', name: 'Recent Games' },
];

export function GameFilters() {
    const [activeTag, setActiveTag] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="w-full relative z-20 mb-8 pt-6">
            <div className="container mx-auto max-w-[1440px] px-4 md:px-6 flex flex-col gap-6">

                {/* --- Search, Tags, Controls --- */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

                    {/* Left: Search Bar */}
                    <div className="w-full lg:w-64 relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-white/30 group-focus-within:text-pirate-gold transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search game"
                            className="block w-full pl-10 pr-3 py-2.5 bg-navy-void/80 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-pirate-gold/50 focus:bg-navy-void transition-all"
                        />
                    </div>

                    {/* Middle: Tags (Pills) - Pirate Gold Theme */}
                    <div className="flex-1 w-full overflow-x-auto scrollbar-hide mask-fade-right">
                        <div className="flex items-center gap-2 p-1">
                            {tags.map((tag) => {
                                const isActive = activeTag === tag.id;
                                return (
                                    <button
                                        key={tag.id}
                                        onClick={() => setActiveTag(tag.id)}
                                        className={cn(
                                            "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border",
                                            isActive
                                                ? "bg-pirate-gold text-pirate-void border-pirate-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                                                : "bg-transparent border-transparent text-white/40 hover:text-pirate-gold hover:bg-white/5"
                                        )}
                                    >
                                        {tag.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
