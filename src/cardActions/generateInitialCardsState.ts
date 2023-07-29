import { Card } from "../types";

const COLORS: Card["color"][] = [
  "#FF5733",
  "#FFC300",
  "#DAF7A6",
  "#C70039",
  "#900C3F",
  "#00A8E8",
  "#FF6F61",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9",
];

export const generateInitialCardState = ({
  columns,
  rows,
}: {
  columns: number | null;
  rows: number | null;
}) => {
  if (!columns || !rows) {
    return {
      cards: [],
    };
  }
  if (COLORS.length < (columns * rows) / 2) {
    throw new Error(
      "Not enough colors to generate cards. Please add more colors in src/cardActions/generateInitialCardsState.ts"
    );
  }
  const cards: Card[] = [];
  for (let i = 0; i < columns * rows; i++) {
    const isPair = i % 2 === 0;
    cards.push({
      id: i,
      color: isPair ? COLORS[i / 2] : COLORS[(i - 1) / 2],
      displayName: `Carte ${i}`,
      isFlipped: false,
      hasBeenMatched: false,
      sistedCardId: isPair ? i + 1 : i - 1,
    });
  }
  return { cards: randomizeCardPosition(cards) };
};

const randomizeCardPosition = (cards: Card[]) => {
  const randomizedCards = [...cards];
  for (let i = 0; i < cards.length; i++) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const tempCard = randomizedCards[i];
    randomizedCards[i] = randomizedCards[randomIndex];
    randomizedCards[randomIndex] = tempCard;
  }
  return randomizedCards;
};
