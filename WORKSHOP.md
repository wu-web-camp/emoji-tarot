# 🎓 Emoji Tarot API Workshop

Workshop สำหรับเรียนรู้การสร้าง REST API ด้วย Express + TypeScript ผ่านการทำโจทย์ทีละขั้น

## 📋 โจทย์ทั้งหมด 20 ข้อ

### 🌟 ระดับพื้นฐาน (ข้อ 1-5)

#### ข้อ 1: Health Check Endpoint
สร้าง endpoint สำหรับตรวจสอบสถานะเซิร์ฟเวอร์

**ไฟล์:** `src/index.ts`

**ที่ต้องทำ:**
- สร้าง GET endpoint `/api/health`
- ส่งคืน JSON `{ status: "ok" }`

**วิธีทดสอบ:**
```bash
curl http://localhost:3001/api/health
```

---

#### ข้อ 2: Get All Cards
Implement ฟังก์ชันดึงข้อมูลไพ่ทั้งหมด

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง GET endpoint `/api/cards`
- เรียกใช้ `getCards()` จาก data layer
- ส่งคืนข้อมูลในรูปแบบ `ApiResponse<Card[]>`

**ตัวอย่าง Response:**
```json
{
  "success": true,
  "data": [...]
}
```

---

#### ข้อ 3: Get Card by ID
ดึงข้อมูลไพ่จาก ID ที่ระบุ

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง GET endpoint `/api/cards/:id`
- เรียกใช้ `getCardById(id)`
- ถ้าไม่พบไพ่ ส่ง 404 กับ error message
- ถ้าพบไพ่ ส่งคืนข้อมูลไพ่

**วิธีทดสอบ:**
```bash
curl http://localhost:3001/api/cards/1
curl http://localhost:3001/api/cards/999
```

---

#### ข้อ 4: Get Random Card
สุ่มไพ่ 1 ใบจากชุดไพ่

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง GET endpoint `/api/cards/random`
- เรียกใช้ `getRandomCard()`
- ส่งคืนไพ่ที่สุ่มได้

**หมายเหตุ:** Endpoint นี้ต้องอยู่ก่อน `/:id` เพื่อไม่ให้ถูก match เป็น ID

---

#### ข้อ 5: Create New Card
สร้างไพ่ใบใหม่

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง POST endpoint `/api/cards`
- ตรวจสอบว่ามี `emoji`, `name`, `meaning` ครบ
- ถ้าไม่ครบ ส่ง 400 กับ error message
- สร้าง ID ใหม่ด้วย `uuidv4()`
- เรียก `addCard()` และส่งคืน 201 Created

**ตัวอย่างการส่งข้อมูล:**
```bash
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{"emoji":"🔥","name":"The Fire","meaning":"Passion and energy"}'
```

---

### 🔥 ระดับกลาง (ข้อ 6-12)

#### ข้อ 6: Update Card
แก้ไขข้อมูลไพ่

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง PUT endpoint `/api/cards/:id`
- เรียกใช้ `updateCard(id, updates)`
- ถ้าไม่พบไพ่ ส่ง 404
- ถ้าแก้ไขสำเร็จ ส่งคืนข้อมูลไพ่ที่อัปเดต

**ตัวอย่าง:**
```bash
curl -X PUT http://localhost:3001/api/cards/1 \
  -H "Content-Type: application/json" \
  -d '{"meaning":"New meaning for the star"}'
```

---

#### ข้อ 7: Delete Card
ลบไพ่

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง DELETE endpoint `/api/cards/:id`
- เรียกใช้ `deleteCard(id)`
- ถ้าไม่พบไพ่ ส่ง 404
- ถ้าลบสำเร็จ ส่งคืน success response

---

#### ข้อ 8: Implement getCards Function
สร้างฟังก์ชันใน data layer

**ไฟล์:** `src/data/cards.ts`

**ที่ต้องทำ:**
- Implement ฟังก์ชัน `getCards()`
- Return array ของไพ่ทั้งหมด

```typescript
export const getCards = (): Card[] => {
  // TODO: Implement this
};
```

---

#### ข้อ 9: Implement getCardById Function
ค้นหาไพ่จาก ID

**ไฟล์:** `src/data/cards.ts`

**ที่ต้องทำ:**
- Implement ฟังก์ชัน `getCardById(id: string)`
- ใช้ `find()` เพื่อค้นหาไพ่
- Return `Card | undefined`

---

#### ข้อ 10: Implement getRandomCard Function
สุ่มไพ่

**ไฟล์:** `src/data/cards.ts`

**ที่ต้องทำ:**
- Implement ฟังก์ชัน `getRandomCard()`
- ใช้ `Math.random()` และ `Math.floor()` เพื่อสุ่ม index
- Return ไพ่ที่สุ่มได้

**คำใบ้:**
```typescript
const randomIndex = Math.floor(Math.random() * cards.length);
```

---

#### ข้อ 11: Implement addCard Function
เพิ่มไพ่ใบใหม่เข้าไปใน array

**ไฟล์:** `src/data/cards.ts`

