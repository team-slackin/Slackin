import React, { useState } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {userSelectedSubChannel} from './../../Ducks/subChannelReducer'

function SubChannelConstructor(props) {
  return (
    <>
      <Link 
      onClick={() => props.userSelectedSubChannel(props.subChannel.sub_channel_id,props.subChannel.sub_channel_chatkit_id)}
      to={`/landingpage/${props.subChannel.sub_channel_name}`}>
      <h3>#{props.subChannel.sub_channel_name}</h3>
      </Link>
    </>
  );
}

const mapToPropsState = reduxState => reduxState.subChannelReducer

export default connect(mapToPropsState, {userSelectedSubChannel})(SubChannelConstructor);

{
  /* <Link>
      Makes the SubChannels (text chats)
      <h3>#{props.subChannel.sub_channel_name}</h3>
</Link>  */
}
