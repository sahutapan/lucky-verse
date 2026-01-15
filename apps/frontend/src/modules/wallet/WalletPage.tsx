import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import api from '../../services/api';
import { useBalance } from './hooks/useBalance';
import { queryClient } from '../../core/queryClient';
import { queryKeys } from '../../core/query-keys';
import { AlertCircle, CheckCircle, CreditCard, Smartphone, Wallet as WalletIcon, Bitcoin } from 'lucide-react';

export default function WalletPage() {
    const { data: balanceData } = useBalance();
    const balance = balanceData?.balance ?? null;

    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [depositMethod, setDepositMethod] = useState('card');
    const [withdrawMethod, setWithdrawMethod] = useState('upi');
    const { register, handleSubmit, reset } = useForm();

    const onDeposit = async (data: any) => {
        try {
            await api.post('/wallet/deposit', { ...data, amount: Number(data.amount), method: depositMethod });
            setMessage({ type: 'success', text: 'Deposit successful!' });
            reset();
            queryClient.invalidateQueries({ queryKey: queryKeys.wallet.balance() });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.response?.data?.detail || 'Deposit failed' });
        }
    };

    const onWithdraw = async (data: any) => {
        try {
            await api.post('/wallet/withdraw', { ...data, amount: Number(data.amount), method: withdrawMethod });
            setMessage({ type: 'success', text: 'Withdrawal successful!' });
            reset();
            queryClient.invalidateQueries({ queryKey: queryKeys.wallet.balance() });

            setTimeout(() => setMessage(null), 3000);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.response?.data?.detail || 'Withdrawal failed' });
        }
    };

    const paymentMethods = [
        { id: 'card', label: 'Card', icon: CreditCard },
        { id: 'upi', label: 'UPI', icon: Smartphone },
        { id: 'crypto', label: 'Crypto', icon: Bitcoin },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-h1 font-bold mb-2">Wallet</h1>
                <p className="text-body text-text-secondary">
                    Manage your virtual currency and transactions
                </p>
            </div>

            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-accent-dark via-accent-primary to-accent-secondary border-none">
                <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                        <WalletIcon className="h-6 w-6 text-white" />
                        <span className="text-body text-white/80 font-medium uppercase tracking-wide">
                            Current Balance
                        </span>
                        <Badge variant="default" className="bg-white/20 text-white border-white/30">
                            Sandbox
                        </Badge>
                    </div>
                    <div className="text-display-md font-extrabold text-white">
                        {balance !== null ? Number(balance).toLocaleString('en-IN') : '...'}
                    </div>
                </CardContent>
            </Card>

            {/* Message */}
            {message && (
                <div className={`flex items-center gap-2 rounded-lg p-4 ${message.type === 'success'
                    ? 'bg-success-bg border border-success/30 text-success'
                    : 'bg-error-bg border border-error/30 text-error'
                    }`}>
                    {message.type === 'success' ? (
                        <CheckCircle className="h-5 w-5" />
                    ) : (
                        <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="text-body font-medium">{message.text}</span>
                </div>
            )}

            {/* Deposit & Withdraw */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Deposit */}
                <Card>
                    <CardHeader>
                        <CardTitle>Deposit</CardTitle>
                        <p className="text-body-sm text-text-tertiary">Sandbox Mode - No real money</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Payment Method Selection */}
                        <div>
                            <label className="block text-body-sm font-medium text-text-secondary mb-3">
                                Payment Method
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => setDepositMethod(method.id)}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-fast ${depositMethod === method.id
                                            ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                                            : 'border-border bg-surface-base hover:bg-surface-hover text-text-secondary'
                                            }`}
                                    >
                                        <method.icon className="h-5 w-5" />
                                        <span className="text-caption font-medium">{method.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onDeposit)} className="space-y-4">
                            <div>
                                <label className="block text-body-sm font-medium text-text-secondary mb-2">
                                    Amount (LVC)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="1000"
                                    {...register('amount', { required: true, min: 1 })}
                                />
                            </div>

                            <Button fullWidth size="lg" type="submit" className="mt-2">
                                Deposit Funds
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Withdraw */}
                <Card>
                    <CardHeader>
                        <CardTitle>Withdraw</CardTitle>
                        <p className="text-body-sm text-text-tertiary">Sandbox Mode - No real money</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Payment Method Selection */}
                        <div>
                            <label className="block text-body-sm font-medium text-text-secondary mb-3">
                                Withdrawal Method
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => setWithdrawMethod(method.id)}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-fast ${withdrawMethod === method.id
                                            ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                                            : 'border-border bg-surface-base hover:bg-surface-hover text-text-secondary'
                                            }`}
                                    >
                                        <method.icon className="h-5 w-5" />
                                        <span className="text-caption font-medium">{method.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onWithdraw)} className="space-y-4">
                            <div>
                                <label className="block text-body-sm font-medium text-text-secondary mb-2">
                                    Amount (LVC)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="500"
                                    {...register('amount', { required: true, min: 1 })}
                                />
                            </div>

                            <Button fullWidth size="lg" variant="secondary" type="submit" className="mt-2">
                                Withdraw Funds
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
