import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { bookingService, paymentService } from '../services';
import './Payment.css';

export function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      setError('Booking ID is required');
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await bookingService.get(bookingId);
        setBooking(response.data);
      } catch (err) {
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePayment = async () => {
    if (!booking || !bookingId) return;

    setProcessing(true);
    setError('');

    try {
      const response = await paymentService.create({
        booking_id: bookingId,
        amount: booking.total_price,
        method: 'card',
      });

      setSuccess('Payment processed successfully!');
      
      // Redirect to bookings list after 2 seconds
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="payment-container">Đang tải...</div>;
  }

  if (error && !booking) {
    return (
      <div className="payment-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/bookings')}>Quay lại</button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>Thanh Toán</h2>
      
      {booking && (
        <div className="payment-summary">
          <h3>Chi tiết lịch đặt</h3>
          <div className="summary-item">
            <span>Ngày:</span>
            <span>{new Date(booking.booking_date).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="summary-item">
            <span>Giờ:</span>
            <span>{booking.booking_time}</span>
          </div>
          {booking.notes && (
            <div className="summary-item">
              <span>Ghi chú:</span>
              <span>{booking.notes}</span>
            </div>
          )}
          <div className="summary-item total">
            <span>Tổng tiền:</span>
            <span>{booking.total_price.toLocaleString('vi-VN')} VND</span>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="payment-methods">
        <h3>Phương thức thanh toán</h3>
        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={processing || !booking}
        >
          {processing ? 'Đang xử lý...' : 'Thanh Toán Ngay'}
        </button>
      </div>

      <div className="payment-info">
        <p>💳 Hệ thống thanh toán an toàn và được mã hóa</p>
        <p>🔒 Thông tin thanh toán của bạn được bảo vệ</p>
      </div>
    </div>
  );
}
