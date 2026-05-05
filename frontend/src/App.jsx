import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import { Login, Register } from './components/Auth';
import { TarotDemo } from './components/TarotDemo';
import { BookingForm } from './components/Booking';
import { BookingList } from './components/BookingList';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminReadings } from './pages/admin/AdminReadings';
import { AdminPayments } from './pages/admin/AdminPayments';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminSettings } from './pages/admin/AdminSettings';
import './App.css';

function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <div className="loading">Đang xác thực quyền admin...</div>;
  }

  return user.role === 'admin' ? children : <Navigate to="/" />;
}

function UserLayout({ children }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    useAuthStore.setState({ user: null, token: null });
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo">✨ Tarot Booking</a>
          <ul className="nav-menu">
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/demo">Bản Demo</a></li>
            {token ? (
              <>
                <li><a href="/bookings">Lịch Của Tôi</a></li>
                {user?.role === 'admin' && <li><a href="/admin/dashboard">Admin</a></li>}
                <li><button onClick={handleLogout}>Đăng Xuất</button></li>
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
        {children}
      </main>

      <footer>
        <p>&copy; 2026 Tarot Booking. Khám phá bí ẩn của vũ trụ. ✨</p>
      </footer>
    </>
  );
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

  const renderAdminDashboard = () => (
    <AdminRoute>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </AdminRoute>
  );

  const renderAdminBookings = () => (
    <AdminRoute>
      <AdminLayout>
        <AdminBookings />
      </AdminLayout>
    </AdminRoute>
  );

  const renderAdminReadings = () => (
    <AdminRoute>
      <AdminLayout>
        <AdminReadings />
      </AdminLayout>
    </AdminRoute>
  );

  const renderAdminPayments = () => (
    <AdminRoute>
      <AdminLayout>
        <AdminPayments />
      </AdminLayout>
    </AdminRoute>
  );

  const renderAdminUsers = () => (
    <AdminRoute>
      <AdminLayout>
        <AdminUsers />
      </AdminLayout>
    </AdminRoute>
  );

  const renderAdminSettings = () => (
    <AdminRoute>
      <AdminLayout>
        <AdminSettings />
      </AdminLayout>
    </AdminRoute>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Login/Register - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes - AdminLayout */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={renderAdminDashboard()} />
        <Route path="/admin/bookings" element={renderAdminBookings()} />
        <Route path="/admin/readings" element={renderAdminReadings()} />
        <Route path="/admin/payments" element={renderAdminPayments()} />
        <Route path="/admin/users" element={renderAdminUsers()} />
        <Route path="/admin/settings" element={renderAdminSettings()} />

        {/* User Routes - UserLayout */}
        <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
        <Route path="/demo" element={<UserLayout><TarotDemo /></UserLayout>} />
        <Route
          path="/booking"
          element={
            <UserLayout>
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            </UserLayout>
          }
        />
        <Route
          path="/bookings"
          element={
            <UserLayout>
              <ProtectedRoute>
                <BookingList />
              </ProtectedRoute>
            </UserLayout>
          }
        />
      </Routes>
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
