import React, { useState, useEffect } from 'react';
import InputField from '../InputField';
import { SignupPassword } from '@auth0/auth0-acul-js';

const SignupPasswordPrompt: React.FC = () => {
  const [userEmail, setEmail] = useState<string>(''); 
  const [userPassword, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string>(''); 

  useEffect(() => {
    try {
      const signupPasswordManager = new SignupPassword();
      const screenData = signupPasswordManager.screen.getScreenData(); // Fetch screen data
      const emailFromScreen = screenData?.email || ''; // Adjust to use the correct key
      setEmail(emailFromScreen);
    } catch (err) {
      console.error('Error retrieving screen data:', err);
      setError('Failed to retrieve email. Please refresh the page.');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!userEmail) {
      setError('Email is required.');
      return;
    }

    if (!userPassword) {
      setError('Password is required.');
      return;
    }

    try {
      const signupPasswordManager = new SignupPassword();
      await signupPasswordManager.signup({
        email: userEmail,
        password: userPassword,
      });

      console.log('Signup request sent successfully.');
    } catch (err: unknown) {
      console.error('Signup failed:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
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
              value={userEmail}
              readOnly // Pre-filled email is read-only
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPasswordPrompt;
