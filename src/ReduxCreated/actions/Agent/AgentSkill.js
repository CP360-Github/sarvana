import { ActionTypes } from '../../constants/ActionTypes';

export const setApplyData = (dataApply) => ({ type: ActionTypes.DATAAPPLY, payload: dataApply });

export function SelectedAgentIdListAction(agentIdList) {
  return {
    type: 'agent_id_list',
    payload: agentIdList
  };
}

export const setSelectedAgent = (adgId) => ({ type: ActionTypes.AGDID, payload: adgId });
