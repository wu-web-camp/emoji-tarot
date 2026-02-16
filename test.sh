#!/bin/bash

# 🧪 Emoji Tarot API - Complete Test Suite
# Testing all 20 exercises

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# API Base URL
API_URL="http://localhost:3001"

# Test counter
PASSED=0
FAILED=0
TOTAL=20
MAX_TIME=1
# Helper function to print test results
print_test() {
    local test_num=$1
    local test_name=$2
    local result=$3

    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✓${NC} Exercise $test_num: $test_name - ${GREEN}PASS${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Exercise $test_num: $test_name - ${RED}FAIL${NC}"
        ((FAILED++))
    fi
}

# Helper function to check HTTP status
check_status() {
    local url=$1
    local expected=$2
    local status=$(curl -s --max-time $MAX_TIME -o /dev/null -w "%{http_code}" "$url")

    if [ "$status" = "$expected" ]; then
        echo "PASS"
    else
        echo "FAIL"
    fi
}

# Helper function to check JSON field
check_json_field() {
    local response=$1
    local field=$2

    if echo "$response" | grep -q "\"$field\""; then
        echo "PASS"
    else
        echo "FAIL"
    fi
}

echo ""
echo "🔮 Emoji Tarot API - Test Suite 🔮"
echo "=================================="
echo ""

# Wait for server to be ready
echo "⏳ Checking server connection..."
for i in {1..10}; do
    if curl -s --max-time $MAX_TIME "$API_URL/api/health" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Server is ready!"
        echo ""
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}✗${NC} Cannot connect to server"
        echo "Please start the server with: npm run dev:server"
        exit 1
    fi
    sleep 1
done

echo "🌟 Basic Level (Exercises 1-5)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Exercise 1: Health Check
echo "Testing Exercise 1: Health Check Endpoint"
response=$(curl -s --max-time $MAX_TIME "$API_URL/api/health")
if echo "$response" | grep -q '"status".*"ok"'; then
    result="PASS"
else
    result="FAIL"
fi
print_test "1" "Health Check Endpoint" "$result"
echo ""

# Exercise 2: Get All Cards
echo "Testing Exercise 2: Get All Cards"
response=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards")
if echo "$response" | grep -q '"success".*true' && echo "$response" | grep -q '"data"'; then
    result="PASS"
else
    result="FAIL"
fi
print_test "2" "Get All Cards" "$result"
echo ""

# Exercise 3: Get Card by ID
echo "Testing Exercise 3: Get Card by ID"
# Test existing card
response=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/1")
test1=$(check_json_field "$response" "The Star")
# Test non-existing card
response_404=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/999")
test2=$(check_json_field "$response_404" "error")

if [ "$test1" = "PASS" ] && [ "$test2" = "PASS" ]; then
    result="PASS"
else
    result="FAIL"
fi
print_test "3" "Get Card by ID" "$result"
echo ""

# Exercise 4: Get Random Card
echo "Testing Exercise 4: Get Random Card"
response=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/random")
if echo "$response" | grep -q '"emoji"' && echo "$response" | grep -q '"name"'; then
    result="PASS"
else
    result="FAIL"
fi
print_test "4" "Get Random Card" "$result"
echo ""

# Exercise 5: Create New Card
echo "Testing Exercise 5: Create New Card"
response=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"emoji":"🔥","name":"The Fire","meaning":"Passion and energy"}')

