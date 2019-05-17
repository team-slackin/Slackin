import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import TextChannelMessegeScreen from './TextChannelMessegeScreen';

function TextChannelWindow(props) {


  useEffect(() => {
    console.log(props)
    const {user_display_name, user_id} = props.user;
       async function setUpChatkitUser() {
        await axios.post('/chatkit/users', { user_display_name, user_id })
       }
       setUpChatkitUser()
      }, [])



  return (
    <>{/* Where everything comes together */}
      <header>Sub Channel name</header>
      <div className="text-channel-flex-box">
      <TextChannelMessegeScreen />
      <aside>users</aside>

      </div>
    </>
  );
};

const mapStateToProps = reduxState => reduxState.userReducer

export default connect(mapStateToProps, {})(TextChannelWindow);
