import type { Card } from "../types";

export const defaultCards: Card[] = [
  {
    id: "1",
    emoji: "🌟",
    name: "The Star",
    meaning: "Hope, inspiration, and renewed faith. A bright future awaits you.",
  },
  {
    id: "2",
    emoji: "🌙",
    name: "The Moon",
    meaning: "Intuition, dreams, and the subconscious. Trust your inner voice.",
  },
  {
    id: "3",
    emoji: "☀️",
    name: "The Sun",
    meaning: "Joy, success, and vitality. Radiate positivity and warmth.",
  },
  {
    id: "4",
    emoji: "💀",
    name: "Death",
    meaning: "Transformation, endings, and new beginnings. Embrace change.",
  },
  {
    id: "5",
    emoji: "🎡",
    name: "Wheel of Fortune",
    meaning: "Destiny, cycles, and turning points. Life is always in motion.",
  },
  {
    id: "6",
    emoji: "⚖️",
    name: "Justice",
    meaning: "Fairness, truth, and accountability. Seek balance in all things.",
  },
  {
    id: "7",
    emoji: "💪",
    name: "Strength",
    meaning: "Courage, patience, and inner power. You are stronger than you know.",
  },
  {
    id: "8",
    emoji: "🏰",
    name: "The Tower",
    meaning: "Sudden change, revelation, and awakening. From destruction comes clarity.",
  },
  {
    id: "9",
    emoji: "❤️",
    name: "The Lovers",
    meaning: "Love, harmony, and relationships. Follow your heart.",
  },
  {
    id: "10",
    emoji: "🧙",
    name: "The Magician",
    meaning: "Willpower, creativity, and manifestation. You have all the tools you need.",
  },
  {
    id: "11",
    emoji: "👸",
    name: "The High Priestess",
    meaning: "Mystery, intuition, and inner knowledge. Look within for answers.",
  },
  {
    id: "12",
    emoji: "🤴",
    name: "The Emperor",
    meaning: "Authority, structure, and stability. Take charge of your life.",
  },
  {
    id: "13",
    emoji: "🃏",
    name: "The Fool",
    meaning: "New beginnings, innocence, and adventure. Take a leap of faith.",
  },
  {
    id: "14",
    emoji: "🌍",
    name: "The World",
    meaning: "Completion, accomplishment, and wholeness. You've come full circle.",
  },
  {
    id: "15",
    emoji: "⭐",
    name: "Temperance",
    meaning: "Balance, moderation, and patience. Find your middle ground.",
  },
];

// In-memory storage
let cards: Card[] = [...defaultCards];

export const getCards = (): Card[] => cards;

export const getCardById = (id: string): Card | undefined =>
  cards.find((card) => card.id === id);

export const getRandomCard = (): Card =>
  cards[Math.floor(Math.random() * cards.length)];

export const addCard = (card: Card): Card => {
  cards.push(card);
  return card;
};

export const updateCard = (id: string, updates: Partial<Card>): Card | undefined => {
  const index = cards.findIndex((card) => card.id === id);
  if (index === -1) return undefined;
  cards[index] = { ...cards[index], ...updates };
  return cards[index];
};

export const deleteCard = (id: string): boolean => {
  const index = cards.findIndex((card) => card.id === id);
  if (index === -1) return false;
  cards.splice(index, 1);
  return true;
};
