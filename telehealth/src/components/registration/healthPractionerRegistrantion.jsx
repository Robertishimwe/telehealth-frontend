import React from 'react'
import { useForm } from 'react-hook-form';
import api from '../../utility/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function HealthPractitionerRegistration() {

  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    let { firstName, lastName, dob,bio, location,specialization, email,profilePicture, password } = data

    let newDOB = dob.split('-')
    dob = `${newDOB[2]}/${newDOB[1]}/${newDOB[0]}`
    console.log(errors)
    console.log(data)

    api.post(`/api/auth/register/healthPractional`, {
      dob,
      bio,
      lastName,
      firstName,
      location,
      password,
      email,
      profilePicture,
      specialization
    })
      .then((res) => {

        console.log(res.data)
        toast.success("user register successful. you are going to be redirected to login page", {
          position:'bottom-right',
          autoClose: 5000,
        })
        setTimeout(()=>{
          navigate('/dashboard/app')

        },4000)
        
      })
      .catch((err) => {
        console.log(err)

        toast.error((err?.response?.data?.error) ? err?.response?.data?.error : err?.response?.data?.Message, {
          position:'bottom-right',
          autoClose: 5000,
        })

        // window.alert((err?.response?.data.error) ? err?.response?.data.error : err?.response?.data.Message)


      });
  }
  console.log(errors)


  return (
    <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
      <div className="col-lg-12">
        <div className="bg-light text-center rounded p-5"> {/**big white backgound */}
          <h2 className="mb-3">Add Employee</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-6 col-sm-6">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter your first name" style={{ height: 45 }} {...register("firstName", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter your last name" style={{ height: 45 }}  {...register("lastName", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="email" className="form-control bg-white border-0" placeholder="Enter your email" style={{ height: 45 }}  {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter your location" style={{ height: 45 }}  {...register("location", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="date" className="form-control bg-white border-0" placeholder="Enter you date of birth" style={{ height: 45 }} {...register("dob", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="url" className="form-control bg-white border-0" placeholder="Enter link to his/her picture" style={{ height: 45 }} {...register("profilePicture", { required: true, maxLength: 3000, minLength: 1 })} />
                {errors.profilePicture && <p role="alert" style={{color:'tomato'}}>provide valid link</p>}
              </div>
              <div className="col-12">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter his/her biograph" style={{ height: 55 }} {...register("bio", { required: true, maxLength: 90, minLength: 30 })} />
                {errors.bio && <p role="alert" style={{color:'tomato'}}>Biograph  must have atleast 30 charactors and maximum of 90</p>}
              </div>
              <div className="col-12 col-sm-6">
                <input type="text" className="form-control bg-white border-0" placeholder="Enter his/her specialization" style={{ height: 45 }} {...register("specialization", { required: true, maxLength: 30, minLength: 3 })} />
              </div>
              <div className="col-12 col-sm-6">
                <input type="password" className="form-control bg-white border-0" placeholder="Enter his/her Password" style={{ height: 45 }} {...register("password", { required: true, maxLength: 30, minLength: 8 })} />
                {errors.password && <p role="alert" style={{color:'tomato'}}>password must be at least 8 characters including a lowercase letter, an uppercase letter,special character, and a number</p>}
              
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HealthPractitionerRegistration