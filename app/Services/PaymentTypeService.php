<?php

namespace App\Services;

use App\Http\Resources\PaymentTypeCollection;
use App\Models\PaymentType;
use Illuminate\Support\Str;

class PaymentTypeService
{

    public function getPaymentType(): PaymentTypeCollection
    {
        return new PaymentTypeCollection(PaymentType::oldest()->get());
    }

    public function getPaymentTypeAndChannels(): PaymentTypeCollection
    {
        return new PaymentTypeCollection(
            PaymentType::oldest()->with(['paymentChannels' => function($q) {
                $q->orderBy('id');
            }])->get()
        );
    }

    public function getPaymentTypeWithPaymentChannels(): PaymentTypeCollection
    {
        return new PaymentTypeCollection(
            PaymentType::oldest()->notArchived()->with(['paymentChannels' => function($q) {
                $q->notArchived()->orderBy('id');
            }])->get()
        );
    }

    public function save($attributes): PaymentType
    {
        $attributes['identifier'] = Str::slug($attributes['payment_type']);
        $attributes['status'] = 'Inactive';
        $attributes['archived'] = false;

        return PaymentType::create($this->_fields($attributes));
    }

    public function update($attributes, $paymentType)
    {
        $attributes['identifier'] = $paymentType->identifier;
        $attributes['status'] = $paymentType->status;
        $attributes['archived'] = $paymentType->archived;

        return $paymentType->update($this->_fields($attributes));
    }

    public function delete($paymentType)
    {
        return $paymentType->delete();
    }

    public function setStatusPaymentType($attributes)
    {
        $paymentType = PaymentType::findOrFail($attributes['id']);

        return tap($paymentType)->update([
            'status' => $attributes['status'] ? 'Active' : 'Inactive'
        ]);
    }

    public function setArchivedPaymentType($attributes)
    {
        $paymentType = PaymentType::findOrFail($attributes['id']);

        return tap($paymentType)->update([
            'archived' => $attributes['archived']
        ]);
    }

    private function _fields($attributes): array
    {
        return [
            'payment_type' => $attributes['payment_type'],
            'identifier' => $attributes['identifier'],
            'description' => $attributes['description'],
            'status' => $attributes['status'],
            'archived' => $attributes['archived'],
        ];
    }

}
