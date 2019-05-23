import React, {useEffect} from "react";
import { connect } from "react-redux";

import MainChannelNav from "../../MainChannelNav/MainChannelNav";
import SubChannelNav from "../../SubChannelsNav/SubChannelNav";
import SubPrivateNav from "../../SubPrivateNav/SubPrivateNav";
import TextChannelWindow from "../../TextChannelWindow/TextChannelWindow";
import {grabAllImages} from '../../../Ducks/userReducer';
import "./Container.scss";

function Container(props) {

  useEffect(() => {
    props.grabAllImages();
  }, [])

  return (
    <>
      <MainChannelNav />

      <main className="main-container">
        <section className="sub-nav">
          {props.channelReducer.currentChannel ? (
            <SubChannelNav channel_id={props.channelReducer.currentChannel} />
          ) : (
            <SubPrivateNav />
          )}
        </section>

        <section className="text-channel-window">
          {/* {props.currentChannel ? (
            <TextChannelWindow />
          ) : (
            <FriendsChatWindow />
          )} */}
          <TextChannelWindow />
        </section>
      </main>
    </>
  );
};

const mapStateToProps = reduxState => ({
  channelReducer: reduxState.channelReducer,
  userReducer: reduxState.userReducer
});

export default connect(
  mapStateToProps,
  {
    grabAllImages
  }
)(Container);
