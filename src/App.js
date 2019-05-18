import React from 'react';
import './App.css';
import {HashRouter, Link} from 'react-router-dom'
import routes from './routes'

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

console.log(lightGreen)

function App() {
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

export default App;
