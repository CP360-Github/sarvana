import axios from '../utils/axios';

const { REACT_APP_ENDPOINT } = process.env;

export const PostAgentDataGroups = async (values) => {
  const response = await axios.post(`${REACT_APP_ENDPOINT}/api/agent-data-grps/`, {
    description: values.description,
    datatype: values.datatype,
    decimal_places: values.decimal_places,
    min_value: values.min_value,
    max_value: values.max_value,
    currency: values.currency,
    list: false
  });
  return response;
};

export const GetAgentDataGroups = async (page) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/agent-data-grps/?page=${page}`);
  return response;
};

export const DeleteAgentData = async (id) => {
  const response = await axios.delete(`${REACT_APP_ENDPOINT}/api/agent-data-grps/${id}/`);
  return response;
};

export const EditAgentData = async (rowData, values) => {
  const response = axios.put(`${REACT_APP_ENDPOINT}/api/agent-data-grps/${rowData.id}/`, {
    description: values.description,
    datatype: values.datatype,
    decimal_places: values.datatype === 5 || values.datatype === 4 ? values.decimal_places : '',
    min_value: values.min_value,
    max_value: values.max_value,
    currency: values.currency,
    list: false
  });
  return response;
};

export const PostAgentDataGroupsValue = async (moreClicked, value) => {
  const response = await axios.post(`${REACT_APP_ENDPOINT}/api/agent-data-grp/${moreClicked.id}/values/`, {
    adg_value: value
  });
  return response;
};

export const GetAgentDataGroupsValue = async (id) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/agent-data-grp/${id}/values/`);
  return response;
};

export const GetAgentDataGroupsID = async (id) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/agent-data-grps/${id}/`);
  return response;
};

export const GetAgentDataGroupsNoPage = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/agent-data-grps/`);
  return response;
};
