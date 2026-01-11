import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pirate-gold focus-visible:ring-offset-2 focus-visible:ring-offset-pirate-void disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
    {
        variants: {
            variant: {
                // Pirate engraved gold button
                primary: 'bg-gradient-to-b from-pirate-gold via-pirate-gold-dark to-pirate-rust border-2 border-pirate-gold-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] text-pirate-void before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
                // Wooden plank button
                secondary: 'bg-pirate-wood-dark border-2 border-pirate-rust/50 text-pirate-parchment shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] hover:bg-pirate-rust/20 hover:border-pirate-rust',
                ghost: 'bg-transparent text-pirate-parchment/80 hover:bg-white/5 hover:text-white',
                destructive: 'bg-pirate-maroon text-white hover:bg-pirate-maroon/90 border-2 border-pirate-maroon/50',
                outline: 'border-2 border-pirate-gold/30 bg-transparent text-pirate-gold hover:bg-pirate-gold/10 hover:border-pirate-gold/60',
            },
            size: {
                sm: 'h-9 px-4 text-sm',
                md: 'h-10 px-6 text-body',
                lg: 'h-12 px-8 text-body-lg',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
