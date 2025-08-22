'use client'
import React from 'react';

interface ProcessFooterProps {
  showBack?: boolean;
  showNext?: boolean;
  showCancel?: boolean;
  backLabel?: string;
  nextLabel?: string;
  cancelLabel?: string;
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
}

const ProcessFooter: React.FC<ProcessFooterProps> = ({
  showBack = false,
  showNext = true,
  showCancel = true,
  backLabel = "< Back",
  nextLabel = "Next >",
  cancelLabel = "Cancel",
  onBack,
  onNext,
  onCancel
}) => {
  return (
    <div className="process-footer">
      <div className="process-footer-buttons">
        {showBack && (
          <button className="process-btn process-btn-back" onClick={onBack}>
            {backLabel}
          </button>
        )}
        {showNext && (
          <button className="process-btn process-btn-next" onClick={onNext}>
            {nextLabel}
          </button>
        )}
        {showCancel && (
          <button className="process-btn process-btn-cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProcessFooter;
