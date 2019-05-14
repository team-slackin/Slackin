import axios from "axios"

const initialState = {
  user: {},
  message: "",
  loggedIn: false
}

export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"
export const LOGOUT = "LOGOUT"

export const login = ({ email, password }) => ({
  type: LOGIN,
  payload: axios
    .post("/api/login", { email, password })
    .then(res => res.data)
    .catch(err => console.log(err))
})

export const register = ({
  email,
  password,
  user_display_name,
  first_name,
  last_name
}) => ({
  type: REGISTER,
  payload: axios
    .post("/api/register", {
      email,
      password,
      user_display_name,
      first_name,
      last_name
    })
    .then(res => res.data)
    .catch(err => console.log(err))
})

export const logout = () => {
  axios
    .get(`/api/logout`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  return { type: LOGOUT, payload: "im out" }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case LOGIN + "_PENDING":
      return { ...state }

    case LOGIN + "_FULFILLED":
      return { ...state, ...payload }

    case REGISTER + "_PENDING":
      return { ...state }

    case REGISTER + "_FULFILLED":
      return { ...state, ...payload }

    case LOGOUT + "_PENDING":
      return { ...state }

    case LOGOUT + "_FULFILLED":
      return { ...state, user: {}, message: "", loggedIn: false }

    default:
      return { ...state }
  }
}
