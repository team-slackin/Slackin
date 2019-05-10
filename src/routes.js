import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import Account from './Components/Home/Account/Account'
import NotFound from './Components/NotFound/NotFound'


export default ( <>
  <Route exact path='/' component={Login} />
  <Route path='/register' component={Register} />
  <Route path='/account' component={Account} />
  <Route component={NotFound} />
</>
)