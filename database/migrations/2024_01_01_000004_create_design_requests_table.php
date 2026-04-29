<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('design_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('design_session_id')->constrained()->cascadeOnDelete();
            $table->text('prompt');
            $table->text('enhanced_prompt')->nullable();
            $table->enum('type', ['free', 'paid'])->default('free');
            $table->integer('designs_count')->default(3);
            $table->decimal('price', 8, 2)->nullable();
            $table->foreignId('admin_approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('design_requests');
    }
};
