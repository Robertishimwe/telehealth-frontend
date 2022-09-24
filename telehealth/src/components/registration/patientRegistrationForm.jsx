import React from 'react'
import { useForm } from 'react-hook-form';
import api from '../../utility/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PatientRegistration() {

  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {

    let { firstName, lastName, dob, location, email, password } = data

    let newDOB = dob.split('-')
    dob = `${newDOB[2]}/${newDOB[1]}/${newDOB[0]}`
    console.log(dob)

    api.post(`/api/auth/register/patient`, {
      dob,
      lastName,
      firstName,
      location,
      password,
      email
    })
      .then((res) => {
        toast.success("account created successful. you are going to be redirected to login page", {
          position:'bottom-right',
          autoClose: 5000,
        })
        setTimeout(()=>{
          navigate('/login')

        },4000)
        
      })
      .catch((err) => {

        toast.error((err?.response?.data.error) ? err?.response?.data.error : err?.response?.data.Message, {
          position:'bottom-right',
          autoClose: 5000,
        })

        // window.alert((err?.response?.data.error) ? err?.response?.data.error : err?.response?.data.Message)


      });
  }



  return (
    <div className="mainFormContainer">
      <div className="col-lg-6">
        <div className="bg-light text-center rounded p-5">
          <h2 className="mb-3">Create account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter your first name" style={{ height: 55 }} {...register("firstName", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter your last name" style={{ height: 55 }}  {...register("lastName", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="email" className="form-control bg-white border-0" placeholder="Enter your email" style={{ height: 55 }}  {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter your location" style={{ height: 55 }}  {...register("location", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="date" className="form-control bg-white border-0" placeholder="Enter you date of birth" style={{ height: 55 }} {...register("dob", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="password" className="form-control bg-white border-0" placeholder="Enter Your Password" style={{ height: 55 }} {...register("password", { required: true, maxLength: 30, minLength: 8 })} />
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