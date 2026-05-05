import { useEffect, useState } from 'react';
import '../../styles/AdminPage.css';

export function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // const response = await adminAPI.getBookings();
        // setBookings(response.data);
        
        // Placeholder data
        setBookings([
          {
            id: 1,
            user: 'Nguyễn Văn A',
            date: '2026-05-10',
            time: '14:00',
            status: 'pending',
            type: 'Reading',
          },
          {
            id: 2,
            user: 'Trần Thị B',
            date: '2026-05-11',
            time: '10:00',
            status: 'completed',
            type: 'Reading',
          },
        ]);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="admin-page">
      <h2>Quản Lý Booking</h2>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách Hàng</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Loại</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>#{booking.id}</td>
                <td>{booking.user}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.type}</td>
                <td>
                  <span className={`status-badge status-${booking.status}`}>
                    {booking.status === 'pending' ? 'Chờ Xử Lý' : 'Hoàn Thành'}
                  </span>
                </td>
                <td>
                  <button className="btn-sm btn-info">Chi Tiết</button>
                  <button className="btn-sm btn-danger">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
