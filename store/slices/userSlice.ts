import { createSlice } from "@reduxjs/toolkit";
import { createStorageUtils } from "@/lib/utils/storage-utils";

interface UserState {
  // Phase 1: Internet Identity Education
  hasViewedInternetIdentityIntro: boolean;
  
  // TODO Phase 2: User Profile Setup
  // isProfileSetupComplete: boolean;
  // userNickname?: string;
  // webExperienceLevel: 'beginner' | 'intermediate' | 'advanced';
  // cryptoExperienceLevel: 'none' | 'basic' | 'experienced';
  // userInterests: string[];
  
  // TODO Phase 3: Assistant Persona
  // assistantPersona: 'educator' | 'friend' | 'mentor';
  // conversationStyle: 'casual' | 'professional';
}

// Default state for new users
const defaultUserState: UserState = {
  hasViewedInternetIdentityIntro: false,
};

// Create storage utilities for user state
const userStorage = createStorageUtils<UserState>('windoge-user-states');

// Load initial state with validation
const loadInitialUserState = (): UserState => {
  const storedState = userStorage.loadFromStorage(defaultUserState);
  
  // Validate and merge with defaults to handle missing fields
  return {
    hasViewedInternetIdentityIntro: storedState.hasViewedInternetIdentityIntro || false,
    // TODO: Add other field validations when implemented
  };
};

const initialState: UserState = loadInitialUserState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Phase 1: Internet Identity Education Actions
    markInternetIdentityIntroAsViewed: (state) => {
      state.hasViewedInternetIdentityIntro = true;
      userStorage.saveToStorage(state);
    },
    
    // Development/Testing utility
    resetUserState: () => {
      const freshState: UserState = defaultUserState;
      userStorage.saveToStorage(freshState);
      return freshState;
    },
    
    // TODO Phase 2: Profile Setup Actions
    // setUserProfile: (state, action: PayloadAction<{
    //   nickname?: string;
    //   webExperience: 'beginner' | 'intermediate' | 'advanced';
    //   cryptoExperience: 'none' | 'basic' | 'experienced';
    //   interests: string[];
    // }>) => {
    //   state.userNickname = action.payload.nickname;
    //   state.webExperienceLevel = action.payload.webExperience;
    //   state.cryptoExperienceLevel = action.payload.cryptoExperience;
    //   state.userInterests = action.payload.interests;
    //   state.isProfileSetupComplete = true;
    //   saveUserStateToStorage(state);
    // },
    
    // TODO Phase 3: Assistant Persona Actions
    // setAssistantPersona: (state, action: PayloadAction<{
    //   persona: 'educator' | 'friend' | 'mentor';
    //   style: 'casual' | 'professional';
    // }>) => {
    //   state.assistantPersona = action.payload.persona;
    //   state.conversationStyle = action.payload.style;
    //   saveUserStateToStorage(state);
    // },
  },
});

export const {
  markInternetIdentityIntroAsViewed,
  resetUserState,
  // TODO: Export future actions when implemented
  // setUserProfile,
  // setAssistantPersona,
} = userSlice.actions;

export default userSlice.reducer;
