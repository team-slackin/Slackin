import React, { useState, useEffect } from "react"
import { Link} from "react-router-dom"
import { connect } from "react-redux"
import {
  logout,
  login,
  register,
  updateUserInfo
} from "./../../../Ducks/userReducer"
import { removeSelectedChannel } from "../../../Ducks/channelReducer"

import { Input } from "@material-ui/core"
import Icon from "@material-ui/core/Icon"

import Drop from "./../../DropZone/DropZone"

import "./Account.scss"

function Account(props) {
  const [editFlag, setEditFlag] = useState(false)

  const [userInfo, setUserInfo] = useState({
    username: `${props.userReducer.user.user_display_name}`,
    password: "",
    confirmPassword: ""
  })

  useEffect(()=>{
    // just listens to whenever user object in REDUX state changes, such as updating the user's profile image
  }, [props.userReducer.user])

  async function handleLogout() {
    await props.logout()
    await props.removeSelectedChannel()
    props.history.push("/")
  }

  let toggleEdit = () => {
    setEditFlag(!editFlag)
  }

  function userInfoHandle(e) {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  async function handleUpdateUserInfo() {
    if (
      userInfo.password === userInfo.confirmPassword &&
      userInfo.password &&
      userInfo.confirmPassword
    ) {
      await props.updateUserInfo({
        id: props.userReducer.user.user_id,
        username: userInfo.username || props.userReducer.user.user_display_name,
        password: userInfo.password
      })
      alert(`Updated password!`)
      toggleEdit()
    } else {
      alert("Please Leave no field empty")
    }
  }

  return (
    <section className="account">
      {editFlag ? (
        <div className="account-main-1">
          <div className="box-1">
            <h2>My Account</h2>
            <Link to="/container">
              <Icon className="icon">cancel</Icon>
            </Link>
          </div>
          <form className="account-settings">
            <div className="image-name-holder">
              <div className="image-box">
                <img
                  style={{ borderRadius: "50%" }}
                  src={props.userReducer.user.user_image}
                  alt="change avatar"
                  width="100"
                />
                <Drop className="drop" type={"user"} />
              </div>
              <div className="all-inputs">
                <div className="input">
                  <h5>New Username</h5>
                  <div className="input-border">
                    <Input
                      onChange={e => {
                        userInfoHandle(e)
                      }}
                      name="username"
                      placeholder=""
                      fullWidth
                    />
                  </div>
                </div>

                <div className="input">
                  <h5>New Password</h5>
                  <div className="input-border">
                    <Input
                      onChange={e => {
                        userInfoHandle(e)
                      }}
                      name="password"
                      type="password"
                      placeholder=""
                      fullWidth
                    />
                  </div>
                </div>
                <div className="input-1">
                  <h5>Re-Type Password</h5>
                  <div className="input-border">
                    <Input
                      onChange={e => {
                        userInfoHandle(e)
                      }}
                      name="confirmPassword"
                      type="password"
                      placeholder=""
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="account-bottom-bar">
            <div className="cancel">
              <div
                onClick={() => {
                  toggleEdit()
                }}
              >
                Cancel
              </div>
            </div>
            <button
              onClick={() => {
                handleUpdateUserInfo()
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="account-main">
          <div>
            <h2>My Account</h2>
            <Link to="/container">
              <Icon className="icon">cancel</Icon>
            </Link>
          </div>

          <div className="account-settings">
            <div className="image-name-holder">
              <div>
                <img src={props.userReducer.user.user_image} alt="users profile pic" />
                <div-1>
                  <div-2>
                    <h5>Username</h5>
                    <div-4>{props.userReducer.user.user_display_name}</div-4>
                  </div-2>
                  <div-3>
                    <h5>Email</h5>
                    <div-4>{props.userReducer.user.email}</div-4>
                  </div-3>
                </div-1>
              </div>
              <button
                onClick={() => {
                  toggleEdit()
                }}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="account-bottom-bar">
            <button
              onClick={() => {
                handleLogout()
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

const mapStateToProps = reduxState => ({
  channelReducer: reduxState.channelReducer,
  userReducer: reduxState.userReducer
})

export default connect(
  mapStateToProps,
  { logout, login, register, updateUserInfo, removeSelectedChannel }
)(Account)
