import axios from "axios"

const initialState = {
  user: {},
  message: "",
  loggedIn: false,
  images: []
};

export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"
export const LOGOUT = "LOGOUT"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const UPLOAD_USER_IMAGE_TO_DB = "UPLOAD_USER_IMAGE_TO_DB"
export const SET_USER_STATUS = "SET_USER_STATUS"
export const UPDATE_IS_USER_LOGGED_IN = "UPDATE_IS_USER_LOGGED_IN";
export const GRAB_ALL_IMAGES = 'GRAB_ALL_IMAGES';

export const updateIsUserLoggedIn = (data)=>{
  return {
    type: UPDATE_IS_USER_LOGGED_IN,
    payload: data
  };
};

export const uploadUserImageToDb = (type, url)=>{
  return { 
    type: UPLOAD_USER_IMAGE_TO_DB,
    payload: axios.post(`/api/database/amazon-url/${type}`, { url }).then(res => res.data).catch(err=>console.log(err))
   };
};

export const setUserStatus = (status)=>{
  return { 
    type: SET_USER_STATUS,
    payload: status
   }; 
};

export const grabAllImages = () => (
  {type: GRAB_ALL_IMAGES, payload: axios.get('/text-channel-images/').then(res=>res.data).catch(err=>console.log(err))}
);

export const updateUserInfo = (userInfoObject) =>{
  return {
    type: UPDATE_USER_INFO,
    payload: axios.put(`/api/updateuserinfo`, userInfoObject)
    .then(res => res.data.user)
    .catch((err)=>console.log(err))
  };
};

export const login = ({ email, password }) => {
  return {
  type: LOGIN,
  payload: axios
    .post("/api/login", { email, password })
    .then(res => res.data)
    .catch(err => console.log(err))
}}

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
  axios.post(`/api/logout`).then(res=>console.log(res.data.message))
  .catch(err => console.log(err))
  return { type: LOGOUT, payload: "im out" }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case LOGIN + "_PENDING":
      return { ...state };

    case LOGIN + "_FULFILLED": 
      return { ...state, ...payload };


    case UPLOAD_USER_IMAGE_TO_DB + "_PENDING":
      return { ...state };

    case UPLOAD_USER_IMAGE_TO_DB + "_FULFILLED":
      return { ...state, ...payload };

    case REGISTER + "_PENDING":
      return { ...state };

    case REGISTER + "_FULFILLED":
      return { ...state, ...payload };

    case UPDATE_USER_INFO + "_PENDING":
      return { ...state };

    case UPDATE_USER_INFO + "_FULFILLED":
      return { ...state, user: payload };

    case LOGOUT:
      return { ...state, user: {}, message: "", loggedIn: false }

    case SET_USER_STATUS: 
      return { 
        ...state, 
        user: { 
          user_id: state.user.user_id,
          email: state.user.email,
          first_name: state.user.first_name,
          last_name: state.user.last_name,
          user_display_name: state.user.user_display_name,
          user_image: state.user.user_image,
          user_status: payload
        }
      };
    
      case UPDATE_IS_USER_LOGGED_IN: 
        return {...state, user: payload, loggedIn: true};

      case GRAB_ALL_IMAGES + '_PENDING': 
        return {...state};

      case GRAB_ALL_IMAGES + '_FULFILLED': 
        return {...state, images: payload};

    default:
      return { ...state };
  };
};
