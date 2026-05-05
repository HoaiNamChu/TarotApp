import { useEffect, useState } from 'react';
import '../../styles/AdminPage.css';

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder data
    setUsers([
      {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        role: 'user',
        joinDate: '2026-01-15',
        status: 'active',
      },
      {
        id: 2,
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        phone: '0987654321',
        role: 'user',
        joinDate: '2026-02-20',
        status: 'active',
      },
      {
        id: 3,
        name: 'Lê Văn C',
        email: 'levanc@example.com',
        phone: '0912345678',
        role: 'user',
        joinDate: '2026-03-10',
        status: 'inactive',
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="admin-page">
      <h2>Quản Lý Người Dùng</h2>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Điện Thoại</th>
              <th>Vai Trò</th>
              <th>Ngày Tham Gia</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <span className="role-badge">{user.role === 'admin' ? 'Admin' : 'Người dùng'}</span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
                <td>
                  <button className="btn-sm btn-info">Chi Tiết</button>
                  <button className="btn-sm btn-warning">Chỉnh Sửa</button>
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
