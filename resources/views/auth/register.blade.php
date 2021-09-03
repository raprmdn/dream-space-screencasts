@extends('auth.layout')

@section('content')
    <div class="mb-20">
        <h3 class="opacity-50 font-weight-normal">Sign Up</h3>
        <p class="opacity-50">Enter your credentials to create your account.</p>
    </div>
    <form class="form text-center" action="{{ route('register') }}" method="POST">
        @csrf
        <div class="form-group">
            <input class="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8 @error('name') is-invalid @enderror"
                   type="text" placeholder="Full Name" name="name" autocomplete="off"/>
            @error('name')
                <div class="invalid-feedback mb-n5">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <input class="form-control h-auto text-white bg-white-o-10 rounded-pill border-0 py-4 px-8 @error('email') is-invalid @enderror"
                   type="text" placeholder="Email" name="email" autocomplete="off" />
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
        <div class="form-group text-left px-8">
            <div class="checkbox-inline">
                <label class="checkbox checkbox-outline checkbox-white opacity-60 text-white m-0">
                    <input type="checkbox" name="TOS" required/>
                    <span></span>I Agree the
                    <a href="#" class="text-white font-weight-bold ml-1">terms and conditions</a>.</label>
                @error('TOS')<div class="text-danger">Terms and conditions is required.</div> @enderror
            </div>
            <div class="form-text text-muted text-center"></div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-pill btn-primary opacity-90 px-15 py-3 m-2">Sign Up</button>
            <a href="{{ url()->previous() }}" class="btn btn-pill btn-outline-white opacity-70 px-15 py-3 m-2">Cancel</a>
        </div>
    </form>
    <div class="mt-10">
        <span class="opacity-50 mr-2">Already have an account?</span>
        <a href="{{ route('login') }}" class="text-white opacity-30 font-weight-normal">Sign In</a>
    </div>
@endsection
