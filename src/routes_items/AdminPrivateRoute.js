/** 2 */
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import AdminLayout from '../layouts/admin/AdminLayout'


function AdminPrivateRoute({ ...rest }) {

    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [Loading, setLoading] = useState(true);//Loading 3

    //after login you can enter in admin panel
    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false);//Loading 3
        });
        return () => {
            setAuthenticated(false);
        };
    }, []);
    
    //without login, if anyone want to go admin panel, they see blank page or 401 error. for that we write this code.
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal("No one can enter without admin ", err.response.data.message, "warning");
            history.push('/');
        }
        return Promise.reject(err);
    });

    //when user go to admin page, then redirect these page
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403) //Access Denied
        {
            swal("Forbidden", error.response.data.message, "warning");
            history.push('/403');
        }
        else if (error.response.status === 404) //Page Not Found
        {
            swal("404 Error", "Url/Page Not Found", "warning");
            history.push('/404');
        }
        return Promise.reject(error);
    }

    );


    if (Loading)//Loading 3
    {
        return <div className=''>
          <h4>Loading...</h4>  
        </div>
    }


    return (

        <Route {...rest}
            render={({ props, location }) =>
                Authenticated ?
                    (<AdminLayout {...props} />) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)//when user want to go admin page, then login page came here
            }
        />
    )
}

export default AdminPrivateRoute
