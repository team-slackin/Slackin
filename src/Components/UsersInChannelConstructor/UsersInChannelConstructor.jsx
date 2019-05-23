import React, { useState, useEffect } from "react"

import "./UsersInChannelConstructor.scss"

function UsersInChannelConstructor(props) {
  const [currentUserStatusColor, setCurrentUserStatusColor] = useState(
    "#43b581"
  )

  const { user_image, user_display_name, user_status } = props.user
  useEffect(() => {
    switch (user_status) {
      case "online": {
        setCurrentUserStatusColor("#43b581")
        break
      }
      case "idle": {
        setCurrentUserStatusColor("#faa61a")
        break
      }
      case "do not disturb": {
        setCurrentUserStatusColor("#f04747")
        break
      }
      default: {
        setCurrentUserStatusColor("#747f8d")
        break
      }
    }
  }, [])

  return (
    <div className="users-in-channel">
      <img
        src={user_image}
        alt="pic of each user"
        className="users-in-channel-image"
      />
      <div
        className="users-in-channel-status"
        style={{ backgroundColor: currentUserStatusColor }}
      />
      <h4
        style={{
          marginLeft: "5px",
          color: "white"
        }}
      >
        {user_display_name}
      </h4>
    </div>
  )
}

export default UsersInChannelConstructor
