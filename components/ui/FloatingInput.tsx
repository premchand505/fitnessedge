'use client';

import { ComponentProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type BaseProps = {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
};

type InputProps = BaseProps & {
  as?: 'input';
} & ComponentProps<'input'>;

type TextareaProps = BaseProps & {
  as: 'textarea';
} & ComponentProps<'textarea'>;

type FloatingInputProps = InputProps | TextareaProps;

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  label,
  registration,
  error,
  as = 'input',
  ...props
}) => {
  return (
    <div className="relative z-0">
      {as === 'textarea' ? (
        <textarea
          id={id}
          className={`
            peer block w-full appearance-none border-b-2 bg-transparent px-0 py-2.5 
            text-md text-primary-dark focus:outline-none focus:ring-0
            ${error ? 'border-form-error' : 'border-primary-dark/30 focus:border-accent'}
          `}
          placeholder=" "
          rows={4}
          {...registration}
          {...(props as ComponentProps<'textarea'>)}
        />
      ) : (
        <input
          id={id}
          className={`
            peer block w-full appearance-none border-b-2 bg-transparent px-0 py-2.5 
            text-md text-primary-dark focus:outline-none focus:ring-0
            ${error ? 'border-form-error' : 'border-primary-dark/30 focus:border-accent'}
          `}
          placeholder=" "
          {...registration}
          {...(props as ComponentProps<'input'>)}
        />
      )}
      <label
        htmlFor={id}
        className={`
          absolute top-3 -z-10 origin-left -translate-y-6 scale-75 transform text-md duration-300
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
          peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75
          ${error ? 'text-form-error' : 'text-primary-dark/60 peer-focus:text-accent'}
        `}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-form-error">{error}</p>}
    </div>
  );
};

export default FloatingInput;