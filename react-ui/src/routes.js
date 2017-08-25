import React from 'react';
import NavTransition from './components/NavTransition.react';
import Home from './components/Home.react';
import P5Craft from './components/craft_containers/P5Craft.react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

const routes = (
  <Router history={hashHistory}>
    <Route path={'/'} component={NavTransition}>
      <IndexRoute component={Home}/>
      <Route path={"crafts/p5/:title"} component={P5Craft}/>
    </Route>
  </Router>
);

export default routes;