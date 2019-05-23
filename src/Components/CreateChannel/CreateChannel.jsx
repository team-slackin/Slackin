import React, {useState} from "react";
import { connect } from "react-redux";
import { createChannel } from "./../../Ducks/channelReducer";
import { login } from "./../../Ducks/userReducer";

function CreateChannel(props) {

  const [createChannelInfo, setCreateChannelInfo] = useState({
    channelName: '',
    channelIsPrivate: false
  })

  const handleSelectChange = e => {
    setCreateChannelInfo({
      ...createChannelInfo,
      channelIsPrivate: e.target.value
    })
    
  };

  const handleChannelInfoChange = (e) => {
    const { name, value } = e.target
    setCreateChannelInfo({
      ...createChannelInfo,
      [name]: value
    })

  }



  return (
    <div>
      <form onSubmit={(e)=>{e.preventDefault(); setCreateChannelInfo({ ...createChannelInfo, channelName: '' }); props.createChannel(createChannelInfo.channelName, createChannelInfo.channelIsPrivate) }}>
        <input placeholder='Enter Channel Name Here' onChange={(e)=>{handleChannelInfoChange(e)}} value={createChannelInfo.channelName} name='channelName'  />
              <select
                onChange={e => {
                  handleSelectChange(e);
                }}
              >
                <option name="channelIsPrivate" value={false}>
                  Public
                </option>
                <option name="channelIsPrivate" value={true}>
                  Private
                </option>

              </select>
            <button onClick={(e)=>{e.preventDefault(); setCreateChannelInfo({ ...createChannelInfo, channelName: '' }); props.createChannel(createChannelInfo.channelName, createChannelInfo.channelIsPrivate)}}>Create Channel</button>
      </form>
    </div>
  );
}

const mapStateToProps = reduxState => (
  {
    userReducer: reduxState.userReducer,
    channelReducer: reduxState.channelReducer
  }
);

export default connect(
  mapStateToProps,
  { createChannel, login }
)(CreateChannel);
