import { ActionTypes } from '../../../constants/ActionTypes';

const initialState = {
  dataType: [],
  dataTypee: []
};

export const UsersAndPermissionss = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DATATYPEE:
      return {
        ...state,
        dataType: payload
      };
    case ActionTypes.SHOW_OKVALUEE:
      return {
        ...state,
        okValue: payload
      };
    case ActionTypes.DATATYPEEE:
      return {
        ...state,
        dataTypee: payload
      };
    case ActionTypes.SHOW_OKVALUEEE:
      return {
        ...state,
        okValuee: payload
      };
    default:
      return state;
  }
};
