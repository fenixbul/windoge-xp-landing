import React from 'react';
import { OSState } from '@/types/App/System';
import { useBootstrap } from '@/store/hooks';
import { 
  BootloaderState, 
  SystemLoadingState, 
  LogonState, 
  DesktopState 
} from './states';

const ShellFrame: React.FC = () => {
  const { currentState, bootProgress } = useBootstrap();

  const renderCurrentState = () => {
    switch (currentState) {
      case OSState.BOOTLOADER:
        return <BootloaderState progress={bootProgress} />;
        
      case OSState.SYSTEM_LOADING:
        return <SystemLoadingState />;
        
      case OSState.LOGON:
        return <LogonState />;
        
      case OSState.DESKTOP:
        return <DesktopState />;
        
      default:
        return <BootloaderState progress={0} />;
    }
  };

  return (
    <div className="shell-frame w-full h-full">
      {renderCurrentState()}
    </div>
  );
};

export default ShellFrame;
