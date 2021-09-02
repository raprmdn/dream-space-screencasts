@extends('layouts.app')
@section('landing.header')
    <div class="text-center mb-5 mb-lg-10 py-10 py-lg-20">
        <h1 class="text-white lh-base font-weight-bolder fs-2x fs-lg-3x mb-15">Build An Outstanding Solutions
            <br />with
            <span style="background: linear-gradient(to right, #12CE5D 0%, #FFD80C 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                <span>A Robust Platform for Developer!</span>
            </span>
        </h1>
        <a href="#" class="btn btn-primary font-size-h6 font-weight-bolder py-3 px-6">Browse Courses</a>
    </div>
@endsection
@section('menu.topics')
    <div class="container d-flex flex-column flex-column-fluid mt-n16 mb-5">
        <div class="card">
            <div class="d-flex align-items-center justify-content-center flex-wrap px-5 py-5 px-md-10 py-md-9">
                <a data-toggle="tooltip" class="btn btn-lg btn-hover-light-primary text-uppercase font-size- font-size-md-3 letter-spacing-sm font-weight-boldest px-3 px-md-6 mr-1 mr-md-2" href="#">Laravel</a>
                <a data-toggle="tooltip" class="btn btn-lg btn-hover-light-primary text-uppercase font-size- font-size-md-3 letter-spacing-sm font-weight-boldest px-3 px-md-6 mr-1 mr-md-2" href="#">Php</a>
                <a data-toggle="tooltip" class="btn btn-lg btn-hover-light-primary text-uppercase font-size- font-size-md-3 letter-spacing-sm font-weight-boldest px-3 px-md-6 mr-1 mr-md-2" href="#">React JS</a>
                <a data-toggle="tooltip" class="btn btn-lg btn-hover-light-primary text-uppercase font-size- font-size-md-3 letter-spacing-sm font-weight-boldest px-3 px-md-6 mr-1 mr-md-2" href="#">Vue JS</a>
            </div>
        </div>
    </div>
