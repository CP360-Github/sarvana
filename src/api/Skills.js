import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

export const GetSkillsPagination = async (page, disableToken, search) => {
  const response = await axios.get(
    `${REACT_APP_ENDPOINT}/api/skills/?page=${page}&is_disabled=${disableToken}&search=${search}`,
    {
      headers
    }
  );
  return response;
};
export const GetSkills = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/skills/`, { headers });
  return response;
};

export const PostSkills = async (data) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/api/skills/`,
    {
      id: data.id,
      skill_name: data.skill_name,
      acd_param_id: data.acd_param_id,
      queue_id: data.queue_id
    },
    { headers }
  );
  return response;
};

export const DeleteSkills = async (skillId) => {
  const response = await axios.delete(`${REACT_APP_ENDPOINT}/api/skills/${skillId}/`, { headers });
  return response;
};

export const GetSingleSkills = async (skillId) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/skills/${skillId}/`, { headers });
  return response;
};

export const UpdateSkills = async (data, skillId) => {
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/skills/${skillId}/`,
    {
      skill_name: data.name,
      acd_param_id: data.acd !== '' ? data.acd : 0,
      queue_id: data.queue_id !== '' ? data.queue_id : 0
    },
    { headers }
  );
  return response;
};

export const DisableSkills = async (skillId, disableToken) => {
  const response = axios.patch(
    `${REACT_APP_ENDPOINT}/api/skills/${skillId}/`,
    {
      is_disabled: disableToken
    },
    { headers }
  );
  return response;
};
