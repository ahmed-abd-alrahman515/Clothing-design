<?php

namespace App\Services\Ai;

class FakeImageGenerator implements ImageGeneratorInterface
{
    private array $themes = [
        'gradient-to-r from-purple-600 via-pink-600 to-blue-600',
        'gradient-to-r from-orange-500 via-red-500 to-pink-500',
        'gradient-to-r from-cyan-500 via-blue-500 to-purple-500',
        'gradient-to-r from-green-400 via-emerald-500 to-teal-600',
        'gradient-to-r from-yellow-400 via-orange-500 to-red-500',
    ];

    public function generate(array $prompts): array
    {
        $results = [];

        foreach ($prompts as $i => $prompt) {
            $seed = crc32($prompt . $i);
            $width = 512;
            $height = 512;

            // Generate a placeholder SVG as base64 for the fake provider
            $color1 = sprintf('#%06x', abs($seed) % 0xFFFFFF);
            $color2 = sprintf('#%06x', abs($seed * 2) % 0xFFFFFF);

            $svg = $this->buildPlaceholderSvg($color1, $color2, $i + 1, $prompt);
            $base64 = base64_encode($svg);

            $results[] = [
                'url' => null,
                'base64' => $base64,
                'mime' => 'image/svg+xml',
                'prompt' => $prompt,
            ];
        }

        return $results;
    }

    private function buildPlaceholderSvg(string $color1, string $color2, int $num, string $prompt): string
    {
        $shortPrompt = mb_substr($prompt, 0, 50);
        $escaped = htmlspecialchars($shortPrompt, ENT_XML1 | ENT_QUOTES, 'UTF-8');

        return <<<SVG
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g{$num}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{$color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{$color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g{$num})"/>
  <rect x="20" y="20" width="472" height="472" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1" rx="12"/>
  <text x="256" y="200" font-family="Arial,sans-serif" font-size="80" fill="rgba(255,255,255,0.9)" text-anchor="middle">✦</text>
  <text x="256" y="270" font-family="Arial,sans-serif" font-size="18" fill="white" text-anchor="middle" font-weight="bold">StyleAI Design #{$num}</text>
  <text x="256" y="300" font-family="Arial,sans-serif" font-size="11" fill="rgba(255,255,255,0.8)" text-anchor="middle">[Demo Mode - No API Key]</text>
  <text x="256" y="340" font-family="Arial,sans-serif" font-size="10" fill="rgba(255,255,255,0.7)" text-anchor="middle" xml:space="preserve">{$escaped}</text>
</svg>
SVG;
    }
}
