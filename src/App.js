import React from 'react';
import {Route, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import ROUTES from './routes';

// Views
import Dashboard from './views/dashboard/dashboard';
import Login from './views/login/login';

const history = createBrowserHistory();

function App() {
  return (
    <div>
        <Router history={history}>
            <Route path={ROUTES.DASHBOARD} component={Dashboard}/>
            <Route path={ROUTES.LOGIN} component={Login}/>
        </Router>
    </div>
  );
}

export default App;
