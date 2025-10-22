// /app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Instantiate Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received contact form submission:', body);
    const { name, email, phone, interest } = body;

    // Basic validation
    if (!name || !email || !phone || !interest) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Use Resend to send the email
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Use a default for now, but set up your own domain in Resend for production
      to: ['prem595pop@gmail.com'], // <-- 🚨 REPLACE THIS with the email address where you want to receive submissions
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Interest:</strong></p>
        <p>${interest}</p>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { message: 'Error submitting form' },
      { status: 500 },
    );
  }
}