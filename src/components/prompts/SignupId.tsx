import React, { useState, useEffect } from 'react';
import InputField from '../InputField';
import { SignupId } from '@auth0/auth0-acul-js';
import SocialLogin from './SocialLogin';


const SignupIdPrompt: React.FC = () => {
  const [userEmail, setEmail] = useState(''); // State for email input
  const [error, setError] = useState(''); // State for error messages
  const [loginLink, setLoginLink] = useState<string | null>(null);
  const [title, setTitle] = useState('Create Your Account'); // Default title
  const [description, setDescription] = useState('Enter your email to continue');

  useEffect(() => {
    try {
      const signupIdManager = new SignupId();
      const link = signupIdManager.screen.loginLink || null;
      console.log('Login Link:', link);
      setLoginLink(link);

      const screenTexts = signupIdManager.screen.getScreenTexts(); // Retrieve screen texts
      console.log('Screen Texts:', screenTexts);

      setTitle(screenTexts?.title || 'Create Your Account');
      setDescription(screenTexts?.description || 'Enter your email to continue');
    } catch (err) {
      console.error('Failed to fetch the login link:', err);
    }
  }, []);

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
              value={userEmail} // Controlled input bound to email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              autoComplete="email" 
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

            <div className="mt-10">
              <SocialLogin />
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <a
              href={loginLink || '#'}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log In
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

export default SignupIdPrompt;


