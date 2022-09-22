import React from 'react';
import { Link } from 'react-router-dom';

function MainTopHeader() {
    return (
        <div className="container-fluid sticky-top bg-white shadow-sm">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                <Link to="/" className='navbar-brand'>
                   <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-clinic-medical me-2"></i>TOAS</h1>
                </Link>
                   
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <Link to="/" className='nav-item nav-link' active>Home</Link>
                            <Link to="/about" className='nav-item nav-link'>About</Link>
                            <Link to="/contact" className='nav-item nav-link'>Contact</Link>
                            <Link to="/registration" className='nav-item nav-link'>Register</Link>
                            <Link to="/login" className='nav-item nav-link'>Login</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default MainTopHeader