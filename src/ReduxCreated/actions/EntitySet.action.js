export function GetEntitySetAction(data) {
  return {
    type: 'get_entity_set',
    payload: data
  };
}
export function PostEntitySetAction(data, entitySetAddedData, EntitySetFilter) {
  return {
    type: 'add_entity_set',
    payload: { data, entitySetAddedData, EntitySetFilter }
  };
}

export function DeleteEntitySetAction(data) {
  return {
    type: 'delete_entity_set',
    payload: data
  };
}

export function UpdateEntitySetAction(data) {
  return {
    type: 'update_entity_set',
    payload: data
  };
}
