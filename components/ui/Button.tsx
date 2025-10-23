'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { type ComponentProps } from 'react';

// The specific variants your button can have
type ButtonVariant = 'solid' | 'outline' | 'glow' | 'ghost';

// Base props shared by both the Link and button elements
type BaseProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

// A discriminated union for the props to handle both Link and button elements
type ButtonProps = BaseProps &
  (
    | (Omit<ComponentProps<typeof Link>, 'className'> & { href: string })
    | (Omit<ComponentProps<typeof motion.button>, 'className'> & {
        href?: undefined;
      })
  );

const Button = ({
  variant = 'solid',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const variantStyles: Record<ButtonVariant, string> = {
    // Primary action button with a bright, solid background and a hover glow.
    solid:
      'bg-accent-400 text-black-950 border-2 border-transparent hover:bg-accent-500 hover:shadow-lg hover:shadow-accent-400/40 focus-visible:ring-accent-500',
    // Secondary action button with a clear background and an accent-colored border.
    outline:
      'bg-transparent text-accent-600 border-2 border-accent-400 hover:bg-accent-400 hover:text-black-950 focus-visible:ring-accent-500',
    // A dark button that provides a subtle, colored glow on hover.
    glow: 'bg-black-950 text-white-50 border-2 border-black-800 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/30 focus-visible:ring-accent-400',
    // A subtle, transparent button for tertiary actions.
    ghost:
      'bg-transparent text-black-800 hover:bg-black-100 hover:text-black-950 focus-visible:ring-black-500',
  };

  const baseStyles = `relative group inline-flex items-center justify-center px-5 py-2.5 font-semibold tracking-wide transition-all duration-300 ease-out rounded-lg text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden`;

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // The animated shine effect for solid and glow buttons
  const ShineEffect = () => (
    <motion.span
      className="absolute inset-0 block"
      variants={{
        hover: {
          backgroundPosition: ['-100% 0%', '200% 0%'],
          transition: { duration: 1.2, ease: 'linear' },
        },
      }}
      style={{
        backgroundImage:
          'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)',
      }}
    />
  );

  // Renders a Next.js Link if an 'href' prop is provided
  if (props.href) {
    return (
      <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
        <Link
          {...(props as ComponentProps<typeof Link>)}
          className={combinedClassName}
        >
          <motion.div
            className="absolute inset-0"
            whileHover="hover"
            initial={{ backgroundPosition: '-100% 0%' }}
          >
            {(variant === 'solid' || variant === 'glow') && <ShineEffect />}
          </motion.div>
          <span className="relative z-10">{children}</span>
        </Link>
      </motion.div>
    );
  }

  // Renders a standard button otherwise
  return (
    <motion.button
      {...(props as ComponentProps<typeof motion.button>)}
      className={combinedClassName}
      whileTap={{ scale: 0.97 }}
      whileHover="hover"
      initial={{ backgroundPosition: '-100% 0%' }}
    >
      {(variant === 'solid' || variant === 'glow') && <ShineEffect />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;