import { useEffect, useState } from 'react';
import '../../styles/AdminDashboard.css';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const response = await adminAPI.getStats();
        // setStats(response.data);
        
        // Placeholder data
        setStats({
          totalBookings: 24,
          totalUsers: 18,
          totalRevenue: 4800000,
          pendingBookings: 5,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Tổng Booking</h3>
            <p className="stat-value">{stats.totalBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Người Dùng</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💳</div>
          <div className="stat-content">
            <h3>Doanh Thu</h3>
            <p className="stat-value">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(stats.totalRevenue)}
            </p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Booking Chờ Xử Lý</h3>
            <p className="stat-value">{stats.pendingBookings}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>Hoạt Động Gần Đây</h3>
          <p style={{ color: '#666' }}>Tính năng sẽ được cập nhật...</p>
        </div>
      </div>
    </div>
  );
}
