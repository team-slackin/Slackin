import React, { useEffect } from "react";
import { connect } from "react-redux";
import { grabUsersFromChannel } from "./../../Ducks/channelReducer";
// import { grabUsersInSubChannel } from "./../../Ducks/subChannelReducer";
import UsersInChannelConstructor from './../UsersInChannelConstructor/UsersInChannelConstructor'

function UsersInChannel(props) {

  useEffect(()=> {
    if(props.channelReducer.currentChannel){
      setTimeout(() => {
        props.grabUsersFromChannel(props.channelReducer.currentChannel)
      }, 2000)
    }
  }, [props.channelReducer.currentChannel, props.channelReducer.usersFromChannel])


  return (
    <>
      {props.channelReducer.usersFromChannel ? (
        <>
          <h1>Users In Channel</h1>
            {props.channelReducer.usersFromChannel.map(
              (user, i)=> (
                <UsersInChannelConstructor key={i} user={user} /> 
              ))}
        </>
      ) : (
        <h1>Please select a channel</h1>
      )}

  </>
  );
};

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
