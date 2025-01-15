import React, { useState, useEffect } from 'react';
import InputField from '../InputField';
import { LoginPassword } from '@auth0/auth0-acul-js';

const LoginPasswordPrompt: React.FC = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error messages

  useEffect(() => {
    // Retrieve email from transaction data if available
    const transactionData = (window as any).universal_login_transaction_data;
    const emailFromTransaction = transactionData?.unsafe_data?.submitted_form_data?.username || '';
    setEmail(emailFromTransaction); // Pre-fill the email field
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    setError(''); // Reset previous errors

    if (!password) {
      setError('Password is required.');
      return;
    }

    try {
      // Initialize Auth0 ACUL JS LoginPassword
      const loginPasswordManager = new LoginPassword();

      // Submit email and password to Auth0
      await loginPasswordManager.login({
        username: email, // Pass the pre-filled email
        password, // Pass the password entered by the user
      });

      console.log('Login successful.');
      // Auth0 will handle the next step in the flow
    } catch (error: any) {
      console.error('Login failed:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <InputField
              label="Email address"
              id="email"
              type="email"
              placeholder="Email address"
              value={email} // Pre-filled email
              onChange={(e) => setEmail(e.target.value)} // Allow editing (optional)
             
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPasswordPrompt;
