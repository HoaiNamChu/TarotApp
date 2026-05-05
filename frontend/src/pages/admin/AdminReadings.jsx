import { useEffect, useState } from 'react';
import '../../styles/AdminPage.css';

export function AdminReadings() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder data
    setReadings([
      {
        id: 1,
        user: 'Nguyễn Văn A',
        date: '2026-05-05',
        type: 'Daily Reading',
        cards: 'The Fool, The Magician, The High Priestess',
      },
      {
        id: 2,
        user: 'Trần Thị B',
        date: '2026-05-04',
        type: 'Love Reading',
        cards: 'The Lovers, Two of Cups, The Ace of Pentacles',
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="admin-page">
      <h2>Quản Lý Tarot Readings</h2>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách Hàng</th>
              <th>Ngày</th>
              <th>Loại Reading</th>
              <th>Lá Bài</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((reading) => (
              <tr key={reading.id}>
                <td>#{reading.id}</td>
                <td>{reading.user}</td>
                <td>{reading.date}</td>
                <td>{reading.type}</td>
                <td>
                  <small>{reading.cards}</small>
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
