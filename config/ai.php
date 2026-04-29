<?php

return [
    'provider' => env('AI_IMAGE_PROVIDER', 'fake'),

    'gemini' => [
        'api_key' => env('GEMINI_API_KEY'),
        'model' => 'imagen-3.0-generate-002',
        'endpoint' => 'https://generativelanguage.googleapis.com/v1beta',
    ],

    'free_designs_count' => 3,
    'paid_designs_count' => 5,
    'paid_price' => 50,
];
