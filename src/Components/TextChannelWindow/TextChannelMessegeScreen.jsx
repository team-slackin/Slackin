import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Chatkit from '@pusher/chatkit-client';
import {Input} from '@material-ui/core';

import './TextChannelWindow.scss';

require('dotenv').config()
function TextChannelMessegeScreen(props) {
  if (+props.textChannelReducer.prevUser === +props.roomMessage.senderId) {
    return (
      <div className="main-text-window">{/* Each Individual Messege */}
        <div className="main-screen">{`${props.roomMessage.senderId}: ${props.roomMessage.text} ${props.roomMessage.updatedAt}`}</div>
      </div>
    );
  } else {
    props.setPrevUser(props.roomMessage.senderId);
    return ( 
      <>
      <div className="main-text-window">{/* Each Individual Messege */}
        <div className="main-screen">{`${props.roomMessage.senderId}: ${props.roomMessage.text} ${props.roomMessage.updatedAt}`}</div>
      </div>
      <div className="text-window-linebreak"></div>
      </>
    );
  };
};

const mapStateToProps = reduxState => ({
  userReducer: reduxState.userReducer,
  textChannelReducer: reduxState.textChannelReducer
});

export default connect(mapStateToProps, {})(TextChannelMessegeScreen);
