import React, { useState } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {userSelectedSubChannel} from './../../Ducks/subChannelReducer'
import { userSelectedChannel } from "./../../Ducks/channelReducer"

function SubChannelConstructor(props) {
  return (
    <>
      <Link 
      onClick={() => props.userSelectedSubChannel(props.subChannelReducer.subChannel.sub_channel_id)}
      to={`/container/${props.channelReducer}/${props.subChannel.sub_channel_name}`}>
        <h3>#{props.subChannel.sub_channel_name}</h3>
      </Link>
    </>
  );
}

const mapToPropsState = reduxState => ({
  channelReducer: reduxState.channelReducer,
  subChannelReducer: reduxState.subChannelReducer
})

export default connect(mapToPropsState, {userSelectedSubChannel})(SubChannelConstructor);

{
  /* <Link>
      Makes the SubChannels (text chats)
      <h3>#{props.subChannel.sub_channel_name}</h3>
</Link>  */
}
