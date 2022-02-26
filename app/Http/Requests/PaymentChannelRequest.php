<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentChannelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'payment_type_id' => ['required'],
            'payment_channel' => ['required'],
            'identifier_channel' => $this->payment_type_id['label'] === 'Instant Payment' ? ['required'] : [],
            'type' => $this->payment_type_id['label'] === 'Instant Payment' ? ['required'] : [],
            'virtual_number' => $this->payment_type_id['label'] === 'Manual Transfer' ? ['required'] : [],
            'payment_channel_owner' => $this->payment_type_id['label'] === 'Manual Transfer' ? ['required'] : [],
            'image' => $this->hasFile('image') ? ['required', 'image', 'mimes:png,jpg,jpeg,svg', 'max:3048'] : ['required'],
            'instruction' => ['required', 'max:255'],
            'archived' => ['boolean']
        ];
    }
}
