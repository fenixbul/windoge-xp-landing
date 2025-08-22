export interface ProcessWindowProps {
  show?: boolean;
  onClose?: () => void;
  
  // Process Window specific
  title?: string;
  subtitle?: string;
  icon?: string;
  
  // Window dimensions
  width?: number;
  height?: number;
  centered?: boolean;
  fullscreenMobile?: boolean;
  
  // Content
  children?: React.ReactNode;
  
  // Footer controls
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
