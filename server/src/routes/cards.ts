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

// ข้อ 2: GET /api/cards - Get all cards
router.get("/", (req, res) => {
    // TODO: Implement ข้อ 2
    // 1. เรียกใช้ getCards()
    // 2. สร้าง response object ตาม ApiResponse<Card[]>
    // 3. ส่งคืน JSON
});

// ข้อ 4: GET /api/cards/random - Get a random card
router.get("/random", (req, res) => {
    // TODO: Implement ข้อ 4
    // 1. เรียกใช้ getRandomCard()
    // 2. สร้าง response object
    // 3. ส่งคืน JSON
});

// ข้อ 18: GET /api/cards/search - Search cards
router.get("/search", (req, res) => {
    // TODO: Implement ข้อ 18
    // 1. รับ query parameter จาก req.query.q
    // 2. เรียกใช้ searchCards(query)
    // 3. ส่งคืนผลลัพธ์
});

// ข้อ 19: GET /api/cards/category/:category - Get cards by category
router.get("/category/:category", (req, res) => {
    // TODO: Implement ข้อ 19
    // 1. รับ category จาก req.params.category
    // 2. Filter ไพ่ตาม category
    // 3. ส่งคืนไพ่ที่ตรงกับ category
});

// ข้อ 3: GET /api/cards/:id - Get card by ID
router.get("/:id", (req, res) => {
    // TODO: Implement ข้อ 3
    // 1. รับ id จาก req.params.id
    // 2. เรียกใช้ getCardById(id)
    // 3. ถ้าไม่พบไพ่ ส่ง 404 กับ error
    // 4. ถ้าพบไพ่ ส่งคืนข้อมูล
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
});

// ข้อ 20: POST /api/cards/reset - Reset to default cards
router.post("/reset", (req, res) => {
    // TODO: Implement ข้อ 20
    // 1. เรียกใช้ resetCards()
    // 2. ส่งคืนจำนวนไพ่ที่ reset
});

// ข้อ 6: PUT /api/cards/:id - Update a card
router.put("/:id", (req, res) => {
    // TODO: Implement ข้อ 6
    // 1. รับ id และ updates
    // 2. เรียกใช้ updateCard()
    // 3. ตรวจสอบผลลัพธ์
    // 4. ส่งคืน response
});

// ข้อ 7: DELETE /api/cards/:id - Delete a card
router.delete("/:id", (req, res) => {
    // TODO: Implement ข้อ 7
    // 1. รับ id
    // 2. เรียกใช้ deleteCard()
    // 3. ตรวจสอบว่าลบสำเร็จหรือไม่
    // 4. ส่งคืน response
});

export default router;
