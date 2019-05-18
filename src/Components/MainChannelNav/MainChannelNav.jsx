import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import {grabChannels,removeSelectedChannel} from "./../../Ducks/channelReducer"
import {Redirect} from "react-router-dom"
import Axios from "axios"

import MainChannelConstructor from "./MainChannelConstructor"

import './MainChannelNav.scss';

function MainChannelNav(props) {
const {user} = props.userReducer;

  useEffect(() => {
    props.grabChannels(props.userReducer.user.user_id);
  }, []);

  return (
    <>
      <div className="main-channel-nav">

        <div className="main-channel-nav-seperator">
          <img 
          src={user.user_image} 
          className="main-channel-img"
          onClick={()=>{removeSelectedChannel()}} />
        </div>

        {props.channelReducer.userChannels[0] ?
        props.channelReducer.userChannels.map((channel, i) => (
        <MainChannelConstructor key={i} channel={channel} />
        )) : (<></>)}

      </div>
    </>
  )
}

const mapStateToProps = reduxState => ({
    channelReducer: reduxState.channelReducer,
    userReducer: reduxState.userReducer
});

export default connect(mapStateToProps, {grabChannels, removeSelectedChannel})(MainChannelNav);
