<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneratedDesign extends Model
{
    use HasFactory;

    protected $fillable = [
        'design_request_id', 'image_url', 'image_path', 'provider', 'prompt_used', 'position',
    ];

    public function designRequest()
    {
        return $this->belongsTo(DesignRequest::class);
    }

    public function getImageSrcAttribute(): string
    {
        if ($this->image_path) {
            return asset('storage/' . $this->image_path);
        }
        return $this->image_url ?? '';
    }
}
