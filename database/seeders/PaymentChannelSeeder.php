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
         * Identifier Channel and Type reference from :
         * https://docs.midtrans.com/en/core-api/bank-transfer?id=sample-request-and-request-body ,
         * https://docs.midtrans.com/en/core-api/e-wallet?id=sample-request,
         * https://docs.midtrans.com/en/core-api/convenience-store?id=sample-request-and-request-body
         */

        $instant_payment = collect([
            [
                'payment_channel' => 'BRI',
                'identifier_channel' => 'bri',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'BCA',
                'identifier_channel' => 'bca',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'BNI',
                'identifier_channel' => 'bni',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Mandiri',
                'identifier_channel' => 'mandiri',
                'type' => 'echannel',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Permata',
                'identifier_channel' => 'permata',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'GoPay',
                'identifier_channel' => 'gopay',
                'type' => 'gopay',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Alfamart',
                'identifier_channel' => 'alfamart',
                'type' => 'cstore',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Indomaret',
                'identifier_channel' => 'indomaret',
                'type' => 'cstore',
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
