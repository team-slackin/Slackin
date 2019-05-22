import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import Account from './Components/Home/Account/Account'
import LandingPage from './Components/Home/Container/Container'


export default ( 
<>
  <Route exact path='/' component={Login} />
  <Route path='/register' component={Register} />
  <Route path='/container/account' component={Account} />
  <Route path='/container' component={LandingPage} />
</>
);