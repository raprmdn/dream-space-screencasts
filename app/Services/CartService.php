<?php

namespace App\Services;

use App\Http\Resources\CartCollection;
use App\Models\Series;
use Illuminate\Support\Facades\Auth;

class CartService
{
    public function carts(): CartCollection
    {
        $carts = Auth::user()->carts()->with(['series' => function ($q) {
            $q->with('topics:id,name,slug');
        }])->latest()->get();
        return new CartCollection($carts);
    }

    public function remove($id): ?bool
    {
        $series = Series::findOrFail($id);
        return Auth::user()->removeFromCarts($series);
    }

    public function create($series): string
    {
        $series = Series::findOrFail($series);
        if (!Auth::user()->existsInCarts($series->id)) {
            Auth::user()->addToCarts($series);
            return 'Added to Carts';
        } else {
            Auth::user()->removeFromCarts($series);
            return 'Removed from Carts';
        }
    }

}
