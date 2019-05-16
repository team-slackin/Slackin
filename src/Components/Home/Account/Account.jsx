import React, {useState, useEffect} from 'react';
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux';
import { logout, login, register, updateUserInfo } from './../../../Ducks/userReducer'
import Drop from './../../DropZone/DropZone'

function Account(props) {
  const [editFlag, setEditFlag] = useState(false)

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  })

  async function handleLogout(){
    await props.logout();
    alert('Logout successful')
    props.history.push('/')
  }

  let toggleEdit = ()=>{
    setEditFlag(!editFlag);
  }

  function userInfoHandle(e) {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
    if (name !== 'password') console.log(userInfo)
  }

  async function handleUpdateUserInfo(){
    await props.updateUserInfo({
      id: props.user.user_id,
      username: userInfo.username,
      password: userInfo.password
    })
    toggleEdit();
  }


  return (
    <>
    
    {/* Displays User Info */}
    {editFlag ? (<div className='editing'>
        <div>
          <div>
            <img src={props.user.user_image} alt='change avatar' width='200'  />
            <Drop type={'user'} />
          </div>
          <div>

            <form>
              <div>USERNAME</div>
              <input onChange={e => {
                userInfoHandle(e)
              }} name='username' placeholder={props.user.user_display_name} />
              <div>CURRENT PASSWORD</div>
              <input onChange={e => {
                userInfoHandle(e)
              }} name='password' type='password' />
            </form>

          </div>
        </div>
        <div>
          <button onClick={()=>{toggleEdit()}}>Cancel</button>
          <button onClick={()=>{handleUpdateUserInfo()}}>Save</button>
        </div>
      </div>) : ( <div className='edit-container'>
        <div>
          <div>
            <img src={props.user.user_image} alt='users profile pic' width='200' />
          </div>
          <div>
            <div>USERNAME</div>
            <div>{props.user.user_display_name}</div>
            <div>EMAIL</div>
            <div>{props.user.email}</div>
          </div>
        </div>
        <div>
          <button onClick={()=>{toggleEdit()}}>Edit</button>
        </div>
      </div>)}

      <Link to='/container' >Go to LandingPage</Link>
      <button onClick={()=>{handleLogout()}}>Logout</button>
    </>
  );
};

const mapStateToProps = (reduxState) => reduxState.userReducer;

export default connect(mapStateToProps, { logout, login, register, updateUserInfo })(Account);
