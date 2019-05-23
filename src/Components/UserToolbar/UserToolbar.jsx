import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { grabChannels } from "./../../Ducks/channelReducer"
import { setUserStatus } from "./../../Ducks/userReducer"
import { Link } from "react-router-dom"
import Icon from "@material-ui/core/Icon"
import "./UserToolbar.scss"

function UserToolbar(props) {
  const [editStatusFlag, setEditStatusFlag] = useState("none")
  const [fade, setFade] = useState("fadeIn")
  const [visable, setVisable] = useState("hidden")

  const [currentUserStatusColor, setCurrentUserStatusColor] = useState(
    "#43b581"
  )

  let toggleStatusEdit = () => {
    if (editStatusFlag === "none") {
      setEditStatusFlag("flex")
      setFade("fadeIn")
      setVisable("unset")
    } else {
      setFade("fadeOut")
      setEditStatusFlag("none")
      setVisable("hidden")
    }
  }

  useEffect(() => {
    setVisable("hidden")
    setEditStatusFlag("none")
    setFade("none")
  }, [])

  return (
    <aside className="user-tool-bar">
      <div
        className="edit-status-container"
        style={{
          visibility: visable,
          display: setEditStatusFlag,
          animationName: fade
        }}
      >
        <div
          className="status"
          onClick={() => {
            props.setUserStatus("Online")
            setCurrentUserStatusColor("#43b581")
            toggleStatusEdit()
          }}
          style={{
            animationName: fade,
            animationDuration: "1s",
            borderBottom: "1px solid hsla(0,0%,96.1%,.08)"
          }}
        >
          <div
            className="color"
            style={{
              backgroundColor: "#43b581",
              marginRight: "14px",
              width: "10px",
              height: "10px",
              borderRadius: "50%"
            }}
          />
          <span className="statusMessage">Online</span>
        </div>

        <div
          className="status"
          onClick={() => {
            props.setUserStatus("Idle")
            setCurrentUserStatusColor("#faa61a")
            toggleStatusEdit()
          }}
          style={{
            animationName: fade,
            animationDuration: "1s"
          }}
        >
          <div
            className="color"
            style={{
              backgroundColor: "#faa61a",
              marginRight: "14px",
              width: "10px",
              height: "10px",
              borderRadius: "50%"
            }}
          />
          <span className="statusMessage">Idle</span>
        </div>

        <div
          className="status"
          onClick={() => {
            props.setUserStatus("Do Not Disturb")
            setCurrentUserStatusColor("#f04747")
            toggleStatusEdit()
          }}
          style={{
            animationName: fade,
            animationDuration: "1s"
          }}
        >
          <div
            className="color"
            style={{
              backgroundColor: "#f04747",
              marginRight: "14px",
              width: "10px",
              height: "10px",
              borderRadius: "50%"
            }}
          />
          <span className="statusMessage">Do Not Disturb</span>
          <span className="message">
            You will not receive any desktop notifications.
          </span>
        </div>

        <div
          className="status"
          onClick={() => {
            props.setUserStatus("Invisible")
            setCurrentUserStatusColor("#747f8d")
            toggleStatusEdit()
          }}
          style={{
            animationName: fade,
            animationDuration: "1s"
          }}
        >
          <div
            className="color"
            style={{
              backgroundColor: "#747f8d",
              marginRight: "14px",
              width: "10px",
              height: "10px",
              borderRadius: "50%"
            }}
          />
          <span className="statusMessage">Invisible</span>
          <span className="message">
            You will not appear online, but will have full access to all of
            Discord.
          </span>
        </div>
      </div>

      <div className="user-tool-bar-information">
        <div className="image-container">
          <img
            src={props.userReducer.user.user_image}
            className="user-tool-bar-image"
            onClick={() => {
              toggleStatusEdit()
            }}
            alt=""
          />
        </div>

        <div className="user-tool-bar-username">
          {props.userReducer.user.user_display_name}
        </div>
        <div
          className="user-tool-bar-status"
          style={{ backgroundColor: `${currentUserStatusColor}` }}
        />

        <div className="user-tool-bar-cog">
          <Link to="/container/account">
            <Icon
              style={{
                fontSize: "2em",
                color: "var(--main-color)",
                textShadow: "var(--text-icon-shadow)"
              }}
            >
              settings
            </Icon>
          </Link>
        </div>
      </div>
    </aside>
  )
}

const mapStateToProps = reduxState => {
  return {
    channelReducer: reduxState.channelReducer,
    userReducer: reduxState.userReducer
  }
}

export default connect(
  mapStateToProps,
  { grabChannels, setUserStatus }
)(UserToolbar)
