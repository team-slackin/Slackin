import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { userSelectedChannel } from "./../../Ducks/channelReducer"

function MainChannelConstructor(props) {
  const [borderRadius, setBorderRadius] = useState('50')

  useEffect(()=>{
    if (props.currentChannel === props.channel.channel_id) {
      setBorderRadius('25');
    } else {
      setBorderRadius('50');
    };
  }, [props.currentChannel])
  return (
    <>
      <Link onClick={() => props.userSelectedChannel(props.channel.channel_id)}
        to={`/container/${props.channel.channel_name}`}
      >
        <div>
          <img 
            src={props.channel.channel_image} 
            className="main-channel-img" 
            style={{borderRadius: `${borderRadius}%`}}
            />
        </div>
      </Link>
    </>
  );
};

const mapStateToProps = reduxState => reduxState.channelReducer;

export default connect(mapStateToProps,{userSelectedChannel})(MainChannelConstructor);
