'use client';

import Link from 'next/link';
import { motion, HTMLMotionProps } from 'framer-motion';
import React, { forwardRef } from 'react';

// --- Types ---
type ButtonVariant = 'solid' | 'outline' | 'glow' | 'ghost';

type BaseProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

// 1. Props when it acts as a Link (must have href)
type LinkButtonProps = BaseProps &
  Omit<React.ComponentProps<typeof Link>, 'className'> & {
    href: string;
  };

// 2. Props when it acts as a Button (HTML motion button props)
type ActionButtonProps = BaseProps &
  Omit<HTMLMotionProps<'button'>, 'className'> & {
    href?: never; 
  };

type ButtonProps = LinkButtonProps | ActionButtonProps;

// --- Styles ---
const variantStyles: Record<ButtonVariant, string> = {
  solid:
    'bg-accent-400 text-black-950 border-2 border-transparent hover:bg-accent-500 hover:shadow-lg hover:shadow-accent-400/40 focus-visible:ring-accent-500',
  outline:
    'bg-transparent text-accent-600 border-2 border-accent-400 hover:bg-accent-400 hover:text-black-950 focus-visible:ring-accent-500',
  glow:
    'bg-black-950 text-white border-2 border-black-800 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/30 focus-visible:ring-accent-400',
  ghost:
    'bg-transparent text-black-800 hover:bg-black-100 hover:text-black-950 focus-visible:ring-black-500',
};

const baseStyles =
  'relative group inline-flex items-center justify-center px-6 py-3 font-semibold tracking-wide transition-all duration-300 ease-out rounded-lg text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden';

// --- Helper Functions ---

// FIX: We use 'unknown' here to safely check the 'rest' props object
// without explicitly allowing any type, maintaining type safety.
function isLink(props: unknown): props is LinkButtonProps {
  return typeof props === 'object' && props !== null && typeof (props as Record<string, unknown>).href === 'string';
}

// FIX: Defined outside component to prevent re-render crashes
const ShineEffect = () => (
  <motion.span
    className="absolute inset-0 z-0 block -skew-x-12"
    variants={{
      hover: {
        x: ['-100%', '200%'],
      },
    }}
    transition={{
      duration: 1,
      ease: 'easeInOut',
    }}
    style={{
      background:
        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    }}
  />
);

// --- Main Component ---

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { variant = 'solid', children, className = '', ...props },
    ref
  ) => {
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
    const showShine = variant === 'solid' || variant === 'glow';

    // RENDER: Next.js Link
    if (isLink(props)) {
      // We extract href here safely because isLink verified it exists
      const { href, ...linkProps } = props;
      
      return (
        <motion.div
          className="inline-block"
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href={href}
            {...linkProps}
            className={combinedClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {showShine && <ShineEffect />}
            <span className="relative z-10">{children}</span>
          </Link>
        </motion.div>
      );
    }

    // RENDER: Standard Button
    return (
      <motion.button
        {...(props as HTMLMotionProps<'button'>)}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        whileTap={{ scale: 0.97 }}
        whileHover="hover"
      >
        {showShine && <ShineEffect />}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;