// pages/signup.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated API call for sending OTP
    console.log('Sending OTP to:', email);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/otp'); // Navigate to the OTP Verification page
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="w-50 p-3 border rounded">
        <h1 className="text-center">Sign Up</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
