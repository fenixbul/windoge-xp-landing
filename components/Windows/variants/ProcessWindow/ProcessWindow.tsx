'use client'
import React from 'react';
import { Window } from '../../index';
import ProcessHeader from './ProcessHeader';
import ProcessFooter from './ProcessFooter';
import { ProcessWindowProps } from './types';
import './ProcessWindow.css';

const ProcessWindow: React.FC<ProcessWindowProps> = ({
  show = false,
  onClose,
  title,
  subtitle,
  icon,
  width = 500,
  height = 400,
  centered = true,
  fullscreenMobile = true,
  children,
  showBack = false,
  showNext = true,
  showCancel = true,
  backLabel,
  nextLabel,
  cancelLabel,
  onBack,
  onNext,
  onCancel
}) => {
  return (
    <Window
      show={show}
      isFocus={true}
      width={width}
      height={height}
      centered={centered}
      fullscreenMobile={fullscreenMobile}
      zIndex={100}
      header={{
        icon: "/images/astronaut-image.webp",
        title: "Setup Process"
      }}
      controls={{
        showMinimize: false,
        showMaximize: false,
        showClose: true
      }}
      onClose={onClose}
    >
      <div className="process-window-content">
        <ProcessHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
        />
        
        <div className="process-body">
          {children}
        </div>
        
        <ProcessFooter
          showBack={showBack}
          showNext={showNext}
          showCancel={showCancel}
          backLabel={backLabel}
          nextLabel={nextLabel}
          cancelLabel={cancelLabel}
          onBack={onBack}
          onNext={onNext}
          onCancel={onCancel || onClose}
        />
      </div>
    </Window>
  );
};

export default ProcessWindow;

