import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './components/frontend/auth/Register/Register';
import Login from './components/frontend/auth/Login/Login';
import axios from 'axios';
import AdminPrivateRoute from './routes_items/AdminPrivateRoute';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';
import FrontendPublicRoute from './routes_items/FrontendPublicRoute';
import Home from './components/frontend/Home';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'//loading
import ForgetPassword from './components/frontend/auth/ForgetPassword';
import ResetPassword from './components/frontend/auth/ResetPassword';


//===================== (Laravel API)===============================
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
//logout
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
//===================== (Laravel API)===============================


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          {/** Auth */}
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/forget-password"} component={ForgetPassword} />
          <Route exact path={"/reset-password/:id"} component={ResetPassword} />
         
         {/** Error */}
          <Route path={"/403"} component={Page403} />
          <Route path={"/404"} component={Page404} />

          {/** Admin Panel */}
          <AdminPrivateRoute path='/admin' name="Admin" />  {/** 1 */}

          {/** Frontend */}
          <FrontendPublicRoute path='/' name="Home" /> {/** 1 */}

        </Switch>
      </Router>
    </div>
  );
}

export default App;




/*
<Route path={"/login"}>  //when logged in, we can not see login page 
{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
</Route>
<Route path={"/register"}>  //when logged in, we can not see register page 
{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
</Route>
*/

/** <Route path='/admin' name="Admin" render={(props) => <MasterLayout {...props} />} />*/

/** 
          <Route exact path={"/"} component={Home} />
          <Route path={"/about"} component={About} />
          <Route path={"/contact"} component={Contact} />
*/


/*
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Router>
        <Switch>

          
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
         
          <Route path={"/403"} component={Page403} />
          <Route path={"/404"} component={Page404} />

         
          <AdminPrivateRoute path='/admin' name="Admin" />  

          
          <FrontendPublicRoute path='/' name="Home" /> 

        </Switch>
      </Router>
      </SkeletonTheme>
      */