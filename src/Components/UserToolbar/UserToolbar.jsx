import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { grabChannels } from "./../../Ducks/channelReducer"
import { setUserStatus } from "./../../Ducks/userReducer"
import { Link } from "react-router-dom"
import Icon from "@material-ui/core/Icon"
import "./UserToolbar.scss"
import { Button } from "@material-ui/core"

function UserToolbar(props) {
  const [editStatusFlag, setEditStatusFlag] = useState("none")
  const [fade, setFade] = useState("fadeIn")
  const [buttonDisplay, setButtonDisplay] = useState("inline-flex")
  const [visable, setVisable] = useState("hidden")

  const [currentUserStatusColor, setCurrentUserStatusColor] = useState(
    "#689f38"
  )

  let toggleStatusEdit = () => {
    if (editStatusFlag === "none") {
      setEditStatusFlag("flex")
      setFade("fadeIn")
      setButtonDisplay("inline-flex")
      setVisable("unset")
    } else {
      setFade("fadeOut")
      setEditStatusFlag("none")
      setButtonDisplay("none")
      setVisable("hidden")
    }
  }

  useEffect(() => {
    setVisable("hidden")
    setEditStatusFlag("none")
    setFade("none")
    setButtonDisplay("none")
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
        <Button
          onClick={() => {
            props.setUserStatus("online")
            setCurrentUserStatusColor("#689f38")
          }}
          style={{
            display: buttonDisplay,
            animationName: fade,
            animationDuration: "1s"
          }}
        >
          Online
        </Button>

        <Button
          onClick={() => {
            props.setUserStatus("idle")
            setCurrentUserStatusColor("white")
          }}
          style={{
            display: buttonDisplay,
            animationName: fade,
            animationDuration: "1s"
          }}
        >
          Idle
        </Button>

        <Button
          onClick={() => {
            props.setUserStatus("do not disturb")
            setCurrentUserStatusColor("red")
          }}
          style={{
            display: buttonDisplay,
            animationName: fade,
            animationDuration: "1s"
          }}
        >
          Do Not Disturb
        </Button>

        <Button
          onClick={() => {
            props.setUserStatus("invisible")
            setCurrentUserStatusColor("gray")
          }}
          style={{
            display: buttonDisplay,
            animationName: fade,
            animationDuration: "1s"
          }}
        >
          Invisible
        </Button>
      </div>

      <div className="user-tool-bar-information">
        <div className="image-container">
          <img
            src={props.userReducer.user.user_image}
            className="user-tool-bar-image"
            onClick={() => {
              toggleStatusEdit()
            }}
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
