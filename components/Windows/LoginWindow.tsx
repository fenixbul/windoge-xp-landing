'use client'
import React, { useEffect } from 'react';
import { ProcessWindow } from './variants';
import { useAppDispatch, useAppSelector, useAuth, useBootstrap, useStartupSound } from '@/store/hooks';
import { setWalletConnected } from '@/store/slices/walletSlice';
import { addNotification } from '@/store/slices/notificationsSlice';
import { OSState } from '@/types/App/System';

interface LoginWindowProps {
  show?: boolean;
  onClose?: () => void;
}

const LoginWindow: React.FC<LoginWindowProps> = ({
  show = false,
  onClose
}) => {
  const dispatch = useAppDispatch();
  const walletState = useAppSelector((state) => state.wallet);
  const systemState = useAppSelector((state) => state.system);
  const { login, isConnecting, isConnected } = useAuth();
  const { goToState } = useBootstrap();
  const { playStartupSound } = useStartupSound();

  // Watch for successful II login to transition to desktop
  useEffect(() => {
    if (show && isConnected && walletState.type === 'internet-identity' && systemState.currentState !== OSState.DESKTOP) {
      console.log('II login successful, transitioning to desktop');
      // Close window after successful login and state transition
      setTimeout(() => {
        onClose?.();
      }, 100);
    }
  }, [isConnected, walletState.type, systemState.currentState, goToState, onClose]);

  const handleInternetIdentity = async () => {
    console.log('Internet Identity selected');
    
    try {
      // Play startup sound on auth action (user interaction)
      playStartupSound();
      
      await login();
      
      // Manually set wallet state for Internet Identity
      // Note: useAuth also sets this, but being explicit as requested
      if (isConnected) {
        dispatch(setWalletConnected({ 
          type: 'internet-identity', 
          address: 'TBA' // Will be updated with actual principal when available
        }));
      }
      
      // Note: Window close and desktop transition handled by useEffect
      // when isConnected becomes true
    } catch (error) {
      // Error handling is done in useAuth hook
      console.error('Login failed:', error);
    }
  };

  const handleGuestLogin = () => {
    console.log('Guest login selected');
    
    // Play startup sound on auth action (user interaction)
    playStartupSound();
    
    // Guest mode - no actual connection needed
    dispatch(setWalletConnected({ 
      type: 'guest', 
      address: 'guest-user' 
    }));
    dispatch(addNotification({
      id: `guest-${Date.now()}`,
      message: 'Logged in as guest',
      type: 'success',
      duration: 3000,
    }));
    
    // Transition to desktop if not already there
    if (systemState.currentState !== OSState.DESKTOP) {
      goToState(OSState.DESKTOP);
    }
    
    onClose?.();
  };

  return (
    <ProcessWindow
      show={show}
      title="Choose Authentication Method"
      subtitle="Select how you want to access the system"
      icon="/images/astronaut-image.webp"
      onClose={onClose}
      showBack={false}
      showNext={false}
      showCancel={true}
      cancelLabel="Close"
    >
      <div className="process-options">
        <div 
          className={`process-option ${isConnecting ? 'disabled' : ''}`}
          onClick={isConnecting ? undefined : handleInternetIdentity}
        >
          <div className="process-option-icon">
            {isConnecting ? '⏳' : '∞'}
          </div>
          <div className="process-option-text">
            {isConnecting ? 'Connecting...' : 'Internet Identity'}
          </div>
        </div>
        
        <div 
          className={`process-option ${walletState.isConnecting ? 'disabled' : ''}`}
          onClick={walletState.isConnecting ? undefined : handleGuestLogin}
        >
          <div className="process-option-icon">👤</div>
          <div className="process-option-text">Continue as Guest</div>
        </div>
      </div>
    </ProcessWindow>
  );
};

export default LoginWindow;
