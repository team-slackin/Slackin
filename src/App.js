import React, { useState, useEffect } from 'react';
import './App.css';
import {HashRouter, Link} from 'react-router-dom'
import routes from './routes'
import axios from 'axios';
import { connect } from 'react-redux'
import { updateIsUserLoggedIn } from './Ducks/userReducer'

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import {lightGreen, orange, cyan, lightBlue, amber} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: orange
  },
  typography: {
    useNextVariants: true,
  },
});

function App(props) {

  useEffect(()=>{

    axios.get(`/retrievesession/`).then(res=>{
      if(res.data.user_id){
        props.updateIsUserLoggedIn(res.data);
      }}).catch(err=>console.log(`Something happened while checking for req.session ${err}`));
  }, []);
  
  return (
    <MuiThemeProvider theme={theme}>
    <HashRouter>
      <div className="App">
      <header className="App-header">
        <span>
          <Link to='/container' style={{color: 'white', marginLeft: '20px', textDecorationLine: 'none'}}>Slackin</Link>
          </span>
        </header>
        <div className="main-content-flex-box">
          {routes}
        </div>
      </div>
    </HashRouter>
    </MuiThemeProvider>
  );
};

const mapStateToProps = reduxState => ({
  userReducer: reduxState.userReducer,
  channelReducer: reduxState.channelReducer
})

export default connect(mapStateToProps, { updateIsUserLoggedIn })(App);
