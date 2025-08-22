import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/auth";

type ConnectionState = AuthState;

const initialState: ConnectionState = {
  isConnected: false,
  status: 'idle',
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setConnecting: (state) => {
      state.status = 'connecting';
      state.error = undefined;
    },
    setConnected: (state, action: PayloadAction<{ principal: string }>) => {
      state.isConnected = true;
      state.status = 'connected';
      state.principal = action.payload.principal;
      state.error = undefined;
    },
    setDisconnected: (state) => {
      state.isConnected = false;
      state.status = 'disconnected';
      state.principal = undefined;
      state.error = undefined;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'error';
      state.error = action.payload;
      state.isConnected = false;
    },
    resetConnection: () => {
      return initialState;
    },
  },
});

export const {
  setConnecting,
  setConnected,
  setDisconnected,
  setError,
  resetConnection,
} = connectionSlice.actions;

export default connectionSlice.reducer;
