import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'assets/css/material-dashboard-react.css?v=1.2.0';

import indexRoutes from 'routes/index.jsx';
import store from 'store.js';
import { history } from 'utils';

export default store

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
