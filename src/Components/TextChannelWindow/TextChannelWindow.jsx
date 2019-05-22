import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Input } from "@material-ui/core";

import TextChannelMessegeScreen from "./TextChannelMessegeScreen";
import _ from "lodash";

import Chatkit from "@pusher/chatkit-client";
import UserToolbar from "../UserToolbar/UserToolbar";
// import UsersInChannel from "../UsersInChannel/UsersInChannel";

import FriendsList from "./../FriendsList/FriendsList";
import UsersInChannel from "../UsersInChannel/UsersInChannel";

import {
  setReduxMessage,
  resetReduxMessage
} from "./../../Ducks/textChannelReducer";


function TextChannelWindow(props) {
  const [inputMessage, setMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  
  //roomID holder - switched with useEffect that looks for correct channels
  const [roomID, setRoomId] = useState('')

  //FIX AUTH ERROR being double ran - look at parent


  useEffect(() => {
    if(props.subChannelReducer.currentSubChannelChatKitId){
      setRoomId(`${props.subChannelReducer.currentSubChannelChatKitId}`)
    }else if (props.friendReducer.currentFriend.chatkit_id){
      setRoomId(`${props.friendReducer.currentFriend.chatkit_id}`)
    } else {
      setRoomId('null')
    }
  },[props.subChannelReducer.currentSubChannelChatKitId])
  
  useEffect(() => {
    props.resetReduxMessage()
  },[roomID])

  useEffect(() => {
    console.log("am i getting ran over and over");
    if(roomID !== 'null'){
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:80870939-de37-40f2-aadc-dd3ee990b173",
        userId: `${props.userReducer.user.user_display_name}`,
        tokenProvider: new Chatkit.TokenProvider({
          url:
            "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/80870939-de37-40f2-aadc-dd3ee990b173/token"
        })
      });
  
      // _.debounce(setRoomMessages(prevMessages => [...prevMessages, message]), 250)
  
      chatManager
        .connect()
  
        .then(async currentUser => {
          setCurrentUser({ currentUser });
          const data = await currentUser.subscribeToRoom({
            roomId: roomID,
            messageLimit: 100,
            hooks: {
              onMessage: message => {
                props.setReduxMessage(message);
              }
            }
          });
        })
        .catch(error => console.error("error", error));
    }
  }, [roomID]);

  const createMessage = e => {
    const { value } = e.target;
    setMessage(value);
  };

  const sendMessage = (text, e) => {
    e.preventDefault();
    currentUser.currentUser.sendMessage({
      text,
      roomId: roomID
    });
    setMessage("");
  };
  console.log('SUBCHANNEL CHATKIT ID', props.subChannelReducer.currentSubChannelChatKitId)
  console.log("CHECK FOR FRIEND CHANNEL ID", props.friendReducer.currentFriend.chatkit_id);
  console.log('ROOMID FOR FRIENDS CHAT', roomID)
  return (
    <>
      <div className="text-channel-flex-box">
        <div className="main-text-window">
          <header>Sub Channel name</header>
          {/* Each Individual Messege */}
          <div className="main-screen">
            <article>
              {props.textChannelReducer.messages.map((message, index) => {
                return (
                  <TextChannelMessegeScreen key={index} roomMessage={message} />
                );
              })}
            </article>
          </div>
          <div className="main-text-input">
            <form>
              <Input
                placeholder={"Send message here."}
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
                  display: "none"
                }}
              >
                Temp Submit
              </button>
            </form>
          </div>
        </div>

        <aside>
          <UsersInChannel />
        </aside>
      </div>
    </>
  );
}

const mapStateToProps = reduxState => {
  return {
    userReducer: reduxState.userReducer,
    subChannelReducer: reduxState.subChannelReducer,
    textChannelReducer: reduxState.textChannelReducer,
    friendReducer: reduxState.friendReducer
  };
};

export default connect(
  mapStateToProps,
  { setReduxMessage, resetReduxMessage }
)(TextChannelWindow);
