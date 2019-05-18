import React from 'react'

function FriendsConstructor(props) {
  return (
    <div>
      <img src={props.friend.user_image} alt='picOfFriend' width='80' style={{ borderRadius: '50%' }}  />
      <div>{props.friend.user_display_name}</div>
      <div>{props.friend.user_status}</div>
    </div>
  )
}

export default FriendsConstructor
