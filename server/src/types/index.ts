export interface Card {
  id: string;
  emoji: string;
  name: string;
  meaning: string;
}

export interface CreateCardDto {
  emoji: string;
  name: string;
  meaning: string;
}

export interface UpdateCardDto {
  emoji?: string;
  name?: string;
  meaning?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
