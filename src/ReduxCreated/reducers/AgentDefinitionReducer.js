import { ActionTypeContact } from '../constants/ActionTypeContact';

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

export const AgentDefinitonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypeContact.SHOW_DETAILS:
      return {
        ...state,
        data: payload
      };
    case ActionTypeContact.SHOW_TIMEZONE:
      return {
        ...state,
        timezone: payload
      };
    case ActionTypeContact.SHOW_DELETED:
      return {
        ...state,
        deleted: payload
      };
    case ActionTypeContact.SHOW_EDITED:
      return {
        ...state,
        edited: payload
      };
    case ActionTypeContact.SHOW_DATAEDIT:
      return {
        ...state,
        dataedit: payload
      };
    case ActionTypeContact.SHOW_SELECTEDEG:
      return {
        ...state,
        selectedEg: payload
      };
    case ActionTypeContact.SHOW_COPIEDAGENT:
      return {
        ...state,
        copiedAgent: payload
      };
    case ActionTypeContact.SHOW_COPIEDCT:
      return {
        ...state,
        copiedCt: payload
      };
    case ActionTypeContact.SHOW_COPYFROM:
      return {
        ...state,
        copyFrom: payload
      };
    case ActionTypeContact.SHOW_OKVALUE:
      return {
        ...state,
        okValue: payload
      };
    case ActionTypeContact.SHOWINDEX:
      return {
        ...state,
        selectedIndex: payload
      };
    case ActionTypeContact.SHOWID:
      return {
        ...state,
        dataId: payload
      };
    case ActionTypeContact.SAVEE:
      return {
        ...state,
        savee: payload
      };
    case ActionTypeContact.RIGHT:
      return {
        ...state,
        rightChecked: payload
      };
    case ActionTypeContact.FOUR:
      return {
        ...state,
        fourChecked: payload
      };

    case ActionTypeContact.SKILLS:
      return {
        ...state,
        storeSkills: payload
      };

    case ActionTypeContact.SHOW_ACDVALUE:
      return {
        ...state,
        AcdValue: payload
      };

    case ActionTypeContact.SHOW_MUVALUE:
      return {
        ...state,
        MuValue: payload
      };
    case ActionTypeContact.SHOW_EMAILVALUE:
      return {
        ...state,
        EmailLang: payload
      };
    case ActionTypeContact.MUORMUSET:
      return {
        ...state,
        muOrMuSet: payload
      };
    case ActionTypeContact.MUSELECTED:
      return {
        ...state,
        selectedData: payload
      };
    // dataId
    case ActionTypeContact.DATAID:
      return {
        ...state,
        dataId: payload
      };
    default:
      return state;
  }
};
