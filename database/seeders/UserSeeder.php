<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin StyleAI',
            'email' => 'admin@styleai.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'branch_id' => null,
        ]);

        User::create([
            'name' => 'Staff Member',
            'email' => 'staff@styleai.test',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'branch_id' => 1,
        ]);
    }
}
