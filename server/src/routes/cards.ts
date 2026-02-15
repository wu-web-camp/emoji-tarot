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
    searchCards,
    resetCards
} from "../data/cards.js";

const router = Router();

// Exercise 15: Validation - Emoji Format
const isEmoji = (str: string): boolean => {
    // Check if string contains at least one emoji
    const emojiRegex = /\p{Emoji}/u;
    return emojiRegex.test(str) && str.length <= 10; // Basic emoji check
};

// Exercise 14: Validation - Required Fields
const validateRequiredFields = (emoji: any, name: any, meaning: any): string | null => {
    if (!emoji || !name || !meaning) {
        return "Missing required fields: emoji, name, meaning";
    }

    if (typeof emoji !== 'string' || typeof name !== 'string' || typeof meaning !== 'string') {
        return "All fields must be strings";
    }

    if (emoji.trim() === '' || name.trim() === '' || meaning.trim() === '') {
        return "Fields cannot be empty";
    }

    return null;
};


// ข้อ 2: GET /api/cards - Get all cards
router.get("/", (req, res) => {
    // TODO: Implement ข้อ 2
    // 1. เรียกใช้ getCards()
    // 2. สร้าง response object ตาม ApiResponse<Card[]>
    // 3. ส่งคืน JSON
    const cards = getCards();
    const response: ApiResponse<Card[]> = {
        success: true,
        data: cards,
    };
    res.json(response);
});

// ข้อ 4: GET /api/cards/random - Get a random card
router.get("/random", (req, res) => {
    // TODO: Implement ข้อ 4
    // 1. เรียกใช้ getRandomCard()
    // 2. สร้าง response object
    // 3. ส่งคืน JSON
    const card = getRandomCard();
    const response: ApiResponse<Card> = {
        success: true,
        data: card,
    };
    res.json(response);
});

// ข้อ 18: GET /api/cards/search - Search cards
router.get("/search", (req, res) => {
    // TODO: Implement ข้อ 18
    // 1. รับ query parameter จาก req.query.q
    // 2. เรียกใช้ searchCards(query)
    // 3. ส่งคืนผลลัพธ์
    const query = req.query.q as string;

    if (!query) {
        const response: ApiResponse<null> = {
            success: false,
            error: "Query parameter 'q' is required",
        };
        return res.status(400).json(response);
    }

    const results = searchCards(query);
    const response: ApiResponse<Card[]> = {
        success: true,
        data: results,
    };
    res.json(response);
});

// ข้อ 19: GET /api/cards/category/:category - Get cards by category
router.get("/category/:category", (req, res) => {
    // TODO: Implement ข้อ 19
    // 1. รับ category จาก req.params.category
    // 2. Filter ไพ่ตาม category
    // 3. ส่งคืนไพ่ที่ตรงกับ category
    const { category } = req.params;
    const allCards = getCards();

    // Define emoji categories
    const categories: Record<string, string[]> = {
        nature: ['🌟', '🌙', '☀️', '⭐', '🌍'],
        people: ['👸', '🤴', '🧙'],
        symbols: ['⚖️', '💪', '❤️', '🎡', '💀'],
        objects: ['🏰', '🃏'],
    };

    const categoryEmojis = categories[category.toLowerCase()];

    if (!categoryEmojis) {
        const response: ApiResponse<null> = {
            success: false,
            error: `Invalid category. Available: ${Object.keys(categories).join(', ')}`,
        };
        return res.status(400).json(response);
    }

    const filteredCards = allCards.filter((card) =>
        categoryEmojis.includes(card.emoji)
    );

    const response: ApiResponse<Card[]> = {
        success: true,
        data: filteredCards,
    };
    res.json(response);
});

// ข้อ 3: GET /api/cards/:id - Get card by ID
router.get("/:id", (req, res) => {
    // TODO: Implement ข้อ 3
    // 1. รับ id จาก req.params.id
    // 2. เรียกใช้ getCardById(id)
    // 3. ถ้าไม่พบไพ่ ส่ง 404 กับ error
    // 4. ถ้าพบไพ่ ส่งคืนข้อมูล
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

// ข้อ 5: POST /api/cards - Create a new card
router.post("/", (req, res) => {
    // TODO: Implement ข้อ 5
    // 1. รับข้อมูลจาก req.body
    // 2. ตรวจสอบ required fields (ข้อ 14)
    // 3. ตรวจสอบ emoji format (ข้อ 15)
    // 4. สร้าง ID ใหม่ด้วย uuidv4()
    // 5. เรียก addCard()
    // 6. ส่งคืน 201 Created
    const { emoji, name, meaning } = req.body as CreateCardDto;

    // Exercise 14: Validate required fields
    const validationError = validateRequiredFields(emoji, name, meaning);
    if (validationError) {
        const response: ApiResponse<null> = {
            success: false,
            error: validationError,
        };
        return res.status(400).json(response);
    }

    // Exercise 15: Validate emoji format
    if (!isEmoji(emoji)) {
        const response: ApiResponse<null> = {
            success: false,
            error: "Invalid emoji format",
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

// ข้อ 20: POST /api/cards/reset - Reset to default cards
router.post("/reset", (req, res) => {
    // TODO: Implement ข้อ 20
    // 1. เรียกใช้ resetCards()
    // 2. ส่งคืนจำนวนไพ่ที่ reset
    const count = resetCards();
    const response: ApiResponse<{ count: number }> = {
        success: true,
        data: { count },
    };
    res.json(response);
});

// ข้อ 6: PUT /api/cards/:id - Update a card
router.put("/:id", (req, res) => {
    // TODO: Implement ข้อ 6
    // 1. รับ id และ updates
    // 2. เรียกใช้ updateCard()
    // 3. ตรวจสอบผลลัพธ์
    // 4. ส่งคืน response
    const updates = req.body as UpdateCardDto;

    // If emoji is being updated, validate it
    if (updates.emoji !== undefined) {
        if (typeof updates.emoji !== 'string' || updates.emoji.trim() === '') {
            const response: ApiResponse<null> = {
                success: false,
                error: "Emoji cannot be empty",
            };
            return res.status(400).json(response);
        }

        if (!isEmoji(updates.emoji)) {
            const response: ApiResponse<null> = {
                success: false,
                error: "Invalid emoji format",
            };
            return res.status(400).json(response);
        }
    }

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

// ข้อ 7: DELETE /api/cards/:id - Delete a card
router.delete("/:id", (req, res) => {
    // TODO: Implement ข้อ 7
    // 1. รับ id
    // 2. เรียกใช้ deleteCard()
    // 3. ตรวจสอบว่าลบสำเร็จหรือไม่
    // 4. ส่งคืน response
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
