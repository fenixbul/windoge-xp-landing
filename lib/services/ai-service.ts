import { coreCanisterService } from './canister-service';

/**
 * AI Service - High-level wrapper for LLM interactions
 * This service provides a clean interface for the SmartAssistant to communicate with the LLM
 */
export class AIService {
  private static instance: AIService;
  private isInitialized = false;

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Initialize the AI service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await coreCanisterService.initialize(false); // Use anonymous for now
      this.isInitialized = true;
      console.log('AI Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
      throw error;
    }
  }

  /**
   * Send a message to the AI and get a response
   */
  async sendMessage(message: string): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const response = await coreCanisterService.promptLLM(message);
      return response;
    } catch (error) {
      console.error('Error sending message to AI:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  /**
   * Check if the service is ready
   */
  isReady(): boolean {
    return this.isInitialized && coreCanisterService.isReady();
  }

  /**
   * Reset the service
   */
  async reset(): Promise<void> {
    await coreCanisterService.reset();
    this.isInitialized = false;
  }
}

// Export singleton instance
export const aiService = AIService.getInstance();
