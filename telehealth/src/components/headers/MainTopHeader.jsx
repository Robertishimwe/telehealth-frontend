import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { thisUser } from '../../redux/features/auth/loginSlice';

import '../../css/bootstrap.min.css'
import '../../css/style.css'


function MainTopHeader() {

  const authenticated = useSelector(thisUser);

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
              <div><Link to="/" className='nav-item nav-link'>Home</Link></div>
              <div><Link to="/health-practitioner" className='nav-item nav-link'>Doctors/nurses</Link></div>
              {authenticated.user ? <Link to="/dashboard/app" className='nav-item nav-link'>Account</Link> :
                <>
                  <Link to="/registration" className='nav-item nav-link'>Register</Link>
                  <Link to="/login" className='nav-item nav-link'>Login</Link>
                </>
              }
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MainTopHeader