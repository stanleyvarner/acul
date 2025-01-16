import React, { useState, useEffect } from 'react';
import InputField from '../InputField';
import { LoginPassword } from '@auth0/auth0-acul-js';
import SocialLogin from './SocialLogin';


const LoginPasswordPrompt: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // State for email input
  const [password, setPassword] = useState<string>(''); // State for password input
  const [error, setError] = useState<string>(''); // State for error messages
  const [signupLink, setSignupLink] = useState<string | null>(null);
  const [title, setTitle] = useState('Sign In To Your Account'); // Default title
  const [description, setDescription] = useState('Log in to continue');

  useEffect(() => {
    try {
      // Initialize Auth0 ACUL JS LoginPassword
      const loginPasswordManager = new LoginPassword();

      // Retrieve the email from `getScreenData`
      const screenData = loginPasswordManager.screen.getScreenData();
      const emailFromScreenData = screenData?.username || '';
      setEmail(emailFromScreenData); // Pre-fill the email field
      
      const screenTexts = loginPasswordManager.screen.getScreenTexts(); // Retrieve screen texts
      console.log('Screen Texts:', screenTexts);

      setTitle(screenTexts?.title || 'Sign In To Your Account');
      setDescription(screenTexts?.description || 'Enter your password to continue');
      // Retrieve the signup link
      const link = loginPasswordManager.screen.signupLink || null;
      console.log('Signup Link:', link);
      setSignupLink(link);
    } catch (err) {
      console.error('Error retrieving screen data:', err);
      setError('Failed to retrieve email. Please refresh the page.');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        username: email, // Pre-filled email
        password, // User-entered password
      });

      console.log('Login request sent successfully.');
      // Auth0 will handle the next step in the login flow
    } catch (err: unknown) {
      console.error('Login failed:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-10 w-auto"
            />
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          </div>

          <div className="mt-10">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <InputField
                label="Email address"
                id="email"
                type="email"
                placeholder="Email address"
                value={email} // Pre-filled email
                
                />
                <InputField
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                } // Update password state
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

            <div className="mt-10">
              <SocialLogin />
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Not a member?{' '}
            <a
              href={signupLink || '#'}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14-day free trial
            </a>
          </p>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://acul.s3.us-east-1.amazonaws.com/aculphoto.jpeg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPasswordPrompt;

