import { useState } from "react";
import "./App.css";
import type { Card as CardType } from "./types";
import { generateInitialCardState } from "./cardActions/generateInitialCardsState";
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
  const { cards: initialCardsState } = generateInitialCardState({
    columns: config.columns,
    rows: config.rows,
  });

  const [cards, setCards] = useState<CardType[]>(() => initialCardsState);
  const [previouslySelectedCardId, setPreviouslySelectedCardId] = useState<
    CardType["id"] | null
  >(null);

  // useEffect(() => {
  //   if (cards.some((card) => !card.hasBeenMatched)) return;
  //   alert("Victory royale !");
  // }, [cards]);

  console.log({ config });

  return (
    <>
      <h1>Memory card game</h1>
      <GridLengthForm setConfig={setConfig} />
      {config.columns && config.rows ? (
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
              onClick={() =>
                onCardClick({
                  clickedCard: card,
                  previouslySelectedCardId,
                  setCards,
                  setPreviouslySelectedCardId,
                })
              }
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default App;
