import axios from 'axios';

const initialState = {

};

const FRIENDS = 'FRIENDS';

export default function reducer(state=initialState, action) {
  const {type, payload} = action;
  
  switch(type) {
    case FRIENDS + '_PENDING':
      return {...state};
    case FRIENDS + '_FULFILLED':
      return {...state, ...payload};
    default: 
      return {...state};
  };
};