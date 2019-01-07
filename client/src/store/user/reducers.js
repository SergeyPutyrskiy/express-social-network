import * as types from "./types";

const initialState = {
  inProgress: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_START:
      return { ...state, inProgress: true };
    case types.GET_USER_COMPLETED:
      return { ...state, data: action.data, inProgress: false };
    case types.GET_USER_FAILED:
      return { ...state, inProgress: false, error: action.error };
    default:
      return state;
  }
};

export default user;
