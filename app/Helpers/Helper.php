<?php

namespace App\Helpers;

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
}
