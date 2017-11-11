import React from 'react';
import NavTransition from './components/NavTransition.react';
import Home from './components/Home.react';
import CraftRoot from './components/CraftRoot.react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

const routes = (
  <Router history={hashHistory}>
    <Route path={'/'} component={NavTransition}>
      <IndexRoute component={Home} />
      <Route path={'crafts/:type/:title'} component={CraftRoot} />
    </Route>
  </Router>
);

export default routes;
