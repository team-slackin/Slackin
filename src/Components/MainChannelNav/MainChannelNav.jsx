import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { grabChannels } from "./../../Ducks/channelReducer";
import {Link} from 'react-router-dom'
import Axios from "axios";
import MainChannelConstructor from "./MainChannelConstructor";

function MainChannelNav(props) {


  useEffect(() => {
    props.grabChannels(props.userReducer.user.user_id);
  }, []);

  // useEffect(() => {
  //   async function getSomeData() {
  //     const { data } = await Axios.get('someurl')
  //     // format your data;
  //     setData(data)
  //   }
  //   getSomeData()
  //  }, [])


  console.log("CHANNELS: ", props.channelReducer.userChannels);
  return (
    <>
      {/* The Main channel navigation bar, Maps out MainChannelConstructor */}
      {/* map over props userChannels to send channels constructor the channels */}
      <h1>{JSON.stringify(props.channelReducer.userChannels)}</h1>
      <div>{props.channelReducer.userChannels[0] ? (<div>
        {props.channelReducer.userChannels.map((val, i)=>{return (<MainChannelConstructor key={val.channel_name} name={val.channel_name} image={val.channel_image} />)})}
      </div>) : (<div>No Channels to display</div>)}</div>
    </>
  );
}

const mapStateToProps = reduxState => {
  return {
    channelReducer: reduxState.channelReducer,
    userReducer: reduxState.userReducer
  };
};

export default connect(
  mapStateToProps,
  { grabChannels }
)(MainChannelNav);
