export interface Flag {
  expiryTime: string;
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
