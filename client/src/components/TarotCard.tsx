import type { Card } from "../types";
import "./TarotCard.css";

interface TarotCardProps {
  card: Card | null;
  isFlipped: boolean;
}

function TarotCard({ card, isFlipped }: TarotCardProps) {
  return (
    <div className={`tarot-card ${isFlipped ? "flipped" : ""}`}>
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
