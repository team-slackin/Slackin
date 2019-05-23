import axios from "axios"

const initialState = {
  subChannels: [],
  currentSubChannel: null,
  currentSubChannelChatKitId: null,
  neverLoadAgain: false
}

const GRAB_SUBCHANNELS = "GRAB_SUBCHANNELS"
const USER_SELECTED_SUBCHANNEL = "USER_SELECTED_SUBCHANNEL"
const RESET_CURRENT_SUB_CHANNEL_CHAT_KIT_ID = "RESET_CURRENT_SUB_CHANNEL_CHAT_KIT_ID"
const LOAD_AGAIN = 'LOAD_AGAIN';

export const setNeverLoadAgain = (boolean) => {
  return {type: LOAD_AGAIN, payload: boolean};
};
export const grabSubChannels = channel_id => {
  return {
    type: GRAB_SUBCHANNELS,
    payload: axios.get(`/api/subchannels/${channel_id}`)
  };
};

export const userSelectedSubChannel = (subchannel_id, sub_channel_chatkit_id,subchannel) => {
  const data = {subchannel_id, sub_channel_chatkit_id, subchannel}
  return {
    type: USER_SELECTED_SUBCHANNEL,
    payload: data
  };
};

export const resetCurrentSubChannelChatKitId = () => {
  return {
    type: RESET_CURRENT_SUB_CHANNEL_CHAT_KIT_ID,
    payload: null
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_AGAIN: 
      return {...state, neverLoadAgain: payload};

    case GRAB_SUBCHANNELS + "_PENDING":
      return { ...state };

    case GRAB_SUBCHANNELS + "_FULFILLED":
      return {
        ...state,
        subChannels: payload.data
      };

    case USER_SELECTED_SUBCHANNEL:
      return {...state, currentSubChannel: payload.subchannel_id, currentSubChannelChatKitId: payload.sub_channel_chatkit_id}
      
    case RESET_CURRENT_SUB_CHANNEL_CHAT_KIT_ID:
      return {...state, currentSubChannelChatKitId: payload};

    default:
      return { ...state }
  }
}
