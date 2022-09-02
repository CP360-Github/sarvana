import axios from '../../utils/axios';

const { REACT_APP_ENDPOINT } = process.env;

export const MuDropDownGet = async () => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/management-units/?is_disabled=false`);
  return response;
};

export const AdgsDropDownGet = async (id) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/mu-adgs-list?mu_id=${id}`);
  return response;
};

export const MuSetsDropDownGet = async () => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/mu-sets/`);
  return response;
};

export const AdgsMuSetDropDownGet = async (id) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/musets-adgs-list?mu_set_id=${id}`);
  return response;
};

export const AdgsValueDropDownGetMuSet = async (adgId, muSetId) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/muset-adg-advs-list?mu_set_id=${muSetId}&adg_id=${adgId}`);
  return response;
};

export const AdgsValueDropDownGet = async (adgId, muId) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/mu-adg-advs-list?mu_id=${muId}&adg_id=${adgId}`);
  return response;
};

// Send today's date by default in date range

// view skills and dashboard
export const MuDashboard = async (muId, adgId, advId) => {
  console.log(adgId, advId);
  const response = axios.get(
    `${REACT_APP_ENDPOINT}/api/agent-skills/agents/?mu_id=${muId}&adg_id=${adgId}&adv_id=${advId}`
  );
  return response;
};

export const MuViewSkills = async (agentId) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/agent/${agentId}/agent-skills/`);
  return response;
};

export const GetSkills = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/skills/`);
  return response;
};

export const PostAddSkills = async (values, agentIdList) => {
  console.log(values);
  const response = axios.post(`${REACT_APP_ENDPOINT}/api/agent-skills/`, {
    agent_ids: agentIdList,
    agent_skills_data: [
      {
        skill_id: values.skillsdropdown.id,
        start_date: values.dateCalendere,
        level: values.level,
        reserve: values.reserveValue
      }
    ]
  });
  return response;
};

// http://scheduly.o2ohrms.com:5000/api/agent/8/agent-skills/?skill_id=21&date_range_id=41

export const DeleteSkill = async (id, skillid, dateid) => {
  const response = await axios.delete(
    `${REACT_APP_ENDPOINT}/api/agent/${id}/agent-skills/?skill_id=${skillid}&date_range_id=${dateid}`
  );
  return response;
};
