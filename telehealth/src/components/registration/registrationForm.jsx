import React from 'react'
import { Link } from 'react-router-dom';

function registrationForm() {
  return (
    <div className="mainFormContainer">
      <Link to="/registration/patient" className='btn btn-dark rounded-pill py-3 px-5 me-3 outline-dark '>Patient</Link>
      <Link to="/registration/hospital" className='btn btn-outline-dark rounded-pill py-3 px-5 me-3'>Hospital</Link>
    </div>
  )
}

export default registrationForm