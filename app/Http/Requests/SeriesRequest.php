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
            'price' => ['nullable' ,'integer'],
            'discount_price' => ['nullable', 'integer'],
            'levels' => ['required'],
            'status' => ['required'],
            'episodes' => ['required', 'min:1', 'integer'],
            'thumbnail' =>  $this->series ? [] : ['required', 'image', 'mimes:jpg,jpeg,png,svg', 'max:3048'],
            'is_discount' => ['boolean'] ,
            'is_free' => ['boolean'],
            'archived_at' => ['boolean']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
