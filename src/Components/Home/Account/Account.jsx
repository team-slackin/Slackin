import React from 'react';
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux';
import { logout, login, register } from './../../../Ducks/userReducer'

function Account(props) {

  async function handleLogout(){
    await props.logout();
    props.history.push('/')
    alert('Logout successful')
  }


  return (
    <div>{/* Displays User Info */}
      <h1>Account</h1>
      <Link to='/landingpage' >Go to LandingPage</Link>
      <button onClick={()=>{handleLogout()}}>Logout</button>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState.userReducer;

export default connect(mapStateToProps, { logout, login, register })(Account);
