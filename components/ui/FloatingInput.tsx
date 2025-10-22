import { UseFormRegisterReturn } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingInputProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  type?: string;
  as?: 'input' | 'textarea';
  error?: string;
  className?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  label,
  registration,
  type = 'text',
  as = 'input',
  error,
  className = '',
}) => {
  const commonProps = {
    id,
    ...registration,
    placeholder: ' ', // This space is still needed for the peer selector
    className: `
      peer block w-full appearance-none bg-transparent px-3 pb-2 pt-4
      border-2 rounded-lg
      text-base text-[var(--foreground)] border-[var(--border)]
      focus:outline-none focus:ring-0 focus:border-[var(--primary)]
      transition-colors duration-300
    `,
  };

  const MotionLabel = motion.label;

  return (
    <div className="relative w-full">
      {as === 'textarea' ? (
        <textarea {...commonProps} rows={5} className={`${commonProps.className} ${className}`} />
      ) : (
        <input type={type} {...commonProps} className={`${commonProps.className} ${className}`} />
      )}
      <MotionLabel
        htmlFor={id}
        className="
          absolute left-3 top-3.5 origin-left transform
          /* --- KEY CHANGE: These are now the default styles --- */
          scale-75 -translate-y-3
          /* --------------------------------------------------- */
          text-base text(--foreground-muted) duration-300 ease-in-out
          /* Removed peer-placeholder-shown styles */
          /* Color still changes on focus */
          peer-focus:text-(--primary)
        "
      >
        {label}
      </MotionLabel>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-sm ext-(--destructive)" // Corrected CSS variable syntax
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingInput;