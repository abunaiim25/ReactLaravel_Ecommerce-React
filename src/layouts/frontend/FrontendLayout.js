/** 3 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FrontendRouteList from '../../routes/FrontendRouteList';
import NavBar from './NavBar';


const FrontendLayout = () => {
    return (
        <>
            <div>
                {/**==========NavBar============= */}
                <NavBar />

                <div>
                    <Switch>
                        {FrontendRouteList.map((route, index) => {
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
                     
                    </Switch>

                    
                </div>
            </div>


        </>
    )
}

export default FrontendLayout

