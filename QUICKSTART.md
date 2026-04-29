# Tarot Booking - Hướng Dẫn Nhanh

## 🚀 Khởi Động Nhanh

### Yêu Cầu
- PHP 8.2+
- Node.js 16+
- Composer

### Bước 1: Cài Đặt Backend

```bash
cd backend
composer install --ignore-platform-req=ext-fileinfo
copy .env.example .env
php artisan key:generate
php artisan migrate --force
```

### Bước 2: Cài Đặt Frontend

```bash
cd ../frontend
npm install
```

### Bước 3: Khởi Động Servers

**Terminal 1 - Backend:**
```bash
cd backend
php artisan serve
# http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# http://localhost:3000
```

## 📱 Sử Dụng

1. **Trang Chủ**: http://localhost:3000
2. **Demo Tarot Miễn Phí**: Không cần đăng nhập
3. **Đăng Ký/Đăng Nhập**: Để đặt lịch
4. **Đặt Lịch**: Booking tư vấn Tarot
5. **Thanh Toán**: Thanh toán online

## 🎯 Main Features

✅ Đăng ký/Đăng nhập  
✅ Demo đọc Tarot miễn phí  
✅ Đặt lịch hẹn  
✅ Quản lý booking  
✅ Thanh toán online  

## 📚 Tài Liệu

- [README.md](./README.md) - Thông tin dự án
- [docs/SETUP.md](./docs/SETUP.md) - Hướng dẫn cài đặt chi tiết
- [docs/API.md](./docs/API.md) - API endpoints
- [docs/DATABASE.md](./docs/DATABASE.md) - Schema database

## 🛠️ Lệnh Hữu Ích

```bash
# Chạy cả backend và frontend
npm run dev

# Build frontend cho production
npm run build:frontend

# Reset database
cd backend && php artisan migrate:refresh

# Xem tất cả routes
cd backend && php artisan route:list
```

## 📝 Test Accounts

Email: `user@example.com`  
Password: `password`

## ⚙️ Configuration

- Backend: `backend/.env`
- Frontend: `frontend/.env.local`

## 🚨 Troubleshooting

**Port 8000 already in use?**
```bash
php artisan serve --port=8001
```

**Port 3000 already in use?**
```bash
cd frontend && npm run dev -- --port=3001
```

**Database error?**
```bash
cd backend
php artisan migrate:refresh
```

## 📧 Support

Liên hệ: [your-email@example.com]

---

Vui lòng xem [docs/SETUP.md](./docs/SETUP.md) để hướng dẫn cài đặt chi tiết.
