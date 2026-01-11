import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Gift, Menu, X, ChevronRight, MessageSquarePlus, UserPlus } from 'lucide-react';
import logo from '../../assets/icons/games/lucky-verse-logo.png';

interface NavItem {
    name: string;
    icon: string;
    path: string;
    category?: string;
}

interface VIPItem {
    name: string;
    icon: any;
    path: string;
    highlight?: boolean;
    badge?: string;
}

const gameCategories: NavItem[] = [
    { name: 'All Adventures', icon: '⚓', path: '/' },
    { name: 'Favorites', icon: '⭐', path: '/games?category=favorites', category: 'favorites' },
    { name: 'Popular', icon: '🔥', path: '/games?category=popular', category: 'popular' },
    { name: 'Top', icon: '🏆', path: '/games?category=top', category: 'top' },
    { name: 'Treasure Slots', icon: '🎰', path: '/games?category=slots', category: 'slots' },
    { name: 'Cannon Crash', icon: '💣', path: '/games?category=crash', category: 'crash' },
    { name: 'Pirate Dice', icon: '🎲', path: '/games?category=dice', category: 'dice' },
    { name: 'Wheel of Fortune', icon: '🔥', path: '/games?category=roulette', category: 'roulette' },
    { name: 'Treasure Mines', icon: '💎', path: '/games?category=mines', category: 'mines' },
    { name: 'Sword Duel', icon: '🗡️', path: '/games?category=cards', category: 'cards' },
];

const vipSections: VIPItem[] = [
    { name: 'Refer a Friend', icon: UserPlus, path: '/referral', highlight: true },
    // { name: 'Treasure Chest', icon: Gift, path: '/deposit', highlight: true, badge: 'BONUS' },
    { name: 'Pirate Ranks', icon: Trophy, path: '/ranks' },
];



export function Sidebar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-20 left-4 z-50 lg:hidden p-2 rounded-lg bg-pirate-wood-dark border border-pirate-rust/50 text-pirate-gold"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Backdrop Overlay (Mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:sticky top-0 left-0 h-screen z-40 w-64 bg-navy-void border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo Section */}
                <div className="px-6 pt-3 pb-3 border-b border-white/5 bg-white/[0.02]">
                    <Link to="/" className="flex items-center justify-center group">
                        <img src={logo} alt="LuckyVerse" className="w-20 h-20 object-contain" />
                    </Link>
                </div>

                {/* Scrollable Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
                    {/* Game Categories */}
                    <div>
                        <ul className="space-y-1">
                            {gameCategories.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${isActive(item.path) ? 'bg-gradient-to-r from-pirate-gold/20 via-pirate-gold/5 to-transparent border-l-[3px] border-pirate-gold text-pirate-gold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' : 'text-pirate-parchment/60 hover:text-pirate-gold hover:bg-white/[0.03] border-l-[3px] border-transparent hover:pl-4'}`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* VIP Sections */}
                    <div>
                        <div className="h-px bg-pirate-rust/20 mb-2"></div>
                        <ul className="space-y-2">
                            {vipSections.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${item.highlight ? 'bg-gradient-to-r from-pirate-gold/20 to-pirate-void/50 border border-pirate-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'bg-white/[0.03] border border-white/5 hover:border-pirate-gold/30 hover:bg-white/[0.05]'} ${isActive(item.path) ? 'border-pirate-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : ''}`}
                                        >
                                            <Icon className={`w-5 h-5 ${item.highlight ? 'text-pirate-gold' : 'text-pirate-parchment/70'}`} />
                                            <span className={`text-sm font-bold ${item.highlight ? 'text-white' : 'text-pirate-parchment/80'}`}>
                                                {item.name}
                                            </span>
                                            {item.badge && (
                                                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-pirate-rust text-white rounded-full">
                                                    {item.badge}
                                                </span>
                                            )}
                                            {item.highlight && (
                                                <ChevronRight className="ml-auto w-4 h-4 text-pirate-gold/50" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>


                </nav>

                {/* Feedback Button */}
                <div className="p-4 border-t border-pirate-gold/20 bg-black/20">
                    <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-pirate-rust/10 border border-pirate-rust/30 text-pirate-parchment hover:text-white hover:bg-pirate-rust/20 hover:border-pirate-rust/50 transition-all group">
                        <MessageSquarePlus className="w-3.5 h-3.5 text-pirate-gold/70 group-hover:text-pirate-gold" />
                        <span className="text-xs font-medium">Feedback</span>
                    </button>
                </div>
            </aside >
        </>
    );
}
