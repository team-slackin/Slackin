import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { grabFriends } from './../../Ducks/friendReducer'
import { login } from './../../Ducks/userReducer'
import FriendsConstructor from './../FriendsContstructor/FriendsConstructor'


function FriendsList(props) {

    useEffect(()=>{
        props.grabFriends()
      }, [props.friends])

  return (
    <>
      <div>
          { props.friendReducer.friends[0] ? ( <div>
              {props.friendReducer.friends.map((friend, i)=>{ return (<FriendsConstructor key={i} friend={friend} />) })}
          </div> ) : ( <div> NO FRIENDS TO DISPLAY YOU LOSER </div> ) }
      </div>
    </>
  )
}


const mapStateToProps = (reduxState) => ({
    friendReducer: reduxState.friendReducer,
    userReducer: reduxState.userReducer
})

export default connect(mapStateToProps, { login, grabFriends })(FriendsList)
