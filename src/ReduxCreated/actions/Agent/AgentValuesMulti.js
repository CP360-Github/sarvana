import { ActionTypes } from '../../constants/ActionTypes';

export const setDashboardMu = (muDash) => ({ type: ActionTypes.MUDASH, payload: muDash });

export const setSelectedAgent = (adgId) => ({ type: ActionTypes.AGDIDV, payload: adgId });

export const setValueMu = (valueMu) => ({ type: ActionTypes.VALUEMU, payload: valueMu });

export const setValueMuSets = (valueMuSets) => ({ type: ActionTypes.VALUEMUSETS, payload: valueMuSets });

export const setValueAgentDataMu = (valueAgentDataMu) => ({
  type: ActionTypes.VALUEAGENTDATAMU,
  payload: valueAgentDataMu
});

export const setValueAgentDataMuSets = (valueAgentDataMuSets) => ({
  type: ActionTypes.VALUEAGENTMUSETS,
  payload: valueAgentDataMuSets
});

export const setGetMuDropDownList = (getMuDropDownList) => ({
  type: ActionTypes.MUGETLIST,
  payload: getMuDropDownList
});

export const setAdgsDropDownList = (getAdgsDropDownList) => ({
  type: ActionTypes.ADGSDROPDOWN,
  payload: getAdgsDropDownList
});

export const setGetMuSetsDropDownList = (getMuSetsDropDownList) => ({
  type: ActionTypes.MUSETSDROPDOWN,
  payload: getMuSetsDropDownList
});

export const setAdgsMuSetDropDownList = (getAdgsMuSetDropDownList) => ({
  type: ActionTypes.ADGSMUSETDROPDOWN,
  payload: getAdgsMuSetDropDownList
});

export const setChosenMuMuSet = (chosenMuMuSet) => ({
  type: ActionTypes.CHOSENMUSET,
  payload: chosenMuMuSet
});

export const setChosenMuId = (chosenMuId) => ({
  type: ActionTypes.CHOSENMUID,
  payload: chosenMuId
});

export const setChosenAdgId = (chosenAdgId) => ({
  type: ActionTypes.CHOSENADGID,
  payload: chosenAdgId
});
