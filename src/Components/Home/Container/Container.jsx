import React, { useState} from "react";
import { Link} from "react-router-dom";
import io from "socket.io-client";
import { connect } from "react-redux";

import MainChannelNav from "../../MainChannelNav/MainChannelNav";
import SubChannelNav from "../../SubChannelsNav/SubChannelNav";
import SubPrivateNav from '../../SubPrivateNav/SubPrivateNav';
import TextChannelWindow from '../../TextChannelWindow/TextChannelWindow';
import UserToolbar from './../../UserToolbar/UserToolbar';

import './Container.scss';

function Container(props) {
/*
          <Link to="/account">Go to Account Settings</Link>
          <Link to="/">To Home Page Temp</Link>
 */
  return (
    <>
       
        <MainChannelNav />

        <main className="main-container">
          <>
            {props.currentChannel ? (
              <SubChannelNav channel_id={props.currentChannel} />
            ) :
             <SubPrivateNav />
              }
          </>

          <section className="text-channel-window">
            <TextChannelWindow />
          </section>       

        </main>
    </>
  )
}

const mapStateToProps = reduxState => reduxState.channelReducer;

export default connect(mapStateToProps, {/* No functions to import */})(Container);
