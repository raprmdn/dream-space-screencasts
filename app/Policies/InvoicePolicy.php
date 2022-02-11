<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class InvoicePolicy
{
    use HandlesAuthorization;

    public function __construct()
    {
        //
    }

    public function viewInvoice(User $user, Order $order): bool
    {
        if ($user->hasRole('administrator')) {
            return true;
        } else {
            return $user->id === $order->user_id;
        }
    }
}
