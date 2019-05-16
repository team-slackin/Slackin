import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <HashRouter>
      <div className="App">
      <header><span>Slackin</span></header>
        <div className="main-content-flex-box">
        {routes}
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