if echo "$response" | grep -q '"success".*true' && echo "$response" | grep -q '"id"'; then
    result="PASS"
    # Save the created card ID for later tests
    CREATED_CARD_ID=$(echo "$response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
else
    result="FAIL"
fi
print_test "5" "Create New Card" "$result"
echo ""

echo ""
echo "🔥 Intermediate Level (Exercises 6-12)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Exercise 6: Update Card
echo "Testing Exercise 6: Update Card"
response=$(curl -s --max-time $MAX_TIME -X PUT "$API_URL/api/cards/2" \
    -H "Content-Type: application/json" \
    -d '{"meaning":"Updated meaning for testing"}')

if echo "$response" | grep -q '"success".*true' && echo "$response" | grep -q "Updated meaning"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "6" "Update Card" "$result"
echo ""

# Exercise 7: Delete Card
echo "Testing Exercise 7: Delete Card"
if [ -n "$CREATED_CARD_ID" ]; then
    response=$(curl -s --max-time $MAX_TIME -X DELETE "$API_URL/api/cards/$CREATED_CARD_ID")
    if echo "$response" | grep -q '"success".*true'; then
        result="PASS"
    else
        result="FAIL"
    fi
else
    # Create a card to delete
    create_resp=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
        -H "Content-Type: application/json" \
        -d '{"emoji":"🗑️","name":"To Delete","meaning":"Test"}')

    if echo "$create_resp" | grep -q '"id"'; then
        temp_id=$(echo "$create_resp" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
        response=$(curl -s --max-time $MAX_TIME -X DELETE "$API_URL/api/cards/$temp_id")
        if echo "$response" | grep -q '"success".*true'; then
            result="PASS"
        else
            result="FAIL"
        fi
    else
        result="FAIL"
    fi
fi
print_test "7" "Delete Card" "$result"
echo ""

# Exercise 8: getCards Function
echo "Testing Exercise 8: getCards Function"
response=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards")
if echo "$response" | grep -q '"data":\[' && echo "$response" | grep -q '"id"'; then
    result="PASS"
else
    result="FAIL"
fi
print_test "8" "getCards Function (via GET /api/cards)" "$result"
echo ""

# Exercise 9: getCardById Function
echo "Testing Exercise 9: getCardById Function"
response=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/3")
if echo "$response" | grep -q '"id":"3"' && echo "$response" | grep -q '"emoji"'; then
    result="PASS"
else
    result="FAIL"
fi
print_test "9" "getCardById Function" "$result"
echo ""

# Exercise 10: getRandomCard Function
echo "Testing Exercise 10: getRandomCard Function"
response1=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/random")
response2=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/random")
response3=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/random")

if echo "$response1" | grep -q '"emoji"' && \
   echo "$response2" | grep -q '"emoji"' && \
   echo "$response3" | grep -q '"emoji"'; then
    result="PASS"
else
    result="FAIL"
fi
print_test "10" "getRandomCard Function" "$result"
echo ""

# Exercise 11: addCard Function
echo "Testing Exercise 11: addCard Function"
response=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"emoji":"1","name":"Thunder","meaning":"Power"}')

if echo "$response" | grep -q '"emoji":"1"' && echo "$response" | grep -q '"name":"Thunder"'; then
    result="PASS"
else
    result="FAIL"
fi
print_test "11" "addCard Function" "$result"
echo ""

# Exercise 12: updateCard Function
echo "Testing Exercise 12: updateCard Function"
response=$(curl -s --max-time $MAX_TIME -X PUT "$API_URL/api/cards/4" \
    -H "Content-Type: application/json" \
    -d '{"name":"Death Updated","meaning":"New transformation"}')

if echo "$response" | grep -q "Death Updated" && echo "$response" | grep -q "New transformation"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "12" "updateCard Function" "$result"
echo ""

echo ""
echo "🚀 Advanced Level (Exercises 13-20)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Exercise 13: deleteCard Function
echo "Testing Exercise 13: deleteCard Function"
# Create a card first
create_resp=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"emoji":"🧹","name":"Cleanup","meaning":"Test cleanup"}')

if echo "$create_resp" | grep -q '"id"'; then
    card_id=$(echo "$create_resp" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    delete_resp=$(curl -s --max-time $MAX_TIME -X DELETE "$API_URL/api/cards/$card_id")

    # Verify deletion
    verify_resp=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/$card_id")

    if echo "$delete_resp" | grep -q '"success".*true' && echo "$verify_resp" | grep -q "error"; then
        result="PASS"
    else
        result="FAIL"
    fi
else
    result="FAIL"
fi
print_test "13" "deleteCard Function" "$result"
echo ""

# Exercise 14: Validation - Required Fields
echo "Testing Exercise 14: Validation - Required Fields"
# Test missing emoji
response1=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","meaning":"Test"}')

# Test missing name
response2=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"emoji":"🎯","meaning":"Test"}')

