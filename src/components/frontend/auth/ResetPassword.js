import React from 'react'
import NavBar from '../../../layouts/frontend/NavBar';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const ResetPassword = () => {

  document.title = "Reset Password";
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [Input, setInput] = useState({
    email: '',
    message: '',
  });

  const handleInput = (e) => {
    e.persist();
    setInput({ ...Input, [e.target.name]: e.target.value });
}

  
  const formSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: Input.email,
      token: Input.token,
      password: Input.password,
      password_confirmation: Input.password_confirmation,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/reset-password`, data).then(res => {
       
        swal("Successfull", res.data.message, "success");
        history.push('/login');
      })
      .catch(() => {
       swal("Error", "Something is Problem Here!!", "error");
        });
    });
  }




  return (
    <>
      <div>
        <NavBar />

        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Reset Password
                </div>
                <div className="card-body">

                  <form onSubmit={formSubmit}>
                  <div className="form-group mb-3">
                      <label htmlFor="">Token <small className='text-success'>(Checked on your email)</small>: </label>
                      <input type="text" name='token' onChange={handleInput}  value={Input.token}className='form-control' required />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="">Email Address: </label>
                      <input type="email" name='email' onChange={handleInput}  value={Input.email}className='form-control'  required/>
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="">New Password: </label>
                      <input type="password" name='password' onChange={handleInput}  value={Input.password}className='form-control' required />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="">Confirm Password: </label>
                      <input type="password" name='password_confirmation' onChange={handleInput}  value={Input.password_confirmation}className='form-control'  required/>
                    </div>

                    <button type='submit' className='btn btn-primary'>Submit</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
