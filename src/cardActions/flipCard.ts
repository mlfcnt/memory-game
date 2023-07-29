import { Card } from "../types";

export const flipCard = (card: Card) => ({
  ...card,
  isFlipped: !card.isFlipped,
});
