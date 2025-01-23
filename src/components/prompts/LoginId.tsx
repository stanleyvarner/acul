import React, { useEffect, useState } from 'react';
import InputField from '../InputField';
import '../../index.css';
import { LoginId } from '@auth0/auth0-acul-js';
import SocialLogin from './SocialLogin';

const LoginIdPrompt: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('Sign In To Your Account');
  const [description, setDescription] = useState('Log in to continue');
  const [signupLink, setSignupLink] = useState<string | null>(null);

  useEffect(() => {
    try {
      const loginIdManager = new LoginId();
      const screenTexts = loginIdManager.screen.getScreenTexts();

      setTitle(screenTexts?.title || 'Sign In To Your Account');
      setDescription(screenTexts?.description || 'Log in to continue');
      setSignupLink(loginIdManager.screen.signupLink || null);
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
      await loginIdManager.login({ username: email });
      console.log('Login request sent successfully.');
    } catch (err) {
      console.error('Login failed:', err);
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <InputField
                  label="Email address"
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
          alt="Sign-in background"
          src="https://acul.s3.us-east-1.amazonaws.com/aculphoto.jpeg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginIdPrompt;
