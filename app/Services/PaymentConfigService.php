<?php

namespace App\Services;

use App\Models\MidtransConfig;

class PaymentConfigService
{

    public function getMidtransConfiguration(): ?MidtransConfig
    {
        return MidtransConfig::first();
    }

    public function setStatusPaymentConfiguration($status): string
    {
        $status = $status['status'] ? 'Enable' : 'Disable';
        $configModel = MidtransConfig::first();
        $configModel
            ? $configModel->update(['status' => $status])
            : MidtransConfig::create(['status' => $status]);

        return $status;
    }

    public function updatePaymentConfiguration($attributes, $midtransConfig)
    {
        return $midtransConfig->update([
            'environment' => $attributes['environment'],
            'merchant_id' => $attributes['merchant_id'],
            'client_key' => $attributes['client_key'],
            'server_key' => $attributes['server_key'],
            'sanitized' => $attributes['sanitized'],
            'enable_3d_secure' => $attributes['enable_3d_secure']
        ]);
    }

}
