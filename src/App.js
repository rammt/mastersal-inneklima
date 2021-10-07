import React from 'react';
import {Route, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import ROUTES from './routes';
import Dashboard from './views/dashboard';

const history = createBrowserHistory();

function App() {
  return (
    <div>
        <Router history={history}>
            <Route path={ROUTES.DASHBOARD} component={Dashboard}/>
        </Router>
    </div>
  );
}

export default App;
