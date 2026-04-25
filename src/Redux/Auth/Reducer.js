import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  LOGIN_TWO_STEP_FAILURE,
  LOGIN_TWO_STEP_SUCCESS,
  VERIFY_RESET_PASSWORD_OTP_FAILURE,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  ENABLE_TWO_STEP_AUTHENTICATION_REQUEST,
  ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS,
  ENABLE_TWO_STEP_AUTHENTICATION_FAILURE,
} from "./ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
  verified: false,
  twoFactorEnabled: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case VERIFY_OTP_REQUEST:
      return { ...state, loading: true, error: null, verified: false };

    case VERIFY_OTP_SUCCESS:
      return { ...state, loading: false, verified: true };

    case ENABLE_TWO_STEP_AUTHENTICATION_REQUEST:
      return { ...state, loading: true, error: null, twoFactorEnabled: false };

    case ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS:
      return { ...state, loading: false, twoFactorEnabled: true };

    case REGISTER_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

    case LOGIN_TWO_STEP_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        fetchingUser: false,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
    case LOGIN_TWO_STEP_FAILURE:
    case VERIFY_RESET_PASSWORD_OTP_FAILURE:
    case VERIFY_OTP_FAILURE:
    case ENABLE_TWO_STEP_AUTHENTICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        verify: false,
        twoFactorEnabled: false,
      };
    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...state, jwt: null, user: null };
    default:
      return state;
  }
};

export default authReducer;
