<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'design_session_id', 'prompt', 'enhanced_prompt', 'type',
        'designs_count', 'price', 'admin_approved_by', 'created_by', 'status',
    ];

    protected function casts(): array
    {
        return ['price' => 'decimal:2'];
    }

    public function designSession()
    {
        return $this->belongsTo(DesignSession::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'admin_approved_by');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function generatedDesigns()
    {
        return $this->hasMany(GeneratedDesign::class)->orderBy('position');
    }
}
