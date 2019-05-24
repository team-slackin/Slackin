import React, { useEffect, useState } from "react"
import "./AddingUsersToChannelConstructor.scss"

function AddingUsersToChannelConstructor(props) {
  const { user_display_name, user_image, user_status, user_id } = props.user

  const [currentUserStatusColor, setCurrentUserStatusColor] = useState(
    "#689f38"
  )

  useEffect(() => {
    switch (user_status) {
      case "online": {
        setCurrentUserStatusColor("#689f38")
        break
      }
      case "idle": {
        setCurrentUserStatusColor("yellow")
        break
      }
      case "do not disturb": {
        setCurrentUserStatusColor("red")
        break
      }
      case "offline": {
        setCurrentUserStatusColor("gray")
        break
      }
      default: {
        setCurrentUserStatusColor("gray")
        break
      }
    }
  }, [])

  return (
    <div
      onClick={() => {
        props.handleAddUser(user_id, props.currentChannel)
      }}
      style={{ cursor: "pointer" }}
    >
      <img
        className="friends-list-image"
        src={user_image}
        alt={user_display_name}
      />
      <span className="each-user-display-name">{`${user_display_name}`}</span>
      <div className="friend-status">
        <div style={{ backgroundColor: `${currentUserStatusColor}` }} />
      </div>
    </div>
  )
}

export default AddingUsersToChannelConstructor
