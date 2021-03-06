import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { createChannel } from "./../../Ducks/channelReducer"
import { login } from "./../../Ducks/userReducer"
import { Input } from "@material-ui/core"

import "./CreateChannel.scss"

function CreateChannel(props) {
  const [createChannelInfo, setCreateChannelInfo] = useState({
    channelName: "",
    channelIsPrivate: false
  })

  const handleSelectChange = e => {
    setCreateChannelInfo({
      ...createChannelInfo,
      channelIsPrivate: e.target.value
    })
  }

  const handleChannelInfoChange = e => {
    const { name, value } = e.target
    setCreateChannelInfo({
      ...createChannelInfo,
      [name]: value
    })
  }

  return (
    <div className="channel-settings">
      <form
        onSubmit={e => {
          e.preventDefault()
          setCreateChannelInfo({ ...createChannelInfo, channelName: "" })
          props.createChannel(
            createChannelInfo.channelName,
            createChannelInfo.channelIsPrivate
          )
        }}
      >
        <select
          className="custom-select"
          onChange={e => {
            handleSelectChange(e)
          }}
        >
          <option name="channelIsPrivate" value={false}>
            Public
          </option>
          <option name="channelIsPrivate" value={true}>
            Private
          </option>
        </select>
        <h5>New Channel Name</h5>
        <div className="input-border">
          <Input
            placeholder=""
            onChange={e => {
              handleChannelInfoChange(e)
            }}
            value={createChannelInfo.channelName}
            name="channelName"
            fullWidth
          />
        </div>
        <div className="create">
          <button
            onClick={e => {
              e.preventDefault()
              setCreateChannelInfo({ ...createChannelInfo, channelName: "" })
              props.createChannel(
                createChannelInfo.channelName,
                createChannelInfo.channelIsPrivate
              )
            }}
          >
            Create Channel
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = reduxState => ({
  userReducer: reduxState.userReducer,
  channelReducer: reduxState.channelReducer
})

export default connect(
  mapStateToProps,
  { createChannel, login }
)(CreateChannel)
