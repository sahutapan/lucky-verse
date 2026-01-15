import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuthModal } from '../useAuthModal';
import { useRegister } from '../hooks/useRegister';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { generatePirateName } from '../utils/pirateNameGenerator';
import { DiceButton } from './DiceButton';

interface RegisterFormData {
    email: string;
    username: string;
    password: string;
    referralCode?: string;
}

export function RegisterModal() {
    const { activeModal, closeModal, openLoginModal } = useAuthModal();
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<RegisterFormData>();
    const [showPassword, setShowPassword] = useState(false);
    const [isDiceRolling, setIsDiceRolling] = useState(false);

    const { mutateAsync: registerUser, isPending: loading, error: mutationError } = useRegister();

    const isOpen = activeModal === 'register';

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser({
                email: data.email,
                username: data.username,
                password: data.password,
                referral_code: data.referralCode || undefined,
            });

            // Close modal and reset form
            reset();
            closeModal();
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    const error = mutationError ? (mutationError as any).response?.data?.detail : '';
    const displayError = typeof error === 'string' ? error : Array.isArray(error) ? error.map((e: any) => e.msg).join(', ') : 'Registration failed';

    const handleGenerateUsername = () => {
        setIsDiceRolling(true);

        // Simulate rolling animation
        setTimeout(() => {
            const name = generatePirateName();
            setValue('username', name);
            setIsDiceRolling(false);
        }, 300);
    };

    const handleSwitchToLogin = () => {
        reset();
        closeModal();
        setTimeout(() => openLoginModal(), 150);
    };

    const handleClose = () => {
        reset();
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="⚔️ Join the Crew"
            maxWidth="md"
        >
            <p className="text-body text-pirate-parchment/70 mb-6">
                Become a legendary pirate captain
            </p>

            {displayError && (
                <div className="mb-4 flex items-center gap-2 rounded-md bg-pirate-maroon/20 border border-pirate-maroon/50 p-3 text-body-sm text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{displayError}</span>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-body-sm font-medium text-pirate-parchment/80 mb-2">
                        Email
                    </label>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        error={!!errors.email}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    {errors.email && (
                        <p className="text-caption text-red-400 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-body-sm font-medium text-pirate-parchment/80 mb-2">
                        Username
                    </label>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="CaptainSparrow42"
                                error={!!errors.username}
                                {...register('username', {
                                    required: 'Username is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Username must be at least 3 characters'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]+$/,
                                        message: 'Username can only contain letters, numbers, and underscores'
                                    }
                                })}
                            />
                        </div>
                        <DiceButton
                            onClick={handleGenerateUsername}
                            isRolling={isDiceRolling}
                        />
                    </div>
                    {errors.username && (
                        <p className="text-caption text-red-400 mt-1">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-body-sm font-medium text-pirate-parchment/80 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            error={!!errors.password}
                            className="pr-10"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-pirate-parchment/60 hover:text-pirate-parchment transition-fast"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-caption text-red-400 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                    <p className="text-caption text-pirate-parchment/50 mt-1">
                        At least 8 characters
                    </p>
                </div>

                <div>
                    <label className="block text-body-sm font-medium text-pirate-parchment/80 mb-2">
                        Referral Code <span className="text-pirate-parchment/50">(Optional)</span>
                    </label>
                    <Input
                        type="text"
                        placeholder="ABCD1234"
                        {...register('referralCode')}
                    />
                    <p className="text-caption text-pirate-parchment/50 mt-1">
                        Got a code from a friend? Enter it here for bonus treasure!
                    </p>
                </div>

                <Button
                    fullWidth
                    size="lg"
                    type="submit"
                    disabled={loading}
                    className="mt-6"
                >
                    {loading ? 'Recruiting...' : 'Join Crew'}
                </Button>

                <p className="text-center text-body-sm text-pirate-parchment/60 mt-4">
                    Already aboard?{' '}
                    <button
                        type="button"
                        onClick={handleSwitchToLogin}
                        className="text-pirate-gold hover:text-pirate-gold-light transition-fast font-medium"
                    >
                        Set Sail
                    </button>
                </p>
            </form>
        </Modal>
    );
}
