<?php

namespace Database\Seeders;

use App\Models\PaymentType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PaymentTypeAndChannelSeeder extends Seeder
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
               'payment_type' => 'Manual Transfer',
               'identifier' => 'manual-transfer',
               'description' => 'Pembayaran transfer secara manual, upload bukti pembayaran jika diperlukan.',
               'status' => 'Inactive',
               'archived' => false,
           ],
            [
                'payment_type' => 'Instant Payment',
                'identifier' => 'instant-payment',
                'description' => 'Verifikasi pembayaran secara otomatis, tanpa perlu upload bukti pembayaran.',
                'status' => 'Inactive',
                'archived' => false,
            ]
        ])->each(function ($paymentType) {
            \DB::table('payment_types')->insert($paymentType);
        });

        /*
         *  Payment Type Model has Many Payment Channels.
         */

        /*
         * Put your manual payment channel you want.
         * 'identifier_channel' only required for Instant Payment Gateway (Midtrans).
         */
        $manual_payment_channels = [
            [
                'payment_channel' => 'BRI',
                'identifier_code' => Str::uuid(),
                'virtual_number' => '099801026237535',
                'payment_channel_owner' => 'RAFI PUTRA RAMADHAN',
                'status' => 'Inactive',
                'archived' => false,
            ]
        ];

        /*
         * Put your instant payment channel you want.
         * Instant payment channel is associated with Midtrans.
         * Identifier Channel and Type reference from :
         * https://docs.midtrans.com/en/core-api/bank-transfer?id=sample-request-and-request-body ,
         * https://docs.midtrans.com/en/core-api/e-wallet?id=sample-request,
         * https://docs.midtrans.com/en/core-api/convenience-store?id=sample-request-and-request-body
         */

        $instant_payment_channels = [
            [
                'payment_channel' => 'BRI',
                'identifier_channel' => 'bri',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'instruction' => "- Log in Aplikasi BRImo\n- Pilih menu \"BRIVA\"\n- Masukkan Virtual Number BRIVA \n- Pastikan nominal pembayaran sesuai\n- Lalu pilih \"BAYAR\" dan masukkan PIN Anda\n- Pembayaran selesai.",
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'BCA',
                'identifier_channel' => 'bca',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'instruction' => "- Log in BCA Mobile App\n- Pilih m-BCA\n- Masukkan kode akses m-BCA\n- Pilih m-Transfer\n- Pilih BCA Virtual Account\n- Masukkan nomor Virtual Account\n- Masukkan PIN m-BCA\n- Pembayaran selesai.",
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'BNI',
                'identifier_channel' => 'bni',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'instruction' => "- Log in BNI Mobile Banking\n- Pilih menu \"Transfer\"\n- Pilih menu Virtual Account Billing\n- Masukkan nomor Virtual Account\n- Konfirmasi transaksi dan masukkan password transaksi\n- Pembayaran selesai.",
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Mandiri',
                'identifier_channel' => 'mandiri',
                'type' => 'echannel',
                'identifier_code' => Str::uuid(),
                'instruction' => "- Login Mandiri Internet Banking\n- Pilih menu Pembayaran\n- Pilih menu Multipayment\n- Pilih pada \"Penyedia Jasa\" Midtrans\n- Masukkan Payment Code\n- Konfirmasi pembayaran\n- Pembayaran selesai.",
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Permata',
                'identifier_channel' => 'permata',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'instruction' => "- Log in PermataMobile \n- Pilih pembayaran tagihan\n- Pilih Virtual Account\n- Masukkan nomor Virtual Account\n- Masukkan nominal tagihan pada total pembayaran\n- Konfirmasi pembayaran\n- Pembayaran selesai.",
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'GoPay',
                'identifier_channel' => 'gopay',
                'type' => 'gopay',
                'identifier_code' => Str::uuid(),
                'instruction' => "- Buka aplikasi Gojek\n- Lakukan Scan pada QR Code\n- Cek payment details pada aplikasi\n- Pilih Pay\n- Masukkan PIN\n- Pembayaran selesai.",
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Alfamart',
                'identifier_channel' => 'alfamart',
                'type' => 'cstore',
                'identifier_code' => Str::uuid(),
                'instruction' => "- Simpan Payment Code yang diberikan\n- Pergi ke Alfamart\n- Pergi ke kasir dan berikan Payment Code\n- Lakukan pembayaran\n- Pembayaran selesai",
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Indomaret',
                'identifier_channel' => 'indomaret',
                'instruction' => "- Simpan Payment Code yang diberikan\n- Pergi ke Indomaret\n- Pergi ke kasir dan berikan Payment Code\n- Lakukan pembayaran\n- Pembayaran selesai",
                'type' => 'cstore',
                'identifier_code' => Str::uuid(),
                'status' => 'Inactive',
                'archived' => true,
            ],
        ];

        $manual = PaymentType::find(1);
        $instant = PaymentType::find(2);

        $manual->paymentChannels()->createMany($manual_payment_channels);
        $instant->paymentChannels()->createMany($instant_payment_channels);
    }
}
