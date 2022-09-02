import { ActionTypes } from '../constants/ActionTypes';

const initialState = {
  data: [],
  timezone: [],
  deleted: [],
  edited: false,
  dataedit: [],
  selectedIndex: 0,
  savee: false,
  fourChecked: false,
  storeSkills: []
};

export const productReducerr = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SHOW_DETAILS:
      return {
        ...state,
        data: payload
      };
    case ActionTypes.SHOW_TIMEZONE:
      return {
        ...state,
        timezone: payload
      };
    case ActionTypes.SHOW_DELETED:
      return {
        ...state,
        deleted: payload
      };
    case ActionTypes.SHOW_EDITED:
      return {
        ...state,
        edited: payload
      };
    case ActionTypes.SHOW_DATAEDIT:
      return {
        ...state,
        dataedit: payload
      };
    case ActionTypes.SHOW_SELECTEDEG:
      return {
        ...state,
        selectedEg: payload
      };
    case ActionTypes.SHOW_COPIEDEG:
      return {
        ...state,
        copiedEg: payload
      };
    case ActionTypes.SHOW_COPYFROM:
      return {
        ...state,
        copyFrom: payload
      };
    case ActionTypes.SHOW_OKVALUE:
      return {
        ...state,
        okValue: payload
      };
    case ActionTypes.SHOWINDEX:
      return {
        ...state,
        selectedIndex: payload
      };
    case ActionTypes.SHOWID:
      return {
        ...state,
        dataId: payload
      };
    case ActionTypes.SAVEE:
      return {
        ...state,
        savee: payload
      };
    case ActionTypes.RIGHT:
      return {
        ...state,
        rightChecked: payload
      };
    case ActionTypes.FOUR:
      return {
        ...state,
        fourChecked: payload
      };

    case ActionTypes.SKILLS:
      return {
        ...state,
        storeSkills: payload
      };

    default:
      return state;
  }
};
