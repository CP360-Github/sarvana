import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

export const GetSkills = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/skills/`, { headers });
  return response;
};

export const PostActivityCodes = async (
  values,
  multiskillsData,
  checkedone,
  checked2,
  checked3,
  checked4,
  checked5,
  checked6,
  checked7
) => {
  console.log(values, 'values');
  const response = await axios.post(
    `${REACT_APP_ENDPOINT}/api/activity-codes/`,
    {
      position: values.position,
      priority: values.priority,
      icon: values.icon,
      description: values.description,
      code_type: values.codetype,
      open_skills: multiskillsData,
      in_office: checkedone,
      business: checked2,
      available: checked3,
      overtime: checked4,
      uses_seat: checked5,
      paid: checked6,
      work_hours: checked7,
      supervisor_trade_status: values.supervisor,
      agent_trade_status: values.agent
    },
    { headers }
  );
  return response;
};

export const GetActivityCodeDefinition = async (page) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/activity-codes/?page=${page}`, { headers });
  return response;
};

export const GetActivityCodeDefinitionNoPage = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/activity-codes/`, { headers });
  return response;
};

export const DeleteActivityCodeDefintion = async (id) => {
  console.log(id, 'id');
  const response = await axios.delete(`${REACT_APP_ENDPOINT}/api/activity-codes/${id}/`, { headers });
  return response;
};

export const GetIDActivityCodeDefinition = async (id) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/activity-codes/${id}/`, { headers });
  return response;
};

export const EditActivityCodeDefinition = async (
  rowID,
  values,
  multiskillsData,
  checkedone,
  checked2,
  checked3,
  checked4,
  checked5,
  checked6,
  checked7
) => {
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/activity-codes/${rowID.id}/`,
    {
      position: values.position,
      priority: values.priority,
      icon: values.icon,
      description: values.description,
      code_type: values.codetype,
      open_skills: multiskillsData,
      in_office: checkedone,
      business: checked2,
      available: checked3,
      overtime: checked4,
      uses_seat: checked5,
      paid: checked6,
      work_hours: checked7,
      supervisor_trade_status: values.supervisor,
      agent_trade_status: values.agent
    },
    { headers }
  );
  return response;
};
