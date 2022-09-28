import { Email } from '@material-ui/icons';
import React from 'react'
import { Link } from 'react-router-dom';

function DoctorsCard({DoctorName,Specialization,id,workPlace,email,bio,img}) {
  return (
    <>
      <div className="team-item" style={{width:'46%', marginBottom:10, marginTop:20}}>
        <div className="row g-0 bg-light rounded overflow-hidden">
          <div className="col-12 col-sm-5 h-100">
            <img className="img-fluid h-100" src={"img/team-2.jpg"} style={{ objectFit: 'cover' }} />
          </div>
          <div className="col-12 col-sm-7 h-100 d-flex flex-column">
            <div className="mt-auto p-4">
              <h3>{DoctorName}</h3>
              <h6 className="fw-normal fst-italic text-primary mb-4">{Specialization} - {workPlace}</h6>
              <p className="m-0">Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor</p>
              <p>Contact: <i>{email.email}</i></p>
            </div>
            <div className="d-flex mt-auto border-top p-3" style={{display: 'flex', justifyContent:'center'}}>
            <Link to={`/appointment/${id}`} className='btn btn-primary rounded-pill py-3 px-5 my-2'>Book appointment</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorsCard