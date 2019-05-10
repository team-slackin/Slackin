import axios from 'axios';

const initialState = {

};

const LOGIN = 'LOGIN';

export default function reducer(state=initialState, action) {
  const {type, payload} = action;
  
  switch(type) {
    case LOGIN + '_PENDING':
      return {...state};
    case LOGIN + '_FULFILLED':
      return {...state, ...payload};
    default: 
      return {...state};
  };
};