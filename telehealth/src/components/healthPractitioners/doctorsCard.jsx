import React from 'react'
import { Link } from 'react-router-dom';

function DoctorsCard() {
  return (
    <>
      <div className="team-item" style={{width:'46%', marginBottom:10, marginTop:20}}>
        <div className="row g-0 bg-light rounded overflow-hidden">
          <div className="col-12 col-sm-5 h-100">
            <img className="img-fluid h-100" src={"img/team-2.jpg"} style={{ objectFit: 'cover' }} />
          </div>
          <div className="col-12 col-sm-7 h-100 d-flex flex-column">
            <div className="mt-auto p-4">
              <h3>Doctor Name</h3>
              <h6 className="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
              <p className="m-0">Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor</p>
            </div>
            <div className="d-flex mt-auto border-top p-3" style={{display: 'flex', justifyContent:'center'}}>
            <Link to="/registration/patient" className='btn btn-primary rounded-pill py-3 px-5 my-2'>Patient</Link>
              {/* <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-lg btn-primary btn-lg-square rounded-circle" href="#"><i className="fab fa-linkedin-in"></i></a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorsCard