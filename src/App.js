import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'
import routes from './routes'

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

function App() {
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

export default App;
