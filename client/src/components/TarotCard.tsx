import type { Card } from "../types";
import "./TarotCard.css";

interface TarotCardProps {
  card: Card | null;
  isFlipped: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

function TarotCard({ card, isFlipped, onClick, isLoading }: TarotCardProps) {
  const cardClasses = [
    "tarot-card",
    isFlipped ? "flipped" : "",
    isLoading ? "loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="card-glow" />
      <div className="card-inner">
        <div className="card-front">
          <div className="card-pattern">
            <span>🃏</span>
          </div>
        </div>
        <div className="card-back">
          {card && (
            <>
              <span className="card-emoji">{card.emoji}</span>
              <span className="card-name">{card.name}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TarotCard;
