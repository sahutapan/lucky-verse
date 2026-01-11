import { useState } from 'react';
import { MessageSquare, Users, Mail, Gift, Gamepad2, Coins, Clock, PanelRightClose, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface Friend {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'playing';
    game?: string;
}

interface FriendRequest {
    id: string;
    name: string;
    avatar: string;
}

const friendRequests: FriendRequest[] = [
    { id: '1', name: 'Wingwon', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wingwon' },
    { id: '2', name: 'Jacob Clark 89', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob' },
];

const onlineFriends: Friend[] = [
    { id: '3', name: 'Cyber pilot', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber', status: 'playing', game: 'Tiki Runner 2' },
    { id: '4', name: 'Future Saruman', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Future', status: 'online' },
    { id: '5', name: 'Woodworm', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Woodworm', status: 'online' },
];

const offlineFriends: Friend[] = [
    { id: '6', name: 'Anchovy King', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anchovy', status: 'offline' },
    { id: '7', name: 'Alan Frost', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alan', status: 'offline' },
];

export function RightSidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<'friends' | 'chat'>('friends');
    const [showOffline, setShowOffline] = useState(false);

    return (
        <aside
            className={cn(
                "hidden xl:flex flex-col h-screen border-l border-white/5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-40 bg-[#050810]",
                isExpanded ? "w-80" : "w-16 items-center"
            )}
        >
            {/* COLLAPSED RAIL STATE */}
            {!isExpanded && (
                <div className="flex flex-col items-center py-6 gap-6 w-full h-full">
                    {/* Toggle Expander */}
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-pirate-gold hover:bg-white/10 transition-all hover:scale-105"
                        title="Open Social Panel"
                    >
                        <Users size={20} />
                        {onlineFriends.length > 0 && (
                            <span className="absolute top-5 right-4 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_4px_rgba(16,185,129,0.6)]"></span>
                        )}
                    </button>

                    {/* Quick Actions (Mini) */}
                    <div className="flex flex-col gap-4 mt-auto mb-6">
                        <div className="w-8 h-[1px] bg-white/10 mx-auto"></div>
                        <button
                            onClick={() => {
                                setIsExpanded(true);
                                setActiveTab('chat');
                            }}
                            className="p-3 text-white/40 hover:text-white transition-colors relative"
                        >
                            <Mail size={20} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        </button>
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="p-3 text-pirate-gold/60 hover:text-pirate-gold transition-colors"
                        >
                            <Gift size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* EXPANDED PANEL STATE */}
            {isExpanded && (
                <div className="flex flex-col h-full w-full">

                    {/* Header Controls (Minimalist) */}
                    <div className="flex items-center justify-start p-4 pb-0">
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <PanelRightClose size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">

                        {/* RESTORED: Free Bonus Card */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-indigo-900 p-4 shadow-lg border border-white/10 mb-6">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <Gift size={60} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-sm font-bold text-white mb-1 uppercase font-display">Daily Chest</h3>
                                <p className="text-[10px] text-white/80 mb-3">Claim your free rewards!</p>

                                <div className="flex items-center justify-between bg-black/30 rounded-lg p-1 pr-1">
                                    <div className="flex items-center gap-2 px-2">
                                        <Clock size={12} className="text-yellow-400" />
                                        <span className="text-xs font-mono font-bold text-white">22:30:00</span>
                                    </div>
                                    <Button size="sm" className="h-6 text-[10px] px-2 bg-pirate-gold text-pirate-void border-0 hover:bg-white">
                                        Claim
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Tabs: Friends vs Chat */}
                        <div className="flex p-1 bg-white/5 rounded-lg mb-4">
                            <button
                                onClick={() => setActiveTab('friends')}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all",
                                    activeTab === 'friends' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
                                )}
                            >
                                <Users size={14} />
                                Friends
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all",
                                    activeTab === 'chat' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
                                )}
                            >
                                <MessageSquare size={14} />
                                Chat
                            </button>
                        </div>

                        {/* TAB CONTENT: FRIENDS */}
                        {activeTab === 'friends' && (
                            <>
                                {/* 1. Friend Requests (Card UI) */}
                                {friendRequests.length > 0 && (
                                    <div className="mb-6 space-y-2">
                                        {/* Optional Header if needed, matching Reference: No header shown in snippet, just cards */}
                                        {friendRequests.map(req => (
                                            <div key={req.id} className="flex items-center justify-between bg-[#151b2e] rounded-2xl p-3 border border-white/5 shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-[10px] bg-white/5" />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white leading-tight">{req.name}</span>
                                                        <span className="text-[10px] font-medium text-blue-400">Online</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 flex items-center justify-center text-black shadow-lg shadow-amber-900/20 transition-transform active:scale-95">
                                                        <X size={16} strokeWidth={3} />
                                                    </button>
                                                    <button className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-black shadow-lg shadow-green-900/20 transition-transform active:scale-95">
                                                        <Check size={16} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 2. Online Friends (Priority) */}
                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Online</h4>
                                    {onlineFriends.map(friend => (
                                        <div key={friend.id} className="flex items-center justify-between group cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <img src={friend.avatar} alt={friend.name} className="w-7 h-7 rounded-full bg-white/5 opacity-80 group-hover:opacity-100" />
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#050810]"></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                                                        {friend.name}
                                                    </span>
                                                    {/* Minimal Activity Status */}
                                                    {friend.status === 'playing' ? (
                                                        <div className="flex items-center gap-1 text-[10px] text-pirate-gold/70">
                                                            <Gamepad2 size={10} />
                                                            <span className="truncate max-w-[120px]">{friend.game}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1 text-[10px] text-white/20">
                                                            <Coins size={10} />
                                                            <span>In Lobby</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Quiet Action */}
                                            <button className="opacity-0 group-hover:opacity-100 p-1.5 text-white/40 hover:text-white transition-all">
                                                <MessageSquare size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* 3. Offline Toggle */}
                                <div className="pt-2 border-t border-white/5">
                                    <button
                                        onClick={() => setShowOffline(!showOffline)}
                                        className="w-full flex items-center justify-between text-[10px] uppercase font-bold text-white/20 hover:text-white/40 transition-colors"
                                    >
                                        <span>Offline</span>
                                        <span>{showOffline ? 'Hide' : 'Show'} ({offlineFriends.length})</span>
                                    </button>

                                    {showOffline && (
                                        <div className="mt-2 space-y-3">
                                            {offlineFriends.map(friend => (
                                                <div key={friend.id} className="flex items-center justify-between group cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <img src={friend.avatar} alt={friend.name} className="w-7 h-7 rounded-full bg-white/5 opacity-80 group-hover:opacity-100" />
                                                            {/* Grey Badge */}
                                                            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-slate-500 rounded-full border-2 border-[#050810]"></div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                                                                {friend.name}
                                                            </span>
                                                            <div className="text-[10px] text-white/20">Offline</div>
                                                        </div>
                                                    </div>
                                                    {/* Quiet Action */}
                                                    <button className="opacity-0 group-hover:opacity-100 p-1.5 text-white/40 hover:text-white transition-all">
                                                        <MessageSquare size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* TAB CONTENT: CHAT */}
                        {activeTab === 'chat' && (
                            <div className="flex flex-col h-full">
                                <div className="flex-1 flex flex-col items-center justify-center text-center text-white/40 min-h-[200px]">
                                    <MessageSquare size={48} className="mb-4 opacity-20" />
                                    <p className="text-sm">Global chat is loading...</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-pirate-gold/50 transition-colors"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </aside>
    );
}
