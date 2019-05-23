import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { grabChannels, addUserToChannel } from './../../Ducks/channelReducer'
import axios from 'axios'
import AddingUsersToChannelConstructor from './../AddingUsersToChannelConstructor/AddingUsersToChannelConstructor'
import './AddingUsersToChannel.scss'

function AddingUsersToChannel(props) {
    const [addUserToChannelFlag, setAddUserToChannelFlag] = useState(false)
    const [userQuery, setUserQuery] = useState('');
    const [listOfUsers, setListOfUsers] = useState([])

    useEffect(()=>{
      axios.get(`/api/graballusers`)
        .then(res => { setListOfUsers(res.data) })
        .catch(err=>console.log(err))
    },[])

    const toggleAddUserFlag = () => {
      setAddUserToChannelFlag(!addUserToChannelFlag)
    }

    const handleUserQueryChange = (e) => {
      setUserQuery(e.target.value);
    }

    const handleAddUser = (user_id, channel_id) => {
      props.addUserToChannel(user_id, channel_id)
      setUserQuery('');
      toggleAddUserFlag();
      alert('User has been added to the channel!')
    }



  return (
    <div>
        
        { props.currentChannel ? ( <div>
          { addUserToChannelFlag ? (<div>

            <form >
              <input name='userQuery' onChange={(e)=>{handleUserQueryChange(e)}} value={userQuery} placeholder="filter users by name" />
              <div style={{cursor: 'pointer'}} onClick={()=>{toggleAddUserFlag()}} >Cancel</div>
              { listOfUsers[0] ? ( 
              <div>{ listOfUsers.filter(( user, i )=>{ 
                return user.user_display_name.includes(userQuery) }).map(( user, i )=>{
                return <AddingUsersToChannelConstructor currentChannel={props.currentChannel} handleAddUser={handleAddUser} key={i} user={user} />
              }) }</div> ) : (<div>No Users To Display</div>) }
            </form>
          </div>) : (<div className='add-user-to-channel' onClick={()=>{toggleAddUserFlag()}} style={{ cursor: 'pointer' }}>+ Add a person to the channel</div>) }
        </div> ) : ( null ) }


    </div>
  )
}

const mapStateToProps = (reduxState) => {
    return reduxState.channelReducer
}

export default connect( mapStateToProps, { grabChannels, addUserToChannel } )(AddingUsersToChannel)
