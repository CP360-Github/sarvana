import { ActionTypes } from '../../constants/ActionTypes';

const initialState = {
  openskill: [],
  dataEdit: false,
  save: false,
  selectedAvailability: {},
  iconsData: ['icons'],
  icons: [],
  showData: [],
  selectedIcon: '',
  saveClicked: false,
  iconDescription: ''
};

export const actionCode = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.OPENSKILL:
      return {
        ...state,
        openskill: payload
      };
    case ActionTypes.DATAEDIT:
      return {
        ...state,
        dataEdit: payload
      };
    case ActionTypes.AVAILABILITY:
      return {
        ...state,
        selectedAvailability: payload
      };
    case ActionTypes.ICONSDATA:
      return {
        ...state,
        iconsData: payload
      };
    case ActionTypes.ICONS:
      return {
        ...state,
        icons: payload
      };
    case ActionTypes.SHOWDATA:
      return {
        ...state,
        showData: payload
      };
    case ActionTypes.ICONSELECTED:
      return {
        ...state,
        selectedIcon: payload
      };
    case ActionTypes.SAVECLICKED:
      return {
        ...state,
        saveClicked: payload
      };
    case ActionTypes.SelectedIconDescription:
      return {
        ...state,
        iconDescription: payload
      };
    default:
      return state;
  }
};
