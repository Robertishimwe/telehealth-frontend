import React from 'react'

function PatientRegistration() {
  return (
    <div className="mainFormContainer">
    <div className="col-lg-6">
      <div className="bg-light text-center rounded p-5">
        <h2 className="mb-3">Create account</h2>
        <form>
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <input type="text" className="form-control bg-white border-0" placeholder="Enter your first name" style={{ height: 55 }} />
            </div>
            <div className="col-12 col-sm-6">
              <input type="text" className="form-control bg-white border-0" placeholder="Enter your last name" style={{ height: 55 }} />
            </div>
            <div className="col-12 col-sm-6">
              <input type="email" className="form-control bg-white border-0" placeholder="Enter your email" style={{ height: 55 }} />
            </div>
            <div className="col-12 col-sm-6">
              <input type="text" className="form-control bg-white border-0" placeholder="Enter your location" style={{ height: 55 }} />
            </div>
            <div className="col-12 col-sm-6">
              <input type="date" className="form-control bg-white border-0" placeholder="Enter you date of birth" style={{ height: 55 }} />
            </div>
            <div className="col-12 col-sm-6">
              <input type="password" className="form-control bg-white border-0" placeholder="Enter Your Password" style={{ height: 55 }} />
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100 py-3" type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default PatientRegistration