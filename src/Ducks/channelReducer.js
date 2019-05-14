import axios from "axios";

const initialState = {
  userChannels: [], 
  currentChannel: null,
  userSubChannels: [],
  currentSubChannel: null
};

// Eventually we will have deleteChannels and editChannels functions
const GRAB_CHANNELS = "GRAB_CHANNELS";

export const grabChannels = user_id => {
  const res = axios.get(`/api/channels/${user_id}`);
  return { type: GRAB_CHANNELS, payload: res };
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  console.log(type, payload);

  switch (type) {
    case GRAB_CHANNELS + "_PENDING":
      return { ...state };
    case GRAB_CHANNELS + "_FULFILLED":
      console.log(`from channelReducer line 24`, payload);
      return { ...state, userChannels: payload.data, currrentChannel: payload.data[0] };
    default:
      return { ...state };
  }
}
