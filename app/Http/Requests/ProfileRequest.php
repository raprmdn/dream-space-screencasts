<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'username' => ['required', 'string' , 'alpha_dash', Rule::unique('users')->ignore($this->id)],
            'email' => ['required', 'email', Rule::unique('users')->ignore($this->id)],
            'picture' => $this->hasFile('picture') ? ['image', 'mimes:png,jpg,jpeg,svg', 'max:2048', 'dimensions:max_width=100,max_height=100'] : []
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
