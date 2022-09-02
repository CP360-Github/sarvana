import { ActionTypes } from '../../constants/ActionTypes';

const initialState = {};

const AgentSkillReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DATAAPPLY:
      return {
        ...state,
        dataApply: payload
      };
    case ActionTypes.AGDID:
      return {
        ...state,
        adgId: payload
      };
    default:
      return state;
  }
};

export default AgentSkillReducer;
