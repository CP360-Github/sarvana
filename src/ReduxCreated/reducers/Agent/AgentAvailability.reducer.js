const initialState = {
  agentList: [],
  selectedMu: {},
  agentIdList: [],
  MuOrSetToken: 'MU'
};
const AgentAvailabilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_agent_list':
      return {
        ...state,
        agentList: action.payload
      };
    case 'update_agent_list': {
      const allAgentData = [...state.agentList];
      const updatedVal = allAgentData.map((agent) => {
        action.payload.agentIdList.map((selectedAgents) => {
          if (agent.agent?.id === selectedAgents) {
            agent.date_start = action.payload.startDate;
            agent.date_end = action.payload.endDate;
          }
          return agent;
        });
        return agent;
      });
      return {
        ...state,
        agentList: updatedVal
      };
    }
    case 'delete_agent_list': {
      const allAgentData = [...state.agentList];
      const updatedVal = allAgentData.map((agent) => {
        action.payload.agentIdList.map((selectedAgents) => {
          if (agent.agent?.id === selectedAgents) {
            agent.date_start = null;
            agent.date_end = null;
          }
          return agent;
        });
        return agent;
      });
      console.log('updatedVal', updatedVal);
      return {
        ...state
        // agentList: updatedVal
      };
    }
    case 'selected_mu':
      return {
        ...state,
        selectedMu: action.payload
      };
    case 'agent_id_list':
      return {
        ...state,
        agentIdList: action.payload
      };
    case 'mu_or_mu_set':
      return {
        ...state,
        MuOrSetToken: action.payload
      };
    default:
      return state;
  }
};

export default AgentAvailabilityReducer;
