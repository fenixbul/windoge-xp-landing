import { AppIdentity } from "./identity";
import { AgentInstance } from "./agent";
import { ActorMap } from "./actor";

export interface AppInitContext {
  identity: AppIdentity;
  agent: AgentInstance;
  actors: ActorMap;
}