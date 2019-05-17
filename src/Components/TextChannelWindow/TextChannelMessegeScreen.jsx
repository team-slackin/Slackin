import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Chatkit from '@pusher/chatkit-client'
import {Input} from '@material-ui/core';



require('dotenv').config()
function TextChannelMessegeScreen(props) {

  return (
    <div className="main-text-window">{/* Each Individual Messege */}
      <div className="main-screen">text channel message Screen</div>
      <div className="main-text-input">
        <div>
          <Input placeholder={`message ${'sub channel name'}`} fullWidth />
        </div>
      </div>
      
    </div>
  );
};

const mapStateToProps = reduxState => reduxState.userReducer

export default connect(mapStateToProps, {})(TextChannelMessegeScreen);
