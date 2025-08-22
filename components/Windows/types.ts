export interface WindowProps {
  show?: boolean;
  isFocus?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  zIndex?: number;
  
  // Step 1: New positioning options
  centered?: boolean;           // Auto-center on desktop
  fullscreenMobile?: boolean;   // Fullscreen on mobile
  
  header?: {
    invisible?: boolean;
    icon?: string;
    title?: string;
  };
  children?: React.ReactNode;
  className?: string;
  controls?: {
    showMinimize?: boolean;
    showMaximize?: boolean;
    showClose?: boolean;
  };
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export interface WindowHeaderProps {
  icon?: string;
  title?: string;
  controls?: {
    showMinimize?: boolean;
    showMaximize?: boolean;
    showClose?: boolean;
  };
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export interface WindowControlsProps {
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}
