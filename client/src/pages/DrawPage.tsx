import { useState } from "react";
import type { Card } from "../types";
import { fetchRandomCard } from "../api/cards";
import TarotCard from "../components/TarotCard";
import "./DrawPage.css";

function DrawPage() {
  const [card, setCard] = useState<Card | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDraw = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setIsFlipped(false);
    setShowDetails(false);

    try {
      const newCard = await fetchRandomCard();
      // Small delay for animation reset
      setTimeout(() => {
        setCard(newCard);
        setIsFlipped(true);
        setIsLoading(false);

        // Show details after flip animation completes (1.2s)
        setTimeout(() => {
          setShowDetails(true);
        }, 1200);
      }, 300);
    } catch (error) {
      console.error("Failed to draw card:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="draw-page">
      <div className="draw-content">
        <div className="card-section">
          <div className="card-container">
            <TarotCard
              card={card}
              isFlipped={isFlipped}
              onClick={handleDraw}
              isLoading={isLoading}
            />
          </div>
          <p className="instruction-text">
            {isLoading
              ? "Drawing..."
              : isFlipped
                ? "Click the card to draw again"
                : "Click the card to reveal your fate"}
          </p>
        </div>

        {card && showDetails && (
          <div className="card-info">
            <h2>{card.name}</h2>
            <p>{card.meaning}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DrawPage;
