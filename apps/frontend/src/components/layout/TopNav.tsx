import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/useAuth';
import { useAuthModal } from '../../modules/auth/useAuthModal';
import { useLogout } from '../../modules/auth/hooks/useLogout';
import { useBalance } from '../../modules/wallet/hooks/useBalance';
import { Button } from '../ui/Button';
import { Wallet, Bell, LogOut, Home, ChevronDown } from 'lucide-react';
import coinIcon from '../../assets/icons/games/coin-icon.png';

export function TopNav() {
    const { user } = useAuth();
    const { openLoginModal, openRegisterModal } = useAuthModal();
    const navigate = useNavigate();
    const { mutate: logout } = useLogout();
    const { data: walletData } = useBalance();

    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                setShowProfile(false);
                navigate('/');
            }
        });
    };


    const handleDepositClick = () => {
        if (!user) {
            openLoginModal();
        } else {
            navigate('/wallet');
        }
    };

    const balance = walletData?.balance ?? null;

    return (
        <nav className="sticky top-0 z-40 w-full h-16">
            <div className="container mx-auto max-w-casino h-full flex items-center justify-end px-4 lg:px-6 gap-4">

                {/* Right: User Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Show when logged in */}
                    {user ? (
                        <>
                            {/* Treasure Balance Display */}
                            <button
                                onClick={() => navigate('/wallet')}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-pirate-gold/30 hover:border-pirate-gold/60 hover:bg-white/10 transition-all"
                            >
                                <img src={coinIcon} alt="Coin" className="w-5 h-5" />
                                <span className="font-mono font-bold text-sm text-pirate-gold hidden sm:inline">
                                    {balance !== null ? Number(balance).toLocaleString('en-IN') : '...'}
                                </span>
                            </button>

                            {/* Deposit Button - Treasure themed */}
                            <button
                                onClick={handleDepositClick}
                                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-pirate-gold to-pirate-gold-light hover:from-pirate-gold-light hover:to-pirate-gold text-pirate-void font-bold text-sm transition-all hover:shadow-lg hover:shadow-pirate-gold/40"
                            >
                                Deposit
                            </button>

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative p-2 rounded-lg hover:bg-white/10 transition-all"
                                >
                                    <Bell className="w-5 h-5 text-white/80 hover:text-white" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full animate-pulse"></span>
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-pirate-charcoal border border-pirate-rust/30 rounded-xl shadow-2xl overflow-hidden">
                                        <div className="p-4 border-b border-pirate-rust/20 bg-pirate-wood-dark/50">
                                            <h3 className="font-bold text-white">Notifications</h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            <div className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all">
                                                <p className="text-sm text-white/90">Welcome aboard, matey! 🏴‍☠️</p>
                                                <p className="text-xs text-white/50 mt-1">Just now</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Profile Avatar */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pirate-gold to-pirate-rust flex items-center justify-center border-2 border-pirate-gold/50 font-bold text-pirate-void text-sm">
                                        {user?.username?.[0]?.toUpperCase()}
                                    </div>
                                    {/* Chevron Down icon */}
                                    <ChevronDown className="w-4 h-4 text-pirate-parchment/80" />
                                </button>

                                {showProfile && (
                                    <div className="absolute right-0 mt-2 w-56 bg-pirate-charcoal border border-pirate-rust/30 rounded-xl shadow-2xl overflow-hidden">
                                        <div className="p-4 border-b border-pirate-rust/20 bg-pirate-wood-dark/50">
                                            <p className="font-bold text-white">{user?.username}</p>
                                            <p className="text-xs text-pirate-parchment/60">{user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <button
                                                onClick={() => {
                                                    setShowProfile(false);
                                                    navigate('/');
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-left text-white/80 hover:text-white"
                                            >
                                                <Home className="w-4 h-4" />
                                                <span className="text-sm">Dashboard</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowProfile(false);
                                                    navigate('/wallet');
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-left text-white/80 hover:text-white"
                                            >
                                                <Wallet className="w-4 h-4" />
                                                <span className="text-sm">Wallet</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowProfile(false);
                                                    handleLogout();
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all text-left"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        /* Show when NOT logged in */
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={openLoginModal}
                            >
                                Login
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={openRegisterModal}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
