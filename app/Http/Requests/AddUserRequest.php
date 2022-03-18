<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string' , 'alpha_dash', 'unique:users'],
            'email' => ['required', 'email', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:8', 'string'],
            'roles' => ['required']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
