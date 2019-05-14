import axios from "axios";

const initialState = {
  userChannels: [], 
  currentChannel: null,
  userSubChannels: [],
  currentSubChannel: null
};

// Eventually we will have deleteChannels and editChannels functions
const GRAB_CHANNELS = "GRAB_CHANNELS";
const SET_CHANNEL = "SET_CHANNEL";

export const grabChannels = user_id => {
  const res = axios.get(`/api/channels/${user_id}`);
  return { type: GRAB_CHANNELS, payload: res };
};

export const setChannel = channel_id => {
  return { type: SET_CHANNEL, payload: channel_id };
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  console.log(type, payload);

  switch (type) {
    case GRAB_CHANNELS + "_PENDING":
      return { ...state };
    case GRAB_CHANNELS + "_FULFILLED":
      console.log(`from channelReducer line 24`, payload);
      console.log(`from channelsreducer as well`, state)
      return { ...state, userChannels: payload.data };

    case SET_CHANNEL:
      return {...state, currentChannel: payload}
    default:
      return { ...state };
  }
}
