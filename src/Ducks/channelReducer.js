import axios from "axios"

const initialState = {
  userChannels: [],
  currentChannel: null,
  userSubChannels: [],
}

// Eventually we will have deleteChannels and editChannels functions
const GRAB_CHANNELS = "GRAB_CHANNELS";
const USER_SELECTED_CHANNEL = "USER_SELECTED_CHANNEL";
const UPLOAD_CHANNEL_IMAGE_TO_DB = "UPLOAD_CHANNEL_IMAGE_TO_DB";
const REMOVE_SELECTED_CHANNEL = 'REMOVE_SELECTED_CHANNEL';


export const uploadChannelImageToDb = (type, url, channel_id) => ({type: UPLOAD_CHANNEL_IMAGE_TO_DB, payload: axios.post(`/api/database/amazon-url/${type}`, {url, channel_id}).then(res => res.data).catch(err=>console.log(err))});
export const removeSelectedChannel = () => ({type: 'REMOVE_SELECTED_CHANNEL', payload: null});


export const grabChannels = user_id => {
  const res = axios.get(`/api/channels/${user_id}`)
  return { type: GRAB_CHANNELS, payload: res }
}

export const userSelectedChannel = channel_id => ({
  type: USER_SELECTED_CHANNEL,
  payload: channel_id
})

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GRAB_CHANNELS + "_PENDING": {
      return { ...state };
    };

    case GRAB_CHANNELS + "_FULFILLED": {
      return {
        ...state,
        userChannels: payload.data
      };
    };
      
    case REMOVE_SELECTED_CHANNEL + '_PENDING': {
      return {...state};
    };

    case REMOVE_SELECTED_CHANNEL + '_FULFILLED': {
      return {...state, currentChannel: payload};
    };

    case USER_SELECTED_CHANNEL: {
      return { ...state, currentChannel: payload };
    };

    case UPLOAD_CHANNEL_IMAGE_TO_DB + '_PENDING': {
      return {...state};
    };
    case UPLOAD_CHANNEL_IMAGE_TO_DB + '_PENDING': {
      return {...state};
    };
    default:
      return { ...state }
  }
}
