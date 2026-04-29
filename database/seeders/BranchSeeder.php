<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        Branch::insert([
            [
                'name_ar' => 'فرع المعادي',
                'name_en' => 'Maadi Branch',
                'address' => '15 شارع النيل، المعادي، القاهرة',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_ar' => 'فرع مدينة نصر',
                'name_en' => 'Nasr City Branch',
                'address' => '42 شارع عباس العقاد، مدينة نصر، القاهرة',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name_ar' => 'فرع الزمالك',
                'name_en' => 'Zamalek Branch',
                'address' => '8 شارع 26 يوليو، الزمالك، القاهرة',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
