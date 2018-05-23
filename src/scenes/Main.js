// src/js/scenes/components/Main.js

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home  from './scenes/Home/index';
import Admin from './scenes/Admin/index';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/admin' component={Admin} />
    </Switch>
  </main>
);

export default Main;
