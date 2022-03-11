<?php

namespace App\Helpers;

use Carbon\Carbon;

class Helper
{
    public static function rupiahFormat($number): string
    {
        return number_format($number, 0, ',' , '.');
    }

    public static function castingRuntime($series)
    {
        $series->hours = $series->videos->map(function ($times) {
            return $times->runtime;
        });

        $sum = strtotime('00:00:00');
        $totals = 0;

        foreach ($series->hours as $element) {
            $timeinsec = strtotime($element) - $sum;
            $totals = $totals + $timeinsec;
        }

        $h = intval($totals / 3600);
        $totals = $totals - ($h * 3600);
        $m = intval($totals / 60);
        $s = $totals - ($m * 60);

        $series->runtime = [
            'h' => $h,
            'm' => $m,
            's' => $s
        ];
    }

    public static function runtimeFormatted($runtime): string
    {
        $runtime_formatted = Carbon::parse($runtime)->format('h:i:s');
        $exploded = explode(':', $runtime_formatted);
        $exploded[0] === '12'
            ?  $runtimeFormatted = Carbon::parse($runtime)->format('i:s')
            :  $runtimeFormatted = Carbon::parse($runtime)->format('h:i:s');

        return $runtimeFormatted;
    }
}
