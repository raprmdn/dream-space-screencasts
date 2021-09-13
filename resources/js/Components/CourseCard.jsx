import React from 'react';

export default function CourseCard() {
    return (
        <div className="col-xl-4">
            <div className="card card-custom card-stretch gutter-b">
                <div className="ribbon ribbon-clip ribbon-left">
                    <div className="ribbon-target" style={{top: '12px'}}>
                        <span className="ribbon-inner bg-success" />
                        <a href="#" className="text-white text-hover-white">
                            Laravel
                        </a>
                    </div>
                </div>
                <div className="ribbon ribbon-clip ribbon-left">
                    <div className="ribbon-target" style={{top: '50px'}}>
                        <span className="ribbon-inner bg-danger" />
                        <a href="#" className="text-white text-hover-white">
                            Discount
                        </a>
                    </div>
                </div>
                <div className="card-body d-flex flex-column">
                    <div className="text-center">
                        <a href="#">
                            <img src="assets/media/stock-600x400/img-11.jpg" className="mw-100 rounded-lg" />
                        </a>
                    </div>
                    <div className="align-items-center py-5">
                        <a href="#" className="text-dark-75 font-weight-boldest font-size-h3 m-0 mb-1">
                            Mari Kita Bangun Screencasts
                        </a>
                        <div className="d-flex">
                            <p className="font-weight-bold font-size-h6">Rp. 250.000,-</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap flex-sm-nowrap mb-n5 mt-n2">
                        <span className="align-items-center">
                          <i className="fas fa-book icon-1x mr-1" />
                          24 Lessons
                        </span>
                        <span className="align-items-center">
                          <i className="fas fa-clock icon-1x mr-1" />
                          2h 10m
                        </span>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between flex-wrap flex-sm-nowrap">
                    <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <i className="far fa-check-circle icon-1x text-success" />
                            <span className="font-weight-bolder text-dark ml-2">Free Series</span>
                        </div>
                    </div>
                    <div className="label label-light-danger label-inline font-weight-bold">Development</div>
                </div>
            </div>
        </div>
    )
}
