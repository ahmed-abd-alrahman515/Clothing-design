<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenerateDesignRequest;
use App\Http\Requests\GeneratePaidDesignRequest;
use App\Models\DesignSession;
use App\Services\AdminApprovalService;
use App\Services\DesignGenerationService;

class DesignGenerationController extends Controller
{
    public function __construct(
        private DesignGenerationService $generationService,
        private AdminApprovalService $approvalService,
    ) {}

    public function generate(GenerateDesignRequest $request, DesignSession $designSession)
    {
        if ($designSession->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($designSession->status !== 'active') {
            return response()->json(['message' => 'Session is closed.'], 422);
        }

        if ($designSession->free_generation_used) {
            return response()->json([
                'requires_payment' => true,
                'message' => 'التصميمات الإضافية مدفوعة - 50 جنيه.',
                'price' => config('ai.paid_price', 50),
            ], 402);
        }

        try {
            $designRequest = $this->generationService->generateFree(
                $designSession,
                $request->validated('prompt'),
                auth()->id(),
            );

            return response()->json([
                'design_request' => $designRequest,
                'designs' => $designRequest->generatedDesigns->map(fn ($d) => [
                    'id' => $d->id,
                    'image_src' => $d->image_src,
                    'prompt_used' => $d->prompt_used,
                    'position' => $d->position,
                    'provider' => $d->provider,
                ]),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'فشل توليد التصاميم. يرجى المحاولة مجدداً.'], 500);
        }
    }

    public function generatePaid(GeneratePaidDesignRequest $request, DesignSession $designSession)
    {
        if ($designSession->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($designSession->status !== 'active') {
            return response()->json(['message' => 'Session is closed.'], 422);
        }

        $admin = $this->approvalService->verify(
            $request->validated('admin_email'),
            $request->validated('admin_password'),
        );

        if (!$admin) {
            return response()->json([
                'message' => 'بيانات المشرف غير صحيحة.',
                'errors' => ['admin_password' => ['كلمة المرور أو البريد الإلكتروني غير صحيحة.']],
            ], 422);
        }

        try {
            $designRequest = $this->generationService->generatePaid(
                $designSession,
                $request->validated('prompt'),
                auth()->id(),
                $admin->id,
            );

            return response()->json([
                'design_request' => $designRequest,
                'designs' => $designRequest->generatedDesigns->map(fn ($d) => [
                    'id' => $d->id,
                    'image_src' => $d->image_src,
                    'prompt_used' => $d->prompt_used,
                    'position' => $d->position,
                    'provider' => $d->provider,
                ]),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'فشل توليد التصاميم. يرجى المحاولة مجدداً.'], 500);
        }
    }
}
