import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md border bg-surface-base px-4 py-2 text-body text-text-primary placeholder:text-text-placeholder transition-fast',
                    'border-border focus:border-accent-primary focus:glow-accent focus:outline-none',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    error && 'border-error focus:border-error',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
