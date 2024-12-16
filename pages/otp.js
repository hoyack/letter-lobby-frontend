// pages/otp.js
import React, { useState } from 'react';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated API call for OTP verification
    console.log('Verifying OTP:', otp);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('OTP Verified!'); // Replace this with actual navigation or success handling
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="w-50 p-3 border rounded">
        <h1 className="text-center">Verify OTP</h1>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
