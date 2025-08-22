'use client'
import React, { useState, useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { WindowProps } from './types';
import WindowHeader from './WindowHeader';
import './Window.css';

const Window: React.FC<WindowProps> = ({
  show = true,
  isFocus = true,
  width = 660,
  height = 500,
  x = 401,
  y = 327,
  zIndex = 16,
  centered = false,
  fullscreenMobile = false,
  header = {
    invisible: false,
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAALCSURBVDhPdZNvSFNRGMZvOEOIogLLjYS+2BfrSyZtU8Iiw4piEZouLDOJJkmWhAPT/JOZYcxi6rbKTVEnohvOqc106p1py6XOv4my6azcaJioBAn1dKYXhjAfeHm4557fw8t7zqF8SSqt3Ftaqjyt1fRktLdbCg3vR2mdbmReqezHPZFCcJiK2sls3Sqj0ai1WseXTSYLTCYrmppoVKl7oGwZxDt6FqUdNlw6+7j1oB8v3GfI8PAoJKpmvDKMoHpkAcbVPzD/Beh1oGkZKP8GXL1YNMr2554PpKICGMyrrs7+j4qhn3hhAyqdgIZA+lVAS1zlAkrswLW4smkOixdPOtjFYF6p6wzP1RYnsqY2N8u+A28XN/3lHJBN1pPFBhebxUs5RPF2M5hXudlvYloGFiAaAjLHgdxpoGAGyCMungBSyXpiTt8yCRAHUuH7GMwrz2A0GgtiTcAtM3D3yybk8eTPQFwfcL1sASTgWTAVsZ/BtqpePdgfq13CBSMg6CVDI2Ee93xfbv+D1OKvJIAvCwrgHmCQrZLL6PIbaieO6wBuK8BvA9I711BcP4eM+83usBARzWHxS7YNKMxvS7hT8wMnm/8hh/6NWo0NaWkfEB1djRNHhDRpP4vjxz+17WVq0VlfS2TD0OtnUVtrRUWFmcDyjUpMkDqPBV8R+jwBj+rqPiUtLS1hfv4XVlZWiDtI0ARSUmohEMiRl9eKzIc1FrZ/RAg5sx0M5lVDQ99Tl8u1AbvdbthsdtD0FCSSDgiFchQUtCInq9FJZpDEoaL2MJhXottynsUyvuZwOGC3z2FycgZG4xhUqm4yhyoS1IWYyHQLx5+f7vMehFKhrHORD+KL8lVjWo1pXa83kwc1AIWiG+KMykX+0Zu9ZIjSbd+CR54fHD8el0z6EdlcQ0pHqoVUI5vFfRJkzzvDocKY9inqP+OethPzSizLAAAAAElFTkSuQmCC",
    title: "Window header title"
  },
  children,
  className = "",
  controls = {},
  onClose,
  onMinimize,
  onMaximize
}) => {
  // Enhanced: Use @react-hook/window-size for better performance
  const [windowWidth, windowHeight] = useWindowSize();
  
  // Fix 3: Add client-side rendering check
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fix 1: Safe fallbacks for initial render and undefined values
  const safeWidth = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);
  const safeHeight = windowHeight || (typeof window !== 'undefined' ? window.innerHeight : 800);

  // Define breakpoints (following common practices)
  const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1024
  };

  const isMobile = safeWidth < breakpoints.mobile;
  const isTablet = safeWidth >= breakpoints.mobile && safeWidth < breakpoints.tablet;
  const isDesktop = safeWidth >= breakpoints.desktop;

  // Enhanced positioning logic
  const getWindowStyle = () => {
    // Mobile: Fullscreen when enabled (only after client-side hydration)
    if (isMobile && fullscreenMobile && isClient) {
      return {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        transform: 'none',
        zIndex,
        boxSizing: 'border-box' as const,
      };
    }

    // Desktop/Tablet: Center when enabled
    if ((isDesktop || isTablet) && centered && isClient) {
      // Fix 2: Simple centering without resizing - use exact dimensions
      const centerX = Math.max(0, (safeWidth - width) / 2);
      const centerY = Math.max(0, (safeHeight - height) / 2);

      return {
        position: 'fixed' as const,
        left: `${centerX}px`,
        top: `${centerY}px`,
        width: `${width}px`,      // Use exact width - no Math.min resizing
        height: `${height}px`,    // Use exact height - no Math.min resizing
        transform: 'none',
        zIndex,
        boxSizing: 'border-box' as const,
      };
    }

    // Default: Fixed position (unchanged for backward compatibility)
    // On server-side or initial render, use non-centered positioning
    return {
      position: 'absolute' as const,
      transform: `translate(${x}px, ${y}px)`,
      width: `${width}px`,
      height: `${height}px`,
      zIndex,
      boxSizing: 'border-box' as const,
    };
  };

  // Generate responsive class names
  const getResponsiveClasses = () => {
    const classes = ['xp-window'];
    
    if (isFocus) classes.push('focused');
    else classes.push('unfocused');
    
    // Only add responsive classes after client-side hydration
    if (isClient) {
      if (isMobile) classes.push('mobile');
      if (isTablet) classes.push('tablet');
      if (isDesktop) classes.push('desktop');
    }
    
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <div 
      className={getResponsiveClasses()}
      style={{
        ...getWindowStyle(),
        display: show ? 'flex' : 'none'
      }}
    >
      <div className="header__bg"></div>
      
      {!header.invisible && (
        <WindowHeader
          icon={header.icon}
          title={header.title}
          controls={controls}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
        />
      )}
      
      <div className="app__content">
        <div className="com__content">
          <div className="com__content__inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Window;
