import React, { useEffect } from 'react';
import ShellFrame from './ShellFrame';
import { useAppSelector, useAuth, useStartupSound, useInitializeUser } from '@/store/hooks';

const App: React.FC = () => {
  const connectionState = useAppSelector((state) => state.connection);
  const walletState = useAppSelector((state) => state.wallet);
  const { sync } = useAuth();
  const { initAudio } = useStartupSound();
  const { getInitializationCase } = useInitializeUser();

  // Initialize auth and user education state on app start
  useEffect(() => {
    const initializeApp = async () => {
      console.log('Initializing app: auth, audio, and user education state...');
      
      // 1. Restore auth session
      await sync();
      
      // 2. Initialize audio for startup sound
      initAudio();
      
      // 3. Check user education/growth state (MVP logging)
      const userEducationState = getInitializationCase();
      console.log('User education state:', userEducationState);
    };

    initializeApp();
  }, []); // Only run once on app mount

  // Handle connected state and initialize auth as needed
  useEffect(() => {
    if (connectionState.isConnected) {
      console.log('User is connected, checking auth type...');
      
      if (walletState.type === 'internet-identity') {
        console.log('Internet Identity session active');
        // Additional II-specific initialization could go here
      } else if (walletState.type === 'guest') {
        console.log('Guest session active');
        // Additional guest-specific initialization could go here
      }
    }
  }, [connectionState.isConnected, walletState.type]);

  return (
    <div className="app-container w-full h-screen relative">
      <ShellFrame />
    </div>
  );
};

export default App;
