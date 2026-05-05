import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { adminService } from '../services';
import './Admin.css';

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [usersRes, bookingsRes] = await Promise.all([
        adminService.getUsers(),
        adminService.getBookings(),
      ]);
      setUsers(usersRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Error loading admin data:', err);
      setError('Không thể tải dữ liệu quản trị. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      loadData();
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Cập nhật quyền thất bại.');
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await adminService.updateBookingStatus(bookingId, { status });
      loadData();
    } catch (err) {
      console.error('Error updating booking status:', err);
      setError('Cập nhật trạng thái lịch thất bại.');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch này không?')) {
      return;
    }

    try {
      await adminService.deleteBooking(bookingId);
      loadData();
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Xóa lịch thất bại.');
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredBookings = bookings.filter((booking) =>
    `${booking.user?.name || ''} ${booking.user?.email || ''} ${booking.booking_date} ${booking.booking_time}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  if (!user || user.role !== 'admin') {
    return <div className="admin-denied">Chỉ admin mới truy cập được trang này.</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-heading">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Xin chào, <strong>{user.name}</strong></p>
        </div>
        <div className="admin-search">
          <input
            type="search"
            placeholder="Tìm kiếm người dùng hoặc lịch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}
      {loading && <div className="admin-loading">Đang tải dữ liệu...</div>}

      <div className="admin-tabs">
        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
          Người dùng ({users.length})
        </button>
        <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
          Lịch ({bookings.length})
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="admin-section">
          <h2>Quản lý người dùng</h2>
          <div className="users-list">
            {filteredUsers.length === 0 ? (
              <p>Không tìm thấy người dùng.</p>
            ) : (
              filteredUsers.map((u) => (
                <div key={u.id} className="user-item">
                  <div className="user-info">
                    <div>
                      <strong>{u.name}</strong>
                      <div className="user-email">{u.email}</div>
                    </div>
                    <span className={`role-badge ${u.role}`}>{u.role}</span>
                  </div>
                  <div className="user-actions">
                    {u.role === 'user' ? (
                      <button onClick={() => updateUserRole(u.id, 'admin')} className="btn-promote">
                        Thăng admin
                      </button>
                    ) : (
                      <button onClick={() => updateUserRole(u.id, 'user')} className="btn-demote">
                        Gỡ admin
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="admin-section">
          <h2>Quản lý lịch</h2>
          <div className="bookings-list">
            {filteredBookings.length === 0 ? (
              <p>Không tìm thấy lịch.</p>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <div>
                      <strong>{booking.user?.name || 'Người dùng không xác định'}</strong>
                      <div className="user-email">{booking.user?.email || 'Không có email'}</div>
                    </div>
                    <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                  </div>
                  <div className="booking-details">
                    <div>Ngày: {booking.booking_date}</div>
                    <div>Giờ: {booking.booking_time}</div>
                    <div>Giá: ${booking.total_price}</div>
                    <div>Ghi chú: {booking.notes || 'Không có'}</div>
                  </div>
                  <div className="booking-actions">
                    <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="btn-confirm">
                      Xác nhận
                    </button>
                    <button onClick={() => updateBookingStatus(booking.id, 'completed')} className="btn-complete">
                      Hoàn thành
                    </button>
                    <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="btn-cancel">
                      Hủy
                    </button>
                    <button onClick={() => deleteBooking(booking.id)} className="btn-delete">
                      Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
