import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Input } from "@material-ui/core";
import AddingUsersToChannel from './../AddingUsersToChannel/AddingUsersToChannel'

import TextChannelMessegeScreen from "./TextChannelMessegeScreen";
import _ from "lodash";

import Chatkit from "@pusher/chatkit-client";
import UserToolbar from "../UserToolbar/UserToolbar";
// import UsersInChannel from "../UsersInChannel/UsersInChannel";

import FriendsList from "./../FriendsList/FriendsList";
import UsersInChannel from "../UsersInChannel/UsersInChannel";

import { setReduxMessage } from "./../../Ducks/textChannelReducer";

function TextChannelWindow(props) {
  const [inputMessage, setMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [usersWhoAreTyping, setUsersWhoAreTyping] = useState([]);

  //FIX AUTH ERROR being double ran - look at parent

  useEffect(() => {
    if (props.subChannelReducer.currentSubChannel) {
      console.log("am i getting ran over and over");
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
            roomId: `${props.subChannelReducer.currentSubChannelChatKitId}`,
            messageLimit: 100,
            hooks: {
              onMessage: message => {
                props.setReduxMessage(message);
              },
              onUserStartedTyping: user => {
                setUsersWhoAreTyping([
                  ...usersWhoAreTyping, props.userReducer.user.user_display_name
                ])
              },
              onUserStoppedTyping: user => {

                setUsersWhoAreTyping([
                  ...usersWhoAreTyping.filter(username => username !== props.userReducer.user.user_display_name)
                ])
              }
            }
          });
        })
        .catch(error => console.log("error", error));
    }
  }, [props.subChannelReducer.currentSubChannel]);

  const createMessage = e => {
    const { value } = e.target;
    setMessage(value);
    currentUser.currentUser
      .isTypingIn({
        roomId: `${props.subChannelReducer.currentSubChannelChatKitId}`
      })
      .catch(err => console.log(err));
  };



  const sendMessage = (text, e) => {
    e.preventDefault();
    currentUser.currentUser.sendMessage({
      text,
      roomId: `${props.subChannelReducer.currentSubChannelChatKitId}`
    });
    setMessage("");
  };

  const isSomeoneTyping = usersWhoAreTyping.length > 0;

  console.log("TEXT CHANNEL REDUCER 1111111111", props);
  return (
    <>
      <div className="text-channel-flex-box">
        <div className="main-text-window">
          <header>Sub Channel name</header>
          {/* Each Individual Messege */}

          { isSomeoneTyping ? (<div>{`${usersWhoAreTyping
            .slice(0, 2)
            .join(' and ')} is typing`}</div>) : (null) }

          <div className="main-screen">
            {props.textChannelReducer.messages.map((message, index) => {
              return (
                <TextChannelMessegeScreen key={index} roomMessage={message} />
              );
            })}
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
          <AddingUsersToChannel />
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
  { setReduxMessage }
)(TextChannelWindow);
