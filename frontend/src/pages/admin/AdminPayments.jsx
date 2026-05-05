import { useEffect, useState } from 'react';
import '../../styles/AdminPage.css';

export function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder data
    setPayments([
      {
        id: 'PAY001',
        user: 'Nguyễn Văn A',
        amount: 500000,
        method: 'Bank Transfer',
        date: '2026-05-05',
        status: 'completed',
      },
      {
        id: 'PAY002',
        user: 'Trần Thị B',
        amount: 300000,
        method: 'Credit Card',
        date: '2026-05-04',
        status: 'completed',
      },
      {
        id: 'PAY003',
        user: 'Lê Văn C',
        amount: 400000,
        method: 'Mobile Wallet',
        date: '2026-05-03',
        status: 'pending',
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="admin-page">
      <h2>Quản Lý Thanh Toán</h2>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã Thanh Toán</th>
              <th>Khách Hàng</th>
              <th>Số Tiền</th>
              <th>Phương Thức</th>
              <th>Ngày</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.user}</td>
                <td>{formatCurrency(payment.amount)}</td>
                <td>{payment.method}</td>
                <td>{payment.date}</td>
                <td>
                  <span className={`status-badge status-${payment.status}`}>
                    {payment.status === 'completed' ? 'Hoàn Thành' : 'Chờ Xử Lý'}
                  </span>
                </td>
                <td>
                  <button className="btn-sm btn-info">Chi Tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
