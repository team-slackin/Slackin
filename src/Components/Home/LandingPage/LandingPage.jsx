import React from 'react';
import { Link, Switch } from 'react-router-dom'

function LandingPage() {
  return (
    <div>{/* Where you go When you start up the application/afterlogging in */}
      <h1>LandingPage</h1>
      <Link to='/account'>Go to Account Settings</Link>
    </div>
  );
};

export default LandingPage;