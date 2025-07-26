import { AgentInstance } from "./agent";
import { AppIdentity } from "./identity";

export type ActorMap = {
    [canisterName: string]: unknown; // Типизираме по-късно
  };
  
export interface ActorInitOptions {
    agent: AgentInstance;
    identity: AppIdentity;
}