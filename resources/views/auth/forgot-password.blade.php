@extends('auth.layout')

@section('content')
    <div class="mb-20">
        <h3 class="opacity-50 font-weight-normal">Forgotten Password ?</h3>
        <p class="opacity-50">Enter your email to reset your password</p>
        @if(session('status'))
            <div class="text-success">{{ session('status') }}</div>
        @endif
    </div>
    <form class="form" action="{{ route('password.request') }}" method="POST">
        @csrf
        <div class="form-group mb-10">
            <input class="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8 @error('email') is-invalid @enderror"
                   type="email" placeholder="Email" name="email" autocomplete="off" />
            @error('email')
                <div class="invalid-feedback mb-n5">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-pill btn-primary opacity-90 px-15 py-3 m-2">Request</button>
            <a href="{{ route('login') }}" class="btn btn-pill btn-outline-white opacity-70 px-15 py-3 m-2">Cancel</a>
        </div>
    </form>
@endsection
