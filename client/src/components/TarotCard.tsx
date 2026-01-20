import { useRef, useState } from "react";
import type { Card } from "../types";
import "./TarotCard.css";

interface TarotCardProps {
  card: Card | null;
  isFlipped: boolean;
  isClosing?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

function TarotCard({ card, isFlipped, isClosing, onClick, isLoading }: TarotCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate tilt (-15 to 15 degrees)
    const tiltX = ((y / rect.height) - 0.5) * -30;
    const tiltY = ((x / rect.width) - 0.5) * 30;

    // Calculate glow position (0-100%)
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };

  const cardClasses = [
    "tarot-card",
    isFlipped ? "flipped" : "",
    isClosing ? "closing" : "",
    isLoading ? "loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const getCardInnerStyle = () => {
    if (!isHovering) return undefined;

    const baseRotateY = isFlipped ? 180 : 0;
    return {
      transform: `rotateX(${tilt.x}deg) rotateY(${baseRotateY + tilt.y}deg) scale(1.05) translateY(-10px)`,
      transition: 'transform 0.15s ease-out',
    };
  };

  const glowStyle = {
    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(180, 100, 255, 0.9) 0%, rgba(138, 43, 226, 0.6) 25%, rgba(100, 50, 200, 0.3) 50%, transparent 75%)`,
    opacity: isHovering && !isFlipped ? 1 : 0,
  };

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-glow" style={glowStyle} />
      <div className="card-inner" style={getCardInnerStyle()}>
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
