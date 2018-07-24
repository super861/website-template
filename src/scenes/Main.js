// src/js/scenes/components/Main.js

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home  from './scenes/Home/index';
import Admin from './scenes/Admin/index';
import Login from './scenes/Account/Login';
import Account from './scenes/Account/index';
import Register from './scenes/Account/Register';
import Code from './scenes/Code/index';
import Classes from './scenes/Code/Classes';
import Prototype from './scenes/Code/Prototype';
import Scope from './scenes/Code/Scope';
import Promise from './scenes/Code/Promise';
import Blackjack from './scenes/Code/Blackjack';
import ReferenceList from './scenes/Referencelist/index';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />

      <Route path='/admin' component={Admin} />

      <Route exact path='/account' component={Account} />
      <Route path='/account/login' component={Login} />
      <Route path='/account/register' component={Register} />

      <Route exact path='/code' component={Code} />
      <Route exact path='/code/classes' component={Classes} />
      <Route exact path='/code/prototype' component={Prototype} />
      <Route exact path='/code/scope' component={Scope} />
      <Route exact path='/code/promise' component={Promise} />
      <Route exact path='/code/blackjack' component={Blackjack} />

      <Route path ='/referencelist' component={ReferenceList} />

    </Switch>
  </main>
);

export default Main;
