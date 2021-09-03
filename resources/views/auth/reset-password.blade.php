@extends('auth.layout')

@section('content')
    <div class="mb-20">
        <h3 class="opacity-50 font-weight-normal">Reset Password</h3>
        <p class="opacity-50">Enter your new password to get back your account.</p>
    </div>
    <form class="form text-center" action="{{ route('password.update') }}" method="POST">
        @csrf
        <input type="hidden" name="token" value="{{ $request->route('token') }}">
        @csrf
        <div class="form-group">
            <input class="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8 @error('email') is-invalid @enderror"
                   type="text" placeholder="Email" name="email" autocomplete="off" value="{{ $request->email }}" />
            @error('email')
                <div class="invalid-feedback mb-n5">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <input class="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8 @error('password') is-invalid @enderror"
                   type="password" placeholder="Password" name="password" />
            @error('password')
                <div class="invalid-feedback mb-n5">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <input class="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8"
                   type="password" placeholder="Confirm Password" name="password_confirmation" />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-pill btn-primary opacity-90 px-15 py-3 m-2">Reset</button>
        </div>
    </form>
@endsection