**ที่ต้องทำ:**
- Implement ฟังก์ชัน `addCard(card: Card)`
- ใช้ `push()` เพื่อเพิ่มไพ่เข้า array
- Return ไพ่ที่เพิ่ม

---

#### ข้อ 12: Implement updateCard Function
อัปเดตข้อมูลไพ่

**ไฟล์:** `src/data/cards.ts`

**ที่ต้องทำ:**
- Implement ฟังก์ชัน `updateCard(id: string, updates: Partial<Card>)`
- ใช้ `findIndex()` เพื่อหา index ของไพ่
- ใช้ spread operator เพื่อ merge ข้อมูล
- Return `Card | undefined`

**คำใบ้:**
```typescript
cards[index] = { ...cards[index], ...updates };
```

---

### 🚀 ระดับสูง (ข้อ 13-20)

#### ข้อ 13: Implement deleteCard Function
ลบไพ่ออกจาก array

**ไฟล์:** `src/data/cards.ts`

**ที่ต้องทำ:**
- Implement ฟังก์ชัน `deleteCard(id: string)`
- ใช้ `findIndex()` เพื่อหา index
- ใช้ `splice()` เพื่อลบไพ่
- Return `boolean` (true = ลบสำเร็จ, false = ไม่พบไพ่)

---

#### ข้อ 14: Validation - Required Fields
ตรวจสอบข้อมูลที่จำเป็น

**ไฟล์:** `src/routes/cards.ts` (ใน POST endpoint)

**ที่ต้องทำ:**
- ตรวจสอบว่า `emoji`, `name`, `meaning` ไม่เป็น empty string
- ตรวจสอบว่าค่าไม่เป็น `null` หรือ `undefined`
- ส่ง error message ที่ชัดเจน

---

#### ข้อ 15: Validation - Emoji Format
ตรวจสอบว่าเป็น emoji จริงหรือไม่

**ไฟล์:** `src/routes/cards.ts` (ใน POST/PUT endpoint)

**ที่ต้องทำ:**
- สร้างฟังก์ชันตรวจสอบว่าเป็น emoji
- ถ้าไม่ใช่ emoji ส่ง 400 error

**คำใบ้:**
```typescript
const isEmoji = (str: string) => {
  const emojiRegex = /\p{Emoji}/u;
  return emojiRegex.test(str);
};
```

---

#### ข้อ 16: Error Handling Middleware
สร้าง middleware จัดการ error

**ไฟล์:** `src/index.ts`

**ที่ต้องทำ:**
- สร้าง error handling middleware
- จัดการกับ error ทุกประเภท
- ส่ง error response ที่เหมาะสม

**ตัวอย่าง:**
```typescript
app.use((err, req, res, next) => {
  // TODO: Implement error handling
});
```

---

#### ข้อ 17: CORS Configuration
ตั้งค่า CORS อย่างละเอียด

**ไฟล์:** `src/index.ts`

**ที่ต้องทำ:**
- กำหนด allowed origins
- กำหนด allowed methods
- กำหนด allowed headers

**คำใบ้:**
```typescript
const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
```

---

#### ข้อ 18: Search Cards by Name
ค้นหาไพ่จากชื่อ

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง GET endpoint `/api/cards/search?q=moon`
- ค้นหาไพ่ที่มีชื่อตรงกับ query (case-insensitive)
- Return array ของไพ่ที่ค้นพบ

**Data function:**
```typescript
// src/data/cards.ts
export const searchCards = (query: string): Card[] => {
  // TODO: Implement search
};
```

---

#### ข้อ 19: Get Cards by Emoji Category
จัดกลุ่มไพ่ตาม emoji category

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง GET endpoint `/api/cards/category/:category`
- รองรับ category เช่น "nature", "people", "symbols"
- Return ไพ่ที่อยู่ใน category นั้น

**ตัวอย่าง category:**
- 🌟🌙☀️ = nature
- 👸🤴🧙 = people
- ⚖️💪❤️ = symbols

---

#### ข้อ 20: Reset to Default Cards
Reset ข้อมูลกลับไปเป็นค่าเริ่มต้น

**ไฟล์:** `src/routes/cards.ts`

**ที่ต้องทำ:**
- สร้าง POST endpoint `/api/cards/reset`
- Reset `cards` array กลับไปเป็น `defaultCards`
- ส่งคืนจำนวนไพ่ที่ reset

**Data function:**
```typescript
// src/data/cards.ts
export const resetCards = (): number => {
  cards = [...defaultCards];
  return cards.length;
};
```

---

## 🎯 เป้าหมายการเรียนรู้

เมื่อทำโจทย์ครบ 20 ข้อ นักเรียนจะได้เรียนรู้:

1. ✅ การสร้าง REST API endpoints
2. ✅ การใช้ Express Router
3. ✅ HTTP Methods (GET, POST, PUT, DELETE)
4. ✅ Request/Response handling
5. ✅ TypeScript type safety
6. ✅ Data validation
7. ✅ Error handling
8. ✅ CORS configuration
9. ✅ In-memory data management
10. ✅ Advanced features (search, filter, reset)


---

สนุกกับการเรียนรู้! 🚀✨