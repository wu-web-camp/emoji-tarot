import { useState, useEffect } from "react";
import type { Card, CreateCardDto } from "../types";
import "./CardForm.css";

interface CardFormProps {
  card?: Card;
  onSubmit: (data: CreateCardDto) => void;
  onCancel: () => void;
}

function CardForm({ card, onSubmit, onCancel }: CardFormProps) {
  const [emoji, setEmoji] = useState(card?.emoji || "");
  const [name, setName] = useState(card?.name || "");
  const [meaning, setMeaning] = useState(card?.meaning || "");

  useEffect(() => {
    if (card) {
      setEmoji(card.emoji);
      setName(card.name);
      setMeaning(card.meaning);
    }
  }, [card]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emoji.trim() || !name.trim() || !meaning.trim()) return;
    onSubmit({ emoji: emoji.trim(), name: name.trim(), meaning: meaning.trim() });
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h3>{card ? "Edit Card" : "Add New Card"}</h3>
      <div className="form-row">
        <div className="form-group emoji-group">
          <label htmlFor="emoji">Emoji</label>
          <input
            id="emoji"
            type="text"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="🌟"
            className="emoji-input"
            required
          />
        </div>
        <div className="form-group name-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Card Name"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="meaning">Meaning</label>
        <textarea
          id="meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          placeholder="What does this card represent?"
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">{card ? "Save Changes" : "Add Card"}</button>
      </div>
    </form>
  );
}

export default CardForm;