@endsection
@section('content')
    <div class="py-2 py-lg-12 container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap ml-n5">
            <div class="d-flex flex-column">
                <h2 class="text-success font-weight-bolder">Starter</h2>
                <div class="d-flex align-items-center font-weight-bold my-2">
                    <h6 class="text-dark opacity-75 hover-opacity-100">
                        Temukan kelas yang diminati untuk membantu anda agar dapat menemukan pengalaman yang lebih jauh.
                    </h6>
                </div>
            </div>
        </div>
        <a href="#" class="btn btn-icon btn-success btn-sm mr-2">
            <i class="fas fa-chevron-right"></i>
        </a>
    </div>
    <div class="row">
        <div class="col-xl-4">
            <div class="card card-custom card-stretch gutter-b">
                <div class="ribbon ribbon-clip ribbon-left">
                    <div class="ribbon-target" style="top: 12px;">
                        <span class="ribbon-inner bg-success"></span>
                        <a href="#" class="text-white text-hover-white">
                            Laravel
                        </a>
                    </div>
                </div>
                <div class="ribbon ribbon-clip ribbon-left">
                    <div class="ribbon-target" style="top: 50px;">
                        <span class="ribbon-inner bg-danger"></span>
                        <a href="#" class="text-white text-hover-white">
                            Discount
                        </a>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="text-center">
                        <a href="#">
                            <img src="{{ asset('assets/media/stock-600x400/img-11.jpg') }}" class="mw-100 rounded-lg" style="width: 1280px; height: 200px;">
                        </a>
                    </div>
                    <div class="align-items-center py-5">
                        <a href="#" class="text-dark-75 font-weight-boldest font-size-h3 m-0 mb-1">
                            Mari Kita Bangun Screencasts
                        </a>
                        <div class="d-flex">
                            <p class="font-weight-bold font-size-h6">Rp. 250.000,-</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between flex-wrap flex-sm-nowrap mb-n5 mt-n2">
                        <span class="align-items-center">
                            <i class="fas fa-book icon-1x mr-1"></i>
                            24 Lessons
                        </span>
                        <span class="align-items-center">
                            <i class="fas fa-clock icon-1x mr-1"></i>
                            2h 10m
                        </span>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between flex-wrap flex-sm-nowrap">
                    <div class="d-flex">
                        <div class="d-flex align-items-center">
                            <i class="far fa-check-circle icon-1x text-success"></i>
                            <span class="font-weight-bolder text-dark ml-2">Free Series</span>
                        </div>
                    </div>
                    <div class="label label-light-danger label-inline font-weight-bold">Development</div>
                </div>
            </div>
        </div>
        <div class="col-xl-4">
            <div class="card card-custom card-stretch gutter-b">
                <div class="ribbon ribbon-clip ribbon-left">
                    <div class="ribbon-target" style="top: 12px;">
                        <span class="ribbon-inner bg-success"></span>
                        <a href="#" class="text-white text-hover-white">
                            React JS
                        </a>
                    </div>
                </div>
                <div class="ribbon ribbon-clip ribbon-left">
                    <div class="ribbon-target" style="top: 50px;">
                        <span class="ribbon-inner bg-danger"></span>
                        <a href="#" class="text-white text-hover-white">
                            Discount
                        </a>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="text-center">
                        <a href="#">
                            <img src="{{ asset('assets/media/stock-600x400/img-2.jpg') }}" class="mw-100 rounded-lg" style="width: 1280px; height: 200px;">
                        </a>
                    </div>
                    <div class="align-items-center py-5">
                        <a href="#" class="text-dark-75 font-weight-boldest font-size-h3 m-0 mb-1">
                            Mari Kita Bangun Screencasts
                        </a>
                        <div class="d-flex">
                            <p class="font-weight-bold font-size-h6">Rp. 250.000,-</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between flex-wrap flex-sm-nowrap mb-n5 mt-n2">
                        <span class="align-items-center">
                            <i class="fas fa-book icon-1x mr-1"></i>
                            24 Lessons
                        </span>
                        <span class="align-items-center">
                            <i class="fas fa-clock icon-1x mr-1"></i>
                            2h 10m
                        </span>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between flex-wrap flex-sm-nowrap">
                    <div class="d-flex">
                        <div class="d-flex align-items-center">
                            <i class="far fa-check-circle icon-1x text-success"></i>
                            <span class="font-weight-bolder text-dark ml-2">Paid Series</span>
                        </div>
                    </div>
                    <div class="label label-light-success label-inline font-weight-bold">Completed</div>
                </div>
            </div>
        </div>
    </div>
    <div class="py-2 py-lg-12 container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap ml-n5">
            <div class="d-flex flex-column">
                <h2 class="text-success font-weight-bolder">Recently Updated</h2>
                <div class="d-flex align-items-center font-weight-bold my-2">
                    <h6 class="text-dark opacity-75 hover-opacity-100">
                        Penasaran terhadap apa saja courses terbaru? berikut di bawah ini courses yang baru saja diperbarui.
                    </h6>
                </div>
            </div>
        </div>
        <a href="#" class="btn btn-icon btn-success btn-sm mr-2">
            <i class="fas fa-chevron-right"></i>
        </a>
    </div>
    <div class="row">
        <div class="col-xl-4">
            <div class="card card-custom card-stretch gutter-b">
                <div class="ribbon ribbon-clip ribbon-left">
                    <div class="ribbon-target" style="top: 12px;">
                        <span class="ribbon-inner bg-success"></span>
                        <a href="#" class="text-white text-hover-white">
                            React JS
                        </a>
                    </div>
                </div>
                <div class="ribbon ribbon-clip ribbon-left">
                    <div class="ribbon-target" style="top: 50px;">
                        <span class="ribbon-inner bg-danger"></span>
                        <a href="#" class="text-white text-hover-white">
                            Discount
                        </a>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="text-center">
                        <a href="#">
                            <img src="{{ asset('assets/media/stock-900x600/15.jpg') }}" class="mw-100 rounded-lg" style="width: 1280px; height: 200px;">
                        </a>
                    </div>
                    <div class="align-items-center py-5">
                        <a href="#" class="text-dark-75 font-weight-boldest font-size-h3 m-0 mb-1">
                            Mari Kita Bangun Screencasts
                        </a>
                        <div class="d-flex">
                            <p class="font-weight-bold font-size-h6">Rp. 250.000,-</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between flex-wrap flex-sm-nowrap mb-n5 mt-n2">
													<span class="align-items-center">
														<i class="fas fa-book icon-1x mr-1"></i>
														24 Lessons
													</span>
                        <span class="align-items-center">
														<i class="fas fa-clock icon-1x mr-1"></i>
														2h 10m
													</span>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between flex-wrap flex-sm-nowrap">
                    <div class="d-flex">
                        <div class="d-flex align-items-center">
                            <i class="far fa-check-circle icon-1x text-success"></i>
                            <span class="font-weight-bolder text-dark ml-2">Paid Series</span>
                        </div>
                    </div>
                    <div class="label label-light-success label-inline font-weight-bold">Completed</div>
                </div>
            </div>
        </div>
    </div>
    <div class="py-2 py-lg-12 container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap ml-n5">
            <div class="d-flex flex-column">
                <h2 class="text-success font-weight-bolder">Top Courses</h2>
                <div class="d-flex align-items-center font-weight-bold my-2">
                    <h6 class="text-dark opacity-75 hover-opacity-100">
                        Courses yang paling banyak diminati.
                    </h6>
                </div>
            </div>
        </div>
        <a href="#" class="btn btn-icon btn-success btn-sm mr-2">
            <i class="fas fa-chevron-right"></i>
        </a>
    </div>
    <div class="row">
        <div class="col-xl-4">
            <div class="card card-custom card-stretch gutter-b">
                <div class="ribbon ribbon-clip ribbon-left">
                    <div class="ribbon-target" style="top: 12px;">
                        <span class="ribbon-inner bg-success"></span>
                        <a href="#" class="text-white text-hover-white">
                            React JS
                        </a>
                    </div>
                </div>
                <div class="ribbon ribbon-clip ribbon-left">
                    <div class="ribbon-target" style="top: 50px;">
                        <span class="ribbon-inner bg-danger"></span>
                        <a href="#" class="text-white text-hover-white">
                            Discount
                        </a>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="text-center">
                        <a href="#">
                            <img src="{{ asset('assets/media/stock-900x600/33.jpg') }}" class="mw-100 rounded-lg" style="width: 1280px; height: 200px;">
                        </a>
                    </div>
                    <div class="align-items-center py-5">
                        <a href="#" class="text-dark-75 font-weight-boldest font-size-h3 m-0 mb-1">
                            Mari Kita Bangun Screencasts
                        </a>
                        <div class="d-flex">
                            <p class="font-weight-bold font-size-h6">Rp. 250.000,-</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between flex-wrap flex-sm-nowrap mb-n5 mt-n2">
													<span class="align-items-center">
														<i class="fas fa-book icon-1x mr-1"></i>
														24 Lessons
													</span>
                        <span class="align-items-center">
														<i class="fas fa-clock icon-1x mr-1"></i>
														2h 10m
													</span>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between flex-wrap flex-sm-nowrap">
                    <div class="d-flex">
                        <div class="d-flex align-items-center">
                            <i class="far fa-check-circle icon-1x text-success"></i>
                            <span class="font-weight-bolder text-dark ml-2">Paid Series</span>
                        </div>
                    </div>
                    <div class="label label-light-success label-inline font-weight-bold">Completed</div>
                </div>
            </div>
        </div>
    </div>
@endsection
