import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Axios from "axios"

import {makeCurrentFriend, grabFriends} from '../../Ducks/friendReducer'
import { resetCurrentSubChannelChatKitId } from '../../Ducks/subChannelReducer'

const FriendsConstructor = (props) => {
  const {user_status, room_created, friend_id, user_display_name} = props.friend;
  const [currentUserStatusColor, setCurrentUserStatusColor] = useState('#43b581');
  
  useEffect(()=>{
    switch(user_status) {
      case 'online': 
        setCurrentUserStatusColor('#43b581');
        break;

      case 'idle': 
        setCurrentUserStatusColor('#faa61a');
        break;

      case 'do not disturb': 
        setCurrentUserStatusColor('#f04747');
        break;

      case 'offline': 
        setCurrentUserStatusColor('#747f8d');
        break;

      default: 
        setCurrentUserStatusColor('#747f8d');
        break;

    };
  }, [user_status]);

  const friendRoomMakeOrCreate = () => {
    //temp token and instance id

    /*## Create room if the room hasnt been created##*/
    if (!room_created) {
      console.log('FRIENDS CONSTRCUTOR',props)
      Axios.post("/chatkit/createroom/friends", {user_display_name, friend_id})
        .catch(err=>console.log(err));
    } else {
        // update redux state and make textchannel window watch for a change on either subchannel id OR friends id
    };

    /*## Continue ##*/
    // Axios.put('/api/friend-room-created', {user_id})
    props.resetCurrentSubChannelChatKitId()
    props.makeCurrentFriend(props.friend);
    props.grabFriends();
    //go to friends chat window .jsx
  }

  return (
    <div
      className="friends-list-flex-box"
      onClick={() => {
        friendRoomMakeOrCreate()
      }}
    >
      <div className="image-status">
        <img
          className="friends-list-image"
          src={props.friend.user_image}
          alt={props.friend.user_display_name}
        />
        <div className="friend-status">
          <div style={{ backgroundColor: `${currentUserStatusColor}` }} />
        </div>
      </div>

      <span>{`${props.friend.user_display_name}`}</span>
      
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    userReducer: reduxState.userReducer,
    subChannelReducer: reduxState.subChannelReducer
  }
}

export default connect(mapStateToProps, {makeCurrentFriend, grabFriends, resetCurrentSubChannelChatKitId}) (FriendsConstructor);

