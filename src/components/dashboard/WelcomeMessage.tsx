import React from 'react';
import { getUser } from '../../utils/auth';

const WelcomeMessage = () => {
  const user = getUser();
  const userName = user?.name || 'Friend';

  return (
    <div className="flex justify-center mb-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome back, {userName}!
        </h1>
        <p className="text-text-secondary text-m">
          Your emotional journey matters. Let's make today count.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;