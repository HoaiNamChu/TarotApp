import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import './BookingList.css';

export function BookingList() {
  const navigate = useNavigate();
  const bookings = useBookingStore((state) => state.bookings);
  const getAll = useBookingStore((state) => state.getAll);
  const deleteBooking = useBookingStore((state) => state.delete);
  const isLoading = useBookingStore((state) => state.isLoading);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll().then(() => setLoading(false));
  }, [getAll]);

  if (loading) {
    return <div className="booking-list">Đang tải...</div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn hủy lịch này?')) {
      await deleteBooking(id);
    }
  };

  const handlePayment = (bookingId) => {
    navigate(`/payment?bookingId=${bookingId}`);
  };

  return (
    <div className="booking-list">
      <h2>Các Lịch Đặt Của Bạn</h2>
      {bookings.length === 0 ? (
        <p>Chưa có lịch đặt nào. <a href="/booking">Đặt lịch ngay</a></p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Trạng thái</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{new Date(booking.booking_date).toLocaleDateString('vi-VN')}</td>
                <td>{booking.booking_time}</td>
                <td>
                  <span className={`status ${booking.status}`}>{booking.status}</span>
                </td>
                <td>{booking.total_price.toLocaleString('vi-VN')} VND</td>
                <td>
                  {booking.status === 'pending' && (
                    <>
                      <button
                        className="btn-payment"
                        onClick={() => handlePayment(booking.id)}
                        disabled={isLoading}
                      >
                        Thanh Toán
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(booking.id)}
                        disabled={isLoading}
                      >
                        Hủy
                      </button>
                    </>
                  )}
                  {booking.status !== 'pending' && (
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(booking.id)}
                      disabled={isLoading}
                    >
                      Xóa
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
