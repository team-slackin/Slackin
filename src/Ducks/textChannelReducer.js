const initialState = {
	messages: [],
	prevUser: null
};

const SET_MESSAGES = "SET_MESSAGES";
const SET_PREV_USER = 'SET_PREV_USER';	


export const setMessages = messages => {
	return {
		type: SET_MESSAGES,
		payload: messages
	};
};

export const setPrevUser = id => ({type: SET_PREV_USER, payload: id})

export default function reducer(state = initialState, action){
	const { type, payload } = action
	switch(type){
		
		case SET_PREV_USER: {
			return {...state, prevUser: payload};
		};

		case SET_MESSAGES: {
			return {...state, messages: [...state.messages, ...payload]}
		};

		default: {
			return {...state};
		};
	};
};