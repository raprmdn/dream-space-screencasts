@extends('auth.layout')

@section('content')
    <div class="mb-20">
        <h3 class="opacity-50 font-weight-normal">Sign In To Dream Space</h3>
        <p class="opacity-50">Enter your credentials to login your account.</p>
        @if(session('status'))
            <div class="text-success">{{ session('status') }}</div>
        @endif
    </div>
    <form class="form" action="{{ route('login') }}" method="POST">
        @csrf
        <div class="form-group">
            <input class="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8 @error('email') is-invalid @enderror"
                   type="email" placeholder="Email" name="email" />
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
        <div class="form-group d-flex flex-wrap justify-content-between align-items-center px-8 opacity-60">
            <div class="checkbox-inline">
                <label class="checkbox checkbox-outline checkbox-white text-white m-0">
                    <input type="checkbox" name="remember" />
                    <span></span>Remember me</label>
            </div>
            <a href="{{ route('password.request') }}" class="text-white font-weight-bold">Forgot Password ?</a>
        </div>
        <div class="form-group text-center mt-10">
            <button type="submit" class="btn btn-pill btn-primary opacity-90 px-15 py-3">Sign In</button>
        </div>
    </form>
    <div class="mt-10">
        <span class="opacity-50 mr-2">Don't have an account?</span>
        <a href="{{ route('register') }}" class="text-white opacity-30 font-weight-normal">Sign Up</a>
    </div>
@endsection
