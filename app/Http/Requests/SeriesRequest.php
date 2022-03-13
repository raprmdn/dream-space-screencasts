<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SeriesRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'min:5'],
            'topics' => ['required', 'array', 'min:1', 'max:5'],
            'description' => ['required', 'min:10'],
            'price' => ['required_if:is_free,false', 'nullable' ,'integer'],
            'discount_price' => ['required_if:is_discount,true', 'nullable', 'integer'],
            'levels' => ['required'],
            'status' => ['required'],
            'episodes' => ['required', 'min:1', 'integer'],
            'thumbnail' =>  $this->hasFile('thumbnail') ? ['required', 'image', 'mimes:png,jpg,jpeg,svg', 'max:3048'] : ['required'],
            'is_discount' => ['boolean'] ,
            'is_free' => ['boolean'],
            'archived_at' => ['boolean']
        ];
    }

    public function messages(): array
    {
        return [
            'price.required_if' => 'The price field is required when the series is not free.',
            'discount_price.required_if' => 'The discount price field is required when the series has a discount.',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
