import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/frontend/Home';
import MasterLayout from './layouts/admin/MasterLayout';
import Register from './components/frontend/auth/Register/Register';
import Login from './components/frontend/auth/Login/Login';
import axios  from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';


//===================== (Laravel API)===============================
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
//logout
axios.interceptors.request.use(function(config)
{
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

          <Route exact path={"/"} component={Home} />

          <Route  path={"/403"} component={Page403} />
          <Route  path={"/404"} component={Page404} />

          {/** 
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          */}
          <Route path={"/login"}> {/** when logged in, we can not see login page */}
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route path={"/register"}> {/** when logged in, we can not see register page */}
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
          </Route>

          {/** <Route path='/admin' name="Admin" render={(props) => <MasterLayout {...props} />} />*/}
          <AdminPrivateRoute path='/admin' name="Admin"/> {/** user did not go in admin panel (proctected)*/}

        </Switch>
      </Router>
    </div>
  );
}

export default App;


