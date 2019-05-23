import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import {makeCurrentFriend, grabFriends} from '../../Ducks/friendReducer'
import { resetCurrentSubChannelChatKitId } from '../../Ducks/subChannelReducer'



const FriendsConstructor = (props) => {
  const {user_status, user_display_name, user_image} = props.user;
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
        console.log('add friend')
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

