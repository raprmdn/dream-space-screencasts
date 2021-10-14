<?php

namespace App\Helpers;

class Helper
{
    public static function rupiahFormat($number): string
    {
        return number_format($number, 0, ',' , '.');
    }
}
