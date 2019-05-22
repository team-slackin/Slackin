import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Chatkit from "@pusher/chatkit-client";
import {grabFriends} from '../../Ducks/friendReducer';

import {Input} from '@material-ui/core';

function FriendsChatWindow(props) {
  const [inputMessage, setMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(()=>{
    props.grabFriends();
  }, []);

  useEffect(() => {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:80870939-de37-40f2-aadc-dd3ee990b173",
      userId: `${props.userReducer.user.user_display_name}`,
      tokenProvider: new Chatkit.TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/80870939-de37-40f2-aadc-dd3ee990b173/token"
      })
    });

    //CONNECTS TO ROOM AND GRABS MESSAGES
    chatManager.connect().then(
      currentUser => {
        setCurrentUser({ currentUser });
            
        return currentUser.subscribeToRoom(
          {
            roomId: `${props.friendReducer.currentFriend.chatkit_id}`,
            messageLimit: 100,
            hooks: {//                       change this to a redux update
              onMessage: message => setRoomMessages(prevMessages => [...prevMessages, message])//MESS WITH LATER
            }})}
    ).catch(error => console.error("friends chat", error));
  },[props.friendReducer.currentFriend]);

  const createMessage = e => {
    const {value} = e.target;
    setMessage(value);
  };

  const sendMessage = (text, e) => {
    e.preventDefault();
    currentUser.currentUser.sendMessage({
      text,
      roomId: `${props.friendReducer.currentFriend.chatkit_id}`
    });
  };

  console.log('abcdefghijklmnopqrstuvxyz', props);
  console.log('abcdefghijklmnopqrstuvxyz', roomMessages);

  return (
    <>
      <header>{`${props.friendReducer.currentFriend.chatkit_name}`}</header>
      <div className="text-channel-flex-box">
        <div className="main-text-window">
          {/* Each Individual Messege */}
          <div className="main-screen">
            {roomMessages.map((message, index) => console.log(index, message) )}
          </div>
          <div className="main-text-input">
            <form>
              <Input
                placeholder={'Send message here.'}
                onChange={e => {
                  createMessage(e);
                }}
                value={inputMessage}
                fullWidth
              />
              <button
                onClick={e => {
                  sendMessage(inputMessage, e);
                }}
                style={{
                  display: 'none'
                }}
              >
                Temp Submit
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

const mapStateToProps = reduxState => ({
  userReducer: reduxState.userReducer,
  friendReducer: reduxState.friendReducer
});

export default connect(mapStateToProps, {grabFriends}) (FriendsChatWindow);