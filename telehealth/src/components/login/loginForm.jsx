import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import api from '../../utility/api';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { logginUser } from '../../redux/features/auth/loginSlice';
import { loginMode } from '../../redux/features/auth/isLoggedSlice';



function LoginForm() {

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data
    api.post(`/api/auth/login`, {
      email,
      password,
    })
      .then((res) => {

        const token = res.data.token;
        const decoded = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('loggedUser', JSON.stringify(decoded))

        dispatch(logginUser(decoded));
        dispatch(loginMode());
      })
      .catch((err) => {
        toast.error((err?.response?.data.error) ? err?.response?.data.error : err?.response?.data.Message, {
          position:'bottom-right',
          autoClose: 5000,
        })
        // window.alert((err?.response?.data.error) ? err?.response?.data.error : err?.response?.data.Message)
        

      });

  };

  return (
    <div className="mainFormContainer">
      <div className="col-lg-4">
        <div className="bg-light text-center rounded p-5">
          <h2 className="mb-3">Welcome Back</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-12 col-sm-12">
                <input type="email" className="form-control bg-white border-0" placeholder="Enter Your Email" style={{ height: 55 }} {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email?<p style={{color:'red'}}>{errors.email?.message}</p>: null}
              </div>
              <div className="col-12 col-sm-12">
                <input type="password" className="form-control bg-white border-0" placeholder="Enter Your Password" style={{ height: 55 }} {...register("password", { required: true, maxLength: 20 })} />
                {errors.password?<p style={{color:'red'}}>{errors.password?.message}</p>: null}
              </div>

              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">Log in</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm