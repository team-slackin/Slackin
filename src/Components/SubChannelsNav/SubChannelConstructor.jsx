import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {userSelectedSubChannel,setNeverLoadAgain} from './../../Ducks/subChannelReducer'
import { resetCurrentFriend } from "./../../Ducks/friendReducer"

function SubChannelConstructor(props) {
  return (
    <>
      <Link 

      onClick={() => {
        props.resetCurrentFriend();
        props.userSelectedSubChannel(props.subChannel.sub_channel_id,props.subChannel.sub_channel_chatkit_id)
        props.setNeverLoadAgain();
      }}
        
      to={`/container/${props.subChannel.sub_channel_name}`}>
      <h3 
        style={{
          margin: '8px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span
          style={{
            fontSize: '1.25em'
          }}
        >#</span>
        <span
          style={{
            marginLeft: '10px'
          }}
        >{`${props.subChannel.sub_channel_name}`}</span>
      </h3>
      </Link>
    </>
  );
}

const mapToPropsState = reduxState => ({
  channelReducer: reduxState.channelReducer,
  subChannelReducer: reduxState.subChannelReducer,
  friendReducer: reduxState.friendReducer
})

export default connect(mapToPropsState, {
  userSelectedSubChannel,
  resetCurrentFriend,
  setNeverLoadAgain
  })(SubChannelConstructor);
