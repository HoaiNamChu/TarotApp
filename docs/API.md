# API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
- **Scheme**: Bearer Token (Sanctum)
- **Header**: `Authorization: Bearer {token}`

## Endpoints

### 1. Authentication

#### Register
```
POST /auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}

Response: 201
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "message": "Login successful",
  "user": { ... },
  "token": "1|abc123xyz..."
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response: 200
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "created_at": "2024-01-01T00:00:00.000000Z"
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer {token}

Response: 200
{
  "message": "Logout successful"
}
```

### 2. Bookings

#### Get All Bookings
```
GET /bookings
Authorization: Bearer {token}

Response: 200
[
  {
    "id": 1,
    "user_id": 1,
    "booking_date": "2024-02-01",
    "booking_time": "14:00",
    "status": "pending",
    "notes": "First reading",
    "total_price": 100,
    "created_at": "2024-01-01T00:00:00.000000Z"
  }
]
```

#### Create Booking
```
POST /bookings
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "booking_date": "2024-02-01",
  "booking_time": "14:00",
  "notes": "I want a 3-card reading",
  "total_price": 100
}

Response: 201
{
  "message": "Booking created successfully",
  "booking": { ... }
}
```

#### Get Booking Details
```
GET /bookings/{id}
Authorization: Bearer {token}

Response: 200
{ ... booking details ... }
```

#### Update Booking
```
PUT /bookings/{id}
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "booking_date": "2024-02-02",
  "booking_time": "15:00",
  "status": "confirmed"
}

Response: 200
{ ... updated booking ... }
```

#### Delete Booking
```
DELETE /bookings/{id}
Authorization: Bearer {token}

Response: 200
{
  "message": "Booking deleted successfully"
}
```

### 3. Tarot Readings

#### Get Demo Reading (Public)
```
POST /tarot/demo
Content-Type: application/json

Response: 200
{
  "cards": [
    {
      "id": 0,
      "name": "The Fool",
      "meaning": "New beginnings, spontaneity, free spirit"
    },
    ...
  ],
  "interpretation": "Based on the cards drawn..."
}
```

#### Get Reading Detail
```
GET /tarot/readings/{bookingId}
Authorization: Bearer {token}

Response: 200
{
  "id": 1,
  "booking_id": 1,
  "cards_drawn": [ ... ],
  "interpretation": "...",
  "reading_type": "past_present_future",
  "created_at": "2024-01-01T00:00:00.000000Z"
}
```

#### Create Reading
```
POST /tarot/readings
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "booking_id": 1,
  "cards_drawn": [ ... ],
  "reading_type": "past_present_future"
}

Response: 201
{ ... reading data ... }
```

### 4. Payments

#### Create Payment
```
POST /payments
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "booking_id": 1,
  "amount": 100,
  "method": "card"
}

Response: 201
{
  "message": "Payment processed successfully",
  "payment": {
    "id": 1,
    "booking_id": 1,
    "amount": 100,
    "method": "card",
    "status": "completed",
    "transaction_id": "TXN-...",
    "created_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

#### Get Payment
```
GET /payments/{id}
Authorization: Bearer {token}

Response: 200
{ ... payment data ... }
```

#### Get Booking Payment
```
GET /bookings/{bookingId}/payment
Authorization: Bearer {token}

Response: 200
{ ... payment data ... }
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

### 403 Forbidden
```json
{
  "message": "This action is unauthorized."
}
```

### 404 Not Found
```json
{
  "message": "Not found"
}
```

### 422 Unprocessable Entity
```json
{
  "message": "The given data was invalid.",
  "errors": { ... }
}
```

### 500 Server Error
```json
{
  "message": "Internal Server Error"
}
```

## Rate Limiting
- Currently no rate limiting implemented
- Plan to add in production

## Pagination
- Pagination will be added for large datasets

## Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error
