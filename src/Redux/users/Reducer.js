import * as types from "./ActionTypes";
const initialState = {
  allUsers: [],
  verifiedUsers: [],
  nonVerifiedUsers: [],
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_REQUEST:
    case types.GET_VERIFIED_USERS_REQUEST:
    case types.GET_NON_VERIFIED_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allUsers: action.payload,
      };

    case types.GET_VERIFIED_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        verifiedUsers: action.payload,
      };

    case types.GET_NON_VERIFIED_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        nonVerifiedUsers: action.payload,
      };

    case types.GET_ALL_USERS_FAILURE:
    case types.GET_VERIFIED_USERS_FAILURE:
    case types.GET_NON_VERIFIED_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
