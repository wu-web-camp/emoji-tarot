# 🧪 คู่มือการทดสอบ API

คู่มือนี้มีคำสั่ง curl สำหรับทดสอบทุกข้อในโจทย์

## เตรียมความพร้อม

```bash
# เริ่มต้น server
npm run dev:server

# เปิด terminal ใหม่สำหรับทดสอบ
```

---

## ✅ ข้อ 1: Health Check

```bash
# ทดสอบว่า server ทำงาน
curl http://localhost:3001/api/health

# Expected:
# {"status":"ok"}
```

---

## ✅ ข้อ 2: Get All Cards

```bash
# ดึงข้อมูลไพ่ทั้งหมด
curl http://localhost:3001/api/cards

# Expected:
# {
#   "success": true,
#   "data": [...]
# }
```

---

## ✅ ข้อ 3: Get Card by ID

```bash
# ดึงไพ่ ID 1
curl http://localhost:3001/api/cards/1

# ดึงไพ่ที่ไม่มี
curl http://localhost:3001/api/cards/999

# Expected (พบ):
# {"success":true,"data":{"id":"1","emoji":"🌟",...}}

# Expected (ไม่พบ):
# {"success":false,"error":"Card not found"}
```

---

## ✅ ข้อ 4: Get Random Card

```bash
# สุ่มไพ่ (รันหลายครั้งจะได้ไพ่ต่างกัน)
curl http://localhost:3001/api/cards/random
curl http://localhost:3001/api/cards/random
curl http://localhost:3001/api/cards/random

# Expected:
# {"success":true,"data":{"id":"...","emoji":"...",...}}
```

---

## ✅ ข้อ 5: Create New Card

```bash
# สร้างไพ่ใหม่
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "emoji": "🔥",
    "name": "The Fire",
    "meaning": "Passion and energy"
  }'

# ทดสอบกรณีข้อมูลไม่ครบ
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "emoji": "🔥",
    "name": "The Fire"
  }'

# Expected (สำเร็จ):
# {"success":true,"data":{"id":"...","emoji":"🔥",...}}

# Expected (ไม่สำเร็จ):
# {"success":false,"error":"Missing required fields: emoji, name, meaning"}
```

---

## ✅ ข้อ 6: Update Card

```bash
# อัปเดตไพ่ ID 1
curl -X PUT http://localhost:3001/api/cards/1 \
  -H "Content-Type: application/json" \
  -d '{
    "meaning": "New meaning for the star - updated!"
  }'

# อัปเดตหลายฟิลด์
curl -X PUT http://localhost:3001/api/cards/2 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Dark Moon",
    "meaning": "Mystery and secrets"
  }'

# ทดสอบไพ่ที่ไม่มี
curl -X PUT http://localhost:3001/api/cards/999 \
  -H "Content-Type: application/json" \
  -d '{"meaning": "test"}'

# Expected (สำเร็จ):
# {"success":true,"data":{"id":"1","meaning":"New meaning...",...}}

# Expected (ไม่พบ):
# {"success":false,"error":"Card not found"}
```

---

## ✅ ข้อ 7: Delete Card

```bash
# ลบไพ่ ID 1
curl -X DELETE http://localhost:3001/api/cards/1

# ทดสอบลบไพ่ที่ไม่มี
curl -X DELETE http://localhost:3001/api/cards/999

# Expected (สำเร็จ):
# {"success":true}

# Expected (ไม่พบ):
# {"success":false,"error":"Card not found"}

# ตรวจสอบว่าถูกลบจริง
curl http://localhost:3001/api/cards/1
```

---

## ✅ ข้อ 8-13: Data Layer Functions

ทดสอบโดยใช้ endpoints ข้างต้น ฟังก์ชันเหล่านี้จะถูกเรียกใช้โดย routes

---

## ✅ ข้อ 14: Validation - Required Fields

```bash
# ทดสอบกรณีไม่มี emoji
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "meaning": "Test meaning"
  }'

# ทดสอบกรณี empty string
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "emoji": "",
    "name": "Test",
    "meaning": "Test meaning"
  }'

# Expected:
# {"success":false,"error":"Missing required fields: emoji, name, meaning"}
```

---

## ✅ ข้อ 15: Validation - Emoji Format

```bash
# ทดสอบกรณีไม่ใช่ emoji
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "emoji": "ABC",
    "name": "Test",
    "meaning": "Test meaning"
  }'

# Expected:
# {"success":false,"error":"Invalid emoji format"}
```

---

## ✅ ข้อ 16: Error Handling Middleware

```bash
# ทดสอบโดยส่ง invalid JSON
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d 'invalid json'

# Expected:
# {"success":false,"error":"Something went wrong!"}
```

---

## ✅ ข้อ 17: CORS Configuration

```bash
# ทดสอบ CORS headers
curl -I http://localhost:3001/api/cards

# Expected headers:
# Access-Control-Allow-Origin: http://localhost:5173
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

---

## ✅ ข้อ 18: Search Cards

```bash
# ค้นหาคำว่า "moon"
curl "http://localhost:3001/api/cards/search?q=moon"

# ค้นหาคำว่า "the"
curl "http://localhost:3001/api/cards/search?q=the"

# ทดสอบ case-insensitive
curl "http://localhost:3001/api/cards/search?q=MOON"
curl "http://localhost:3001/api/cards/search?q=MoOn"

# Expected:
# {"success":true,"data":[{"id":"2","name":"The Moon",...}]}
```

---

## ✅ ข้อ 19: Get Cards by Category

```bash
# ดึงไพ่ category nature
curl http://localhost:3001/api/cards/category/nature

# ดึงไพ่ category people
curl http://localhost:3001/api/cards/category/people

# ดึงไพ่ category symbols
curl http://localhost:3001/api/cards/category/symbols

# Expected:
# {"success":true,"data":[...ไพ่ใน category นั้น...]}
```

---

## ✅ ข้อ 20: Reset Cards

```bash
# สร้างไพ่ใหม่ก่อน
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{"emoji":"🔥","name":"Test","meaning":"Test"}'

# ตรวจสอบจำนวนไพ่
curl http://localhost:3001/api/cards | grep -o '"id"' | wc -l

# Reset กลับไปค่าเริ่มต้น
curl -X POST http://localhost:3001/api/cards/reset

# ตรวจสอบจำนวนไพ่อีกครั้ง (ควรเป็น 15)
curl http://localhost:3001/api/cards | grep -o '"id"' | wc -l

# Expected:
# {"success":true,"data":{"count":15}}
```

---

### ใช้ Postman, Insomnia, Thunder Client

1. Import collection จาก file
2. ทดสอบ endpoints ทั้งหมด
3. บันทึกผลลัพธ์

### ใช้ VS Code REST Client Extension

สร้างไฟล์ `test.http`:

```http
### Health Check
GET http://localhost:3001/api/health

### Get All Cards
GET http://localhost:3001/api/cards

### Create Card
POST http://localhost:3001/api/cards
Content-Type: application/json

{
  "emoji": "🔥",
  "name": "The Fire",
  "meaning": "Passion"
}
```

---

Enjoy! 🚀✨
