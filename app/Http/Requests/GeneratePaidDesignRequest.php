<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GeneratePaidDesignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'prompt' => ['required', 'string', 'min:5', 'max:1200'],
            'admin_email' => ['required', 'email'],
            'admin_password' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'prompt.required' => 'يرجى كتابة فكرة التصميم.',
            'admin_email.required' => 'البريد الإلكتروني للمشرف مطلوب.',
            'admin_password.required' => 'كلمة المرور مطلوبة.',
        ];
    }
}
