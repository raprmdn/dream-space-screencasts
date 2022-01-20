<?php

namespace App\Services;

use App\Models\PaymentChannel;
use App\Models\PaymentType;
use App\Traits\ImageTrait;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PaymentChannelService
{
    use ImageTrait;

    public function save(array $attributes)
    {
        $paymentType = PaymentType::findOrFail($attributes['payment_type_id']['value']);
        $attributes['identifier_code'] = Str::uuid();
        $attributes['status'] = 'Inactive';
        $image = $attributes['image'];
        $slug = Str::slug($attributes['payment_channel']);
        $attributes['image'] = $this->assignPicture('icon/channels', $image, $slug);

        return $paymentType->paymentChannels()->create($this->_fields($attributes));
    }

    public function update(array $attributes, $paymentChannel)
    {
        $attributes['status'] = $paymentChannel->status;
        $image = $attributes['image'];
        $slug = Str::slug($attributes['payment_channel']);
        if (request()->hasFile('image')) {
            Storage::delete($paymentChannel->image);
            $attributes['image'] = $this->assignPicture('icon/channels', $image, $slug);
        } else {
            $attributes['image'] = $paymentChannel->image;
        }

        return $paymentChannel->update($this->_fields($attributes));
    }

    public function setStatusPaymentChannel(array $attributes)
    {
        $channel = PaymentChannel::findOrFail($attributes['channel_id']);

        return tap($channel)->update([
            'status' => $attributes['status'] ? 'Active' : 'Inactive'
        ]);
    }

    private function _fields($attributes): array
    {
        return [
            isset($attributes['id']), 'payment_type_id' => $attributes['payment_type_id']['value'],
            'payment_channel' => $attributes['payment_channel'],
            'identifier_code' => $attributes['identifier_code'],
            'virtual_number' => $attributes['virtual_number'],
            'payment_channel_owner' => $attributes['payment_channel_owner'],
            'image' => $attributes['image'],
            'instruction' => $attributes['instruction'],
            'status' => $attributes['status'],
            'archived' => $attributes['archived']
        ];
    }
}
