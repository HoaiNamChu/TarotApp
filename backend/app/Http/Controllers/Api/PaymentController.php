<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0.01',
            'method' => 'required|in:card,paypal,bank_transfer',
        ]);

        // Simulate payment processing
        $payment = Payment::create([
            'booking_id' => $validated['booking_id'],
            'amount' => $validated['amount'],
            'method' => $validated['method'],
            'status' => 'pending',
            'transaction_id' => 'TXN-' . uniqid(),
        ]);

        // In real app, integrate with Stripe, PayPal, etc.
        // For demo, auto-approve
        $payment->update(['status' => 'completed']);

        return response()->json([
            'message' => 'Payment processed successfully',
            'payment' => $payment,
        ], 201);
    }

    public function show($paymentId)
    {
        $payment = Payment::findOrFail($paymentId);
        return response()->json($payment);
    }

    public function getByBooking($bookingId)
    {
        $payment = Payment::where('booking_id', $bookingId)->firstOrFail();
        return response()->json($payment);
    }
}
