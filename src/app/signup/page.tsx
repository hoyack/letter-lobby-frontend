// Email input page
"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailValid(false);
      setErrorMessage('');
    } else if (!emailRegex.test(email)) {
      setEmailValid(false);
      setErrorMessage('Please enter a valid email address.');
    } else {
      setEmailValid(true);
      setErrorMessage('');
    }
  }, [email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailValid) return;

    setIsSubmitting(true);
    // Simulated API call for sending OTP
    console.log('Sending OTP to:', email);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/verify'); // Navigate to the OTP Verification page
    }, 1000);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Header area (If not included in layout) 
      <div className="mb-4 text-center">
        <img src="/public/logo.png" alt="LetterLobby Logo" width={100} />
        <h1>LetterLobby</h1>
      </div>
      */}

      <div className="w-50 p-4 border rounded">
        <h1 className="text-center mb-4">Welcome to LetterLobby!</h1>
        <p className="text-center mb-4">
          Sign up to start drafting letters to your representatives.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errorMessage && (
              <div className="invalid-feedback">
                {errorMessage}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!emailValid || isSubmitting}
          >
            {isSubmitting ? 'Sending OTP...' : 'Sign Up'}
          </button>
        </form>
        <hr className="my-4" />
        <div className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-decoration-none">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
