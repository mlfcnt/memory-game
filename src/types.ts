import { CSSProperties } from "react";

export type Card = {
  id: number;
  color: CSSProperties["color"];
  displayName: string;
  isFlipped: boolean;
  hasBeenMatched: boolean;
  sistedCardId: Card["id"];
};
