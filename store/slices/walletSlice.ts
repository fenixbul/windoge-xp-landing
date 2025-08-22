import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WalletType = 'internet-identity' | 'nfid' | 'stoic' | 'plug' | 'guest' | null;

interface WalletState {
  type: WalletType;
  isConnecting: boolean;
  balance?: string;
  address?: string;
}

const initialState: WalletState = {
  type: null,
  isConnecting: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletConnecting: (state, action: PayloadAction<WalletType>) => {
      state.type = action.payload;
      state.isConnecting = true;
    },
    setWalletConnected: (state, action: PayloadAction<{ 
      type: WalletType; 
      address: string; 
      balance?: string; 
    }>) => {
      state.type = action.payload.type;
      state.address = action.payload.address;
      state.balance = action.payload.balance;
      state.isConnecting = false;
    },
    setWalletDisconnected: (state) => {
      return initialState;
    },
    updateBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
  },
});

export const {
  setWalletConnecting,
  setWalletConnected,
  setWalletDisconnected,
  updateBalance,
} = walletSlice.actions;

export default walletSlice.reducer;
