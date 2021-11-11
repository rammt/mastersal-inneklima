import React, { useState, useContext } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Redirect,
    Switch,
} from 'react-router-dom';
import ROUTES from './routes';

// Views
import Dashboard from './views/dashboard/dashboard';
import Login from './views/login/login';
import VippsRedirect from './views/login/vippsRedirect';

// Contexts
import { UserContext } from './contexts/UserContext';

// Environment variables from .env
require('dotenv').config();

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                user.loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.LOGIN,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div>
                <Router>
                    <Switch>
                        <Route exact path={ROUTES.LOGIN} component={Login} />
                        <Route
                            exact
                            path={ROUTES.VIPPS_REDIRECT}
                            component={VippsRedirect}
                        />
                        <PrivateRoute
                            exact
                            path={ROUTES.DASHBOARD}
                            component={Dashboard}
                        />
                    </Switch>
                </Router>
            </div>
        </UserContext.Provider>
    );
};

export default App;
