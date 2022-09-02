import { ActionTypes } from '../../constants/ActionTypes';

const initialState = {
  dataType: '',
  dataEdit: false,
  clicked: false
};

export const agentDataTypes = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DATATYPE:
      return {
        ...state,
        dataType: payload
      };
    case ActionTypes.DATAEDITT:
      return {
        ...state,
        dataEdit: payload
      };
    case ActionTypes.CLICKED:
      return {
        ...state,
        clicked: payload
      };

    default:
      return state;
  }
};
