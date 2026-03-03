import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    as?: 'button' | 'a';
    href?: string;
}

const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
    ({ className, variant = 'primary', as = 'button', ...props }, ref) => {
        const Component = as as any;
        return (
            <Component
                ref={ref}
                className={clsx(styles.button, styles[variant], className)}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };
