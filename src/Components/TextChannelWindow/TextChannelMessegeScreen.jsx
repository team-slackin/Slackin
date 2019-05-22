import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Chatkit from '@pusher/chatkit-client';
import {Input} from '@material-ui/core';
import {setPrevUser} from '../../Ducks/textChannelReducer';

import './TextChannelWindow.scss';

require('dotenv').config()
function TextChannelMessegeScreen(props) {
  // if (+props.textChannelReducer.prevUser === +props.roomMessage.senderId) {

    const indexOfUser = props.channelReducer.usersFromChannel.findIndex(
      obj=> `${obj.user_display_name}` === `${props.roomMessage.senderId}`
    );

    return (
        <>
          {indexOfUser ?
            <article>{`${props.roomMessage.updatedAt}`}
              <p>
                <span
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >{`${props.roomMessage.senderId}`}</span>{`: ${props.roomMessage.text}`}
              </p>
            </article>
          : 
          <article>{`${props.roomMessage.updatedAt}`}
            <p>
              {console.log(props.channelReducer.usersFromChannel[indexOfUser])}
              <span
                style={{
                  color: `${props.channelReducer.usersFromChannel[indexOfUser].fav_color}`
                }}
              >{`${props.roomMessage.senderId}`}</span>{`: ${props.roomMessage.text}`}
            </p>
          </article>
          }
        </>
    );
  // } else {
    // props.setPrevUser(props.roomMessage.senderId);
    // return ( 
    //   <>
    //   <div className="main-text-window">{/* Each Individual Messege */}
    //     <div className="main-screen">{`${props.roomMessage.senderId}: ${props.roomMessage.text} ${props.roomMessage.updatedAt}`}</div>
    //   </div>
    //   <div className="text-window-linebreak"></div>
    //   </>
    // );
  // };
};

const mapStateToProps = reduxState => ({
  userReducer: reduxState.userReducer,
  textChannelReducer: reduxState.textChannelReducer,
  channelReducer: reduxState.channelReducer
});

export default connect(mapStateToProps, {setPrevUser})(TextChannelMessegeScreen);
