import { Dispatch } from "react";
import { Card } from "../types";
import { flipCard } from "./flipCard";

type Props = {
  clickedCard: Card;
  previouslySelectedCardId: Card["id"] | null;
  setPreviouslySelectedCardId: (id: Card["id"] | null) => void;
  setCards: Dispatch<React.SetStateAction<Card[]>>;
};

export const onCardClick = ({
  clickedCard,
  previouslySelectedCardId,
  setPreviouslySelectedCardId,
  setCards,
}: Props) => {
  if (previouslySelectedCardId == undefined) {
    // si pas de "sister card en attente, on enregistre l'id de la carte cliquée"
    setPreviouslySelectedCardId(clickedCard.id);
  } else {
    // si une "sister card" est en attente, on compare les 2 cartes
    // si les 2 cartes sont identiques, on les laisse retournées
    if (previouslySelectedCardId === clickedCard.sistedCardId) {
      setCards((cards) =>
        cards.map((card) => {
          if (
            card.id === clickedCard.id ||
            card.id === previouslySelectedCardId
          ) {
            return {
              ...card,
              hasBeenMatched: true,
            };
          }
          return card;
        })
      );
    } else {
      // si les 2 cartes sont différentes, on les retourne
      setCards((cards) =>
        cards.map((card) => ({
          ...card,
          isFlipped: false,
        }))
      );
    }
    setPreviouslySelectedCardId(null);
  }

  // on retourne la carte cliquée
  setCards((cards) =>
    cards.map((card) => {
      if (card.id === clickedCard.id) {
        if (card.hasBeenMatched) return card;
        else {
          return flipCard(clickedCard);
        }
      }
      return card;
    })
  );
};
