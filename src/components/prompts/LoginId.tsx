import React, { useEffect, useState } from 'react';
import InputField from '../InputField';
import '../../index.css';
import { LoginId } from '@auth0/auth0-acul-js';

const LoginIdPrompt: React.FC = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [error, setError] = useState(''); // State for error messages
  const [title, setTitle] = useState('Sign In To Your Account'); // Default title
  const [description, setDescription] = useState('Log in to continue');
  const [signupLink, setSignupLink] = useState<string | null>(null);

  useEffect(() => {
    try {
      const loginIdManager = new LoginId();
      const screenTexts = loginIdManager.screen.getScreenTexts(); // Retrieve screen texts
      console.log('Screen Texts:', screenTexts);
      
      setTitle(screenTexts?.title || 'Sign In To Your Account');
      setDescription(screenTexts?.description || 'Log in to continue');
      
      // Retrieve the signup link
      const link = loginIdManager.screen.signupLink || null;
      console.log('Signup Link:', link);
      setSignupLink(link);
    } catch (err) {
      console.error('Failed to fetch screen texts or link:', err);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      const loginIdManager = new LoginId();
      await loginIdManager.login({
        username: email,
      });

      console.log('Login request sent successfully.');
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
            {title}
          </h2>
          <p className="text-center text-sm text-gray-500">{description}</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <InputField
              label="Email address"
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-500">
          Not a member?{' '}
          <a
            href={signupLink || '#'} // Use the signup link if available
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Start a 14-day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginIdPrompt;
