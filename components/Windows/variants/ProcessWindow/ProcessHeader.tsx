'use client'
import React from 'react';

interface ProcessHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: string;
}

const ProcessHeader: React.FC<ProcessHeaderProps> = ({
  title = "Process Window",
  subtitle = "Please follow the instructions below",
  icon
}) => {
  return (
    <div className="process-header">
      <div className="process-header-content">
        <div className="process-header-text">
          <h1 className="process-title">{title}</h1>
          <p className="process-subtitle">{subtitle}</p>
        </div>
        {icon && (
          <div className="process-header-icon">
            <img src={icon} alt="Process Icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessHeader;
