import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import api from '../../services/api';
import { AlertCircle } from 'lucide-react';

export default function RegisterPage() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            setError('');

            await api.post('/auth/register', {
                email: data.email,
                username: data.username,
                password: data.password
            });

            // Show success and redirect
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-h2 text-gradient-gold">
                        ⚔️ Join the Crew
                    </CardTitle>
                    <p className="text-center text-body text-pirate-parchment/70 mt-2">
                        Become a legendary pirate captain
                    </p>
                </CardHeader>

                <CardContent>
                    {error && (
                        <div className="mb-4 flex items-center gap-2 rounded-md bg-pirate-maroon/20 border border-pirate-maroon/50 p-3 text-body-sm text-red-400">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-body-sm font-medium text-text-secondary mb-2">
                                Username
                            </label>
                            <Input
                                type="text"
                                placeholder="gamer123"
                                {...register('username', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="block text-body-sm font-medium text-text-secondary mb-2">
                                Email
                            </label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                {...register('email', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="block text-body-sm font-medium text-text-secondary mb-2">
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            <p className="text-caption text-text-tertiary mt-1">
                                At least 6 characters
                            </p>
                        </div>

                        <Button
                            fullWidth
                            size="lg"
                            type="submit"
                            disabled={loading}
                            className="mt-6"
                        >
                            {loading ? 'Recruiting...' : '🏴‍☠️ Join Crew'}
                        </Button>

                        <p className="text-center text-body-sm text-pirate-parchment/60 mt-4">
                            Already aboard?{' '}
                            <RouterLink
                                to="/login"
                                className="text-pirate-gold hover:text-pirate-gold-light transition-fast font-medium"
                            >
                                Set Sail
                            </RouterLink>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
