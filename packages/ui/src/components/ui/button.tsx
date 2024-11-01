import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@repo/ui/lib/utils';

const buttonVariants = cva(
  'ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-medium ui-ring-offset-white ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-slate-950 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50 dark:ui-ring-offset-slate-950 dark:focus-visible:ui-ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'ui-bg-schiphol-blue ui-text-white hover:ui-bg-schiphol-blue/90 dark:ui-bg-white dark:ui-text-schiphol-blue dark:hover:ui-bg-white/90',
        destructive:
          'ui-bg-red-500 ui-text-white hover:ui-bg-red-500/90 dark:ui-bg-red-900 dark:ui-text-white dark:hover:ui-bg-red-900/90',
        outline:
          'ui-border ui-border-slate-200 ui-bg-white hover:ui-bg-slate-100 hover:ui-text-schiphol-blue dark:ui-border-slate-800 dark:ui-bg-slate-950 dark:hover:ui-bg-slate-800 dark:hover:ui-text-white',
        secondary:
          'ui-bg-slate-100 ui-text-schiphol-blue hover:ui-bg-slate-100/80 dark:ui-bg-slate-800 dark:ui-text-white dark:hover:ui-bg-slate-800/80',
        ghost: 'hover:ui-bg-slate-100 hover:ui-text-schiphol-blue dark:hover:ui-bg-slate-800 dark:hover:ui-text-white',
        link: 'ui-text-schiphol-blue ui-underline-offset-4 hover:ui-underline dark:ui-text-white',
      },
      size: {
        default: 'ui-h-10 ui-px-4 ui-py-2',
        sm: 'ui-h-9 ui-rounded-md ui-px-3',
        lg: 'ui-h-11 ui-rounded-md ui-px-8',
        icon: 'ui-h-10 ui-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
