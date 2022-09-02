const QueueOperatingHours = (state = [], action) => {
  switch (action.type) {
    case 'get_operating_hours':
      return action.payload;
    default:
      return state;
  }
};

export default QueueOperatingHours;
