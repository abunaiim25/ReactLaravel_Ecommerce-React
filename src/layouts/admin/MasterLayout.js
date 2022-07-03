import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import Footer from './Footer';

import Sidebar from "./Sidebar";
import Routes from "../../routes/Routes"; //Router -> MasterLayout -> App
import NavBar from './NavBar';

const MasterLayout = () => {
    return (
        <>
            <div className='sb-nav-fixed'>

                {/**==========NavBar============= */}
                <NavBar />

                {/**==========SideBar============= */}
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <Sidebar />
                    </div>


                    <div id="layoutSidenav_content">

                        <main >

                            <Switch>
                                {Routes.map((route, index) => {
                                        return (
                                            route.component && (
                                                <Route
                                                    key={index}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    name={route.name}
                                                    render={(props) => (
                                                        <route.component {...props} />
                                                    )}
                                                />
                                            )
                                        )
                                    })}
                                    <Redirect from="/admin" to="/admin/dashboard" />{/** when search /admin, go to  /admin/dashboard*/}
                            </Switch>


                        </main>

                        <Footer />
                    </div>
                </div>

            </div>
        </>
    )
}

export default MasterLayout
