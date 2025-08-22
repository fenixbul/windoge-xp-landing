import type { AuthClient } from "@dfinity/auth-client";
import type { AuthServiceData } from "@/types/auth";
import {
  createAuthClient,
  getIdentityProviderUrl,
} from "@/lib/utils/auth-utils";

class AuthService {
  private authClient: AuthClient | null = null;
  private listeners: ((data: AuthServiceData) => void)[] = [];
  private data: AuthServiceData = {
    identity: null,
    isLoading: false,
    error: null,
  };

  /**
   * Subscribe to auth state changes
   */
  subscribe(listener: (data: AuthServiceData) => void) {
    this.listeners.push(listener);
    // Immediately call with current state
    listener(this.data);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of state changes
   */
  private notify() {
    this.listeners.forEach(listener => listener({ ...this.data }));
  }

  /**
   * Update state and notify listeners
   */
  private setState(updates: Partial<AuthServiceData>) {
    this.data = { ...this.data, ...updates };
    this.notify();
  }

  /**
   * Try to restore identity from session.
   */
  async sync(): Promise<void> {
    try {
      this.setState({ isLoading: true, error: null });
      
      this.authClient = this.authClient ?? (await createAuthClient());
      const isAuthenticated = await this.authClient.isAuthenticated();
      
      this.setState({
        identity: isAuthenticated ? this.authClient.getIdentity() : null,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: (error as Error).message,
        isLoading: false,
        identity: null,
      });
    }
  }

  /**
   * Starts the II login flow. Must be called from a user interaction.
   */
  async signIn(): Promise<void> {
    try {
      this.setState({ isLoading: true, error: null });
      
      this.authClient = this.authClient ?? (await createAuthClient());

      return new Promise((resolve, reject) => {
        this.authClient!.login({
          identityProvider: getIdentityProviderUrl(),
          maxTimeToLive: BigInt(30 * 60 * 1_000_000_000), // 30 mins
          onSuccess: () => {
            this.setState({
              identity: this.authClient?.getIdentity() || null,
              isLoading: false,
            });
            resolve();
          },
          onError: (error) => {
            this.setState({
              error: error || 'Login failed',
              isLoading: false,
            });
            reject(new Error(error || 'Login failed'));
          },
        });
      });
    } catch (e) {
      const errorMessage = (e as Error).message;
      this.setState({
        error: errorMessage,
        isLoading: false,
      });
      throw e;
    }
  }

  /**
   * Logs the user out and clears stored delegation.
   */
  async signOut(): Promise<void> {
    try {
      this.setState({ isLoading: true, error: null });
      
      const client = this.authClient ?? (await createAuthClient());
      await client.logout();
      this.authClient = null;
      
      this.setState({
        identity: null,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: (error as Error).message,
        isLoading: false,
      });
    }
  }

  /**
   * Get current state (for one-time access)
   */
  getState(): AuthServiceData {
    return { ...this.data };
  }
}

// Export singleton instance
export const authService = new AuthService();
