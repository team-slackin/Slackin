import axios from "axios"

const initialState = {
  subChannels: [],
  currentSubChannel: null
}

const GRAB_SUBCHANNELS = "GRAB_SUBCHANNELS"
const USER_SELECTED_SUBCHANNEL = "USER_SELECTED_SUBCHANNEL"

export const grabSubChannels = channel_id => {
  return {
    type: GRAB_SUBCHANNELS,
    payload: axios.get(`/api/subchannels/${channel_id}`)
  }
}

export const userSelectedSubChannel = subchannel_id => {
  return {
    type: USER_SELECTED_SUBCHANNEL,
    payload: subchannel_id
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GRAB_SUBCHANNELS + "_PENDING":
      return { ...state }
    case GRAB_SUBCHANNELS + "_FULFILLED":
      return {
        ...state,
        subChannels: payload.data
      }
      case USER_SELECTED_SUBCHANNEL:
      return {...state, currentSubChannel: payload}
    default:
      return { ...state }
  }
}
