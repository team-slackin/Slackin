import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';

import CreateChannel from '../CreateChannel/CreateChannel';
import SearchChannels from '../SearchChannels/SearchChannels';

import {
  toggleAddChannelFlag,
  toggleAddOrSearchFlag,
  toggleSearchChannelsFlag
} from '../../Ducks/addChannelReducer';

import './NewChannel.scss';

function NewChannel(props) {
const [addChannelReducer, setUpdateState] = useState();
  
  useEffect(
    ()=> {
      setUpdateState(props.addChannelReducer);
    }, [props.addChannelReducer]
  )

  const display = () => {
    if(addChannelReducer) {
      if (
        addChannelReducer.addOrSearchFlag && 
        addChannelReducer.addChannelFlag && 
        addChannelReducer.searchChannelsFlag) {
        return (
          <section className="new-channel-window">
            <div className="new-channel-window-div">
              <div className="create-channels">
                <CreateChannel />
                <Button onClick={()=>{ props.toggleAddChannelFlag()}} >Cancel Creating A Channel</Button>
              </div> 
              <Button onClick={()=>{ props.toggleAddOrSearchFlag()}} >Cancel</Button>
            </div>
          </section>
        );
      } else if (
        addChannelReducer.searchChannelsFlag && 
        addChannelReducer.addChannelFlag){
        return (
          <section className="new-channel-window">
            <div className="new-channel-window-div">
              <div className="create-channels">
                <CreateChannel />
                <Button onClick={()=>{ props.toggleAddChannelFlag()}} >Cancel Creating A Channel</Button>
              </div> 
              <Button onClick={()=>{ props.toggleAddOrSearchFlag()}} >Cancel</Button>
            </div>
          </section>
        );
      } else if (
        addChannelReducer.addOrSearchFlag && 
        addChannelReducer.searchChannelsFlag) {
        return (
          <section className="new-channel-window">
            <div className="new-channel-window-div">
              <Button onClick={()=>{ props.toggleAddChannelFlag()}} >Create A Channel</Button>
              <Button onClick={()=>{ props.toggleAddOrSearchFlag()}} >Cancel</Button>
            </div>
          </section>
        );
      } else if (addChannelReducer.searchChannelsFlag) {
        return (
          <section className="new-channel-window">
            <div className="new-channel-window-div">
              <Button onClick={()=>{ props.toggleAddChannelFlag()}} >Create A Channel</Button>
              <Button onClick={()=>{ props.toggleAddOrSearchFlag()}} >Cancel</Button>
            </div>
          </section>
        );
      } else {
        return <></>
      };
    } else {
      return <></>
    }
  };

  return <>
  {display()}
  </>
};

const mapStateToProps = (reduxState) => ({addChannelReducer: reduxState.addChannelReducer});

export default connect (mapStateToProps, {
  toggleAddChannelFlag,
  toggleAddOrSearchFlag,
  toggleSearchChannelsFlag
}) (NewChannel);