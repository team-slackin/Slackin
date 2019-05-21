import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { grabFriends } from './../../Ducks/friendReducer'
import { login } from './../../Ducks/userReducer'

import FriendsConstructor from '../FriendsConstructor/FriendsConstructor'

import './FriendsList.scss';

function FriendsList(props) {

    useEffect(()=>{
      if(props.friendReducer.friends){
        props.grabFriends()
      }
      }, [])

  return (
    <>
          { props.friendReducer.friends[0] ? 
          (props.friendReducer.friends.map((friend, i)=> (
            <FriendsConstructor key={i} friend={friend} /> ))
          ) : ( <span> Find some friends to add!</span> ) }
    </>
  )
}


const mapStateToProps = (reduxState) => ({
    friendReducer: reduxState.friendReducer,
    userReducer: reduxState.userReducer
})

export default connect(mapStateToProps, { login, grabFriends })(FriendsList)
