import { HttpAgent, Actor, ActorSubclass } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { idlFactory } from "../../src/declarations/core";
import type { _SERVICE } from "../../src/declarations/core/core.did";

// Types for the core canister interface
export type CoreCanisterService = _SERVICE;

// Registry for canister actors
let canisterActors: Record<string, ActorSubclass<CoreCanisterService>> = {};
let anonCanisterActors: Record<string, ActorSubclass<CoreCanisterService>> = {};

// TODO: Load from environment variables - HARDCODED PROD ID FOR NOW
const canisterId = "xqs6h-3qaaa-aaaag-aue6a-cai";
const host = "https://icp0.io";

// Get canister ID from declarations or environment
function getCanisterId(): string {
  if (canisterId) {
    return canisterId;
  }
  throw new Error('Canister ID not found. Make sure declarations are generated.');
}

/**
 * Create anonymous actor using declarations
 */
function createAnonymousActor(): ActorSubclass<CoreCanisterService> {
  const agent = new HttpAgent({
    host: host
  });
  
  return Actor.createActor(idlFactory, { 
    agent, 
    canisterId: getCanisterId() 
  });
}

/**
 * Create authenticated actor using declarations
 */
async function createAuthenticatedActor(): Promise<ActorSubclass<CoreCanisterService>> {
  const authClient = await AuthClient.create();
  const identity = await authClient.getIdentity();
  
  const agent = new HttpAgent({ 
    identity,
    host: process.env.NODE_ENV === 'development' ? 'http://localhost:4943' : 'https://icp0.io'
  });

  // Only for local development
  if (process.env.NODE_ENV === 'development') {
    await agent.fetchRootKey();
  }

  return Actor.createActor(idlFactory, { 
    agent, 
    canisterId: getCanisterId() 
  });
}

/**
 * Get or create a canister actor
 */
async function getCanisterActor(
  isAnonymous = true,
  isForced = false
): Promise<ActorSubclass<CoreCanisterService>> {
  const actorId = getCanisterId();
  
  if (isAnonymous) {
    if (isForced || !anonCanisterActors[actorId]) {
      anonCanisterActors[actorId] = createAnonymousActor();
    }
    return anonCanisterActors[actorId];
  } else {
    if (isForced || !canisterActors[actorId]) {
      canisterActors[actorId] = await createAuthenticatedActor();
    }
    return canisterActors[actorId];
  }
}

/**
 * Core Canister Service
 * Provides methods to interact with the core canister
 */
export class CoreCanisterServiceClass {
  private actor: ActorSubclass<CoreCanisterService> | null = null;
  private isInitialized = false;

  /**
   * Initialize the service
   */
  async initialize(useAuthenticated = false): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.actor = await getCanisterActor(!useAuthenticated);
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize core canister service:', error);
      throw error;
    }
  }

  /**
   * Send a prompt to the LLM
   */
  async promptLLM(prompt: string): Promise<string> {
    if (!this.actor) {
      await this.initialize();
    }

    if (!this.actor) {
      throw new Error('Core canister service not initialized');
    }

    try {
      const response = await this.actor.promptLLM(prompt);
      return response;
    } catch (error) {
      console.error('Failed to call promptLLM:', error);
      throw new Error(`LLM request failed: ${error}`);
    }
  }

  /**
   * Check if service is ready
   */
  isReady(): boolean {
    return this.isInitialized && this.actor !== null;
  }

  /**
   * Reset the service (force recreation of actors)
   */
  async reset(): Promise<void> {
    this.actor = null;
    this.isInitialized = false;
    canisterActors = {};
    anonCanisterActors = {};
  }
}

// Singleton instance
export const coreCanisterService = new CoreCanisterServiceClass();

// Export utility functions
export { getCanisterActor, getCanisterId };
