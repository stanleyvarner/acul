import React, { useState } from 'react';
import InputField from '../InputField';
import { SignupId } from '@auth0/auth0-acul-js';

const SignupIdPrompt: React.FC = () => {
  const [userEmail, setEmail] = useState(''); // State for email input
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    setError(''); // Reset previous errors

    if (!userEmail) {
      setError('Email is required.');
      return;
    }

    try {
      // Initialize Auth0 ACUL JS SignupId
      const signupIdManager = new SignupId();

      // Call the signup method to send the email to Auth0
      await signupIdManager.signup({
        email: userEmail, // Pass the email as the username
      });

      console.log('Signup request sent successfully.');
      // Auth0 will handle the next steps in the signup flow
    } catch (error: any) {
      console.error('Signup failed:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <InputField
              label="Email address"
              id="email"
              type="email"
              placeholder="Email address"
              value={userEmail} // Controlled input bound to email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error messages */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupIdPrompt;
