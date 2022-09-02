const EntitySetReducer = (state = [], action) => {
  switch (action.type) {
    case 'get_entity_set':
      return action.payload;
    case 'add_entity_set': {
      let updatedData;
      if (action.payload.entitySetAddedData === action.payload.EntitySetFilter) {
        updatedData = [...state, action.payload.data];
      } else {
        updatedData = [...state];
      }
      return updatedData;
    }
    case 'delete_entity_set': {
      const allEntitySet = [...state];
      const updatedVal = allEntitySet.filter((entitySet) => entitySet.id !== action.payload);
      return updatedVal;
    }
    case 'update_entity_set': {
      const allEntitySet = [...state];
      const updatedVal = allEntitySet.map((entitySet) => {
        if (entitySet.id === action.payload.id) {
          entitySet.set_name = action.payload.set_name;
          entitySet.timezone_id = action.payload.timezone_id;
          entitySet.week_first_day = action.payload.week_first_day;
        }
        return entitySet;
      });
      return updatedVal;
    }
    default:
      return state;
  }
};

export default EntitySetReducer;
