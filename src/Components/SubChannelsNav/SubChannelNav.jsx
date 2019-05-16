import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { grabSubChannels } from "./../../Ducks/subChannelReducer";
import SubChannelConstructor from "./SubChannelConstructor";
import Search from "../Search/Search";
import axios from "axios";

import Chatkit, { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import "./SubChannelNav.scss";
require('dotenv').config()

var chatManager;

function SubChannelNav(props) {
  useEffect(() => {
    props.grabSubChannels(props.channel_id);
  }, [props.channel_id]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log('AM I EVER HIT REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
    ChangeChatManager()
  }, [])

  const ChangeChatManager = () => {
    chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:80870939-de37-40f2-aadc-dd3ee990b173',
      userId: `${props.userReducer.user.user_id}`,
      tokenProvider: new Chatkit.TokenProvider({
        url: `http://localhost:3838/chatkit/authenticate?user_id=${props.userReducer.user.user_id}`,
      })
    })
    console.log('Line 34 WHY U NO FUQING WORK',chatManager.tokenProvider)
  }

  const onChange = e => {
    const { value } = e.target;

    setSearch(value);
  };

  const addSubChannel = () => {
    console.log('TOP OF ADDSUBCHANNEL')
    const { channel_id } = props
    const {user_id } = props.userReducer
    let input = prompt("input channel name");
    if (input === null || input === undefined) {
      return alert("please put a name");
    } else {
      console.log('Line 51',chatManager)
      chatManager.connect().then((currentUser) => {
        console.log('currentUser',currentUser)
        axios.post("/chatkit/createroom", { user_id, roomName: input, roomStatus: false, channel_id });
      }).catch(err => console.log(err))
    }
    props.grabSubChannels(props.channel_id);
  };

  return (
    <>
      <div className="sub-nav-search">
        <Search placeholder="Search for a channel" onChange={onChange} />
      </div>

      {props.subChannelReducer.subChannels.map((subChannel, i) => {
        console.log(subChannel);
        return <SubChannelConstructor key={i} subChannel={subChannel} />;
      })}

      <div onClick={() => addSubChannel()}>
        <p>+Add a room</p>
      </div>
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
