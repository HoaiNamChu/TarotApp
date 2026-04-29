import { useState } from 'react';
import { useBookingStore } from '../store/bookingStore';
import './Booking.css';

export function BookingForm() {
  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '',
    notes: '',
    total_price: 100,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const create = useBookingStore((state) => state.create);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await create(formData);
      setSuccess('Đặt lịch thành công! Vui lòng hoàn tất thanh toán.');
      setFormData({
        booking_date: '',
        booking_time: '',
        notes: '',
        total_price: 100,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Đặt Lịch Đọc Tarot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ngày</label>
          <input
            type="date"
            name="booking_date"
            value={formData.booking_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giờ</label>
          <input
            type="time"
            name="booking_time"
            value={formData.booking_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ghi chú</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label>Giá (VND)</label>
          <input
            type="number"
            name="total_price"
            value={formData.total_price}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit">Đặt Lịch</button>
      </form>
    </div>
  );
}
