const initialState = {
  addOrSearchFlag: false,
  addChannelFlag: false,
  searchChannelsFlag: false
};

const ADD_SEARCH_FLAG = 'ADD_SEARCH_FLAG';
const ADD_CHANNEL_FLAG = 'ADD_CHANNEL_FLAG';
const SEARCH_CHANNEL_FLAG = 'SEARCH_CHANNEL_FLAG';

export const toggleAddChannelFlag = () => { 
  return {type: ADD_CHANNEL_FLAG, payload: ''};
};

export const toggleSearchChannelsFlag = () => { 
  return {type: ADD_SEARCH_FLAG, payload: ''};
};

export const toggleAddOrSearchFlag = () => { 
  return {type: SEARCH_CHANNEL_FLAG, payload: ''};
};

export default function reducer(state = initialState, action) {
  const { type } = action
  switch (type) {
    case ADD_SEARCH_FLAG: 
      return {...state, addOrSearchFlag: !state.addOrSearchFlag}

    case ADD_CHANNEL_FLAG: 
      return {...state, addChannelFlag: !state.addChannelFlag}

    case SEARCH_CHANNEL_FLAG: 
      return {...state, searchChannelsFlag: !state.searchChannelsFlag}

    default: 
      return { ...state };

  };
};
