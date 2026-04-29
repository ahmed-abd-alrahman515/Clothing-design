<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminApprovalService
{
    public function verify(string $email, string $password): ?User
    {
        $admin = User::where('email', $email)->where('role', 'admin')->first();

        if (!$admin || !Hash::check($password, $admin->password)) {
            return null;
        }

        return $admin;
    }
}
