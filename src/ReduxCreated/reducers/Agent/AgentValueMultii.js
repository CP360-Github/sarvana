import { ActionTypes } from '../../constants/ActionTypes';

const initialState = {
  valueMu: '',
  valueMuSets: '',
  valueAgentDataMu: '',
  valueAgentDataMuSets: '',
  getAdgsDropDownList: [],
  getAdgsMuSetDropDownList: [],
  chosenMuMuSet: '',
  chosenMuId: '',
  chosenAdgId: ''
};

const AgentValueMultii = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MUDASH:
      return {
        ...state,
        muDash: payload
      };
    case ActionTypes.AGDIDV:
      return {
        ...state,
        adgId: payload
      };
    case ActionTypes.VALUEMU:
      return {
        ...state,
        valueMu: payload
      };
    case ActionTypes.VALUEMUSETS:
      return {
        ...state,
        valueMuSets: payload
      };
    case ActionTypes.VALUEAGENTDATAMU:
      return {
        ...state,
        valueAgentDataMu: payload
      };
    case ActionTypes.VALUEAGENTMUSETS:
      return {
        ...state,
        valueAgentDataMuSets: payload
      };
    case ActionTypes.MUGETLIST:
      return {
        ...state,
        getMuDropDownList: payload
      };
    case ActionTypes.ADGSDROPDOWN:
      return {
        ...state,
        getAdgsDropDownList: payload
      };
    case ActionTypes.MUSETSDROPDOWN:
      return {
        ...state,
        getMuSetsDropDownList: payload
      };
    case ActionTypes.ADGSMUSETDROPDOWN:
      return {
        ...state,
        getAdgsMuSetDropDownList: payload
      };
    case ActionTypes.CHOSENMUSET:
      return {
        ...state,
        chosenMuMuSet: payload
      };
    case ActionTypes.CHOSENMUID:
      return {
        ...state,
        chosenMuId: payload
      };
    case ActionTypes.CHOSENADGID:
      return {
        ...state,
        chosenAdgId: payload
      };
    default:
      return state;
  }
};

export default AgentValueMultii;
