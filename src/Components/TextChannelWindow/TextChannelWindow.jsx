import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Input} from '@material-ui/core';

import TextChannelMessegeScreen from './TextChannelMessegeScreen';

import Chatkit from '@pusher/chatkit-client'
import UserToolbar from '../UserToolbar/UserToolbar';

import FriendsList from './../FriendsList/FriendsList'

function TextChannelWindow(props) {

  const [message, setMessage] = useState('')
  const [roomMessages, setRoomMessages] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  const createMessage = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  // WORK ON ACTUALLY SENDING MESSAGE
  // HAVE ROOM ID ON REDUX AND EFFEECT LOOKING AT SELECTEDSUBCHANNEL TO CHANGE ROOMS
  // MAKE ROOM DISPLAY CORRECT SPOT REAL FAST
  // STOP HAVING IT ROUTE INCORRECTLY
  // RUN SOME CHECKS FOR THE CONNECT TO SEE IF IT IS ACTUALLY CREATING THE USER BEFORE IT CREATE CURRENT USER
  // MIGHT HAVE TO SET CURRENT USER TO LOCAL STATE IN THIS CASE

  useEffect(() => {
    const {user_display_name, user_id} = props.userReducer.user
       async function setUpChatkitUser() {
        await axios.post('/chatkit/users', { user_display_name, user_id })
       }
       setUpChatkitUser()
      }, [])












      useEffect(() => {
        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:80870939-de37-40f2-aadc-dd3ee990b173',
          userId: `${props.userReducer.user.user_id}`,
          tokenProvider: new Chatkit.TokenProvider({
            url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/80870939-de37-40f2-aadc-dd3ee990b173/token',
          }),
        })
    
        chatManager
          .connect()
          .then(currentUser => {
            setCurrentUser({currentUser})
            return currentUser.subscribeToRoom({
              roomId: `${props.subChannelReducer.currentSubChannelChatKitId}`,
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  setRoomMessages([...roomMessages, message],)
                },
              },
            })
          })
          .catch(error => console.error('error', error))
      },[props.subChannelReducer.currentSubChannel])

  return (
    <>{/* Where everything comes together */}
    
      <header>Sub Channel name</header>
      <div className="text-channel-flex-box">
      
      <div className="main-text-window">{/* Each Individual Messege */}
      <div className="main-screen">text channel message Screen</div>
      <div className="main-text-input">
          <form>
            <Input placeholder={`message ${'sub channel name'}`} onChange={(e) => createMessage(e)} value={message} fullWidth />
          </form>
      </div>
      </div>

      <aside>
        Friends:
        
      </aside>

      </div>
    </>

  );
};

const mapStateToProps = reduxState => {
  return {
    userReducer: reduxState.userReducer,
    subChannelReducer: reduxState.subChannelReducer,
    textChannelReducer: reduxState.textChannelReducer
  }
}

export default connect(mapStateToProps, {})(TextChannelWindow);
