import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input } from "@material-ui/core";
import {setNeverLoadAgain} from '../../Ducks/subChannelReducer';

import AddingUsersToChannel from './../AddingUsersToChannel/AddingUsersToChannel'

import TextChannelMessegeScreen from "./TextChannelMessegeScreen";
// eslint-disable-next-line
import _ from "lodash";

import Chatkit from "@pusher/chatkit-client";
import {CircularProgress} from '@material-ui/core'
import UsersInChannel from "../UsersInChannel/UsersInChannel";

import {
  setReduxMessage,
  resetReduxMessage
} from "./../../Ducks/textChannelReducer";

function TextChannelWindow(props) {
  const [inputMessage, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  //roomID holder - switched with useEffect that looks for correct channels
  const [roomId, setRoomId] = useState('')
  const [usersWhoAreTyping, setUsersWhoAreTyping] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dontLoadAgain, setDontLoadAgain] = useState(1);//used to stop when it equals 2
  //FIX AUTH ERROR being double ran - look at parent

  const {resetReduxMessage} = props;

  useEffect(() => {
    if(props.subChannelReducer.currentSubChannelChatKitId){
      setRoomId(`${props.subChannelReducer.currentSubChannelChatKitId}`)
    }else if (props.friendReducer.currentFriend.chatkit_id){
      setRoomId(`${props.friendReducer.currentFriend.chatkit_id}`)
    } else {
      setRoomId('null')
    }
  },[props.subChannelReducer.currentSubChannelChatKitId, props.friendReducer.currentFriend.chatkit_id])
  
  useEffect(() => {
    resetReduxMessage()
    // eslint-disable-next-line
  },[roomId])

  useEffect(() => {
    if(roomId !== 'null'){

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
  
        .then(async currentUser => {
          setCurrentUser({ currentUser });
          // eslint-disable-next-line
          const data = await currentUser.subscribeToRoom({
            roomId: roomId,
            messageLimit: 100,
            hooks: {
              onMessage: message => {
                props.setReduxMessage(message);
              },
              // eslint-disable-next-line
              onUserStartedTyping: user => {
                setUsersWhoAreTyping([
                  ...usersWhoAreTyping, props.userReducer.user.user_display_name
                ])
              },
              // eslint-disable-next-line
              onUserStoppedTyping: user => {
                
                setUsersWhoAreTyping([
                  ...usersWhoAreTyping.filter(username => username !== props.userReducer.user.user_display_name)
                ])
              }
            }
          });
        }).catch(error => console.log("error", error));
    }
    // eslint-disable-next-line
  }, [roomId]);

  const timeoutLoading = () => {
    if (!isLoading && dontLoadAgain !== 2 && !props.subChannelReducer.neverLoadAgain) {
      setIsLoading(true)
      setTimeout(()=>{
        setIsLoading(false);
        props.setNeverLoadAgain(true);
      }, 3000);
    }; 
  };

  const createMessage = e => {
    const { value } = e.target;
    setMessage(value);
    currentUser.currentUser
      .isTypingIn({
        roomId: `${props.subChannelReducer.currentSubChannelChatKitId}`
      })
      .catch(err => console.log(err));
      console.log(props.userReducer.user)
  };


  const sendMessage = (text, e) => {
    e.preventDefault();
    currentUser.currentUser.sendMessage({
      text,
      roomId: roomId
    });
    setMessage("");
  };

  const isSomeoneTyping = usersWhoAreTyping.length > 0;

  return (
    <>
      <div className="text-channel-flex-box">
        <div className="main-text-window">
          <header className='sub-channel-name'> { props.subChannelReducer.currentSubChannel ? ( <div> <span className='sub-channel-hashtag'>#</span><div className='subchannelname'>
          {props.subChannelReducer.currentSubChannel.sub_channel_name}
          </div>
          </div> ) : (null) }</header>
          {/* Each Individual Messege */}

          { isSomeoneTyping ? (<div>Someone is typing ...</div>) : (null) }

          <div className="main-screen">
            
            {isLoading ? (
              <div className="loading">
                <CircularProgress 
                style={{
                  color: 'white',
                }}
                  size={100} 
                  color="secondary" 
                />
              </div>
            ) : (
              <>
              <article id="jump">
              {props.textChannelReducer.messages.map((message, index) => {
                return (
                  <TextChannelMessegeScreen 
                  key={index} 
                  roomMessage={message} 
                  timeoutLoading={timeoutLoading}
                  setDontLoadAgain={setDontLoadAgain} 
                  dontLoadAgain={dontLoadAgain}
                  />
                )
              })}
            </article>
            <div>{/* Jump to div */}</div>
            </>
            )}
            

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
              </button>
            </form>
          </div>
        </div>

        <aside>
          <UsersInChannel />
          <AddingUsersToChannel />
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
  { setReduxMessage, resetReduxMessage, setNeverLoadAgain}
)(TextChannelWindow);
