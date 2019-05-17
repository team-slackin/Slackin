import React, { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { userSelectedChannel } from "./../../Ducks/channelReducer"

function MainChannelConstructor(props) {
  console.log(props.channel.channel_id)
  return (
    <>
      <Link
        onClick={() => props.userSelectedChannel(props.channel.channel_id)}
        to={`/container/${props.channel.channel_name}`}
      >
        <div>
          <img src={props.channel.channel_image} className="main-channel-img" />
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
