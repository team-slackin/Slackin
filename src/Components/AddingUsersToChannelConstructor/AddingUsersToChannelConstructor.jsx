import React from 'react'

function AddingUsersToChannelConstructor(props) {
    const { user_display_name, user_image, user_status, user_id } = props.user
    return (
        <div onClick={()=>{props.handleAddUser(user_id, props.currentChannel)}} style={{ cursor: 'pointer' }}>
            <img src={user_image} alt='of each user' width='25' height='25' style={{ borderRadius:'50%' }}   />
            <div>{user_display_name}</div>
            <div>{user_status}</div>
        </div>
    )
}

export default AddingUsersToChannelConstructor
