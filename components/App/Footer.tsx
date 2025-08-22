import React, { useState, useEffect, useRef } from 'react';
import { getTime } from '@/lib/utils';
import './Footer.css';

import startButton from '../../public/images/windowsIcons/start.png';
import sound from '../../public/images/windowsIcons/690(16x16).png';
import usb from '../../public/images/windowsIcons/394(16x16).png';
import shield from '../../public/images/windowsIcons/214(16x16).png';

const Footer: React.FC = () => {
  const [time, setTime] = useState(getTime());
  const [menuOn, setMenuOn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // TODO: Add mouse down handler
  const _onMouseDown = () => {
    // TODO: Handle mouse down events
  };

  // TODO: Add menu toggle handler (supports both click and touch)
  const toggleMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    // TODO: Implement menu toggle logic
    setMenuOn(!menuOn);
  };

  // TODO: Add menu item click handler
  // const _onClickMenuItem = () => {
  //   // TODO: Handle menu item clicks
  // };

  // TODO: Add app mouse down handler
  // const onMouseDownApp = () => {
  //   // TODO: Handle app window clicks
  // };

  // TODO: Add apps from store
  const apps: Array<{ id: string; header: { noFooterWindow?: boolean; icon: string; title: string } }> = [];
  
  // TODO: Add focused app tracking
  // const focusedAppId = null;

  return (
    <div 
      className="footer-container" 
      onMouseDown={_onMouseDown}
      onTouchStart={_onMouseDown}
    >
      <div className="footer__items left">
        <div ref={menuRef} className="footer__start__menu">
          {/* TODO: FooterMenu component */}
          {menuOn && (
            <div 
              style={{ 
                background: '#fff', 
                padding: '10px', 
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              Footer Menu Placeholder
            </div>
          )}
        </div>
        <img
          src={startButton.src}
          alt="start"
          className="footer__start"
          onMouseDown={toggleMenu}
          onTouchStart={toggleMenu}
        />
        {/* TODO: Loop through apps and render FooterWindow components */}
        {/* Example: apps.map(app => !app.header.noFooterWindow && (
          <FooterWindow
            key={app.id}
            id={app.id}
            icon={app.header.icon}
            title={app.header.title}
            onMouseDown={onMouseDownApp}
            isFocus={focusedAppId === app.id}
          />
        )) */}
        {apps.length === 0 && (
          <div style={{ color: '#fff', fontSize: '11px', padding: '0 10px' }}>
            {/* No apps open */}
          </div>
        )}
      </div>

      <div className="footer__items right">
        <img className="footer__icon" src={sound.src} alt="Sound" />
        <img className="footer__icon" src={usb.src} alt="USB" />
        <img className="footer__icon" src={shield.src} alt="Security" />
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          {/* TODO: Balloon component for notifications */}
          {/* <Balloon /> */}
        </div>
        <div className="footer__time">{time}</div>
      </div>
    </div>
  );
};

export default Footer;
