<?php

namespace App\Services;

use App\Models\DesignRequest;
use App\Models\DesignSession;
use App\Models\GeneratedDesign;
use App\Services\Ai\ImageGeneratorInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DesignGenerationService
{
    public function __construct(private ImageGeneratorInterface $generator) {}

    public function generateFree(DesignSession $session, string $prompt, int $createdBy): DesignRequest
    {
        $count = config('ai.free_designs_count', 3);

        $designRequest = DesignRequest::create([
            'design_session_id' => $session->id,
            'prompt' => $prompt,
            'type' => 'free',
            'designs_count' => $count,
            'price' => null,
            'created_by' => $createdBy,
            'status' => 'pending',
        ]);

        $this->runGeneration($designRequest, $prompt, $count);

        $session->update(['free_generation_used' => true]);

        return $designRequest->load('generatedDesigns');
    }

    public function generatePaid(DesignSession $session, string $prompt, int $createdBy, int $approvedBy): DesignRequest
    {
        $count = config('ai.paid_designs_count', 5);
        $price = config('ai.paid_price', 50);

        $designRequest = DesignRequest::create([
            'design_session_id' => $session->id,
            'prompt' => $prompt,
            'type' => 'paid',
            'designs_count' => $count,
            'price' => $price,
            'admin_approved_by' => $approvedBy,
            'created_by' => $createdBy,
            'status' => 'pending',
        ]);

        $this->runGeneration($designRequest, $prompt, $count);

        $session->increment('paid_generations_count');

        return $designRequest->load('generatedDesigns');
    }

    private function runGeneration(DesignRequest $designRequest, string $prompt, int $count): void
    {
        try {
            $prompts = $this->enhancePrompts($prompt, $count);

            $designRequest->update(['enhanced_prompt' => implode(' | ', $prompts)]);

            $images = $this->generator->generate($prompts);

            foreach ($images as $position => $image) {
                $imagePath = null;
                $imageUrl = $image['url'] ?? null;

                if (!empty($image['base64'])) {
                    $imagePath = $this->storeBase64Image($image['base64'], $image['mime'] ?? 'image/png');
                }
                // If URL returned: prepare for local download
                // TODO: Use Http::get($imageUrl) to download and store locally when provider returns URLs

                GeneratedDesign::create([
                    'design_request_id' => $designRequest->id,
                    'image_url' => $imageUrl,
                    'image_path' => $imagePath,
                    'provider' => config('ai.provider', 'fake'),
                    'prompt_used' => $prompts[$position] ?? $prompt,
                    'position' => $position,
                ]);
            }

            $designRequest->update(['status' => 'completed']);
        } catch (\Throwable $e) {
            $designRequest->update(['status' => 'failed']);
            throw $e;
        }
    }

    private function storeBase64Image(string $base64, string $mime): string
    {
        $extension = match ($mime) {
            'image/png' => 'png',
            'image/jpeg', 'image/jpg' => 'jpg',
            'image/webp' => 'webp',
            'image/svg+xml' => 'svg',
            default => 'png',
        };

        $filename = 'designs/' . Str::uuid() . '.' . $extension;
        Storage::disk('public')->put($filename, base64_decode($base64));

        return $filename;
    }

    private function enhancePrompts(string $userPrompt, int $count): array
    {
        $styles = [
            'minimalist streetwear',
            'luxury fashion editorial',
            'bold graphic urban',
            'vintage retro streetwear',
            'futuristic fashion forward',
        ];

        $colors = [
            'monochromatic black and white',
            'vibrant neon accents on dark',
            'earth tones with gold details',
            'pastel gradient',
            'deep navy and crimson',
        ];

        $prompts = [];
        for ($i = 0; $i < $count; $i++) {
            $style = $styles[$i % count($styles)];
            $color = $colors[$i % count($colors)];

            $prompts[] = "High-quality fashion clothing design mockup, {$style} style, {$color} color palette. "
                . "Design concept: {$userPrompt}. "
                . "Clean white background, professional product photography, t-shirt or hoodie print design, "
                . "sharp details, typography-friendly, no copyrighted logos, "
                . "suitable for printing, commercial apparel design, 4K quality, fashion brand aesthetic. "
                . "Variation " . ($i + 1) . ".";
        }

        return $prompts;
    }
}
