import { OSState, Transition } from "@/types/App/System";

class TransitionService {
  // Define allowed transitions
  private transitions: Transition[] = [
    { from: OSState.BOOTLOADER, to: OSState.SYSTEM_LOADING },
    { from: OSState.SYSTEM_LOADING, to: OSState.LOGON },
    { from: OSState.SYSTEM_LOADING, to: OSState.DESKTOP },
    { from: OSState.LOGON, to: OSState.DESKTOP },
    // Allow reset from any state back to bootloader
    { from: OSState.SYSTEM_LOADING, to: OSState.BOOTLOADER },
    { from: OSState.LOGON, to: OSState.BOOTLOADER },
    { from: OSState.DESKTOP, to: OSState.BOOTLOADER },
  ];

  /**
   * Check if transition is allowed
   */
  canTransition(from: OSState, to: OSState): boolean {
    return this.transitions.some(t => t.from === from && t.to === to);
  }

  /**
   * Get allowed next states from current state
   */
  getAllowedTransitions(from: OSState): OSState[] {
    return this.transitions
      .filter(t => t.from === from)
      .map(t => t.to);
  }

  /**
   * Execute transition with guard check (if exists)
   */
  async executeTransition(from: OSState, to: OSState): Promise<boolean> {
    if (!this.canTransition(from, to)) {
      console.warn(`Transition from ${from} to ${to} is not allowed`);
      return false;
    }

    const transition = this.transitions.find(t => t.from === from && t.to === to);
    
    // Execute guard function if exists
    if (transition?.guard) {
      try {
        const guardResult = await transition.guard();
        if (!guardResult) {
          console.warn(`Transition guard from ${from} to ${to} failed`);
          return false;
        }
      } catch (error) {
        console.error(`Transition guard error from ${from} to ${to}:`, error);
        return false;
      }
    }

    return true;
  }
}

// Export singleton instance
export const transitionService = new TransitionService();
