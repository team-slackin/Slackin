import React, {useState} from 'react';
import {connect} from 'react-redux';
import {login} from '../../Ducks/userReducer';
import {Link} from 'react-router-dom';

function Login(props) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  function userInfoHandle(e) {
    const {name, value} = e.target;
    console.log(userInfo[name])
    setUserInfo({
      ...userInfo,
      [name]: value
  });
};

  function handleLogin(e) {
    e.preventDefault();
    props.login(userInfo);
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input name="email" placeholder="email" onChange={(e)=>{userInfoHandle(e)}} />
        <input name="password" palceholder="password" onChange={(e)=>{userInfoHandle(e)}} />
        <button onClick={(e)=> handleLogin(e)}>Login</button>
      </form>
      <Link to="/register">Don't have an account? Click here to register.</Link>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState.userReducer;

export default connect(mapStateToProps, {login}) (Login);
