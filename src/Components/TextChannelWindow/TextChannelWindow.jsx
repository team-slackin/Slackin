import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Input } from "@material-ui/core";

import TextChannelMessegeScreen from "./TextChannelMessegeScreen";

import Chatkit from "@pusher/chatkit-client";
import UserToolbar from "../UserToolbar/UserToolbar";
// import UsersInChannel from "../UsersInChannel/UsersInChannel";

import FriendsList from "./../FriendsList/FriendsList";
import UsersInChannel from "../UsersInChannel/UsersInChannel";

function TextChannelWindow(props) {
  const [inputMessage, setMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const createMessage = e => {
    const { value } = e.target;
    setMessage(value);
  };

  // useEffect(() => {
  //   const { user_display_name, user_id } = props.userReducer.user;
  //   async function setUpChatkitUser() {
  //     await axios.post("/chatkit/users", { user_display_name, user_id });
  //   }
  //   setUpChatkitUser();
  // }, []);

  useEffect(() => {
    setRoomMessages([]);
  }, [props.subChannelReducer.currentSubChannelChatKitId]);

  //FIX AUTH ERROR being double ran - look at parent
  useEffect(() => {
    if (props.subChannelReducer.currentSubChannelChatKitId) {
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:80870939-de37-40f2-aadc-dd3ee990b173",
        userId: `${props.userReducer.user.user_display_name}`,
        tokenProvider: new Chatkit.TokenProvider({
          url:
            "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/80870939-de37-40f2-aadc-dd3ee990b173/token"
        })
      });

      chatManager
        .connect()
        .then(currentUser => {
          setCurrentUser({ currentUser });
          return currentUser.subscribeToRoom({
            roomId: `${props.subChannelReducer.currentSubChannelChatKitId}`,
            messageLimit: 100,
            hooks: {
              onMessage: message => {
                setRoomMessages(prevMessages => [...prevMessages, message]);
              }
            }
          });
        })
        .catch(error => console.error("error", error));
    }
  }, [props.subChannelReducer.currentSubChannel]);

  const sendMessage = (text, e) => {
    e.preventDefault();
    currentUser.currentUser.sendMessage({
      text,
      roomId: `${props.subChannelReducer.currentSubChannelChatKitId}`
    });
    setMessage('')
  };

  return (
    <>
      <header>Sub Channel name</header>
      <div className="text-channel-flex-box">
        <div className="main-text-window">
          {/* Each Individual Messege */}
          <div className="main-screen">
            {roomMessages.map((message, index) => {
              return (
                <TextChannelMessegeScreen key={index} roomMessage={message} />
              );
            })}
          </div>
          <div className="main-text-input">
            <form>
              <Input
                placeholder={`message ${"sub channel name"}`}
                onChange={e => createMessage(e)}
                value={inputMessage}
                fullWidth
              />
              <button
                onClick={e => {
                  sendMessage(inputMessage, e);
                }}
              >
                Temp Submit
              </button>
            </form>
          </div>
        </div>

        <aside>Friends:
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
    textChannelReducer: reduxState.textChannelReducer
  };
};

export default connect(
  mapStateToProps,
  {}
)(TextChannelWindow);
