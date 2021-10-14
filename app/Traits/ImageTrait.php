<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait ImageTrait {

    public function assignPicture($path, $picture, $slug) : string {
        $ext = $picture->getClientOriginalExtension();
        $picName = Str::random(4) . "-" . $slug . ".$ext";
        return Storage::putFileAs($path, $picture, $picName);
    }

}
