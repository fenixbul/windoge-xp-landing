'use client'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { setConnecting, setConnected, setDisconnected, setError } from '../slices/connectionSlice';
import { setWalletConnecting, setWalletConnected, setWalletDisconnected } from '../slices/walletSlice';
import { addNotification } from '../slices/notificationsSlice';
import { authService } from '@/lib/services/auth-service';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const connectionState = useAppSelector((state) => state.connection);
  const walletState = useAppSelector((state) => state.wallet);

  // Sync auth service state with Redux
  useEffect(() => {
    const unsubscribe = authService.subscribe((authData) => {
      if (authData.isLoading) {
        dispatch(setConnecting());
        return;
      }

      if (authData.error) {
        dispatch(setError(authData.error));
        dispatch(setWalletDisconnected());
        return;
      }

      if (authData.identity) {
        const principal = authData.identity.getPrincipal().toText();
        dispatch(setConnected({ principal }));
        dispatch(setWalletConnected({ 
          type: 'internet-identity', 
          address: principal 
        }));
      } else {
        dispatch(setDisconnected());
        dispatch(setWalletDisconnected());
      }
    });

    // Initial sync
    authService.sync();

    return unsubscribe;
  }, [dispatch]);

  const login = async () => {
    try {
      dispatch(setWalletConnecting('internet-identity'));
      dispatch(addNotification({
        id: `ii-${Date.now()}`,
        message: 'Opening Internet Identity...',
        type: 'info',
        duration: 3000,
      }));

      await authService.signIn();
      
      dispatch(addNotification({
        id: `ii-success-${Date.now()}`,
        message: 'Successfully connected to Internet Identity!',
        type: 'success',
        duration: 4000,
      }));
    } catch (error) {
      dispatch(addNotification({
        id: `ii-error-${Date.now()}`,
        message: `Login failed: ${(error as Error).message}`,
        type: 'error',
        duration: 5000,
      }));
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      dispatch(addNotification({
        id: `logout-${Date.now()}`,
        message: 'Successfully logged out',
        type: 'info',
        duration: 3000,
      }));
    } catch (error) {
      dispatch(addNotification({
        id: `logout-error-${Date.now()}`,
        message: `Logout failed: ${(error as Error).message}`,
        type: 'error',
        duration: 5000,
      }));
    }
  };

  const sync = async () => {
    try {
      await authService.sync();
    } catch (error) {
      console.error('Auth sync failed:', error);
    }
  };

  return {
    // State
    isConnected: connectionState.isConnected,
    principal: connectionState.principal,
    status: connectionState.status,
    error: connectionState.error,
    isConnecting: walletState.isConnecting,
    
    // Actions
    login,
    logout,
    sync,
  };
};
