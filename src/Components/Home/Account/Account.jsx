import React, {useState, useEffect} from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout, login, register, updateUserInfo } from './../../../Ducks/userReducer';
import {removeSelectedChannel} from '../../../Ducks/channelReducer';
import {Input} from '@material-ui/core';

import Drop from './../../DropZone/DropZone'

import './Account.scss';

function Account(props) {
  const [editFlag, setEditFlag] = useState(false)

  const [userInfo, setUserInfo] = useState({
    username: `${props.user.user_display_name}`,
    password: "",
    confirmPassword: ""
  });

  async function handleLogout(){
    await props.logout();
    await props.removeSelectedChannel();
    props.history.push('/')
  };

  let toggleEdit = ()=>{
    setEditFlag(!editFlag);
  };

  function userInfoHandle(e) {
    const { name, value } = e.target
    setUserInfo({...userInfo, [name]: value});
  };

  async function handleUpdateUserInfo(){
    if(userInfo.password === userInfo.confirmPassword && userInfo.password && userInfo.confirmPassword) {
      await props.updateUserInfo({
        id: props.user.user_id,
        username: userInfo.username || props.user.user_display_name,
        password: userInfo.password
      });
      alert(`Updated password!`);
      toggleEdit();
    } else {
      alert('Please Leave no feild empty');
    };
  };


  return (
    <section className="account">

      {editFlag ? (
      <div className="account-main">

        <div className="image-name-holder">
          <div>
            <img style={{ borderRadius: '50%' }} src={props.user.user_image} alt='change avatar' width='100'  />
            <h1>{props.user.user_display_name}</h1>
          </div>
          <Drop type={'user'} />
        </div>

        <form className="account-settings">
          <div className="input-border">
            <Input onChange={e=>{userInfoHandle(e)}} name='username' placeholder="New user name" />
          </div>

          <div className="input-border">
            <Input onChange={e=>{userInfoHandle(e)}} name='password' type='password' placeholder="New password" />
          </div>

          <div className="input-border">
            <Input onChange={e=>{userInfoHandle(e)}} name='confirmPassword' type='password' placeholder="Confirm password" />        
          </div>
        </form>

        <div className="account-bottom-bar">
          <button onClick={()=>{toggleEdit()}}>Cancel</button>
          <button onClick={()=>{handleUpdateUserInfo()}}>Save</button>
        </div>
          
      </div> 
      
      ) : ( 

      <div className="account-main">
        
      <div className="image-name-holder">
        <div>
          <img src={props.user.user_image} alt='users profile pic' />
          <h1>{props.user.user_display_name}</h1>
        </div>
        <button onClick={()=>{toggleEdit()}}>Edit</button>
      </div>
        
        <div className="account-settings">
          <p>EMAIL: {props.user.email}</p>
        </div>

        <div className="account-bottom-bar">
          <button onClick={()=>{handleLogout()}}>Logout</button>
          <Link to='/container'>Go back</Link>
        </div>

      </div>
      )}

    </section>
  );
};

const mapStateToProps = (reduxState) => reduxState.userReducer;

export default connect(mapStateToProps, { logout, login, register, updateUserInfo, removeSelectedChannel })(Account);
