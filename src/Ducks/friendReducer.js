import axios from 'axios';

const initialState = {
  friends: []
};

const FRIENDS = 'FRIENDS';
const GRAB_FRIENDS = 'GRAB_FRIENDS';

export const grabFriends = () => {
  return ({
    type: GRAB_FRIENDS,
    payload: axios.get(`/api/grabfriends`).then(res=>res.data).catch(err=>console.log(err))
  })
}




export default function reducer(state=initialState, action) {
  const {type, payload} = action;
  
  switch(type) {
    case FRIENDS + '_PENDING':
      return {...state};
    case FRIENDS + '_FULFILLED':
      return {...state, ...payload};
    case GRAB_FRIENDS + '_PENDING':
      return {...state};
    case GRAB_FRIENDS + '_FULFILLED':
      return {...state, friends: payload};
    default: 
      return {...state};
  };
};