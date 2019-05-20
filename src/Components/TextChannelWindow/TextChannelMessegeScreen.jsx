import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Chatkit from '@pusher/chatkit-client'
import {Input} from '@material-ui/core';

require('dotenv').config()
function TextChannelMessegeScreen(props) {
  return (
    <div className="main-text-window">{/* Each Individual Messege */}
      <div className="main-screen">{`${props.roomMessage.senderId}: ${props.roomMessage.text} ${props.roomMessage.updatedAt}`}</div>
      </div>
    
  );
};

const mapStateToProps = reduxState => reduxState.userReducer

export default connect(mapStateToProps, {})(TextChannelMessegeScreen);
