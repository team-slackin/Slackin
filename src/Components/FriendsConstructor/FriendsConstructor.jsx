import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Chatkit from "@pusher/chatkit-client"
import Axios from "axios"

import { makeCurrentFriend, grabFriends } from "../../Ducks/friendReducer"
const FriendsConstructor = props => {
  const { user_status, room_created, user_id, user_display_name } = props.friend
  const [currentUserStatusColor, setCurrentUserStatusColor] = useState(
    "#43b581"
  )

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
      case "offline": {
        setCurrentUserStatusColor("#747f8d")
        break
      }
      default: {
        setCurrentUserStatusColor("gray")
        break
      }
    }
  }, [])

  const friendRoomMakeOrCreate = () => {
    //temp token and instance id

    /*## Create room if the room hasnt been created##*/
    if (!room_created) {
      Axios.post("/chatkit/createroom/friends", {
        user_display_name,
        user_id
      }).catch(err => console.log(err))
    } else {
    }

    /*## Continue ##*/
    Axios.put("/api/friend-room-created", { user_id })
    props.makeCurrentFriend(props.friend)
    props.grabFriends()
    //go to friends chat window .jsx
  }

  return (
    <div
      className="friends-list-flex-box"
      onClick={() => {
        friendRoomMakeOrCreate()
      }}
    >
      <img
        className="friends-list-image"
        src={props.friend.user_image}
        alt={props.friend.user_display_name}
      />
      <span>{`${props.friend.user_display_name}`}</span>
      <div className="friend-status">
        <div style={{ backgroundColor: `${currentUserStatusColor}` }} />
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => reduxState.userReducer

export default connect(
  mapStateToProps,
  { makeCurrentFriend, grabFriends }
)(FriendsConstructor)
