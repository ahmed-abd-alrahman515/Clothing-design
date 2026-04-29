<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('generated_designs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('design_request_id')->constrained()->cascadeOnDelete();
            $table->string('image_url')->nullable();
            $table->string('image_path')->nullable();
            $table->string('provider')->default('fake');
            $table->text('prompt_used');
            $table->integer('position')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('generated_designs');
    }
};
