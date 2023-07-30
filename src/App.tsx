import { useEffect, useState } from "react";
import "./App.css";
import type { Card as CardType } from "./types";
import { useGenerateInitialCardState } from "./cardActions/generateInitialCardsState";
import { Card } from "./components/Card";
import { onCardClick } from "./cardActions/onCardClick";
import { GridLengthForm } from "./components/GridLengthForm";

function App() {
  const [config, setConfig] = useState<{
    columns: number | null;
    rows: number | null;
  }>({
    columns: null,
    rows: null,
  });
  const { cards: initialCardsState } = useGenerateInitialCardState({
    columns: config.columns,
    rows: config.rows,
  });

  useEffect(() => {
    setCards(initialCardsState);
  }, [initialCardsState]);

  const [cards, setCards] = useState<CardType[]>([]);
  const [previouslySelectedCardId, setPreviouslySelectedCardId] = useState<
    CardType["id"] | null
  >(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (!cards.length || cards.some((card) => !card.hasBeenMatched)) return;
    alert(`You won in ${moves} moves !`);
  }, [cards, moves]);

  return (
    <>
      <h1>Basic pair card game</h1>
      <GridLengthForm setConfig={setConfig} />
      {config.columns && config.rows ? (
        <>
          <p>Moves : {moves}</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
              gap: "14px",
            }}
          >
            {cards.map((card) => (
              <Card
                card={card}
                onClick={() => {
                  setMoves((moves) => moves + 1);
                  onCardClick({
                    clickedCard: card,
                    previouslySelectedCardId,
                    setCards,
                    setPreviouslySelectedCardId,
                  });
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
