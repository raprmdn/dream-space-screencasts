<?php

namespace Database\Seeders;

use App\Models\MidtransConfig;
use Illuminate\Database\Seeder;

class MidtransConfigSeeder extends Seeder
{
    public function run()
    {
        MidtransConfig::create([
            'status' => 'Disable',
            'environment' => false,
            'merchant_id' => 'Input your merchant id here',
            'client_key' => 'Input your client key here',
            'server_key' => 'Input your server key here',
            'sanitized' => true,
            'enable_3d_secure' => true,
        ]);
    }
}
