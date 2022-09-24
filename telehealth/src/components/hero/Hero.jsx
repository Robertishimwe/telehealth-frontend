import React from 'react'
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="container-fluid bg-primary py-5 mb-5 hero-header">
            <div className="container py-5">
                <div className="row justify-content-start">
                    <div className="col-lg-8 text-center text-lg-start">
                        {/* <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5" style="border-color: rgba(256, 256, 256, .3) !important;">Welcome To Medinova</h5> */}
                        <h1 className="display-1 text-white mb-md-4">Best Healthcare Solution In Your City</h1>
                        <div className="pt-2">
                        <div><Link to="/health-practitioner" className='btn btn-light rounded-pill py-md-3 px-md-5 mx-2'>Find Doctor</Link></div>
                        <div><Link to="/registration" className='btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2'>Get Started</Link></div>

                            {/* <a href="" className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Find Doctor</a>
                            <a href="" className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Get Started</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero