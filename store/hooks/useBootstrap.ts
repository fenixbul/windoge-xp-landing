'use client'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { setSystemState, setTransitioning } from '../slices/systemSlice';
import { OSState } from '@/types/App/System';
import { transitionService } from '@/lib/services';

export const useBootstrap = () => {
  const dispatch = useAppDispatch();
  const systemState = useAppSelector((state) => state.system);

  const goToState = async (targetState: OSState) => {
    const currentState = systemState.currentState;
    
    if (currentState === targetState) {
      return; // Already in target state
    }

    // Check if transition is allowed
    const canTransition = await transitionService.executeTransition(currentState, targetState);
    
    if (!canTransition) {
      console.warn(`Cannot transition from ${currentState} to ${targetState}`);
      return;
    }

    dispatch(setTransitioning(true));
    
    // Simulate transition delay (for animations, loading, etc.)
    setTimeout(() => {
      dispatch(setSystemState(targetState));
    }, 100);
  };

  // Auto-boot sequence when starting
  useEffect(() => {
    if (systemState.currentState === OSState.BOOTLOADER) {
      // Start boot sequence
      const bootSequence = async () => {
        // Transition to system loading
        await goToState(OSState.SYSTEM_LOADING);
      };
      
      bootSequence();
    }
  }, []); // Only run once on mount

  return {
    // State
    currentState: systemState.currentState,
    isTransitioning: systemState.isTransitioning,
    bootProgress: systemState.bootProgress,
    error: systemState.error,
    
    // Actions
    goToState,
  };
};
