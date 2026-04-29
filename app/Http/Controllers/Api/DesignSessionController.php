<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DesignSession;
use Illuminate\Http\Request;

class DesignSessionController extends Controller
{
    public function index()
    {
        $sessions = DesignSession::where('user_id', auth()->id())
            ->with(['designRequests.generatedDesigns', 'branch'])
            ->latest()
            ->get();

        return response()->json($sessions);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name' => ['nullable', 'string', 'max:100'],
            'branch_id' => ['nullable', 'exists:branches,id'],
        ]);

        // Close any existing active sessions for this user
        DesignSession::where('user_id', auth()->id())
            ->where('status', 'active')
            ->update(['status' => 'closed']);

        $session = DesignSession::create([
            'user_id' => auth()->id(),
            'branch_id' => $data['branch_id'] ?? auth()->user()->branch_id,
            'customer_name' => $data['customer_name'] ?? null,
            'free_generation_used' => false,
            'paid_generations_count' => 0,
            'status' => 'active',
        ]);

        return response()->json($session, 201);
    }

    public function show(DesignSession $designSession)
    {
        $this->authorize('view', $designSession);

        return response()->json(
            $designSession->load(['designRequests.generatedDesigns'])
        );
    }

    public function close(DesignSession $designSession)
    {
        $this->authorize('update', $designSession);

        $designSession->update(['status' => 'closed']);

        return response()->json(['message' => 'Session closed.']);
    }
}
