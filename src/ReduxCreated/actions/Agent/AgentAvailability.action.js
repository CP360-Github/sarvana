export function GetAgentListAction(agentList) {
  return {
    type: 'get_agent_list',
    payload: agentList
  };
}
export function UpdateAgentListAction(agentList) {
  return {
    type: 'update_agent_list',
    payload: agentList
  };
}
export function DeleteAgentListAction(agentList) {
  return {
    type: 'delete_agent_list',
    payload: agentList
  };
}
export function SelectedMuAction(selectedMu) {
  return {
    type: 'selected_mu',
    payload: selectedMu
  };
}

export function SelectedAgentIdListAction(agentIdList) {
  return {
    type: 'agent_id_list',
    payload: agentIdList
  };
}
export function SelectedMuOrMuSet(MuOrSetToken) {
  return {
    type: 'mu_or_mu_set',
    payload: MuOrSetToken
  };
}
