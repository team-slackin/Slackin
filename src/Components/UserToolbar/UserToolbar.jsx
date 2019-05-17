import React, {useState, useEffect} from 'react'
import { connect } from "react-redux"
import { grabChannels } from "./../../Ducks/channelReducer"
import { setUserStatus } from "./../../Ducks/userReducer"
import {Link} from 'react-router-dom'

function UserToolbar(props) {
    const [editStatusFlag, setEditStatusFlag] = useState(false)
    const [currentUserStatus, setCurrentUserStatus] = useState('online')

    let toggleStatusEdit = ()=>{
        setEditStatusFlag(!editStatusFlag);
      }

  return (
    <div className='toolbar'>
        <div onClick={()=>{toggleStatusEdit()}}className='image-container'>
            <img style={{ borderRadius:'50%' }} src={props.userReducer.user.user_image} alt='user' width='100'/>
        </div>
        <div>{props.userReducer.user.user_display_name}</div>
        <div>{props.userReducer.user.user_status}</div>
        <Link to='/account'>Go to Settings</Link>
        <div>
            { editStatusFlag ? ( <div className="edit-status-container">
                <button onClick={()=>{props.setUserStatus('online')}}>Online</button>
                <button onClick={()=>{props.setUserStatus('idle')}}>Idle</button>
                <button onClick={()=>{props.setUserStatus('do not disturb')}}>Do Not Disturb</button>
                <button onClick={()=>{props.setUserStatus('Invisible')}}>Invisible</button>
            </div> ) : (null) }
        </div>
    </div>
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
    { grabChannels, setUserStatus }
  )(UserToolbar)
  
