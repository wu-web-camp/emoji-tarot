import type { Card, CreateCardDto, UpdateCardDto, ApiResponse } from "../types";

const API_BASE = "/api/cards";

export async function fetchCards(): Promise<Card[]> {
  const res = await fetch(API_BASE);
  const json: ApiResponse<Card[]> = await res.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to fetch cards");
  return json.data;
}

export async function fetchRandomCard(): Promise<Card> {
  const res = await fetch(`${API_BASE}/random`);
  const json: ApiResponse<Card> = await res.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to fetch random card");
  return json.data;
}

export async function fetchCard(id: string): Promise<Card> {
  const res = await fetch(`${API_BASE}/${id}`);
  const json: ApiResponse<Card> = await res.json();
  if (!json.success || !json.data) throw new Error(json.error || "Card not found");
  return json.data;
}

export async function createCard(data: CreateCardDto): Promise<Card> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json: ApiResponse<Card> = await res.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to create card");
  return json.data;
}

export async function updateCard(id: string, data: UpdateCardDto): Promise<Card> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json: ApiResponse<Card> = await res.json();
  if (!json.success || !json.data) throw new Error(json.error || "Failed to update card");
  return json.data;
}

export async function deleteCard(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  const json: ApiResponse<null> = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to delete card");
}
