import React, { useState } from 'react';
import { Clippy } from '../features/Clippy';
import { LoginWindow } from '../../Windows';
import { useAppSelector, useBootstrap, useStartupSound } from '@/store/hooks';
import { OSState } from '@/types/App/System';

const LogonState: React.FC = () => {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const connectionState = useAppSelector((state) => state.connection);
  const { goToState } = useBootstrap();
  const { playStartupSound } = useStartupSound();

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check connection status and handle accordingly
    if (connectionState.isConnected) {
      console.log('User is already connected, transitioning to DESKTOP');
      // Play startup sound on user action (user interaction)
      playStartupSound();
      goToState(OSState.DESKTOP);
    } else {
      console.log('User is not connected, showing login window');
      setShowLoginWindow(true);
    }
  };

  const handleCloseLogin = () => {
    setShowLoginWindow(false);
  };

  return (
    <div className='min-h-screen flex flex-col select-none'>
      {/* Header */}
      <header className='bg-[#00309c] text-white p-10 text-center h-[80px]'>
        {/* Header content can be added here */}
      </header>

      {/* Main Content */}
      <div className='flex-grow relative p-5 bg-[radial-gradient(circle_166px_at_70px_70px,#92b2ef,#5a7edc)]'>
        {/* Top glow line */}
        <hr className='absolute top-0 left-0 w-full h-[3px] m-[0px] p-[0px] border-none bg-[linear-gradient(to_right,#5a7edc,#c5dbfd,#92b2ef,#5478d5)]' />

        {/* Content area - 3 column flex layout */}
        <div className='content-area flex items-center h-[322px] w-full absolute top-[50%] translate-y-[-50%]'>
          {/* Left column - Logo positioned right */}
          <div className='flex-1 flex justify-end items-center pr-[40px]'>
            <img
              src='/images/logo-hero.png'
              alt='Windows XP Logo'
              className='max-w-[260px]'
            />
          </div>

          {/* Center column - Vertical gradient divider */}
          <div className='w-[2px] h-full flex justify-center items-center'>
            <div className='w-full h-full bg-[linear-gradient(to_bottom,#5a7edc,#8fafee,#5a7edc)]'></div>
          </div>

          {/* Right column - Content positioned left */}
          <div className='flex-1 flex justify-start items-center pl-[40px]'>
            <button
              className='flex items-center gap-4 no-underline bg-transparent border-none cursor-pointer'
              onClick={handleUserClick}
            >
              {/* User Icon */}
              <div className='w-[70px] h-[70px] bg-[#fff] rounded-[7px] flex items-center justify-center shadow-[2px_2px_4px_0px_rgba(0,0,0,0.3)] overflow-hidden relative'>
                <img
                  src='/images/astronaut-image.webp'
                  alt='Internet Identity'
                  className='w-[66px] h-[62px] absolute bottom-[0px] left-[0px]'
                />
              </div>

              {/* User Text */}
              <span className='text-[#fff] text-[22px] font-semibold pl-[20px]'>
                User
              </span>
            </button>
          </div>
        </div>

        {/* Bottom glow line */}
        <hr className='absolute bottom-[0px] left-0 w-full h-[3px] m-[0px] p-[0px] border-none bg-[linear-gradient(to_right,#093796,#f79538,#7a6668,#113d9b)]' />
      </div>

      {/* Footer */}
      <footer className='bg-[linear-gradient(to_right,#3833ac,#00309c)] text-white p-10 text-center h-[80px]'>
        {/* Footer content can be added here */}
      </footer>

      {/* Login Window Modal */}
      <LoginWindow 
        show={showLoginWindow}
        onClose={handleCloseLogin}
      />

      {/* Clippy Assistant */}
      <Clippy />
    </div>
  );
};

export default LogonState;
