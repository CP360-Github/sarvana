export function GetSelectedEntityAction(selectedEntity) {
  return {
    type: 'selected_entity',
    payload: selectedEntity
  };
}
export function GetSelectedEntityNameAction(selectedEntityName) {
  return {
    type: 'selected_entity_name',
    payload: selectedEntityName
  };
}

export function GetEntityHistoryAction(data) {
  return {
    type: 'get_entity_history',
    payload: data
  };
}

export function UpdateEntityHistoryAction(data) {
  return {
    type: 'update_entity_history',
    payload: data
  };
}
export function UnassignEntityHistoryAction(historyId) {
  return {
    type: 'unassign_entity_history',
    payload: historyId
  };
}
