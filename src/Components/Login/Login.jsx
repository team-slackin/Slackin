import React, { useState } from "react"
import { connect } from "react-redux"
import { login } from "../../Ducks/userReducer"
import { Link } from "react-router-dom"
import LoginForm from './LoginForm';
import './LoginRegister.scss';

function Login(props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })

  const userInfoHandle = (e) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    await props.login(userInfo)
  }

  if(props.loggedIn) {
    props.history.push("/container")
  } else {}

  return (
    <div className="login-register">
        <LoginForm userInfoHandle={userInfoHandle} handleSubmit={handleLogin} />
          <Link to="/register">Don't have an account, click here to register.</Link>
    </div>
  )
}


const mapStateToProps = reduxState => reduxState.userReducer

export default connect(
  mapStateToProps,
  { login }
)(Login)
