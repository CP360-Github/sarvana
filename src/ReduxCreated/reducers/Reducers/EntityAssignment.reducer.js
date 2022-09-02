const initialState = {
  selectedEntity: '',
  selectedEntityName: '',
  data: []
};
const EntityAssignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'selected_entity':
      return {
        ...state,
        selectedEntity: action.payload
      };
    case 'selected_entity_name':
      return {
        ...state,
        selectedEntityName: action.payload
      };
    case 'get_entity_history':
      return {
        ...state,
        data: action.payload
      };
    case 'update_entity_history': {
      const allHistoryData = [...state.data];
      const updatedVal = allHistoryData.map((History) => {
        if (History.id === action.payload.historyUpdate.historyId) {
          History.ending_date = action.payload.historyUpdate.prevDate;
        }
        return History;
      });
      return {
        ...state,
        data: [...updatedVal, action.payload.historyAdd]
      };
    }
    case 'unassign_entity_history': {
      const allHistoryData = [...state.data];
      const updatedVal = allHistoryData.filter((History) => History.id !== action.payload);
      return {
        ...state,
        data: updatedVal
      };
    }
    default:
      return state;
  }
};

export default EntityAssignmentReducer;
