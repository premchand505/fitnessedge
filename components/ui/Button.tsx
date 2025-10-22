'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { type ComponentProps } from 'react'; // <-- FIX IS HERE

// The specific variants your button can have
type ButtonVariant = 'solid' | 'outline' | 'dark';

// Base props shared by both the Link and button elements
type BaseProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

// A much clearer, discriminated union for the props.
type ButtonProps = BaseProps & (
  | (Omit<ComponentProps<typeof Link>, 'className'> & { href: string })
  | (Omit<ComponentProps<typeof motion.button>, 'className'> & { href?: undefined })
);

const Button = ({
  variant = 'solid',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  
  const variantStyles: Record<ButtonVariant, string> = {
    solid: 'bg-primary text-primary-foreground border-2 border-transparent hover:bg-primary/90 focus-visible:ring-primary',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary',
    dark: 'bg-primary-dark text-primary-foreground border-2 border-transparent hover:bg-primary-dark/90 focus-visible:ring-primary-dark',
  };

  const baseStyles = `relative group inline-flex items-center justify-center px-6 py-3 font-medium tracking-wide transition-colors duration-300 ease-out rounded-lg text-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden`;
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

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
        backgroundImage: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)',
      }}
    />
  );
  
  if (props.href) {
    return (
      <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
        <Link {...(props as ComponentProps<typeof Link>)} className={combinedClassName}>
          <motion.div
            className="absolute inset-0"
            whileHover="hover"
            initial={{ backgroundPosition: '-100% 0%' }}
          >
            {variant !== 'outline' && <ShineEffect />}
          </motion.div>
          <span className="relative z-10">{children}</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...(props as ComponentProps<typeof motion.button>)}
      className={combinedClassName}
      whileTap={{ scale: 0.97 }}
      whileHover="hover"
      initial={{ backgroundPosition: '-100% 0%' }}
    >
      {variant !== 'outline' && <ShineEffect />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;