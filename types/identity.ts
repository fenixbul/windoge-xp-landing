export type IdentityType = "anonymous" | "session";

export interface SessionIdentity {
  type: "session";
  principal: string;
  rawIdentity: unknown; // от wallet
}

export interface AnonymousIdentity {
  type: "anonymous";
}

export type AppIdentity = SessionIdentity | AnonymousIdentity;