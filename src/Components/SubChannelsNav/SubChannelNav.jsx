import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { grabSubChannels } from "./../../Ducks/subChannelReducer";
import Search from "../Search/Search";
import axios from "axios";
import Chatkit, { ChatManager, TokenProvider } from '@pusher/chatkit-client'

import SubChannelConstructor from "./SubChannelConstructor";
import UserToolbar from '../UserToolbar/UserToolbar';

import "./SubChannelNav.scss";

require('dotenv').config()

var chatManager;

function SubChannelNav(props) {
  useEffect(() => {
    props.grabSubChannels(props.channel_id);
  }, [props.channel_id]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    ChangeChatManager()
  }, [])

  const ChangeChatManager = () => {
    chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:80870939-de37-40f2-aadc-dd3ee990b173',
      userId: `${props.userReducer.user.user_id}`,
      tokenProvider: new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/80870939-de37-40f2-aadc-dd3ee990b173/token",
      })
    })
  }

  const onChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  const addSubChannel = () => {
    const { channel_id } = props
    const {user_id } = props.userReducer.user
    let input = prompt("input channel name");
    if (input === null || input === undefined) {
      return alert("please put a name");
    } else {
      chatManager.connect().then((currentUser) => {
        axios.post("/chatkit/createroom", { user_id, roomName: input, roomStatus: false, channel_id });
      }).then(() => { 
        setTimeout(function(){ props.grabSubChannels(props.channel_id) }, 6000)
      }).catch(err => console.log(err))
    }
  };

  return (
    <>
      <div className="sub-nav-search">
        <Search placeholder="Search for a channel" onChange={onChange} />
      </div>

      {props.subChannelReducer.subChannels.map((subChannel, i) => {
        return <SubChannelConstructor key={i} subChannel={subChannel} />;
      })}

      <div onClick={() => addSubChannel()}>
        <p>+Add a room</p>
      </div>

      <UserToolbar/>
    </>
  );
}

const mapStateToProps = reduxState => {
  return {
    userReducer: reduxState.userReducer,
    subChannelReducer: reduxState.subChannelReducer
  }
};

export default connect(
  mapStateToProps,
  { grabSubChannels }
)(SubChannelNav);
