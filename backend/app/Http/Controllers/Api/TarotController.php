<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TarotReading;
use Illuminate\Http\Request;

class TarotController extends Controller
{
    public function demo(Request $request)
    {
        // Tarot cards data
        $majorArcana = [
            ['id' => 0, 'name' => 'The Fool', 'meaning' => 'New beginnings, spontaneity, free spirit'],
            ['id' => 1, 'name' => 'The Magician', 'meaning' => 'Resourcefulness, power, inspired action'],
            ['id' => 2, 'name' => 'The High Priestess', 'meaning' => 'Intuition, sacred knowledge, divine feminine'],
            ['id' => 3, 'name' => 'The Empress', 'meaning' => 'Nurturing, abundance, fertility'],
            ['id' => 4, 'name' => 'The Emperor', 'meaning' => 'Authority, establishment, father figure'],
        ];

        // Get random cards (3-card reading) - Fixed logic
        $randomKeys = array_rand($majorArcana, 3);
        $selectedCards = [];
        foreach ($randomKeys as $key) {
            $selectedCards[] = $majorArcana[$key];
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
        return 'Based on the cards drawn (' . implode(', ', array_column($cards, 'name')) . '), '
            . $meanings[0] . ' suggests a foundation of ' . strtolower($meanings[0]) . '. '
            . $meanings[1] . ' indicates ' . strtolower($meanings[1]) . ' in your situation. '
            . $meanings[2] . ' points to ' . strtolower($meanings[2]) . ' as the outcome.';
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
