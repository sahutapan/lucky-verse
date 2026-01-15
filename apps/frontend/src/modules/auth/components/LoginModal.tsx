import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuthModal } from '../useAuthModal';
import { useLogin } from '../hooks/useLogin';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginFormData {
    email: string;
    password: string;
}

export function LoginModal() {
    const { activeModal, closeModal, openRegisterModal } = useAuthModal();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>();
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync: login, isPending: loading, error: mutationError } = useLogin();

    const isOpen = activeModal === 'login';

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);

            // Close modal and reset form
            reset();
            closeModal();
        } catch (err) {
            // Error is handled by TanStack Query and exposed via mutationError
            console.error('Login error:', err);
        }
    };

    const error = mutationError ? (mutationError as any).response?.data?.detail || 'Login failed' : '';

    const handleSwitchToRegister = () => {
        reset();
        closeModal();
        setTimeout(() => openRegisterModal(), 150);
    };

    const handleClose = () => {
        reset();
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="⚓ Board the Ship"
            maxWidth="md"
        >
            <p className="text-body text-pirate-parchment/70 mb-6">
                Set sail on your treasure-hunting adventure
            </p>

            {error && (
                <div className="mb-4 flex items-center gap-2 rounded-md bg-pirate-maroon/20 border border-pirate-maroon/50 p-3 text-body-sm text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
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
                </div>

                <Button
                    fullWidth
                    size="lg"
                    type="submit"
                    disabled={loading}
                    className="mt-6"
                >
                    {loading ? 'Boarding...' : 'Set Sail'}
                </Button>

                <p className="text-center text-body-sm text-pirate-parchment/60 mt-4">
                    Not a crew member yet?{' '}
                    <button
                        type="button"
                        onClick={handleSwitchToRegister}
                        className="text-pirate-gold hover:text-pirate-gold-light transition-fast font-medium"
                    >
                        Join the Crew
                    </button>
                </p>
            </form>
        </Modal>
    );
}
