<?php

namespace Database\Seeders;

use App\Models\PaymentType;
use Illuminate\Database\Seeder;

class PaymentTypeSeeder extends Seeder
{
    public function run()
    {
        /*
         * This Payment Type cannot be deleted.
         * Don't updating the "identifier" field.
         * Updating the "identifier" field will affect to system functionality.
         * Make sure in database, id for "Manual Transfer = 1" and "Instant Payment = 2"
         */

        collect([
           [
               'title' => 'Manual Transfer',
               'identifier' => 'manual-transfer',
               'description' => 'Pembayaran transfer secara manual, upload bukti pembayaran jika diperlukan.',
               'status' => 'Inactive',
               'archived' => false,
           ],
            [
                'title' => 'Instant Payment',
                'identifier' => 'instant-payment',
                'description' => 'Verifikasi pembayaran secara otomatis, tanpa perlu upload bukti pembayaran.',
                'status' => 'Inactive',
                'archived' => false,
            ]
        ])->each(function ($paymentType) {
            \DB::table('payment_types')->insert($paymentType);
        });
    }
}
