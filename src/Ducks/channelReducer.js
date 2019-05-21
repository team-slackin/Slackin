import axios from "axios";

const initialState = {
  userChannels: [],
  currentChannel: null,
  currentCreator: null,
  userSubChannels: [],
  usersFromChannel: [],
  queriedFlag: false
};

// Eventually we will have deleteChannels and editChannels functions
const GRAB_CHANNELS = "GRAB_CHANNELS";
const CREATE_CHANNEL = "CREATE_CHANNEL";
const UPDATE_CHANNEL_IMAGE = "UPDATE_CHANNEL_IMAGE";
const GRAB_CHANNELS_WITH_QUERY = "GRAB_CHANNELS_WITH_QUERY";
const USER_SELECTED_CHANNEL = "USER_SELECTED_CHANNEL";
const REMOVE_SELECTED_CHANNEL = 'REMOVE_SELECTED_CHANNEL';
const GRAB_USERS_FROM_CHANNEL = 'GRAB_USERS_FROM_CHANNEL';


export const createChannel = (channelName, channelIsPrivate) => ({
  type: CREATE_CHANNEL, 
  payload: axios.post(`/api/database/createchannel`, { channelName, channelIsPrivate }).then(res => res.data).catch(err=>console.log(err))
});

export const updateChannelImageToDb = (channel_id, url) => ({
  type: UPDATE_CHANNEL_IMAGE, 
  payload: axios.post(`/api/database/updatechannel`, { channel_id, url }).then(res => res.data).catch(err=>console.log(err))
});


export const removeSelectedChannel = () => ({type: REMOVE_SELECTED_CHANNEL, payload: null});


export const grabChannels = user_id => {
  const res = axios.get(`/api/channels/${user_id}`);
  return { type: GRAB_CHANNELS, payload: res };
};

export const grabChannelsWithQuery = searchInput => {
  return { type: GRAB_CHANNELS_WITH_QUERY, payload: axios.get(`/api/queriedchannels?search=${searchInput}`)
    .then(res=>res.data).catch(err=>console.log(err)) 
  }
}

export const grabUsersFromChannel = channel_id => {
  return { 
    type: GRAB_USERS_FROM_CHANNEL, 
    payload: axios.get(`/api/grabusersfromchannel/${channel_id}`).then(res=>res.data).catch(err=>console.log(err)) 
  };
};

export const userSelectedChannel = (channel_id, channel_creator) => ({
  type: USER_SELECTED_CHANNEL,
  payload: { channel_id, channel_creator}
})

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GRAB_CHANNELS + "_PENDING": {
      return { ...state };
    };

    case GRAB_CHANNELS + "_FULFILLED": {
      return {...state, userChannels: payload.data};
    };

    case GRAB_CHANNELS_WITH_QUERY + "_PENDING": {
      return { ...state };
    };

    case GRAB_CHANNELS_WITH_QUERY + "_FULFILLED": {
      console.log(`from line 63 channelReducer`, payload)
      return {...state, userChannels: payload};
    };

    case GRAB_USERS_FROM_CHANNEL + "_PENDING": {
      return { ...state };
    };

    case GRAB_USERS_FROM_CHANNEL + "_FULFILLED": {
      return {...state, usersFromChannel: payload};
    };
      
    case REMOVE_SELECTED_CHANNEL: {
      return {...state, currentChannel: payload};
    };

    case USER_SELECTED_CHANNEL: {
      return { ...state, currentChannel: payload.channel_id, currentCreator: payload.channel_creator };
    };

    case CREATE_CHANNEL + '_PENDING': {
      return {...state};
    };
    case CREATE_CHANNEL + '_FULFILLED': {
      return {...state, userChannels: payload};
    };

    case UPDATE_CHANNEL_IMAGE + '_PENDING': {
      return {...state};
    };
    case UPDATE_CHANNEL_IMAGE + '_FULFILLED': {
      return {...state, userChannels: payload};
    };
    default:
      return { ...state };
  };
};
