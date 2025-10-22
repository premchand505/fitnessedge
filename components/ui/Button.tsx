'use client';

import Link from 'next/link';
import {
  motion,
  TargetAndTransition,
  HTMLMotionProps,
} from 'framer-motion';

type ButtonVariant = 'solid' | 'outline' | 'dark';

// Base props
interface BaseProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

// Props for a <button> (no href)
type ButtonElementProps = BaseProps &
  Omit<HTMLMotionProps<'button'>, 'children' | 'className'> & {
    href?: undefined;
  };

// Props for a Link (with href)
// We base this on standard anchor attributes now, which Next's Link accepts.
type AnchorElementProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string; // href is required
  };

// Union type for all possible props
type ButtonProps = ButtonElementProps | AnchorElementProps;

const flickerAnimation: TargetAndTransition = {
  boxShadow: [
    '0 0 0px 0px var(--color-accent-light)',
    '0 0 10px 4px var(--color-accent-light)',
    '0 0 0px 0px var(--color-accent-light)',
  ],
  transition: { duration: 0.3, ease: 'easeInOut', times: [0, 0.5, 1] },
};

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  children,
  className = '',
  ...props
}) => {
  // Common styles
  const combinedClassName = `
    relative group inline-flex items-center justify-center px-6 py-3 font-medium tracking-wide 
    transition-all duration-300 ease-out rounded-md text-md focus:outline-none 
    focus:ring-2 focus:ring-offset-2
    ${
      variant === 'solid'
        ? 'bg-accent text-primary-dark border-2 border-transparent hover:bg-accent-hover focus:ring-accent'
        : variant === 'outline'
        ? 'bg-transparent text-primary-dark border-2 border-primary-dark hover:bg-primary-dark hover:text-base focus:ring-primary-dark'
        : 'bg-primary-dark text-base border-2 border-transparent hover:bg-gray-800 focus:ring-primary-dark'
    }
    ${className}
  `;

  // If href is present, render a Next.js Link component directly.
  if (props.href) {
    const { href, ...anchorProps } = props as AnchorElementProps;
    return (
      // --- FIX ---
      // Removed `legacyBehavior` and the inner `motion.a`.
      // The `Link` component now receives the styles and acts as the anchor tag.
      <Link href={href} className={combinedClassName} {...anchorProps}>
        <motion.span
          className="absolute inset-0 rounded-md"
          whileHover={variant === 'solid' ? flickerAnimation : undefined}
        />
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  // If no href, render a motion.button tag.
  return (
    <motion.button
      className={combinedClassName}
      {...(props as ButtonElementProps)} // Spread remaining 'button' props
    >
      <motion.span
        className="absolute inset-0 rounded-md"
        whileHover={variant === 'solid' ? flickerAnimation : undefined}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;