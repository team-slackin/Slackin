import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { grabFriends } from './../../Ducks/friendReducer'
import { login } from './../../Ducks/userReducer'
import axios from 'axios';

import FriendsConstructor from '../FriendsConstructor/FriendsConstructor'
import FriendsUserConstructor from '../FriendsConstructor/FriendsUserConstructor';
import './FriendsList.scss';

function FriendsList(props) {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(()=>{
    axios.get(`/api/graballusers`)
      .then(res => { setListOfUsers(res.data) })
      .catch(err=>console.log(err))
  },[])

    useEffect(()=>{
      setTimeout(()=>{
        if(props.friendReducer.friends){
          props.grabFriends();
        }
      }, 3000)
      // eslint-disable-next-line
      }, [props.friendReducer.friends])

  return (
    <>
        <section className="friends-holder">

          <h5 style={{
            color: '#858991',
            marginTop: '10px',
            marginLeft: '10px'
          }}>Your friends</h5>

          {props.friendReducer.friends[0] ? 
          (props.friendReducer.friends.map((friend, i)=> (
            <FriendsConstructor key={i} friend={friend} /> ))
          ) : ( <span> Find some friends to add!</span> ) }
        </section>

          <div style={{
            boxShadow: '2px 1px 1px',
            width: '100%',
            height: '1px',
            margin: '0 auto',
            marginTop: '14px',
            marginBottom: '14px'
            }} />

        <section className="users-holder">
          {props.search ? (
            <>

              <h5 style={{
                textAlign: 'center',
                color: 'var(--main-color)'
              }}>Searching for a user</h5>

            {listOfUsers.map((user, i) => {
              if (user.user_display_name.includes(props.search)) {
                return (
                  <FriendsUserConstructor key={`${i}: friends`} user={user} />
                );
              };
              return <></>;
            })}

            </>
          ) : (
            <></>
          )}
        </section>
    </>
  )
}


const mapStateToProps = (reduxState) => ({
    friendReducer: reduxState.friendReducer,
    userReducer: reduxState.userReducer
})

export default connect(mapStateToProps, {login, grabFriends})(FriendsList)
