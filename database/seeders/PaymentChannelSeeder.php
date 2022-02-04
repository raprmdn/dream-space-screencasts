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
                'instruction ' => '
                    - Log in Aplikasi BRImo
                    - Pilih menu "BRIVA"
                    - Masukkan Virtual Number BRIVA
                    - Pastikan nominal pembayaran sesuai
                    - Lalu pilih "BAYAR" dan masukkan PIN Anda
                    - Pembayaran selesai.
                ',
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'BCA',
                'identifier_channel' => 'bca',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'instruction ' => '
                    - Log in BCA Mobile App
                    - Pilih m-BCA
                    - Masukkan kode akses m-BCA
                    - Pilih m-Transfer
                    - Pilih BCA Virtual Account
                    - Masukkan nomor Virtual Account sesuai yang ada di atas
                    - Masukkan PIN m-BCA
                    - Pembayaran selesai.
                ',
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'BNI',
                'identifier_channel' => 'bni',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'instruction ' => '
                    - Log in BNI Mobile Banking
                    - Pilih menu "Transfer"
                    - Pilih menu Virtual Account Billing
                    - Masukkan nomor Virtual Account
                    - Konfirmasi transaksi dan masukkan password transaksi
                    - Pembayaran selesai.
                ',
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Mandiri',
                'identifier_channel' => 'mandiri',
                'type' => 'echannel',
                'identifier_code' => Str::uuid(),
                'instruction ' => '
                    - Login Mandiri Internet Banking
                    - Pilih menu Pembayaran
                    - Pilih menu Multipayment
                    - Pilih pada "Penyedia Jasa" Midtrans
                    - Masukkan Payment Code
                    - Konfirmasi pembayaran menggunakan Mandiri Token
                    - Pembayaran selesai.
                ',
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Permata',
                'identifier_channel' => 'permata',
                'type' => 'bank_transfer',
                'identifier_code' => Str::uuid(),
                'instruction ' => '
                    - Log in PermataMobile
                    - Pilih pembayaran tagihan
                    - Pilih Virtual Account
                    - Masukkan nomor Virtual Account
                    - Masukkan nominal tagihan pada total pembayaran
                    - Konfirmasi pembayaran
                    - Pembayaran selesai.
                ',
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'GoPay',
                'identifier_channel' => 'gopay',
                'type' => 'gopay',
                'identifier_code' => Str::uuid(),
                'instruction ' => '
                    - Buka aplikasi Gojek
                    - Lakukan Scan pada QR Code
                    - Cek payment details pada aplikasi
                    - Pilih Pay
                    - Masukkan PIN
                    - Pembayaran selesai.
                ',
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Alfamart',
                'identifier_channel' => 'alfamart',
                'type' => 'cstore',
                'identifier_code' => Str::uuid(),
                'instruction ' => '
                    - Simpan Payment Code yang diberikan
                    - Pergi ke Alfamart
                    - Pergi ke kasir dan berikan Payment Code
                    - Lakukan pembayaran
                    - Pembayaran selesai
                ',
                'status' => 'Inactive',
                'archived' => true,
            ],
            [
                'payment_channel' => 'Indomaret',
                'identifier_channel' => 'indomaret',
                'instruction ' => '
                    - Simpan Payment Code yang diberikan
                    - Pergi ke Indomaret
                    - Pergi ke kasir dan berikan Payment Code
                    - Lakukan pembayaran
                    - Pembayaran selesai
                ',
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
