import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


const NavBar = () => {

    //Logout here
    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault(); //for browser not reload

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                history.push('/');
            }
        })

    }


    {/** login register logout */ }
    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        )
    }
    else {
        AuthButtons = (
            <li className="nav-item">
                <button type='button' onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white" >Logout</button>
            </li>
        )
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#">Navbar</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="#">Collection</Link>
                            </li>

                            {/** login register logout */}
                            {AuthButtons}


                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
