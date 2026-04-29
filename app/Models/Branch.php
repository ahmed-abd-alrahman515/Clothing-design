<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = ['name_ar', 'name_en', 'address', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function tablets()
    {
        return $this->hasMany(Tablet::class);
    }

    public function designSessions()
    {
        return $this->hasMany(DesignSession::class);
    }
}
