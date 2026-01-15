import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import api from '../../services/api';
import { useAuth } from './useAuth';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setAuth = useAuth((state) => state.setAuth);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            setError('');

            const formData = new FormData();
            formData.append('username', data.email);
            formData.append('password', data.password);

            await api.post('/auth/login', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            // Get user profile (cookies sent automatically)
            const userRes = await api.get('/users/me');

            setAuth(userRes.data);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-h2 text-gradient-gold">
                        ⚓ Board the Ship
                    </CardTitle>
                    <p className="text-center text-body text-pirate-parchment/70 mt-2">
                        Set sail on your treasure-hunting adventure
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
                            <label className="block text-body-sm font-medium text-pirate-parchment/80 mb-2">
                                Email
                            </label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                {...register('email', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="block text-body-sm font-medium text-pirate-parchment/80 mb-2">
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                {...register('password', { required: true })}
                            />
                        </div>

                        <Button
                            fullWidth
                            size="lg"
                            type="submit"
                            disabled={loading}
                            className="mt-6"
                        >
                            {loading ? 'Boarding...' : '🏴‍☠️ Set Sail'}
                        </Button>

                        <p className="text-center text-body-sm text-pirate-parchment/60 mt-4">
                            Not a crew member yet?{' '}
                            <RouterLink
                                to="/register"
                                className="text-pirate-gold hover:text-pirate-gold-light transition-fast font-medium"
                            >
                                Join the Crew
                            </RouterLink>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
