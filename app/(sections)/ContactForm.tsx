'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import FloatingInput from '@/components/ui/FloatingInput';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  interest: z.string().min(5, 'Please let us know what you are interested in'),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');
  const searchParams = useSearchParams();

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

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus('submitting');
    console.log('Form Data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmissionStatus('success');
    reset();
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {submissionStatus === 'success' && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-popup-accent p-8 text-base"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h3 className="font-heading text-4xl">Thank You!</h3>
            <p className="mt-2 text-lg">
              Your message has been sent. We'll be in touch soon.
            </p>
            <Button
              variant="dark"
              onClick={() => setSubmissionStatus('idle')}
              className="mt-6"
            >
              Send Another
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
        noValidate
      >
        <FloatingInput
          id="name"
          label="Name"
          type="text"
          registration={register('name')}
          error={errors.name?.message}
        />
        <FloatingInput
          id="email"
          label="Email"
          type="email"
          registration={register('email')}
          error={errors.email?.message}
        />
        <FloatingInput
          id="phone"
          label="Phone"
          type="tel"
          registration={register('phone')}
          error={errors.phone?.message}
        />
        <FloatingInput
          id="interest"
          label="I'm interested in..."
          as="textarea"
          registration={register('interest')}
          error={errors.interest?.message}
        />

        <div className="mt-4">
          <Button
            type="submit"
            variant="solid"
            className="w-full py-4"
            disabled={!isValid || submissionStatus === 'submitting'}
          >
            {submissionStatus === 'submitting'
              ? 'Sending...'
              : 'Submit Now'}
          </Button>
        </div>
      </form>
    </div>
  );
}