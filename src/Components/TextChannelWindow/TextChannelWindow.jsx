import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import TextChannelMessegeScreen from './TextChannelMessegeScreen';

function TextChannelWindow(props) {


  useEffect(() => {
    const {user_display_name, user_id} = props
       async function setUpChatkitUser() {
        await axios.post('/chatkit/users', {user_display_name, user_id })
       }
       setUpChatkitUser()
      }, [])



  return (
    <div>{/* Where everything comes together */}
      <TextChannelMessegeScreen />
    </div>
  );
};

const mapStateToProps = reduxState => reduxState.userReducer

export default connect(mapStateToProps, {})(TextChannelWindow);
