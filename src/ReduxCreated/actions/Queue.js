export function GetQueueAction(data) {
  return {
    type: 'get_queue',
    payload: data
  };
}

export function PostQueueAction(data) {
  return {
    type: 'add_queue',
    payload: data
  };
}

export function DisableQueueAction(data) {
  return {
    type: 'disable_queue',
    payload: data
  };
}
export function UpdateQueueAction(data) {
  return {
    type: 'update_queue',
    payload: data
  };
}
