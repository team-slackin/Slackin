import React, { useState } from "react"
import { Link } from "react-router-dom"

function SubChannelConstructor(props) {
  return (
    <Link>
      {/* Makes the SubChannels (text chats)  */}
      <h3>#{props.subChannel.sub_channel_name}</h3>
    </Link>
  )
}

export default SubChannelConstructor
