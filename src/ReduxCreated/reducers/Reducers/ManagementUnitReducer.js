import { ActionTypes } from '../../constants/ActionTypes';

const initialState = {
  copiedMu: undefined,
  deleted: [],
  onSave: false
};

export const managementunit = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SHOW_TIMEZONEVALUE:
      return {
        ...state,
        timezonevalue: payload
      };
    case ActionTypes.SHOW_COPYFROMMU:
      return {
        ...state,
        copyFrommu: payload
      };
    case ActionTypes.SHOW_COPIEDMU:
      return {
        ...state,
        copiedMu: payload
      };
    case ActionTypes.ON_SAVE:
      return {
        ...state,
        onSave: payload
      };
    case ActionTypes.SHOW_DELETEDD:
      return {
        ...state,
        deleted: payload
      };

    default:
      return state;
  }
};
