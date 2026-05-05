<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TarotReading;
use Illuminate\Http\Request;

class TarotController extends Controller
{
    public function demo(Request $request)
    {
        // Rider-Waite-Smith Tarot full deck data
        $tarotDeck = [
            ['id' => 0, 'name' => 'The Fool', 'meaning' => 'Khởi đầu mới, niềm tin, tự do, phiêu lưu'],
            ['id' => 1, 'name' => 'The Magician', 'meaning' => 'Quyền năng, ý chí, kết nối giữa ý tưởng và hành động'],
            ['id' => 2, 'name' => 'The High Priestess', 'meaning' => 'Trực giác, bí mật, trí tuệ tiềm ẩn'],
            ['id' => 3, 'name' => 'The Empress', 'meaning' => 'Sản xuất, tình mẫu tử, thịnh vượng, làm đẹp'],
            ['id' => 4, 'name' => 'The Emperor', 'meaning' => 'Quyền lực, cấu trúc, an toàn, trách nhiệm'],
            ['id' => 5, 'name' => 'The Hierophant', 'meaning' => 'Truyền thống, nghi lễ, định hướng tinh thần'],
            ['id' => 6, 'name' => 'The Lovers', 'meaning' => 'Tình yêu, lựa chọn, hòa hợp, giá trị cá nhân'],
            ['id' => 7, 'name' => 'The Chariot', 'meaning' => 'Ý chí, thắng lợi, kiểm soát, quyết tâm'],
            ['id' => 8, 'name' => 'Strength', 'meaning' => 'Lòng can đảm, kiên nhẫn, sự đồng cảm, quyền lực nội tại'],
            ['id' => 9, 'name' => 'The Hermit', 'meaning' => 'Suy ngẫm, tìm kiếm sự thật, hướng nội, trí tuệ'],
            ['id' => 10, 'name' => 'Wheel of Fortune', 'meaning' => 'Vận may, thay đổi, chu kỳ, số phận'],
            ['id' => 11, 'name' => 'Justice', 'meaning' => 'Công lý, trách nhiệm, cân bằng, sự thật'],
            ['id' => 12, 'name' => 'The Hanged Man', 'meaning' => 'Tạm dừng, hy sinh, đổi góc nhìn, buông bỏ'],
            ['id' => 13, 'name' => 'Death', 'meaning' => 'Chuyển hóa, kết thúc, tái sinh, giải phóng'],
            ['id' => 14, 'name' => 'Temperance', 'meaning' => 'Cân bằng, hòa hợp, kiên nhẫn, điều độ'],
            ['id' => 15, 'name' => 'The Devil', 'meaning' => 'Ràng buộc, cám dỗ, nỗi sợ, nhu cầu giải phóng'],
            ['id' => 16, 'name' => 'The Tower', 'meaning' => 'Thay đổi đột ngột, thức tỉnh, giải phóng đau đớn'],
            ['id' => 17, 'name' => 'The Star', 'meaning' => 'Hy vọng, chữa lành, cảm hứng, sự dẫn dắt'],
            ['id' => 18, 'name' => 'The Moon', 'meaning' => 'Trực giác, ảo ảnh, cảm xúc, điều chưa rõ ràng'],
            ['id' => 19, 'name' => 'The Sun', 'meaning' => 'Niềm vui, thành công, sáng suốt, sự sống'],
            ['id' => 20, 'name' => 'Judgement', 'meaning' => 'Thức tỉnh, đánh giá lại, phục hồi, gọi về'],
            ['id' => 21, 'name' => 'The World', 'meaning' => 'Hoàn thành, trọn vẹn, đoàn kết, chặng đường mới'],
            ['id' => 22, 'name' => 'Ace of Wands', 'meaning' => 'Khởi đầu sáng tạo, năng lượng mới, cảm hứng'],
            ['id' => 23, 'name' => 'Two of Wands', 'meaning' => 'Kế hoạch, tầm nhìn, định hướng tương lai'],
            ['id' => 24, 'name' => 'Three of Wands', 'meaning' => 'Mở rộng, chờ đợi kết quả, cơ hội phát triển'],
            ['id' => 25, 'name' => 'Four of Wands', 'meaning' => 'Ăn mừng, thành tựu, an cư, niềm vui gia đình'],
            ['id' => 26, 'name' => 'Five of Wands', 'meaning' => 'Xung đột, cạnh tranh, thử thách cần vượt qua'],
            ['id' => 27, 'name' => 'Six of Wands', 'meaning' => 'Chiến thắng, công nhận, niềm tự hào'],
            ['id' => 28, 'name' => 'Seven of Wands', 'meaning' => 'Bảo vệ lập trường, kiên trì, đối mặt áp lực'],
            ['id' => 29, 'name' => 'Eight of Wands', 'meaning' => 'Di chuyển nhanh, tin tức, tiến triển'],
            ['id' => 30, 'name' => 'Nine of Wands', 'meaning' => 'Kiên định, bảo vệ ranh giới, sức bền'],
            ['id' => 31, 'name' => 'Ten of Wands', 'meaning' => 'Gánh nặng, trách nhiệm quá tải, cần giải tỏa'],
            ['id' => 32, 'name' => 'Page of Wands', 'meaning' => 'Nhiệt huyết, khám phá, sáng tạo khởi đầu'],
            ['id' => 33, 'name' => 'Knight of Wands', 'meaning' => 'Hành động nhiệt thành, mạo hiểm, đổi mới'],
            ['id' => 34, 'name' => 'Queen of Wands', 'meaning' => 'Sức mạnh nữ tính, tự tin, truyền cảm hứng'],
            ['id' => 35, 'name' => 'King of Wands', 'meaning' => 'Lãnh đạo đam mê, quyết đoán, tầm nhìn lớn'],
            ['id' => 36, 'name' => 'Ace of Cups', 'meaning' => 'Tình cảm mới, trực giác, sự mở lòng'],
            ['id' => 37, 'name' => 'Two of Cups', 'meaning' => 'Tình yêu, hợp tác, gắn kết cảm xúc'],
            ['id' => 38, 'name' => 'Three of Cups', 'meaning' => 'Ăn mừng, tình bạn, hỗ trợ lẫn nhau'],
            ['id' => 39, 'name' => 'Four of Cups', 'meaning' => 'Thiếu thốn, buồn chán, cần đánh giá lại'],
            ['id' => 40, 'name' => 'Five of Cups', 'meaning' => 'Mất mát, hối tiếc, cần nhìn thấy điều tốt đẹp'],
            ['id' => 41, 'name' => 'Six of Cups', 'meaning' => 'Kỷ niệm, dịu dàng, tình thân'],
            ['id' => 42, 'name' => 'Seven of Cups', 'meaning' => 'Lựa chọn, ảo tưởng, giấc mơ'],
            ['id' => 43, 'name' => 'Eight of Cups', 'meaning' => 'Rời bỏ, tìm kiếm ý nghĩa sâu sắc hơn'],
            ['id' => 44, 'name' => 'Nine of Cups', 'meaning' => 'Thỏa mãn, ước mơ thành hiện thực, niềm vui'],
            ['id' => 45, 'name' => 'Ten of Cups', 'meaning' => 'Hạnh phúc gia đình, trọn vẹn, hòa hợp'],
            ['id' => 46, 'name' => 'Page of Cups', 'meaning' => 'Tin tốt về tình cảm, cảm nhận nhạy bén'],
            ['id' => 47, 'name' => 'Knight of Cups', 'meaning' => 'Lãng mạn, trực giác mạnh mẽ, dấn thân cảm xúc'],
            ['id' => 48, 'name' => 'Queen of Cups', 'meaning' => 'Đồng cảm, trông nom cảm xúc, trực giác thấu suốt'],
            ['id' => 49, 'name' => 'King of Cups', 'meaning' => 'Ổn định tình cảm, khôn ngoan trong cảm xúc'],
            ['id' => 50, 'name' => 'Ace of Swords', 'meaning' => 'Ý tưởng mới, sự thật, quyết đoán'],
            ['id' => 51, 'name' => 'Two of Swords', 'meaning' => 'Lưỡng lự, cân nhắc, chưa quyết định'],
            ['id' => 52, 'name' => 'Three of Swords', 'meaning' => 'Đau lòng, thất vọng, buông bỏ tổn thương'],
            ['id' => 53, 'name' => 'Four of Swords', 'meaning' => 'Nghỉ ngơi, phục hồi, tĩnh tâm'],
            ['id' => 54, 'name' => 'Five of Swords', 'meaning' => 'Xung đột, tổn thương, bài học khó khăn'],
            ['id' => 55, 'name' => 'Six of Swords', 'meaning' => 'Chuyển tiếp, tìm kiếm sự an toàn, rời khó khăn'],
            ['id' => 56, 'name' => 'Seven of Swords', 'meaning' => 'Giải pháp thông minh, bí mật, chiến lược'],
            ['id' => 57, 'name' => 'Eight of Swords', 'meaning' => 'Cảm thấy bị ràng buộc, cần tự giải phóng'],
            ['id' => 58, 'name' => 'Nine of Swords', 'meaning' => 'Lo lắng, ám ảnh, cần đối mặt nỗi sợ'],
            ['id' => 59, 'name' => 'Ten of Swords', 'meaning' => 'Kết thúc đau đớn, giải phóng, bắt đầu lại'],
            ['id' => 60, 'name' => 'Page of Swords', 'meaning' => 'Hiếu kỳ, tinh thần tìm hiểu, thông tin mới'],
            ['id' => 61, 'name' => 'Knight of Swords', 'meaning' => 'Hành động nhanh, quyết tâm, thẳng thắn'],
            ['id' => 62, 'name' => 'Queen of Swords', 'meaning' => 'Khôn ngoan, khách quan, giao tiếp sáng suốt'],
            ['id' => 63, 'name' => 'King of Swords', 'meaning' => 'Lý trí, công bằng, ảnh hưởng trí tuệ'],
            ['id' => 64, 'name' => 'Ace of Pentacles', 'meaning' => 'Cơ hội tài chính, nền tảng vững chắc, khởi đầu ổn định'],
            ['id' => 65, 'name' => 'Two of Pentacles', 'meaning' => 'Cân bằng tài chính, linh hoạt, quản lý tài nguyên'],
            ['id' => 66, 'name' => 'Three of Pentacles', 'meaning' => 'Hợp tác, kỹ năng, công nhận'],
            ['id' => 67, 'name' => 'Four of Pentacles', 'meaning' => 'Giữ chặt, thận trọng, an toàn tài chính'],
            ['id' => 68, 'name' => 'Five of Pentacles', 'meaning' => 'Thiếu thốn, cô đơn, cần hỗ trợ'],
            ['id' => 69, 'name' => 'Six of Pentacles', 'meaning' => 'Chia sẻ, hào phóng, cân bằng cho đi nhận lại'],
            ['id' => 70, 'name' => 'Seven of Pentacles', 'meaning' => 'Đầu tư lâu dài, kiên nhẫn, đánh giá tiến trình'],
            ['id' => 71, 'name' => 'Eight of Pentacles', 'meaning' => 'Làm việc chăm chỉ, phát triển kỹ năng, kiên trì'],
            ['id' => 72, 'name' => 'Nine of Pentacles', 'meaning' => 'Độc lập, thành tựu, thoải mái'],
            ['id' => 73, 'name' => 'Ten of Pentacles', 'meaning' => 'Thịnh vượng gia đình, di sản, ổn định dài hạn'],
            ['id' => 74, 'name' => 'Page of Pentacles', 'meaning' => 'Học hỏi, cơ hội thực tế, khởi đầu tài chính'],
            ['id' => 75, 'name' => 'Knight of Pentacles', 'meaning' => 'Kiên nhẫn, đáng tin, làm việc bền bỉ'],
            ['id' => 76, 'name' => 'Queen of Pentacles', 'meaning' => 'Chăm sóc, ổn định, thu nhập đáng tin cậy'],
            ['id' => 77, 'name' => 'King of Pentacles', 'meaning' => 'Thịnh vượng, an toàn tài chính, trách nhiệm thực tế'],
        ];

        // Get random cards (3-card reading)
        $randomKeys = array_rand($tarotDeck, 3);
        $selectedCards = [];
        foreach ($randomKeys as $key) {
            $selectedCards[] = $tarotDeck[$key];
        }
        $selectedCards = array_values($selectedCards);

        // Generate AI-like interpretation
        $interpretation = $this->generateInterpretation($selectedCards);

        return response()->json([
            'cards' => $selectedCards,
            'interpretation' => $interpretation,
        ]);
    }

    public function getReading($bookingId)
    {
        $reading = TarotReading::where('booking_id', $bookingId)->firstOrFail();
        return response()->json($reading);
    }

    private function generateInterpretation($cards)
    {
        $meanings = array_column($cards, 'meaning');
        return 'Dựa trên các lá bài được rút (' . implode(', ', array_column($cards, 'name')) . '), '
            . $meanings[0] . ' tạo nền tảng cho hành trình của bạn. '
            . $meanings[1] . ' cho thấy điều này đang hiện diện trong tình huống của bạn. '
            . $meanings[2] . ' báo hiệu kết quả sắp tới.';
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'cards_drawn' => 'required|array',
            'reading_type' => 'required|in:past_present_future,yes_no,general',
        ]);

        $reading = TarotReading::create([
            'booking_id' => $validated['booking_id'],
            'cards_drawn' => $validated['cards_drawn'],
            'reading_type' => $validated['reading_type'],
            'interpretation' => $this->generateInterpretation($validated['cards_drawn']),
        ]);

        return response()->json([
            'message' => 'Reading created successfully',
            'reading' => $reading,
        ], 201);
    }
}
