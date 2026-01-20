import { useState } from "react";
import type { Card } from "../types";
import { fetchRandomCard } from "../api/cards";
import TarotCard from "../components/TarotCard";
import "./DrawPage.css";

function DrawPage() {
  const [card, setCard] = useState<Card | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDraw = async () => {
    setIsLoading(true);
    setIsFlipped(false);

    try {
      const newCard = await fetchRandomCard();
      // Small delay for animation reset
      setTimeout(() => {
        setCard(newCard);
        setIsFlipped(true);
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error("Failed to draw card:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="draw-page">
      <div className="card-container">
        <TarotCard card={card} isFlipped={isFlipped} />
      </div>

      <button
        onClick={handleDraw}
        disabled={isLoading}
        className="draw-button"
      >
        {isLoading ? "Drawing..." : card ? "Draw Again" : "Draw a Card"}
      </button>

      {card && isFlipped && (
        <div className="card-info">
          <h2>{card.name}</h2>
          <p>{card.meaning}</p>
        </div>
      )}
    </div>
  );
}

export default DrawPage;
