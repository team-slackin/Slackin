import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { grabChannels } from "./../../Ducks/channelReducer"
import { Link } from "react-router-dom"
import Axios from "axios"
import MainChannelConstructor from "./MainChannelConstructor"
import UserToolbar from './../UserToolbar/UserToolbar'

import './MainChannelNav.scss';

function MainChannelNav(props) {
  useEffect(() => {
    props.grabChannels(props.userReducer.user.user_id)
  }, [])

  

  // useEffect(() => {
  //   async function getSomeData() {
  //     const { data } = await Axios.get('someurl')
  //     // format your data;
  //     setData(data)
  //   }
  //   getSomeData()
  //  }, [])
  return (
    <>
      {/* The Main channel navigation bar, Maps out MainChannelConstructor */}
      {/* map over props userChannels to send channels constructor the channels */}
      <div className="main-channel-nav">
        {props.channelReducer.userChannels[0] ? (
          <div>
            {props.channelReducer.userChannels.map((channel, i) => {
              return <MainChannelConstructor key={i} channel={channel} />
            })}
          </div>
        ) : (
          <div>No Channels to display</div>
        )}
      </div>
      <UserToolbar/>
    </>
  )
}

const mapStateToProps = reduxState => {
  return {
    channelReducer: reduxState.channelReducer,
    userReducer: reduxState.userReducer
  }
}

export default connect(
  mapStateToProps,
  { grabChannels }
)(MainChannelNav)
