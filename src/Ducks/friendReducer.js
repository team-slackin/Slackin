import axios from 'axios';

const initialState = {
  friends: [],
  currentFriend: {},
};

const FRIENDS = 'FRIENDS';
const GRAB_FRIENDS = 'GRAB_FRIENDS';
const SET_CURRENT_FRIEND = 'SET_CURRENT_FRIEND';
const RESET_CURRENT_FRIEND = 'RESET_CURRENT_FRIEND'

export const grabFriends = () => {
  return ({
    type: GRAB_FRIENDS,
    payload: axios.get(`/api/grabfriends`).then(res=>res.data).catch(err=>console.log(err))
  })
}


export const makeCurrentFriend = (friend) => ({type: SET_CURRENT_FRIEND, payload: friend})


export const resetCurrentFriend = () => {
  const data = {chatkit_id: null}
  return {
    type: RESET_CURRENT_FRIEND,
    payload: data
  }
}


export default function reducer(state=initialState, action) {
  const {type, payload} = action;
  
  switch(type) {
    case FRIENDS + '_PENDING': {
      return {...state};
    };
    case FRIENDS + '_FULFILLED': {
      return {...state, ...payload};
    };
    case GRAB_FRIENDS + '_PENDING': {
      return {...state};
    };
    case GRAB_FRIENDS + '_FULFILLED': {
      return {...state, friends: payload};
    };
    case SET_CURRENT_FRIEND: {
      return {...state, currentFriend: payload};
    };
    case RESET_CURRENT_FRIEND: {
      return {...state, currentFriend: payload}
    }
    default: {
      return {...state};
    };
  };
};