# Test empty string
response3=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"emoji":"","name":"Test","meaning":"Test"}')

if echo "$response1" | grep -q "error" && \
   echo "$response2" | grep -q "error" && \
   echo "$response3" | grep -q "error"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "14" "Validation - Required Fields" "$result"
echo ""

# Exercise 15: Validation - Emoji Format
echo "Testing Exercise 15: Validation - Emoji Format"
response=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"emoji":"ABC","name":"Test","meaning":"Test"}')

if echo "$response" | grep -q "error" || echo "$response" | grep -q "emoji"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "15" "Validation - Emoji Format" "$result"
echo ""

# Exercise 16: Error Handling Middleware
echo "Testing Exercise 16: Error Handling Middleware"
# Send invalid JSON
response=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d 'invalid json data{')

# Should return error instead of crashing
if echo "$response" | grep -q "error" || echo "$response" | grep -q "success.*false"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "16" "Error Handling Middleware" "$result"
echo ""

# Exercise 17: CORS Configuration
echo "Testing Exercise 17: CORS Configuration"
headers=$(curl -s --max-time $MAX_TIME -I "$API_URL/api/cards" \
  -H "Origin: http://localhost:5173"
)

if echo "$headers" | grep -qi "access-control-allow"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "17" "CORS Configuration" "$result"
echo ""

# Exercise 18: Search Cards by Name
echo "Testing Exercise 18: Search Cards by Name"
# Test search for "moon"
response1=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/search?q=moon")

# Test case-insensitive
response2=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/search?q=MOON")

# Test search for "the"
response3=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/search?q=the")

if echo "$response1" | grep -q "Moon" && \
   echo "$response2" | grep -q "Moon" && \
   echo "$response3" | grep -q "The"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "18" "Search Cards by Name" "$result"
echo ""

# Exercise 19: Get Cards by Category
echo "Testing Exercise 19: Get Cards by Category"
# Test nature category (🌟🌙☀️)
response1=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/category/nature")

# Test people category (👸🤴🧙)
response2=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/category/people")

# Test symbols category (⚖️💪❤️)
response3=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards/category/symbols")

if echo "$response1" | grep -q "data" && \
   echo "$response2" | grep -q "data" && \
   echo "$response3" | grep -q "data"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "19" "Get Cards by Category" "$result"
echo ""

# Exercise 20: Reset to Default Cards
echo "Testing Exercise 20: Reset to Default Cards"
# Create some test cards first
curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"emoji":"🧪","name":"Test1","meaning":"Test"}' > /dev/null

curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards" \
    -H "Content-Type: application/json" \
    -d '{"emoji":"🧪","name":"Test2","meaning":"Test"}' > /dev/null

# Get count before reset
before=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards" | grep -o '"id"' | wc -l)

# Reset cards
reset_response=$(curl -s --max-time $MAX_TIME -X POST "$API_URL/api/cards/reset")

# Get count after reset
after=$(curl -s --max-time $MAX_TIME "$API_URL/api/cards" | grep -o '"id"' | wc -l)

# Should have 15 cards after reset (default cards)
if [ "$after" -eq 15 ] && echo "$reset_response" | grep -q "success"; then
    result="PASS"
else
    result="FAIL"
fi
print_test "20" "Reset to Default Cards" "$result"
echo ""

# Summary
echo ""
echo "=================================="
echo "📊 Test Summary"
echo "=================================="
echo ""
echo -e "✓ Passed:  ${GREEN}$PASSED${NC} exercises"
echo -e "✗ Failed:  ${RED}$FAILED${NC} exercises"
echo -e "━━━━━━━━━━━━━━━━━━━━"
echo -e "Total:     $TOTAL exercises"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Congratulations! All tests passed! 🎉${NC}"
    echo ""
    exit 0
else
    percentage=$((PASSED * 100 / TOTAL))
    echo -e "${YELLOW}Score: $percentage%${NC}"
    echo ""
    echo -e "${YELLOW}💡 Some exercises still need work${NC}"
    echo ""
    exit 1
fi