const initialState = {
	messages: []
}

const SET_MESSAGES = "SET_MESSAGES"


export const setMessages = messages => {
	return {
		type: SET_MESSAGES,
		payload: messages
	}
}

export default function reducer(state = initialState, action){
	const { type, payload } = action
	switch(type){
		case SET_MESSAGES:
		return {...state, messages: [...state.messages, ...payload]}
		default:
		return {...state}
	}
}