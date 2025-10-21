import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-normal transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
                outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                success: 'bg-green-600 text-white shadow-xs hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800',
            },
            size: {
                default: 'h-7 px-2 rounded-sm py-2 text-xs',
                sm: 'h-7 px-2 rounded-sm py-2 text-xs',
                lg: 'h-7 rounded-sm px-8',
                icon: 'h-fit w-fit p-1',
                xs: 'px-2 py-1 gap-2 text-xs',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
