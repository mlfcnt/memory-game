import type { Card as CardType } from "../types";

type CardProps = {
  card: CardType;
  onClick: (card: CardType) => void;
};

export const Card = ({ card, onClick }: CardProps) => (
  <div
    className={"card"}
    style={{
      backgroundColor:
        card.isFlipped || card.hasBeenMatched ? card.color : undefined,
    }}
    onClick={() => onClick(card)}
  >
    {/* <span>
      {card.isFlipped || card.hasBeenMatched ? card.displayName : null}{" "}
    </span> */}
  </div>
);
