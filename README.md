# Tarot Booking Application

Ứng dụng web đặt lịch đọc Tarot với AI demo reader.

## 🏗️ Cấu Trúc Dự Án

```
TarotApp/
├── backend/        # Laravel API server
├── frontend/       # React web app
└── docs/          # Tài liệu
```

## 🚀 Yêu Cầu Hệ Thống

- **Node.js** >= 16.x (cho Frontend)
- **PHP** >= 8.2 (cho Backend)
- **Composer** (cho Laravel)
- **SQLite** hoặc **PostgreSQL** (optional)

## 📋 Hướng Dẫn Cài Đặt

### Backend (Laravel)

1. Vào thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies:
```bash
composer install
```

3. Tạo file .env (copy từ .env.example):
```bash
cp .env.example .env
```

4. Tạo APP_KEY:
```bash
php artisan key:generate
```

5. Chạy migrations:
```bash
php artisan migrate
```

6. Khởi động server:
```bash
php artisan serve
```

Server sẽ chạy tại: `http://localhost:8000`

### Frontend (React)

1. Vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Khởi động dev server:
```bash
npm run dev
```

App sẽ mở tại: `http://localhost:3000`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất (require auth)
- `GET /api/auth/me` - Lấy thông tin user (require auth)

### Bookings
- `GET /api/bookings` - Danh sách lịch của user (require auth)
- `POST /api/bookings` - Tạo lịch mới (require auth)
- `GET /api/bookings/{id}` - Chi tiết lịch (require auth)
- `PUT /api/bookings/{id}` - Cập nhật lịch (require auth)
- `DELETE /api/bookings/{id}` - Xóa lịch (require auth)

### Tarot Readings
- `POST /api/tarot/demo` - Lấy demo đọc Tarot (public)
- `GET /api/tarot/readings/{bookingId}` - Lấy chi tiết đọc (require auth)
- `POST /api/tarot/readings` - Tạo đọc mới (require auth)

### Payments
- `POST /api/payments` - Tạo thanh toán (require auth)
- `GET /api/payments/{id}` - Chi tiết thanh toán (require auth)
- `GET /api/bookings/{bookingId}/payment` - Thanh toán của booking

## 🎨 Features

- ✅ Đăng ký/Đăng nhập user
- ✅ Demo đọc Tarot miễn phí (với AI)
- ✅ Đặt lịch hẹn
- ✅ Quản lý lịch của user
- ✅ Hệ thống thanh toán
- ⏳ Admin panel (coming soon)

## 🛠️ Tech Stack

**Backend:**
- Laravel 13
- PHP 8.3
- SQLite (default)
- Laravel Sanctum (Authentication)

**Frontend:**
- React 18
- Vite
- Zustand (State Management)
- Axios (API Client)
- React Router

## 📝 Tham Số Môi Trường

### Backend (.env)
```
APP_NAME=Tarot
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# hoặc
# DB_CONNECTION=pgsql
# DB_HOST=localhost
# DB_PORT=5432
# DB_DATABASE=tarot
# DB_USERNAME=postgres
# DB_PASSWORD=password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Tarot Booking
```

## 📚 Tài Liệu Thêm

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Guide](./docs/SETUP.md)

## 🤝 Đóng Góp

Để đóng góp, vui lòng:
1. Fork repository
2. Tạo branch feature (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Mở Pull Request

## 📄 License

MIT License

## 📧 Contact

Liên hệ tác giả: [your-email@example.com]

---

**Note:** Đây là bản demo, vui lòng configure database và thêm keys cho các dịch vụ third-party (Stripe, PayPal) trước khi deploy lên production.
