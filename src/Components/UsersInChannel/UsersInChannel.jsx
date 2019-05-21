import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { grabUsersFromChannel } from "./../../Ducks/channelReducer";
// import { grabUsersInSubChannel } from "./../../Ducks/subChannelReducer";
import UsersInChannelConstructor from './../UsersInChannelConstructor/UsersInChannelConstructor'

function UsersInChannel(props) {

  useEffect(()=>{
    if(props.channelReducer.currentChannel){
      props.grabUsersFromChannel(props.channelReducer.currentChannel)
    }
  }, [props.channelReducer.currentChannel])

  return (<div>
    { props.channelReducer.usersFromChannel ? props.channelReducer.usersFromChannel.map((user, i)=>{
    return ( <UsersInChannelConstructor key={i} user={user} /> )
  }) : <div>Please select a channel</div> }
  </div>)
}

const mapStateToProps = reduxState => {
  return {
    channelReducer: reduxState.channelReducer,
    subChannelReducer: reduxState.subChannelReducer,
    usersInChannelReducer: reduxState.usersInChannelReducer
  };
};

export default connect(
  mapStateToProps,
  { grabUsersFromChannel }
)(UsersInChannel);
