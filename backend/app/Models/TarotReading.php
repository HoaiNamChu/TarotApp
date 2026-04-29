<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarotReading extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'cards_drawn',
        'interpretation',
        'reading_type',
        'created_at',
    ];

    protected $casts = [
        'cards_drawn' => 'array',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
