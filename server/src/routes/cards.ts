import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import type { Card, CreateCardDto, UpdateCardDto, ApiResponse } from "../types";
import {
  getCards,
  getCardById,
  getRandomCard,
  addCard,
  updateCard,
  deleteCard,
} from "../data/cards.js";

const router = Router();

// GET /api/cards - Get all cards
router.get("/", (req, res) => {
  const cards = getCards();
  const response: ApiResponse<Card[]> = {
    success: true,
    data: cards,
  };
  res.json(response);
});

// GET /api/cards/random - Get a random card
router.get("/random", (req, res) => {
  const card = getRandomCard();
  const response: ApiResponse<Card> = {
    success: true,
    data: card,
  };
  res.json(response);
});

// GET /api/cards/:id - Get card by ID
router.get("/:id", (req, res) => {
  const card = getCardById(req.params.id);
  if (!card) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Card not found",
    };
    return res.status(404).json(response);
  }
  const response: ApiResponse<Card> = {
    success: true,
    data: card,
  };
  res.json(response);
});

// POST /api/cards - Create a new card
router.post("/", (req, res) => {
  const { emoji, name, meaning } = req.body as CreateCardDto;

  if (!emoji || !name || !meaning) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Missing required fields: emoji, name, meaning",
    };
    return res.status(400).json(response);
  }

  const newCard: Card = {
    id: uuidv4(),
    emoji,
    name,
    meaning,
  };

  const card = addCard(newCard);
  const response: ApiResponse<Card> = {
    success: true,
    data: card,
  };
  res.status(201).json(response);
});

// PUT /api/cards/:id - Update a card
router.put("/:id", (req, res) => {
  const updates = req.body as UpdateCardDto;
  const card = updateCard(req.params.id, updates);

  if (!card) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Card not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Card> = {
    success: true,
    data: card,
  };
  res.json(response);
});

// DELETE /api/cards/:id - Delete a card
router.delete("/:id", (req, res) => {
  const success = deleteCard(req.params.id);

  if (!success) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Card not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<null> = {
    success: true,
  };
  res.json(response);
});

export default router;
