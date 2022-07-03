import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import "./Login.css";
import NavBar from '../../../../layouts/frontend/NavBar';

const Login = () => {

  const history = useHistory();

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });


  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  }


  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }

    // post using laravel api
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/login`, data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          if (res.data.role === 'admin') {
            history.push('/admin/dashboard');// 
          }
          else {
            history.push('/');// login to home page
          }
        }
        else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        }
        else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  }

  return (
    <>
      <NavBar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Login
              </div>
              <div className="card-body">

                <form onSubmit={loginSubmit}>

                  <div className="form-group mb-3">
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' onChange={handleInput} value={loginInput.email} className='form-control' />
                    <span>{loginInput.error_list.email}</span>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="">Password</label>
                    <input type="password" name='password' onChange={handleInput} value={loginInput.password} className='form-control' />
                    <span>{loginInput.error_list.password}</span>
                  </div>

                  <button type='submit' className='btn btn-primary'>Login</button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
