# Database Schema

## Tables

### Users
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  email_verified_at TIMESTAMP NULL,
  remember_token VARCHAR(100) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);
```

**Fields:**
- `id`: User ID (Primary Key)
- `name`: User full name
- `email`: User email (unique)
- `password`: Hashed password
- `role`: User role (user or admin)
- `email_verified_at`: Email verification timestamp
- `created_at`: Created timestamp
- `updated_at`: Updated timestamp

### Bookings
```sql
CREATE TABLE bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL FOREIGN KEY REFERENCES users(id),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  notes TEXT NULL,
  total_price DECIMAL(8,2) DEFAULT 0,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);
```

**Fields:**
- `id`: Booking ID (Primary Key)
- `user_id`: User who made the booking (Foreign Key)
- `booking_date`: Date of booking
- `booking_time`: Time of booking
- `status`: Booking status
- `notes`: Additional notes from user
- `total_price`: Total price in VND
- `created_at`: Created timestamp
- `updated_at`: Updated timestamp

### Tarot Readings
```sql
CREATE TABLE tarot_readings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  booking_id BIGINT NULL FOREIGN KEY REFERENCES bookings(id),
  cards_drawn JSON NOT NULL,
  interpretation TEXT NOT NULL,
  reading_type ENUM('past_present_future', 'yes_no', 'general') DEFAULT 'general',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);
```

**Fields:**
- `id`: Reading ID (Primary Key)
- `booking_id`: Associated booking (Foreign Key, nullable for demo readings)
- `cards_drawn`: JSON array of cards
- `interpretation`: AI-generated interpretation
- `reading_type`: Type of reading
- `created_at`: Created timestamp
- `updated_at`: Updated timestamp

### Payments
```sql
CREATE TABLE payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  booking_id BIGINT NOT NULL FOREIGN KEY REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  method ENUM('card', 'paypal', 'bank_transfer') DEFAULT 'card',
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  transaction_id VARCHAR(255) NULL,
  notes TEXT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);
```

**Fields:**
- `id`: Payment ID (Primary Key)
- `booking_id`: Associated booking (Foreign Key)
- `amount`: Payment amount in VND
- `method`: Payment method
- `status`: Payment status
- `transaction_id`: Transaction ID from payment gateway
- `notes`: Additional notes
- `created_at`: Created timestamp
- `updated_at`: Updated timestamp

## Relationships

```
User
  └─ has_many: Bookings
       └─ has_one: TarotReading
       └─ has_one: Payment

TarotReading
  └─ belongs_to: Booking

Payment
  └─ belongs_to: Booking
```

## Indexes

```sql
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_tarot_readings_booking_id ON tarot_readings(booking_id);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
```

## Migration Files

Located in `database/migrations/`:
1. `0001_01_01_000000_create_users_table.php`
2. `0001_01_01_000001_create_cache_table.php`
3. `0001_01_01_000002_create_jobs_table.php`
4. `0001_01_01_000003_create_bookings_table.php`
5. `0001_01_01_000004_create_tarot_readings_table.php`
6. `0001_01_01_000005_create_payments_table.php`
7. `0001_01_01_000006_add_role_to_users_table.php`

## Running Migrations

```bash
# Run all pending migrations
php artisan migrate

# Rollback last batch
php artisan migrate:rollback

# Rollback all migrations
php artisan migrate:reset

# Refresh database (rollback all and run again)
php artisan migrate:refresh

# Seed database with test data
php artisan db:seed
```

## Sample Data

### Sample User
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

### Sample Booking
```json
{
  "user_id": 1,
  "booking_date": "2024-02-01",
  "booking_time": "14:00",
  "status": "pending",
  "notes": "First reading with 3 cards",
  "total_price": 100
}
```

### Sample Reading
```json
{
  "booking_id": 1,
  "cards_drawn": [
    {"id": 0, "name": "The Fool", "meaning": "New beginnings"},
    {"id": 1, "name": "The Magician", "meaning": "Power and action"},
    {"id": 2, "name": "The High Priestess", "meaning": "Intuition"}
  ],
  "interpretation": "Based on your cards...",
  "reading_type": "past_present_future"
}
```

### Sample Payment
```json
{
  "booking_id": 1,
  "amount": 100,
  "method": "card",
  "status": "completed",
  "transaction_id": "TXN-20240101000001"
}
```
