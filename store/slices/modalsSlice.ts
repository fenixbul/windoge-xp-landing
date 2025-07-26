import { createSlice } from "@reduxjs/toolkit";

interface ModalsState {
  connectWalletOpen: boolean;
}

const initialState: ModalsState = {
  connectWalletOpen: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openConnectWallet(state) {
      state.connectWalletOpen = true;
    },
    closeConnectWallet(state) {
      state.connectWalletOpen = false;
    },
    resetModals(state) {
      state.connectWalletOpen = false;
    },
  },
});

export const {
  openConnectWallet,
  closeConnectWallet,
  resetModals,
} = modalsSlice.actions;

export default modalsSlice.reducer;
