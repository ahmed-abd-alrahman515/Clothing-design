<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerateDesignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'prompt' => ['required', 'string', 'min:5', 'max:1200'],
            'customer_name' => ['nullable', 'string', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'prompt.required' => 'يرجى كتابة فكرة التصميم.',
            'prompt.min' => 'يجب أن تكون الفكرة على الأقل 5 أحرف.',
            'prompt.max' => 'يجب ألا تتجاوز الفكرة 1200 حرف.',
        ];
    }
}
