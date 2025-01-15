import React, { useEffect, useState } from 'react';
import {
  LoginId,
  LoginPassword,
  SignupId,
  SignupPassword,
} from '@auth0/auth0-acul-js';
import LoginIdPrompt from '../src/components/prompts/LoginId';
import LoginPasswordPrompt from '../src/components/prompts/LoginPassword';
import SignupIdPrompt from '../src/components/prompts/SignupId';
import SignupPasswordPrompt from '../src/components/prompts/SingupPassword';
import '../src/index.css';

const App: React.FC = () => {
  const [screenInstance, setScreenInstance] = useState<
    LoginId | LoginPassword | SignupId | SignupPassword | null
  >(null);

  useEffect(() => {
    // Dynamically determine the screen instance from the SDK
    const fetchCurrentScreen = async () => {
      try {
        const screenInstances = [
          new LoginId(),
          new LoginPassword(),
          new SignupId(),
          new SignupPassword(),
        ];

        for (const instance of screenInstances) {
          const screenName = instance.screen?.name;
          if (screenName) {
            console.log('Screen name:', screenName);
            setScreenInstance(instance);
            return;
          }
        }

        // Fallback if no screen is identified
        setScreenInstance(new LoginId());
      } catch (error) {
        console.error('Failed to fetch the current screen:', error);
        setScreenInstance(new LoginId()); // Default fallback
      }
    };

    fetchCurrentScreen();
  }, []);

  const renderComponent = () => {
    if (!screenInstance) return <p>Loading...</p>; // Show loading while fetching the screen

    switch (screenInstance.screen?.name) {
      case 'login-id':
        return <LoginIdPrompt />;
      case 'login-password':
        return <LoginPasswordPrompt />;
      case 'signup-id':
        return <SignupIdPrompt />;
      case 'signup-password':
        return <SignupPasswordPrompt />;
      default:
        return <p>Unknown screen</p>;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default App;
