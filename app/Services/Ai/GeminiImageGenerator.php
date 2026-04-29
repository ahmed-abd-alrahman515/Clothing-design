<?php

namespace App\Services\Ai;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiImageGenerator implements ImageGeneratorInterface
{
    private string $apiKey;
    private string $endpoint;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('ai.gemini.api_key', '');
        $this->endpoint = config('ai.gemini.endpoint');
        $this->model = config('ai.gemini.model');
    }

    public function generate(array $prompts): array
    {
        $results = [];

        foreach ($prompts as $prompt) {
            try {
                $result = $this->generateSingle($prompt);
                $results[] = $result;
            } catch (\Throwable $e) {
                Log::error('GeminiImageGenerator error', ['error' => $e->getMessage(), 'prompt' => $prompt]);
                // TODO: Handle specific Gemini API errors (quota exceeded, content policy, etc.)
                $results[] = [
                    'url' => null,
                    'base64' => null,
                    'mime' => null,
                    'prompt' => $prompt,
                    'error' => $e->getMessage(),
                ];
            }
        }

        return $results;
    }

    private function generateSingle(string $prompt): array
    {
        // TODO: Imagen 3 via Gemini API – update endpoint/payload when GA
        // Current approach uses the Imagen API through Google AI Studio endpoint
        $url = "{$this->endpoint}/models/{$this->model}:predict?key={$this->apiKey}";

        $response = Http::timeout(60)->post($url, [
            'instances' => [
                ['prompt' => $prompt],
            ],
            'parameters' => [
                'sampleCount' => 1,
                'aspectRatio' => '1:1',
                'safetyFilterLevel' => 'block_some',
                'personGeneration' => 'allow_adult',
            ],
        ]);

        if ($response->failed()) {
            throw new \RuntimeException(
                'Gemini API error: ' . $response->status() . ' ' . $response->body()
            );
        }

        $data = $response->json();

        // Imagen response: predictions[0].bytesBase64Encoded
        if (!empty($data['predictions'][0]['bytesBase64Encoded'])) {
            return [
                'url' => null,
                'base64' => $data['predictions'][0]['bytesBase64Encoded'],
                'mime' => 'image/png',
                'prompt' => $prompt,
            ];
        }

        // If the response contains a URL (future provider versions may return URLs)
        // TODO: Download and store locally if URL is returned
        if (!empty($data['predictions'][0]['imageUrl'])) {
            return [
                'url' => $data['predictions'][0]['imageUrl'],
                'base64' => null,
                'mime' => null,
                'prompt' => $prompt,
            ];
        }

        throw new \RuntimeException('Unexpected Gemini response structure: ' . json_encode($data));
    }
}
