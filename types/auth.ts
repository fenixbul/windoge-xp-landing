import type { Identity } from "@dfinity/agent";

export interface AuthServiceData {
  identity: Identity | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthState {
  isConnected: boolean;
  principal?: string;
  status: 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
  error?: string;
}
