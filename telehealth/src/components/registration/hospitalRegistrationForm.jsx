import React from 'react'
import { useForm } from 'react-hook-form';
import api from '../../utility/api';
import jwtDecode from 'jwt-decode';

function HospitalRegistrationForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {

    const { hospitalName, location, email, password } = data

    api.post(`/api/auth/register/hospital`, {
      hospitalName,
      location,
      password,
      email
    })
      .then((res) => {
        console.log(res)

      })
      .catch((err) => {

        window.alert((err?.response?.data.error) ? err?.response?.data.error : err?.response?.data.Message)


      });

  }
  console.log(errors)
  return (
    <div className="mainFormContainer">
      <div className="col-lg-4">
        <div className="bg-light text-center rounded p-5">
          <h2 className="mb-3">Create account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-12 col-sm-12">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter Hospital name" style={{ height: 55 }} {...register("hospitalName", { required: true, maxLength: 30, minLength: 3 })} />
              </div>

              <div className="col-12 col-sm-12">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter hospital's location" style={{ height: 55 }} {...register("location", { required: true, maxLength: 30, minLength: 3 })} />
              </div>

              <div className="col-12 col-sm-12">
                <input type="email" className="form-control bg-white border-0" placeholder="Enter hospital's email" style={{ height: 55 }} {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
              </div>

              <div className="col-12 col-sm-12">
                <input type="password" className="form-control bg-white border-0" placeholder="Enter Password" style={{ height: 55 }} {...register("password", { required: true, maxLength: 30, minLength: 8 })} />
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

export default HospitalRegistrationForm