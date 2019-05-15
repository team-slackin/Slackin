import axios from "axios"

const initialState = {
  userChannels: [],
  currentChannel: null,
  userSubChannels: [],
}

// Eventually we will have deleteChannels and editChannels functions
const GRAB_CHANNELS = "GRAB_CHANNELS"
const USER_SELECTED_CHANNEL = "USER_SELECTED_CHANNEL"
const UPLOAD_CHANNEL_IMAGE_TO_DB = "UPLOAD_CHANNEL_IMAGE_TO_DB"

export const uploadChannelImageToDb = (type, url, channel_id) => {

}

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
    case GRAB_CHANNELS + "_PENDING":
      return { ...state }
    case GRAB_CHANNELS + "_FULFILLED":
      return {
        ...state,
        userChannels: payload.data,
        currrentChannel: payload.data[0]
      }
    case USER_SELECTED_CHANNEL:
      return { ...state, currentChannel: payload }
    default:
      return { ...state }
  }
}
