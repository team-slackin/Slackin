import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Chatkit from '@pusher/chatkit-client'
require('dotenv').config()

function TextChannelMessegeScreen(props) {





  return (
    <div>{/* Each Individual Messege */}
      text channel message Screen
    </div>
  );
};

const mapStateToProps = reduxState => reduxState.userReducer

export default connect(mapStateToProps, {})(TextChannelMessegeScreen);
