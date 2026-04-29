<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\DesignSession;
use Inertia\Inertia;

class KioskController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $activeSession = DesignSession::where('user_id', $user->id)
            ->where('status', 'active')
            ->with(['designRequests.generatedDesigns'])
            ->latest()
            ->first();

        $branches = Branch::where('is_active', true)->get(['id', 'name_ar', 'name_en']);

        return Inertia::render('Kiosk/Index', [
            'activeSession' => $activeSession,
            'branches' => $branches,
            'userBranch' => $user->branch,
        ]);
    }

    public function sessions()
    {
        $sessions = DesignSession::where('user_id', auth()->id())
            ->with(['designRequests.generatedDesigns', 'branch'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Kiosk/Sessions', [
            'sessions' => $sessions,
        ]);
    }

    public function branches()
    {
        $branches = Branch::with('tablets')->get();

        return Inertia::render('Kiosk/Branches', [
            'branches' => $branches,
        ]);
    }
}
