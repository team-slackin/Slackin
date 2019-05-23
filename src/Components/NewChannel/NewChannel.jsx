import React, { useState, useEffect } from "react"
import { Link, Route } from "react-router-dom"
import { connect } from "react-redux"

import CreateChannel from "../CreateChannel/CreateChannel"
import SearchChannels from "../SearchChannels/SearchChannels"

import {
  toggleAddChannelFlag,
  toggleAddOrSearchFlag,
  toggleSearchChannelsFlag
} from "../../Ducks/addChannelReducer"

import Icon from "@material-ui/core/Icon"

import "./NewChannel.scss"

function NewChannel(props) {
  const [addChannelReducer, setUpdateState] = useState()

  useEffect(() => {
    setUpdateState(props.addChannelReducer)
  }, [props.addChannelReducer])

  const display = () => {
    if (addChannelReducer) {
      if (addChannelReducer.searchChannelsFlag) {
        return (
          <section className="new-channel-window">
            <div className="new-channel-window-div">
              <div className="box-1">
                <h2>Add New Channel</h2>
                <Link
                  className="close"
                  onClick={() => {
                    props.toggleAddOrSearchFlag()
                  }}
                  to="/container"
                >
                  <Icon className="icon">cancel</Icon>
                </Link>
              </div>
              <div className="create-channels">
                <CreateChannel />
              </div>
            </div>
          </section>
        )
      }
    }
  }

  return <>{display()}</>
}

const mapStateToProps = reduxState => ({
  addChannelReducer: reduxState.addChannelReducer
})

export default connect(
  mapStateToProps,
  {
    toggleAddChannelFlag,
    toggleAddOrSearchFlag,
    toggleSearchChannelsFlag
  }
)(NewChannel)
