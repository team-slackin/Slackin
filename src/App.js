import React, { useState, useEffect } from "react"
import "./App.css"
import { HashRouter, Link } from "react-router-dom"
import routes from "./routes"
import { connect } from "react-redux"
import { updateIsUserLoggedIn } from "./Ducks/userReducer"

import NewChannel from './Components/NewChannel/NewChannel';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
// import { orange } from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#e96745"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
    // secondary: {
    //   light: "#0066ff",
    //   main: "#0044ff",
    //   // dark: will be calculated from palette.secondary.main,
    //   contrastText: "#ffcc00"
    // }
    // // error: will use the default color
  }
})

function App(props) {

  const positionHeaderWhenLoggedIn = () =>{
    if (props.userReducer.loggedIn) {
      return (
        <header className="App-header">
        <span>
          <Link
            to="/container"
            style={{
              color: "white",
              marginLeft: "20px",
              textDecorationLine: "none"
            }}
          >
            Slackin
          </Link>
        </span>
      </header>
      );
    } else {
      return (
        <header className="App-header" style={{position: 'absolute', zIndex: 2}}>
        <span>
          <Link
            to="/container"
            style={{
              color: "white",
              marginLeft: "20px",
              textDecorationLine: "none"
            }}
          >
            Slackin
          </Link>
        </span>
      </header>
      );
    };
  };


  return (
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <div className="App">
        {positionHeaderWhenLoggedIn()}
          <div className="main-content-flex-box">{routes}</div>
          <NewChannel />
        </div>
      </HashRouter>
    </MuiThemeProvider>
  )
}

const mapStateToProps = reduxState => ({
  userReducer: reduxState.userReducer,
  channelReducer: reduxState.channelReducer
})

export default connect(
  mapStateToProps,
  { updateIsUserLoggedIn }
)(App)
