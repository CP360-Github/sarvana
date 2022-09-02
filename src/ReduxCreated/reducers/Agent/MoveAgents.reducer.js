const initialState = {
  agentList: [],
  selectedMu: {},
  agentIdList: [],
  MuOrTogToken: 'MU',
  MUList: [],
  selectedMUFromList: {},
  agentIdListSelected: []
};
const AgentAvailabilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_move_agent_list':
      return {
        ...state,
        agentList: action.payload
      };
    case 'update_move_agent_list': {
      const allAgents = state.agentList;
      const updatedVal = allAgents.filter((data) => !action.payload.includes(data.id));
      return { ...state, agentList: updatedVal };
    }
    case 'move_selected_mu':
      return {
        ...state,
        selectedMu: action.payload
      };
    case 'move_agent_id_list':
      return {
        ...state,
        agentIdList: action.payload
      };
    case 'move_mu_or_tog':
      return {
        ...state,
        MuOrTogToken: action.payload
      };
    case 'get_mu_list':
      return {
        ...state,
        MUList: action.payload
      };
    case 'selected_mu_from_list':
      return {
        ...state,
        selectedMUFromList: action.payload
      };
    default:
      return state;
  }
};

export default AgentAvailabilityReducer;
