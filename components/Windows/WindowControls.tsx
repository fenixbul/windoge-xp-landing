'use client'
import React from 'react';
import { WindowControlsProps } from './types';

const WindowControls: React.FC<WindowControlsProps> = ({
  showMinimize = true,
  showMaximize = true,
  showClose = true,
  onMinimize,
  onMaximize,
  onClose
}) => {
  return (
    <div className="window-controls">
      {showMinimize && (
        <button 
          className="header__button header__button--minimize"
          onClick={onMinimize}
          type="button"
        />
      )}
      {showMaximize && (
        <button 
          className="header__button header__button--maximize"
          onClick={onMaximize}
          type="button"
        />
      )}
      {showClose && (
        <button 
          className="header__button header__button--close"
          onClick={onClose}
          type="button"
        />
      )}
    </div>
  );
};

export default WindowControls;
