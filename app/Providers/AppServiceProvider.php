<?php

namespace App\Providers;

use App\Services\Ai\FakeImageGenerator;
use App\Services\Ai\GeminiImageGenerator;
use App\Services\Ai\ImageGeneratorInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(ImageGeneratorInterface::class, function () {
            $provider = config('ai.provider', 'fake');
            $hasKey = !empty(config('ai.gemini.api_key'));

            if ($provider === 'gemini' && $hasKey) {
                return new GeminiImageGenerator();
            }

            return new FakeImageGenerator();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
