import React, { useEffect, useRef } from 'react';
import { useAppSelector, useBootstrap } from '@/store/hooks';
import { OSState } from '@/types/App/System';

const SystemLoadingState: React.FC = () => {
  const loadingWrapRef = useRef<HTMLDivElement>(null);
  const connectionState = useAppSelector((state) => state.connection);
  const { goToState } = useBootstrap();

  useEffect(() => {
    const loadingWrap = loadingWrapRef.current;
    if (!loadingWrap) return;

    let position = -150; // Initial position
    const interval = setInterval(() => {
      position += 20; // Move 20 pixels per step
      loadingWrap.style.left = `${position}px`;
      if (position >= 400) {
        position = -150; // Reset position when it reaches the end
      }
    }, 70); // Adjust interval duration as needed

    const timer = setTimeout(() => {
      clearInterval(interval);
      
      // transition to LOGON state
      goToState(OSState.LOGON);
    }, 6 * 1000); // Adjust time for bootup animation as needed

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [connectionState.isConnected, goToState]);

  const containerStyle: React.CSSProperties = {
    background: 'black',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const loadingContainerStyle: React.CSSProperties = {
    display: 'block',
    height: '46px',
    maxWidth: '380px',
    border: '3px solid #a8a8a8',
    borderRadius: '12px',
    transform: 'scale(0.5)',
    overflow: 'hidden',
    position: 'relative',
  };

  const loadingWrapStyle: React.CSSProperties = {
    width: '100px',
    position: 'absolute',
    left: '0px',
    top: '3px',
  };

  const spanStyle: React.CSSProperties = {
    backgroundRepeat: 'repeat-x',
    display: 'inline-block',
    width: '22px',
    height: '33px',
    borderRadius: '3px',
    marginRight: '6px',
  };

  const animationWrapStyle: React.CSSProperties = {
    padding: '10px 40px',
    textAlign: 'center',
    animation: 'fadeIn 2.8s ease-out forwards',
  };

  const logoStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '50px',
  };

  const footerStyle: React.CSSProperties = {
    position: 'absolute',
    left: '20px',
    bottom: '22px',
    color: '#f1f1f1',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div style={animationWrapStyle}>
        <img src="/images/bootup/logo.png" style={logoStyle} alt="Logo" />
        <div style={loadingContainerStyle}>
          <div ref={loadingWrapRef} style={loadingWrapStyle}>
            <span 
              style={{
                ...spanStyle,
                backgroundImage: 'url("/images/bootup/gradient1.png")',
              }}
            ></span>
            <span 
              style={{
                ...spanStyle,
                backgroundImage: 'url("/images/bootup/gradient2.png")',
              }}
            ></span>
            <span 
              style={{
                ...spanStyle,
                backgroundImage: 'url("/images/bootup/gradient3.png")',
              }}
            ></span>
          </div>
        </div>
        <span style={footerStyle}>Powered by Internet Computer ® 100% on-chain</span>
      </div>
    </div>
  );
};

export default SystemLoadingState;
