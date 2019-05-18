import React, {useState, useEffect} from 'react'
import { connect } from "react-redux"
import { grabChannels } from "./../../Ducks/channelReducer"
import { setUserStatus } from "./../../Ducks/userReducer"
import {Link} from 'react-router-dom'

import './UserToolbar.scss';


function UserToolbar(props) {
    const [editStatusFlag, setEditStatusFlag] = useState(false)
    const [currentUserStatus, setCurrentUserStatus] = useState('online')
    const [currentUserStatusColor, setCurrentUserStatusColor] = useState('#689f38')

    let toggleStatusEdit = ()=>{
        setEditStatusFlag(!editStatusFlag);
      }
      console.log(props)
  return (
    <aside className="user-tool-bar">
      {editStatusFlag ? ( 
        <div className="edit-status-container">
          <button onClick={()=>{
            props.setUserStatus('online');
            setCurrentUserStatusColor('#689f38');
            
            }}>Online</button>
          <button onClick={()=>{
            props.setUserStatus('idle');
            setCurrentUserStatusColor('white');
            
            }}>Idle</button>
          <button onClick={()=>{
            props.setUserStatus('do not disturb');
            setCurrentUserStatusColor('red');
            
            }}>Do Not Disturb</button>
          <button onClick={()=>{
            props.setUserStatus('Invisible');
            setCurrentUserStatusColor('gray');
            
            }}>Invisible</button>
        </div>
        ) : (null)
       }

        <div class="user-tool-bar-information">
          <div onClick={()=>{toggleStatusEdit()}}className='image-container'>
            <img src={props.userReducer.user.user_image} className="user-tool-bar-image" />
          </div>

          <div className="user-tool-bar-username">{props.userReducer.user.user_display_name}</div>
          <div className="user-tool-bar-status" style={{backgroundColor: `${currentUserStatusColor}`}}></div>
        
          <div className="user-tool-bar-cog" onClick={toggleStatusEdit}>COG</div>
        </div>

        <Link to='/container/account'>Go to Settings</Link>
    </aside>
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
  
