// 'use client'

// import React, { useState } from 'react'
// import LoginIdPrompt from '../src/components/prompts/LoginId'
// import LoginPasswordPrompt from '../src/components/prompts/LoginPassword'
// import SignupIdPrompt from '../src/components/prompts//SignupId'
// import SignupPasswordPrompt from '../src/components/prompts/SingupPassword';
// import '../src/index.css';

// const App: React.FC = () => {
//   const [currentView, setCurrentView] = useState<string>('loginId')

//   const renderComponent = () => {
//     switch (currentView) {
//       case 'loginId':
//         return <LoginIdPrompt />
//       case 'loginPassword':
//         return <LoginPasswordPrompt />
//       case 'signupId':
//         return <SignupIdPrompt />
//       case 'signupPassword':
//         return <SignupPasswordPrompt />
//       default:
//         return <LoginIdPrompt />
//     }
//   }

//   return (
//     <div>
//       <div className="flex justify-center space-x-4 mb-4">
//         <button
//           onClick={() => setCurrentView('loginId')}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Login ID
//         </button>
//         <button
//           onClick={() => setCurrentView('loginPassword')}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Login Password
//         </button>
//         <button
//           onClick={() => setCurrentView('signupId')}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Signup ID
//         </button>
//         <button
//           onClick={() => setCurrentView('signupPassword')}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Signup Password
//         </button>
//       </div>
//       {renderComponent()}
//     </div>
//   )
// }

// export default App

'use client';

import React, { useState, useEffect } from 'react';
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
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  useEffect(() => {
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
            setCurrentScreen(screenName);
            return;
          }
        }

        // Fallback to a default screen
        setCurrentScreen('login-id');
      } catch (error) {
        console.error('Failed to fetch the current screen:', error);
        setCurrentScreen('login-id');
      }
    };

    fetchCurrentScreen();
  }, []);

  const renderComponent = () => {
    switch (currentScreen) {
      case 'login-id':
        return <LoginIdPrompt />;
      case 'login-password':
        return <LoginPasswordPrompt />;
      case 'signup-id':
        return <SignupIdPrompt />;
      case 'signup-password':
        return <SignupPasswordPrompt />;
      default:
        return <p>Loading...</p>;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default App;



