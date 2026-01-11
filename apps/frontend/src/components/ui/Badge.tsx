import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-caption font-medium transition-fast',
    {
        variants: {
            variant: {
                default: 'bg-surface-elevated text-text-primary border border-border',
                skill: 'bg-info/20 text-skill border border-skill/30',
                luck: 'bg-warning/20 text-luck border border-luck/30',
                success: 'bg-success-bg text-success border border-success/30',
                error: 'bg-error-bg text-error border border-error/30',
                warning: 'bg-warning-bg text-warning border border-warning/30',
                accent: 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
