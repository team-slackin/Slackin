import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  grabChannels,
  removeSelectedChannel
} from "./../../Ducks/channelReducer";

import {
  toggleAddOrSearchFlag
} from '../../Ducks/addChannelReducer';

import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

import MainChannelConstructor from "./MainChannelConstructor";

import "./MainChannelNav.scss"

function MainChannelNav(props) {

  const {user} = props.userReducer;
  const [borderRadius, setBorderRadius] = useState('25');


  useEffect(()=>{
<<<<<<< HEAD
    props.grabChannels(user.user_id);
    // eslint-disable-next-line
  }, []);
=======
    setTimeout(() => {
      props.grabChannels(user.user_id);
    }, 2500)
  }, [props.channelReducer.userChannels]);
>>>>>>> master





  useEffect(() => {
    if (props.channelReducer.currentChannel) {
      setBorderRadius("50");
    } else {
      setBorderRadius("25");
    }
  }, [props.channelReducer.currentChannel]);

  return (
    <>
      <div className="main-channel-nav">
          <Link to="/container">
            <img
              src={user.user_image}
              className="main-channel-img"
              onClick={() => {
                props.removeSelectedChannel()
              }}
              style={{
                borderRadius: `${borderRadius}%`,
                width: "80px",
                height: "80px"
              }}
              alt=""
            />
          </Link>
        <div className="main-channel-nav-seperator"></div>

        <div className="main-channel-nav-divider">
          {props.channelReducer.userChannels[0] ?
            props.channelReducer.userChannels.map((channel, i) => (
              <MainChannelConstructor 
                key={i} 
                channel={channel} 
              />
          )) : (<></>)}
        </div>
          
          <div 
          className="main-channel-nav-seperator "
          style={{
            marginTop: '5px'
          }}
          ></div>
        <div className="plus-sign-div">
          <Icon 
          onClick={()=>{props.toggleAddOrSearchFlag(props.addChannelReducer.addOrSearchFlag)}} 
          style={{
            fontSize: '3em',
            color: 'var(--main-color)',
            textShadow: 'var(--text-icon-shadow)',
            cursor: 'pointer'
          }}>add</Icon>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = reduxState => ({
  channelReducer: reduxState.channelReducer,
  userReducer: reduxState.userReducer,
  mainChannelReducer: reduxState.mainChannelReducer,
  addChannelReducer: reduxState.addChannelReducer
})

export default connect(
  mapStateToProps,
  { grabChannels, removeSelectedChannel,toggleAddOrSearchFlag }
)(MainChannelNav)
