import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OSState } from "@/types/App/System";

interface SystemState {
  currentState: OSState;
  isTransitioning: boolean;
  bootProgress: number;
  error?: string;
}

const initialState: SystemState = {
  currentState: OSState.LOGON,
  isTransitioning: false,
  bootProgress: 0,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setSystemState: (state, action: PayloadAction<OSState>) => {
      state.currentState = action.payload;
      state.isTransitioning = false;
      state.error = undefined;
    },
    setTransitioning: (state, action: PayloadAction<boolean>) => {
      state.isTransitioning = action.payload;
    },
    setBootProgress: (state, action: PayloadAction<number>) => {
      state.bootProgress = action.payload;
    },
    setSystemError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isTransitioning = false;
    },
    resetSystem: () => {
      return initialState;
    },
  },
});

export const {
  setSystemState,
  setTransitioning,
  setBootProgress,
  setSystemError,
  resetSystem,
} = systemSlice.actions;

export default systemSlice.reducer;
