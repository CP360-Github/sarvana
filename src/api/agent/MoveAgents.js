import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

export const GetAgentsAccordingToMu = async (muId, page, date) => {
  const response = await axios.get(
    `${REACT_APP_ENDPOINT}/api/management-unit/${muId}/agents/?agent_profile__start_date=${date}&page=${page}`,
    {
      headers
    }
  );
  return response;
};

export const moveAgents = async (data, muId) => {
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/management-unit/${muId}/move-agent/`,
    {
      agents: data.agents,
      movement_date: data.movement_date
    },
    { headers }
  );
  return response;
};

export const GetAgentData = async (agentId) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/agents/${agentId}/`, { headers });
  return response;
};

export const GetAgentHistoryForMu = async (agentId) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/move-agentmu-history/${agentId}/`, { headers });
  return response;
};
