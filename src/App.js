import React, { useState, useEffect } from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'
import routes from './routes'
import axios from 'axios';
import { connect } from 'react-redux'
import { updateIsUserLoggedIn } from './Ducks/userReducer'

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import {pink, orange, purple} from '@material-ui/core/colors';
import {Input, Button} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: orange
  },
  typography: {
    useNextVariants: true,
  },
});

function App(props) {

  useEffect(()=>{

    axios.get(`/retrievesession/`)
    .then((res)=>{
      if(res.data.user_id){
        props.updateIsUserLoggedIn(res.data)
      }
    })
    .catch(err=>console.log(`Something happened while checking for req.session ${err}`))
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
    <HashRouter>
      <div className="App">
      <header className="App-header"><span style={{color: 'white', marginLeft: '10px'}}>Slackin</span></header>
        <div className="main-content-flex-box">
          {routes}
        </div>
      </div>
    </HashRouter>
    </MuiThemeProvider>
  );
}

const mapStateToProps = reduxState => ({
  userReducer: reduxState.userReducer,
  channelReducer: reduxState.channelReducer
})

export default connect(mapStateToProps, { updateIsUserLoggedIn })(App);
