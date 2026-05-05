import { useState } from 'react';
import '../../styles/AdminPage.css';
import '../../styles/AdminSettings.css';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    appName: 'Tarot Booking',
    bookingPrice: 500000,
    maxBookingsPerDay: 10,
    notificationEmail: 'admin@tarotbooking.com',
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
    setSaved(false);
  };

  const handleSave = () => {
    // API call would go here
    console.log('Settings saved:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-page">
      <h2>Cài Đặt</h2>

      {saved && <div className="alert alert-success">Cài đặt đã được lưu thành công!</div>}

      <div className="settings-container">
        <div className="settings-section">
          <h3>Cài Đặt Chung</h3>
          
          <div className="form-group">
            <label>Tên Ứng Dụng</label>
            <input
              type="text"
              name="appName"
              value={settings.appName}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Giá Booking (VND)</label>
            <input
              type="number"
              name="bookingPrice"
              value={settings.bookingPrice}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Booking Tối Đa Mỗi Ngày</label>
            <input
              type="number"
              name="maxBookingsPerDay"
              value={settings.maxBookingsPerDay}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Email Thông Báo</label>
            <input
              type="email"
              name="notificationEmail"
              value={settings.notificationEmail}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              Bật Chế Độ Bảo Trì
            </label>
          </div>

          <button className="btn btn-primary" onClick={handleSave}>
            Lưu Cài Đặt
          </button>
        </div>

        <div className="settings-section">
          <h3>Thông Tin Hệ Thống</h3>
          <div className="info-item">
            <span className="info-label">Phiên Bản:</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Environment:</span>
            <span className="info-value">Development</span>
          </div>
          <div className="info-item">
            <span className="info-label">API URL:</span>
            <span className="info-value">http://127.0.0.1:8000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
