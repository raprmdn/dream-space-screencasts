<?php

namespace Database\Seeders;

use App\Models\PaymentType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PaymentChannelSeeder extends Seeder
{
    public function run()
    {
        /*
         * Put your manual payment channel you want.
         */
        $manual_payment = collect([
            [
                'payment_channel' => 'BRI',
                'identifier_code' => Str::uuid(),
                'virtual_number' => '099801026237535',
                'payment_channel_owner' => 'RAFI PUTRA RAMADHAN',
                'status' => 'Active',
                'archived' => false,
            ]
        ]);

        /*
         * Put your instant payment channel you want.
         * Instant payment channel is associated with Midtrans.
         * Let virtual number empty for instant payment.
         */
        $instant_payment = collect([
            [
                'payment_channel' => 'GoPay',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'BCA',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'BNI',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Mandiri',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Permata',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Alfamart',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Indomaret',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
        ]);

        $payment_type_1 = PaymentType::find(1);
        $payment_type_1->paymentChannels()->create([$manual_payment]);

        $payment_type_2 = PaymentType::find(2);
        $payment_type_2->paymentChannels()->create([$instant_payment]);
    }
}
