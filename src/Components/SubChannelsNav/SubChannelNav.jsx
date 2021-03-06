import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { grabSubChannels } from "./../../Ducks/subChannelReducer";
import Search from "../Search/Search";
import axios from "axios";
import Chatkit from '@pusher/chatkit-client'
import {Icon} from '@material-ui/core';
import {Input} from '@material-ui/core';
import SubChannelConstructor from "./SubChannelConstructor";
import UserToolbar from '../UserToolbar/UserToolbar';
import Drop from './../DropZone/DropZone'
import {Button} from '@material-ui/core';
import "./SubChannelNav.scss";

require('dotenv').config()
// eslint-disable-next-line
var chatManager;

function SubChannelNav(props) {
  const [input, setInput] = useState('');
  const [updateChannelImageToggle, setUpdateChannelImageToggle] = useState(false);

  const toggleUpdateChannelImageToggle = () => {
    setUpdateChannelImageToggle(!updateChannelImageToggle)
  }

  const {grabSubChannels, channel_id} = props;
  useEffect(() => {
    grabSubChannels(channel_id);
  }, [channel_id, grabSubChannels]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    ChangeChatManager()
  })

  const ChangeChatManager = () => {
    chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:80870939-de37-40f2-aadc-dd3ee990b173',
      userId: `${props.userReducer.user.user_display_name}`,
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
    if (input === null || input === undefined) {
      console.log("please put a name");
    } else {

      chatManager.connect().then(() => {
        axios.post("/chatkit/createroom", {roomName: input, roomStatus: false, channel_id });

      }).then(() => { 
        setTimeout(function(){ props.grabSubChannels(props.channel_id) }, 6000)
      }).catch(err => console.log(err))
    };
  };

  const {subChannels} = props.subChannelReducer;

  const displaySearch =  subChannels.map((subChannel, index)=>{
      if (subChannel.sub_channel_name.toLowerCase().includes(search.toLowerCase())) {
        return <SubChannelConstructor className='each-sub-channel'  key={`SubChannel:${index}`} subChannel={subChannel} />;
      } else {
        return <></>;
      }});
  const isUserTheChannelCreator = props.userReducer.user.user_id === props.channelReducer.currentCreator
  return (
    <>
      <div className="sub-nav-search">
        <Search placeholder="Search for a channel" onChange={onChange} />
      </div>


      { isUserTheChannelCreator ? ( <div style={{margin: '0 auto', marginTop: '10px'}}>
        { updateChannelImageToggle ? (<div style={{margin: '0 auto'}}>
          <Drop type={'update'} channel_id={props.channelReducer.currentChannel} />
          <Button onClick={()=>{toggleUpdateChannelImageToggle()}}>Cancel</Button>
        </div>) : (<Button onClick={()=>{toggleUpdateChannelImageToggle()}}>Update Channel Image</Button>)}
      </div> ) : null }


      <div className="sub-channel-constructor">
        {displaySearch}
        <div>
          <Icon 
          onClick={() => addSubChannel()}
          style={{
            fontSize: '1.75em',
            color: 'var(--main-color)',
            textShadow: 'var(--text-icon-shadow)',
            width: 'fit-content',
            cursor: 'pointer'
          }}>add</Icon>
        </div>
        <div>
          <Input onChange={(e)=>{setInput(e.target.value)}} placeholder="Input Channel Name"></Input>
        </div>
      </div>

      <UserToolbar/>
    </>
  );
}

const mapStateToProps = reduxState => {
  return {
    userReducer: reduxState.userReducer,
    subChannelReducer: reduxState.subChannelReducer,
    channelReducer: reduxState.channelReducer
  }
};

export default connect(
  mapStateToProps,
  { grabSubChannels }
)(SubChannelNav);
