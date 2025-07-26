import { IdentityType } from "./identity";

export interface AgentInstance {
    type: IdentityType;
    instance: unknown;
    createdAt: number;
}