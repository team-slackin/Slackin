import React from 'react'

function UsersInChannelConstructor(props) {
    let { user_image, user_display_name, user_status } = props.user
    return (
    <div>
      <img src={user_image} alt='pic of each user' width='100' height='100' style={{ borderRadius: '50%' }} />
      <div>{user_display_name}</div>
      <div>{user_status}</div>
    </div>
  )
}

export default UsersInChannelConstructor
