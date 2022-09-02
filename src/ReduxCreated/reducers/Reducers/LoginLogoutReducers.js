import { ActionTypes } from '../../constants/ActionTypes';

const initialState = {
  loginlogout: false
};

export const LoginLogoutReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGINLOGOUT:
      return {
        ...state,
        loginlogout: payload
      };
    default:
      return state;
  }
};
