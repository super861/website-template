// src/js/scenes/components/Main.js

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home  from './scenes/Home/index';
import Admin from './scenes/Admin/index';
import Login from './scenes/Account/Login';
import Account from './scenes/Account/index';
import Register from './scenes/Account/Register';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/admin' component={Admin} />
      <Route exact path='/account' component={Account} />
      <Route path='/account/login' component={Login} />
      <Route path='/account/register' component={Register} />
    </Switch>
  </main>
);

export default Main;
