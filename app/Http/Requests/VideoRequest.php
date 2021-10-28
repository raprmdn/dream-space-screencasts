<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'series' => ['required'],
            'title' => ['required'],
            'source' => ['required'],
            'episode' => ['numeric', 'required'],
            'runtime' => ['required'],
            'is_free' => ['boolean'],
            'is_archived' => ['boolean']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
