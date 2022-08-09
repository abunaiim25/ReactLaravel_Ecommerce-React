import React from 'react'
import NavBar from '../../../layouts/frontend/NavBar';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const ForgetPassword = () => {

  document.title = "Forget Password";
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
/*
    //after submit input field emtey
    setInput({
     email: '',
  });
*/
    const data = {
      email: Input.email,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/forget-password`, data).then(res => {
       
          swal("Success", "Reset Password Mail on Your Email!", "success");
      })
     .catch(() => {
      swal("Error", "Did Not Forget Password!!", "error");
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
                  Forget Password
                </div>
                <div className="card-body">

                  <form onSubmit={formSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="">Email: </label>
                      <input type="email" name='email' onChange={handleInput}  value={Input.email}className='form-control' required />
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

export default ForgetPassword
