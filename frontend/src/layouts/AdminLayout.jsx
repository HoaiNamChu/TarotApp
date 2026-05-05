import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import AdminNavbar from '../components/AdminNavbar';
import '../styles/AdminLayout.css';

export function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="admin-container">
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-content">
            <nav className="admin-nav">
              <ul>
                <li>
                  <a href="/admin/dashboard" className="nav-link">
                    📊 Dashboard
                  </a>
                </li>
                <li>
                  <a href="/admin/bookings" className="nav-link">
                    📅 Quản Lý Booking
                  </a>
                </li>
                <li>
                  <a href="/admin/readings" className="nav-link">
                    🔮 Quản Lý Readings
                  </a>
                </li>
                <li>
                  <a href="/admin/payments" className="nav-link">
                    💳 Quản Lý Thanh Toán
                  </a>
                </li>
                <li>
                  <a href="/admin/users" className="nav-link">
                    👥 Quản Lý Người Dùng
                  </a>
                </li>
                <li>
                  <a href="/admin/settings" className="nav-link">
                    ⚙️ Cài Đặt
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
