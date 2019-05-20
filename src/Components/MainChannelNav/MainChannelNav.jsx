import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {grabChannels, removeSelectedChannel} from "./../../Ducks/channelReducer";
import {Link} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

import MainChannelConstructor from "./MainChannelConstructor"

import './MainChannelNav.scss';

function MainChannelNav(props) {
  const {user} = props.userReducer;
  const [borderRadius, setBorderRadius] = useState('25');

  useEffect(() => {
    props.grabChannels(props.userReducer.user.user_id);
  }, []);
  
  useEffect(()=>{
    console.log(`from MainChannelNav`, props.channelReducer)
    if (props.channelReducer.currentChannel) {
      setBorderRadius('50');
    } else {
      setBorderRadius('25');
    }
  },[props.channelReducer.currentChannel])

  return (
    <>
      <div className="main-channel-nav">

        <div className="main-channel-nav-seperator">
          <Link to="/container">
          <img 
          src={user.user_image} 
          className="main-channel-img"
          onClick={()=>{
            props.removeSelectedChannel();
          }} 
          style={{
            borderRadius: `${borderRadius}%`,
            width: '80px',
            height: '80px'
          }}
          />
          </Link>
        </div>

        {props.channelReducer.userChannels[0] ?
        props.channelReducer.userChannels.map((channel, i) => (
        <MainChannelConstructor 
          key={i} 
          channel={channel} 
          />
        )) : (<></>)}
        <div className="plus-sign-div">
          <Icon style={{
            fontSize: '3em',
            color: 'var(--main-color)',
            textShadow: 'var(--text-icon-shadow)'
          }}>add</Icon>
        </div>

      </div>
    </>
  )
}

const mapStateToProps = reduxState => ({
    channelReducer: reduxState.channelReducer,
    userReducer: reduxState.userReducer,
    mainChannelReducer: reduxState.mainChannelReducer
});

export default connect(mapStateToProps, {grabChannels, removeSelectedChannel})(MainChannelNav);
