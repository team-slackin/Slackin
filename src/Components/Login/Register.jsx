import React, { useState } from "react"
import { connect } from "react-redux"
import { register } from "../../Ducks/userReducer"
import { Link } from "react-router-dom"

import RegisterForm from './RegisterForm';
import './LoginRegister.scss';

function Register(props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirm_password: "",
    user_display_name: "",
    last_name: "",
    first_name: ""
  })

  function userInfoHandle(e) {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  async function handleRegister(e) {
    e.preventDefault()
    const {
      email,
      password,
      confirm_password,
      user_display_name,
      last_name,
      first_name
    } = userInfo
    if (password === confirm_password) {
      await props.register({
        email,
        password,
        user_display_name,
        last_name,
        first_name
      })
      props.history.push("/account")
    } else {
      alert("passwords not matching")
    }
  }

  return (
    <div className="login-register">
      <RegisterForm userInfoHandle={userInfoHandle} handleSubmit={handleRegister} />
      <Link to="/">Already have an account? Click here to sign in.</Link>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState.userReducer

export default connect(
  mapStateToProps,
  { register }
)(Register)
