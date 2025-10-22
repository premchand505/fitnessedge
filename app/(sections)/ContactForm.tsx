'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
import FloatingInput from '@/components/ui/FloatingInput';

// 1. Define the schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  interest: z.string().min(5, 'Please let us know what you are interested in'),
});

// 2. Infer the TypeScript type from the schema
type ContactFormData = z.infer<typeof contactSchema>;

// 3. Define the possible submission states
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');
  const searchParams = useSearchParams();

  // 4. Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
  });

  // Effect to populate form from URL parameters
  useEffect(() => {
    const services = searchParams.get('services');
    const duration = searchParams.get('duration');
    const price = searchParams.get('price');

    if (services && duration && price) {
      const interest = `Plan: ${services} (${duration}) - ₹${Number(
        price
      ).toLocaleString('en-IN')}`;
      setValue('interest', interest, { shouldValidate: true });
    }
  }, [searchParams, setValue]);

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setSubmissionStatus('success');
      reset();
    } catch (error) {
      console.error('Failed to submit the form:', error);
      setSubmissionStatus('error');
    }
  };

  // Effect to reset button state after success/error
  useEffect(() => {
    if (submissionStatus === 'success' || submissionStatus === 'error') {
      const timer = setTimeout(() => setSubmissionStatus('idle'), 3000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  // Define common input styles for consistency
  const inputStyles = "bg-white border border-neutral-400 text-black placeholder:text-black focus:border-black";

  return (
    // Set base text color to black for any labels or error messages
    <div className="relative w-full max-w-xl mx-auto text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Apply the common styles to each input */}
          <FloatingInput
            id="name"
            label="Name"
            type="text"
            registration={register('name')}
            error={errors.name?.message}
            className={inputStyles}
          />
          <FloatingInput
            id="email"
            label="Email"
            type="email"
            registration={register('email')}
            error={errors.email?.message}
            className={inputStyles}
          />
        </div>

        <FloatingInput
          id="phone"
          label="Phone"
          type="tel"
          registration={register('phone')}
          error={errors.phone?.message}
          className={inputStyles}
        />
        <FloatingInput
          id="interest"
          label="I'm interested in..."
          as="textarea"
          registration={register('interest')}
          error={errors.interest?.message}
          // Merge common styles with specific textarea styles
          className={`${inputStyles} min-h-[150px] resize-y`}
        />

        <div className="mt-2">
          <Button
            type="submit"
            variant="solid"
            className="flex w-full items-center justify-center py-3 text-lg"
            disabled={!isValid || submissionStatus !== 'idle'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={submissionStatus}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {submissionStatus === 'submitting' && (
                  <>
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        ease: 'linear',
                        repeat: Infinity,
                      }}
                    />
                    <span>Sending...</span>
                  </>
                )}
                {submissionStatus === 'success' && (
                  <>
                    <CheckCircle size={20} />
                    <span>Message Sent!</span>
                  </>
                )}
                {submissionStatus === 'error' && (
                  <>
                    <AlertTriangle size={20} />
                    <span>Submission Failed</span>
                  </>
                )}
                {submissionStatus === 'idle' && (
                  <>
                    <Send size={18} />
                    <span>Submit Now</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </form>
    </div>
  );
}