<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TopicRequest extends FormRequest
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
        $rules = [];
        if (!$this->topic) $rules = ['required', 'image', 'mimes:png,jpg,jpeg,svg', 'max:3048'];
        if ($this->hasFile('picture')) $rules = ['required', 'image', 'mimes:png,jpg,jpeg,svg', 'max:3048'];
        return [
            'name' => ['required'],
            'description' => ['required'],
            'position' => ['required', 'integer', 'min:1'],
            'picture' => $rules
        ];
    }
}
