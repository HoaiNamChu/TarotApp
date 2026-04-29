# Setup Instructions

## Chuẩn Bị Môi Trường

### Windows

#### 1. Cài đặt PHP
- Download từ: https://windows.php.net/download/ (Thread Safe)
- Giải nén vào: `C:\php`
- Thêm vào PATH: `C:\php`
- Verify: `php --version`

#### 2. Cài đặt Composer
- Download từ: https://getcomposer.org/download/
- Run installer
- Verify: `composer --version`

#### 3. Cài đặt Node.js
- Download từ: https://nodejs.org/ (LTS)
- Run installer
- Verify: `node --version` và `npm --version`

#### 4. Cài đặt Git (optional)
- Download từ: https://git-scm.com/download/win
- Run installer

## Backend Setup (Laravel)

```bash
# 1. Clone/Navigate to backend folder
cd backend

# 2. Install PHP dependencies
composer install --ignore-platform-req=ext-fileinfo

# 3. Copy environment file
copy .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Create SQLite database (if using SQLite)
# Database file will be created at: database/database.sqlite
touch database/database.sqlite

# 6. Run migrations
php artisan migrate --force

# 7. (Optional) Seed database with test data
php artisan db:seed

# 8. Start development server
php artisan serve
```

**Server will be available at:** `http://localhost:8000`

### Environment Variables (.env)

```env
# App Settings
APP_NAME=Tarot
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database (SQLite)
DB_CONNECTION=sqlite
# DB_DATABASE=database/database.sqlite (auto)

# OR Database (PostgreSQL)
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=tarot
# DB_USERNAME=postgres
# DB_PASSWORD=password

# API Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost

# API Keys (if using external services)
# OPENAI_API_KEY=sk-xxx
# STRIPE_SECRET_KEY=sk_test_xxx
```

## Frontend Setup (React)

```bash
# 1. Navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Create environment file
echo VITE_API_BASE_URL=http://localhost:8000/api > .env.local
echo VITE_APP_NAME=Tarot Booking >> .env.local

# 4. Start development server
npm run dev
```

**App will be available at:** `http://localhost:3000`

### Frontend Environment Variables (.env.local)

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Tarot Booking
```

## Running Both Servers

### Option 1: Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd backend
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using npm-run-all (simultaneous)

```bash
# From root TarotApp folder
npm install -g npm-run-all

npm-run-all --parallel backend frontend
```

## Development Commands

### Backend (Laravel)

```bash
# Create new model with migration
php artisan make:model ModelName -m

# Create controller
php artisan make:controller ControllerName

# Create request validation class
php artisan make:request RequestName

# Clear all caches
php artisan cache:clear
php artisan config:clear

# Run tests
php artisan test

# View all routes
php artisan route:list

# Open Laravel Tinker (interactive shell)
php artisan tinker
```

### Frontend (React)

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Run with specific port
npm run dev -- --port 3001
```

## Troubleshooting

### Backend Issues

**Error: "ext-fileinfo not found"**
```bash
# Solution: Run with flag to ignore platform requirements
composer install --ignore-platform-req=ext-fileinfo
```

**Error: "No application encryption key has been specified"**
```bash
# Solution: Generate key
php artisan key:generate
```

**Error: "SQLSTATE[HY000] database is locked"**
```bash
# Solution: Delete database and recreate
rm database/database.sqlite
php artisan migrate
```

**Database not found**
```bash
# Solution: Create database file
mkdir -p database
touch database/database.sqlite
php artisan migrate
```

### Frontend Issues

**Error: "Cannot find module 'react-router-dom'"**
```bash
# Solution: Install dependencies
npm install
```

**Port 3000 already in use**
```bash
# Solution: Run on different port
npm run dev -- --port 3001
```

**API calls failing (CORS error)**
```bash
# Make sure backend is running on http://localhost:8000
# Check .env.local has correct VITE_API_BASE_URL
```

## Testing Accounts

After seeding, use these credentials:

**Admin:**
- Email: admin@example.com
- Password: password

**User:**
- Email: user@example.com
- Password: password

## Database Reset

To reset database to fresh state:

```bash
# Laravel
php artisan migrate:refresh

# Or completely fresh
php artisan migrate:reset
php artisan migrate
php artisan db:seed
```

## Deployment Checklist

- [ ] Set `APP_ENV=production` in .env
- [ ] Set `APP_DEBUG=false` in .env
- [ ] Generate new `APP_KEY`
- [ ] Set up proper database (PostgreSQL recommended)
- [ ] Configure mail service
- [ ] Set up payment gateway keys
- [ ] Set up API keys (OpenAI, etc.)
- [ ] Run migrations on production
- [ ] Build React app: `npm run build`
- [ ] Deploy dist folder to web server
- [ ] Set up SSL certificate
- [ ] Configure CORS for production domain

## Next Steps

1. Create first admin account
2. Integrate with payment gateway (Stripe/PayPal)
3. Integrate with AI service (OpenAI/Gemini)
4. Set up email notifications
5. Deploy to production server

---

For more information, see README.md
