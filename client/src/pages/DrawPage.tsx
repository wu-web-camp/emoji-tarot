import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Card } from "../types";
import { fetchRandomCard } from "../api/cards";
import TarotCard from "../components/TarotCard";
import "./DrawPage.css";

function DrawPage() {
  const [card, setCard] = useState<Card | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch initial card on mount
  useEffect(() => {
    fetchRandomCard().then(setCard).catch(console.error);
  }, []);

  const handleCardClick = async () => {
    if (isLoading || isAnimating || isClosing) return;

    if (isFlipped) {
      // Close the card with animation
      setIsClosing(true);
      setShowDetails(false);

      // Wait for close animation, then fetch new card
      setTimeout(async () => {
        setIsFlipped(false);
        setIsClosing(false);
        setIsLoading(true);

        try {
          const newCard = await fetchRandomCard();
          setCard(newCard);
        } catch (error) {
          console.error("Failed to fetch card:", error);
        } finally {
          setIsLoading(false);
        }
      }, 800);
    } else {
      // Open the card (reveal it)
      if (card) {
        setIsFlipped(true);
        setIsAnimating(true);
        // Allow clicks again after flip animation completes (1.2s)
        setTimeout(() => {
          setIsAnimating(false);
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
              isClosing={isClosing}
              onClick={handleCardClick}
              isLoading={isLoading}
            />
          </div>
          <p className="instruction-text">
            {isLoading
              ? "Shuffling..."
              : isClosing
                ? "Closing..."
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
