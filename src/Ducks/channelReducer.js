import axios from 'axios';

const initialState = {

};

const GRAB_CHANNELS = 'GRAB_CHANNELS';

export const grabChannels = async() => ({type: GRAB_CHANNELS, payload: await axios.get('/api/channels').then(res=>res.data).catch(err=>console.log(err))});

export default function reducer(state=initialState, action) {
  const {type, payload} = action;
  
  switch(type) {
    case GRAB_CHANNELS + '_PENDING':
      return {...state};
    case GRAB_CHANNELS + '_FULFILLED':
      return {...state, ...payload};
    default: 
      return {...state};
  };
};