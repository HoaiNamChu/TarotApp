import { useState, useEffect } from 'react';
import { tarotService } from '../services';
import './TarotDemo.css';

export function TarotDemo() {
  const [cards, setCards] = useState(null);
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetReading = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await tarotService.getDemo();
      setCards(response.data.cards);
      setInterpretation(response.data.interpretation);
    } catch (err) {
      setError('Lấy bài thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tarot-demo">
      <h2>Đọc Tarot Miễn Phí</h2>
      <p>Hãy để Tarot thần kỳ chỉ dẫn bạn khám phá tương lai!</p>
      
      <button onClick={handleGetReading} disabled={loading}>
        {loading ? 'Đang lấy lá bài...' : 'Lấy Lá Bài Tarot'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {cards && (
        <div className="reading-result">
          <div className="cards-container">
            {cards.map((card, index) => (
              <div key={index} className="tarot-card">
                <div className="card-front">
                  <h3>{card.name}</h3>
                  <p>{card.meaning}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="interpretation">
            <h3>Lời Giải Thích</h3>
            <p>{interpretation}</p>
          </div>

          <div className="booking-prompt">
            <p>Bạn muốn được đọc Tarot chuyên sâu hơn?</p>
            <a href="/booking">
              <button className="booking-btn">Đặt Lịch Hẹn</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
