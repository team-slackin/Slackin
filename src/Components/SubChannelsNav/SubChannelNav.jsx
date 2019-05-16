import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { grabSubChannels } from "./../../Ducks/subChannelReducer"
import SubChannelConstructor from "./SubChannelConstructor"

import './SubChannelNav.scss';

function SubChannelNav(props) {
  useEffect(() => {
    props.grabSubChannels(props.channel_id)
  }, [props.channel_id])

  return (
    <section className="sub-nav">
      {props.subChannels.map((subChannel, i) => {
        return <SubChannelConstructor key={i} subChannel={subChannel} />
      })}
    </section>
  )
}

const mapStateToProps = reduxState => reduxState.subChannelReducer

export default connect(
  mapStateToProps,
  { grabSubChannels }
)(SubChannelNav)
