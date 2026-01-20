import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Card, CreateCardDto } from "../types";
import {
  fetchCards,
  createCard,
  updateCard,
  deleteCard,
} from "../api/cards";
import CardForm from "../components/CardForm";
import "./ManagePage.css";

function ManagePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const data = await fetchCards();
      setCards(data);
    } catch (error) {
      console.error("Failed to load cards:", error);
    }
  };

  const handleCreate = async (data: CreateCardDto) => {
    try {
      await createCard(data);
      await loadCards();
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to create card:", error);
    }
  };

  const handleUpdate = async (data: CreateCardDto) => {
    if (!editingCard) return;
    try {
      await updateCard(editingCard.id, data);
      await loadCards();
      setEditingCard(null);
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCard(id);
      await loadCards();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  return (
    <div className="manage-page">
      <Link to="/" className="back-link">← Back to Draw</Link>
      <div className="manage-header">
        <h2>Manage Your Deck</h2>
        <button onClick={() => setIsAdding(true)} disabled={isAdding || editingCard !== null}>
          + Add Card
        </button>
      </div>

      {(isAdding || editingCard) && (
        <div className="form-container">
          <CardForm
            card={editingCard || undefined}
            onSubmit={editingCard ? handleUpdate : handleCreate}
            onCancel={() => {
              setIsAdding(false);
              setEditingCard(null);
            }}
          />
        </div>
      )}

      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id} className="card-item">
            <div className="card-preview">
              <span className="preview-emoji">{card.emoji}</span>
            </div>
            <div className="card-details">
              <h3>{card.name}</h3>
              <p>{card.meaning}</p>
            </div>
            <div className="card-actions">
              <button
                className="secondary"
                onClick={() => setEditingCard(card)}
                disabled={isAdding || editingCard !== null}
              >
                Edit
              </button>
              {deleteConfirm === card.id ? (
                <>
                  <button className="danger" onClick={() => handleDelete(card.id)}>
                    Confirm
                  </button>
                  <button className="secondary" onClick={() => setDeleteConfirm(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="danger"
                  onClick={() => setDeleteConfirm(card.id)}
                  disabled={isAdding || editingCard !== null}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagePage;
