<?php

namespace App\Services\Ai;

interface ImageGeneratorInterface
{
    /**
     * Generate images from an array of prompts.
     * Returns array of ['url' => string|null, 'base64' => string|null, 'prompt' => string]
     */
    public function generate(array $prompts): array;
}
