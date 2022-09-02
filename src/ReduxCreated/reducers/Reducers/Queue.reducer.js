const QueueReducer = (state = [], action) => {
  switch (action.type) {
    case 'get_queue':
      return action.payload;
    case 'add_queue':
      return [...state, action.payload];
    case 'disable_queue': {
      const allQueue = [...state];
      const updatedVal = allQueue.filter((queue) => queue.id !== action.payload.id);
      return updatedVal;
    }
    case 'update_queue': {
      const allQueue = [...state];
      const updatedVal = allQueue.map((queue) => {
        if (queue.id === action.payload.id) {
          queue.queue_name = action.payload.queue_name;
        }
        return queue;
      });
      return updatedVal;
    }
    default:
      return state;
  }
};

export default QueueReducer;
