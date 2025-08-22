'use client'
import { useAppSelector, useAppDispatch } from './redux';
import { markInternetIdentityIntroAsViewed } from '../slices/userSlice';

export type InitializationCase = 'SHOW_II_INTRO' | 'SHOW_ASSISTANT';

export const useInitializeUser = () => {
  const dispatch = useAppDispatch();
  
  // Get relevant states from store
  const connectionState = useAppSelector((state) => state.connection);
  const walletState = useAppSelector((state) => state.wallet);
  const userState = useAppSelector((state) => state.user);

  // Simple logic: Show II intro if user is NOT connected and hasn't seen it
  const getInitializationCase = (): InitializationCase => {
    const isConnected = connectionState.isConnected;
    const hasSeenIIIntro = userState.hasViewedInternetIdentityIntro;
    
    // Show II intro if user is not connected AND hasn't seen the intro
    if (!isConnected && !hasSeenIIIntro) {
      return 'SHOW_II_INTRO';
    }
    
    // Show normal assistant if connected OR has seen intro
    return 'SHOW_ASSISTANT';
  };

  // Mark II intro as viewed (when user reads it or takes action)
  const markIIIntroAsViewed = () => {
    dispatch(markInternetIdentityIntroAsViewed());
  };

  // Helper getters
  const isConnected = connectionState.isConnected;
  const walletType = walletState.type;
  const hasViewedIIIntro = userState.hasViewedInternetIdentityIntro;

  return {
    getInitializationCase,
    markIIIntroAsViewed,
    isConnected,
    walletType,
    hasViewedIIIntro,
  };
};
