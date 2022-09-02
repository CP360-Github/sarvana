export function GetAgentListAction(agentList) {
  return {
    type: 'get_move_agent_list',
    payload: agentList
  };
}
export function UpdateAgentListAction(agentIdListSelected) {
  return {
    type: 'update_move_agent_list',
    payload: agentIdListSelected
  };
}
export function SelectedMuAction(selectedMu) {
  return {
    type: 'move_selected_mu',
    payload: selectedMu
  };
}

export function SelectedAgentIdListAction(agentIdList) {
  return {
    type: 'move_agent_id_list',
    payload: agentIdList
  };
}
export function SelectedMuOrTog(MuOrTogToken) {
  return {
    type: 'move_mu_or_tog',
    payload: MuOrTogToken
  };
}

export function GetMUListAction(MUList) {
  return {
    type: 'get_mu_list',
    payload: MUList
  };
}
export function selectedMuFromListAction(selectedMUFromList) {
  return {
    type: 'selected_mu_from_list',
    payload: selectedMUFromList
  };
}
