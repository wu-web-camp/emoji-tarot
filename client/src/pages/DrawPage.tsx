import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Card } from "../types";
import { fetchRandomCard } from "../api/cards";
import TarotCard from "../components/TarotCard";
import "./DrawPage.css";

function DrawPage() {
  const [card, setCard] = useState<Card | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch initial card on mount
  useEffect(() => {
    fetchRandomCard().then(setCard).catch(console.error);
  }, []);

  const handleCardClick = async () => {
    if (isLoading) return;

    if (isFlipped) {
      // Close the card and fetch new one in background
      setIsFlipped(false);
      setShowDetails(false);
      setIsLoading(true);

      try {
        const newCard = await fetchRandomCard();
        setCard(newCard);
      } catch (error) {
        console.error("Failed to fetch card:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Open the card (reveal it)
      if (card) {
        setIsFlipped(true);
        // Show details after flip animation completes (1.2s)
        setTimeout(() => {
          setShowDetails(true);
        }, 1200);
      }
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
              onClick={handleCardClick}
              isLoading={isLoading}
            />
          </div>
          <p className="instruction-text">
            {isLoading
              ? "Shuffling..."
              : isFlipped
                ? "Click to close and draw again"
                : "Click to reveal your fate"}
          </p>
          <Link to="/manage" className="manage-link">Manage Deck</Link>
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
