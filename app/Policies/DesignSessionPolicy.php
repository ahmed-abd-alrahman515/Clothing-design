<?php

namespace App\Policies;

use App\Models\DesignSession;
use App\Models\User;

class DesignSessionPolicy
{
    public function view(User $user, DesignSession $session): bool
    {
        return $user->id === $session->user_id || $user->isAdmin();
    }

    public function update(User $user, DesignSession $session): bool
    {
        return $user->id === $session->user_id || $user->isAdmin();
    }
}
