import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import './AuthModal.css';

export function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);

  const handleSwitchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPasswordConfirmation('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login({ email, password });
      onClose();
      // Redirect based on user role
      setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        if (currentUser?.role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/';
        }
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== passwordConfirmation) {
      setError('Mật khẩu không khớp');
      return;
    }
    
    setLoading(true);
    
    try {
      await register({ name, email, password, password_confirmation: passwordConfirmation });
      setError('');
      setMode('login');
      resetForm();
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="auth-modal-overlay" onClick={onClose}></div>
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose}>✕</button>
        
        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <h2>Đăng Nhập</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </button>
            <p>
              Chưa có tài khoản? 
              <button 
                type="button" 
                className="link-button" 
                onClick={handleSwitchMode}
                disabled={loading}
              >
                Đăng ký
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2>Đăng Ký</h2>
            <div className="form-group">
              <label>Tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng Ký'}
            </button>
            <p>
              Đã có tài khoản? 
              <button 
                type="button" 
                className="link-button" 
                onClick={handleSwitchMode}
                disabled={loading}
              >
                Đăng nhập
              </button>
            </p>
          </form>
        )}
      </div>
    </>
  );
}
