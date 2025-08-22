'use client'
import React from 'react';
import { WindowHeaderProps } from './types';
import WindowControls from './WindowControls';

const WindowHeader: React.FC<WindowHeaderProps> = ({
  icon,
  title = "Window header title",
  controls = {},
  onMinimize,
  onMaximize,
  onClose
}) => {
  return (
    <header className="app__header">
      {icon && (
        <img 
          src={icon} 
          alt="Window Icon" 
          className="app__header__icon" 
          draggable="false"
        />
      )}
      <div className="app__header__title">
        {title}
      </div>
      <WindowControls
        showMinimize={controls.showMinimize}
        showMaximize={controls.showMaximize}
        showClose={controls.showClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
      />
    </header>
  );
};

export default WindowHeader;
