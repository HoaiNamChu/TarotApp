import { useAuthStore } from '../store/authStore';
import '../styles/AdminNavbar.css';

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="admin-navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Sidebar"
          >
            ☰
          </button>
          <h1 className="admin-title">🔮 Admin Panel</h1>
        </div>
        
        <div className="navbar-right">
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">Admin</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Đăng Xuất
          </button>
        </div>
      </div>
    </header>
  );
}
