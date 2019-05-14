import React, { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { userSelectedChannel } from "./../../Ducks/channelReducer"

function MainChannelConstructor(props) {
  return (
    <>
      <Link
        onClick={() => props.userSelectedChannel(props.channel.channel_id)}
        to={`/landingpage/${props.channel.channel_name}`}
      >
        <div>
          <img src={props.channel.channel_image} alt="" />
          <h1>{props.channel.channel_name}</h1>
        </div>
      </Link>
    </>
  )
}

const mapStateToProps = reduxState => reduxState.channelReducer

export default connect(
  mapStateToProps,
  { userSelectedChannel }
)(MainChannelConstructor)
