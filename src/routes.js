import React from 'react';
import TitleBar from './components/TitleBar';
import Home from './components/Home';
import Craft from './components/Craft';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

const routes = (
  <Router history={hashHistory}>
      <Route path={'/'} component={Home}/>
      <Route path={"/craft/:title"} component={Craft}/>
  </Router>
);

export default routes;