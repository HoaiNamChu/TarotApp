import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import { Login, Register } from './components/Auth';
import { TarotDemo } from './components/TarotDemo';
import { BookingForm } from './components/Booking';
import { BookingList } from './components/BookingList';
import { AdminDashboard } from './components/AdminDashboard';
import './App.css';

function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <div className="loading">Đang xác thực quyền admin...</div>;
  }

  return user.role === 'admin' ? children : <Navigate to="/" />;
}

function App() {
  const getMe = useAuthStore((state) => state.getMe);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (token && !user) {
      getMe();
    }
  }, [token, user, getMe]);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo">✨ Tarot Booking</a>
          <ul className="nav-menu">
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/demo">Bản Demo</a></li>
            {token ? (
              <>
                <li><a href="/bookings">Lịch Của Tôi</a></li>
                {user?.role === 'admin' && <li><a href="/admin">Admin</a></li>}
                <li><button onClick={() => {
                  useAuthStore.setState({ user: null, token: null });
                  localStorage.removeItem('auth_token');
                  window.location.href = '/';
                }}>Đăng Xuất</button></li>
              </>
            ) : (
              <>
                <li><a href="/login">Đăng Nhập</a></li>
                <li><a href="/register">Đăng Ký</a></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/demo" element={<TarotDemo />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      <footer>
        <p>&copy; 2026 Tarot Booking. Khám phá bí ẩn của vũ trụ. ✨</p>
      </footer>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Khám Phá Bí Ẩn Của Tarot</h1>
        <p>Đọc Tarot miễn phí hoặc đặt lịch với chuyên gia để có những lời tiên tri chính xác</p>
        <div className="hero-buttons">
          <a href="/demo" className="btn btn-primary">Thử Đọc Miễn Phí</a>
          <a href="/booking" className="btn btn-secondary">Đặt Lịch Hẹn</a>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>📱 Dễ Sử Dụng</h3>
          <p>Giao diện thân thiện, dễ dùng cho mọi lứa tuổi</p>
        </div>
        <div className="feature">
          <h3>🤖 AI Hỗ Trợ</h3>
          <p>Công nghệ AI giúp đọc và giải thích Tarot chính xác</p>
        </div>
        <div className="feature">
          <h3>👨‍💼 Chuyên Gia</h3>
          <p>Đặt lịch với các chuyên gia đọc Tarot có kinh nghiệm</p>
        </div>
        <div className="feature">
          <h3>💳 An Toàn</h3>
          <p>Hệ thống thanh toán an toàn và đáng tin cậy</p>
        </div>
      </section>
    </div>
  );
}

export default App;
