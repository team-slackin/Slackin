import React from "react";
import { connect } from "react-redux";

import MainChannelNav from "../../MainChannelNav/MainChannelNav";
import SubChannelNav from "../../SubChannelsNav/SubChannelNav";
import SubPrivateNav from '../../SubPrivateNav/SubPrivateNav';
import TextChannelWindow from '../../TextChannelWindow/TextChannelWindow';

import './Container.scss';

const Container = (props) => (
  <> 
      {console.log('11111',props.currentChannel,'11111')}
      <MainChannelNav />

        <main className="main-container">
          <section className="sub-nav">
            {props.currentChannel ? (
              <SubChannelNav channel_id={props.currentChannel} />
            ) :
             <SubPrivateNav />
              }
          </section>

          <section className="text-channel-window">
            <TextChannelWindow />
          </section>       

        </main>
    </>
);

const mapStateToProps = reduxState => reduxState.channelReducer;

export default connect(mapStateToProps, {/* No functions to import */}) (Container);
