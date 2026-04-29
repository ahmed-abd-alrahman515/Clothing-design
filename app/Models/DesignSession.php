<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'branch_id', 'tablet_id', 'customer_name',
        'free_generation_used', 'paid_generations_count', 'status',
    ];

    protected function casts(): array
    {
        return ['free_generation_used' => 'boolean'];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function tablet()
    {
        return $this->belongsTo(Tablet::class);
    }

    public function designRequests()
    {
        return $this->hasMany(DesignRequest::class);
    }
}
