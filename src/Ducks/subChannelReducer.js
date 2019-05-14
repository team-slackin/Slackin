import axios from "axios"

const initialState = {
  subChannels: []
}

const GRAB_SUBCHANNELS = "GRAB_SUBCHANNELS"

export const grabSubChannels = channel_id => {
  return {
    type: GRAB_SUBCHANNELS,
    payload: axios.get(`/api/subchannels/${channel_id}`)
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
    default:
      return { ...state }
  }
}
