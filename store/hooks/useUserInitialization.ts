'use client'
import { useAppSelector } from './redux';

export type UserInitializationState = 
  | 'SHOW_INTERNET_IDENTITY_INTRO'
  | 'SHOW_ASSISTANT_READY'
  // TODO: Future states for scaling
  // | 'SHOW_PROFILE_SETUP'
  // | 'SHOW_PERSONA_SELECTION'

export const useUserInitialization = () => {
  // Get relevant states from store
  const connectionState = useAppSelector((state) => state.connection);
  const walletState = useAppSelector((state) => state.wallet);
  const userState = useAppSelector((state) => state.user);

  // Phase 1 Logic: Check if user should see Internet Identity intro
  const shouldShowInternetIdentityIntro = (): boolean => {
    // Show II intro if:
    // 1. User is logged in as guest (not using II)
    // 2. User hasn't seen the II intro before
    return (
      walletState.type === 'guest' && 
      !userState.hasViewedInternetIdentityIntro
    );
  };

  // Phase 1 Logic: Determine what content to show in assistant
  const getUserInitializationState = (): UserInitializationState => {
    // Priority 1: Show II intro for guest users who haven't seen it
    if (shouldShowInternetIdentityIntro()) {
      return 'SHOW_INTERNET_IDENTITY_INTRO';
    }

    // Priority 2: Default to ready assistant for MVP
    // TODO: Add profile setup check
    // if (connectionState.isConnected && !userState.isProfileSetupComplete) {
    //   return 'SHOW_PROFILE_SETUP';
    // }

    // Default: Show ready assistant
    return 'SHOW_ASSISTANT_READY';
  };

  // Helper to check if user has completed basic onboarding
  const hasCompletedBasicOnboarding = (): boolean => {
    // For MVP: completed if they've seen II intro OR are connected
    return (
      userState.hasViewedInternetIdentityIntro || 
      connectionState.isConnected
    );
  };

  // TODO: Future helper methods for scaling
  // const shouldShowProfileSetup = (): boolean => {
  //   return connectionState.isConnected && !userState.isProfileSetupComplete;
  // };

  // const getRecommendedAssistantPersona = (): 'educator' | 'friend' | 'mentor' => {
  //   // Logic based on user experience levels
  //   if (userState.webExperienceLevel === 'beginner') return 'educator';
  //   if (userState.cryptoExperienceLevel === 'experienced') return 'mentor';
  //   return 'friend'; // Default
  // };

  return {
    // Phase 1 Methods
    shouldShowInternetIdentityIntro,
    getUserInitializationState,
    hasCompletedBasicOnboarding,
    
    // State access
    isConnected: connectionState.isConnected,
    walletType: walletState.type,
    hasViewedIIIntro: userState.hasViewedInternetIdentityIntro,
    
    // TODO: Future methods for scaling
    // shouldShowProfileSetup,
    // getRecommendedAssistantPersona,
  };
};
