import React from "react";
import { connect } from "react-redux";

import MainChannelNav from "../../MainChannelNav/MainChannelNav";
import SubChannelNav from "../../SubChannelsNav/SubChannelNav";
import SubPrivateNav from "../../SubPrivateNav/SubPrivateNav";
import TextChannelWindow from "../../TextChannelWindow/TextChannelWindow";
import FriendsChatWindow from "../../FriendsChatWindow/FriendsChatWindow";

import "./Container.scss";
import { tsPropertySignature } from "@babel/types";

function Container(props) {
  return (
    <>
      <MainChannelNav />

      <main className="main-container">
        <section className="sub-nav">
          {props.currentChannel ? (
            <SubChannelNav channel_id={props.currentChannel} />
          ) : (
            <SubPrivateNav />
          )}
        </section>

        <section className="text-channel-window">
          {props.currentChannel ? (
            <TextChannelWindow />
          ) : (
            <FriendsChatWindow />
          )}
        </section>
      </main>
    </>
  );
};

const mapStateToProps = reduxState => reduxState.channelReducer;

export default connect(
  mapStateToProps,
  {
    /* No functions to import */
  }
)(Container);
