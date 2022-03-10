export interface Flag {
  expiryTime: string | null;
  type: FlagTypes;
}

export type FlagTypes =
  | "NEW"
  | "UPDATED"
  | "EXCLUSIVE"
  | "SPONSORED"
  | "LONGREAD"
  | "LIVE"
  | "BREAKING";
