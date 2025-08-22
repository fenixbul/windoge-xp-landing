/**
 * Reusable localStorage utilities for client-side state persistence
 * Safe for SSR/Next.js environments with proper window checks
 * 
 * TODO: In future when the app scales, we should use a more robust storage solution like redux-persist
 */

export const createStorageUtils = <T>(storageKey: string) => {
  /**
   * Load data from localStorage with validation and error handling
   * @param defaultValue - Fallback value if loading fails
   * @returns Parsed data or default value
   */
  const loadFromStorage = (defaultValue: T): T => {
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
          return JSON.parse(storedData) as T;
        }
      } catch (error) {
        console.warn(`Failed to load ${storageKey} from localStorage:`, error);
      }
    }
    return defaultValue;
  };

  /**
   * Save data to localStorage with error handling
   * @param data - Data to save
   */
  const saveToStorage = (data: T): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (error) {
        console.warn(`Failed to save ${storageKey} to localStorage:`, error);
      }
    }
  };

  /**
   * Remove data from localStorage
   */
  const removeFromStorage = (): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.warn(`Failed to remove ${storageKey} from localStorage:`, error);
      }
    }
  };

  /**
   * Check if data exists in localStorage
   * @returns true if data exists, false otherwise
   */
  const hasDataInStorage = (): boolean => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(storageKey) !== null;
      } catch (error) {
        console.warn(`Failed to check ${storageKey} in localStorage:`, error);
      }
    }
    return false;
  };

  return {
    loadFromStorage,
    saveToStorage,
    removeFromStorage,
    hasDataInStorage,
  };
};
