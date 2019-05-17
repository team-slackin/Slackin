import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Chatkit from '@pusher/chatkit-client'
require('dotenv').config()

function TextChannelMessegeScreen(props) {

  useEffect(() => {
    const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:80870939-de37-40f2-aadc-dd3ee990b173',
            userId: props.user.user_id,
            tokenProvider: new Chatkit.TokenProvider({
              url: 'http://localhost:3838/chatkit/authenticate',
            }),
          })
      
          chatManager
            .connect()
           .catch(error => console.error('error', error))
  },[])




  return (
    <div>{/* Each Individual Messege */}
      text channel message Screen
    </div>
  );
};

const mapStateToProps = reduxState => reduxState.userReducer

export default connect(mapStateToProps, {})(TextChannelMessegeScreen);
