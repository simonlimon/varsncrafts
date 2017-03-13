import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Craft from './components/Craft';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

const routes = (
  <Router history={hashHistory}>
    <Route path={'/'} component={NavBar}>
      <IndexRoute component={Home}/>
      <Route path={"craft/:title"} component={Craft}/>
    </Route>
  </Router>
);

export default routes;