import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import {makeCurrentFriend, grabFriends} from '../../Ducks/friendReducer'
import { resetCurrentSubChannelChatKitId } from '../../Ducks/subChannelReducer'
import Axios from "axios";



const FriendsConstructor = (props) => {
  const {user_status, user_display_name, user_image, user_id} = props.user;
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
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className="friends-list-flex-box"
      onClick={() => {
        Axios.put(`/add-friend/${user_id}/${props.userReducer.user.user_id}`)
        console.log(user_id, props.userReducer.user.user_id)
      }}
    >
      <div className="image-status">
        <img
          className="friends-list-image"
          src={user_image}
          alt={user_display_name}
        />
        <div className="friend-status">
          <div style={{ backgroundColor: `${currentUserStatusColor}` }} />
        </div>
      </div>
        <span>{`${user_display_name}`}</span>
        
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

