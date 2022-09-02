import axios from '../utils/axios';

const { REACT_APP_ENDPOINT } = process.env;

export const GetManagementUnits = async (page, search, disableToken) => {
  const response = axios.get(
    `${REACT_APP_ENDPOINT}/api/management-units/?page=${page}&search=${search}&is_disabled=${disableToken}`
  );
  return response;
};

export const GetManagementUnitSearch = async (search) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/management-units/?search=${search}`);
  return response;
};

export const PostMU = async (values, egId, timezoneId, copiedMu) => {
  const response = await axios.post(`${REACT_APP_ENDPOINT}/api/management-units/`, {
    id: values.id,
    mu_name: values.mu_name,
    enterprise_grp_id: egId,
    timezone_id: timezoneId,
    week_first_day: values.firstdayofweek,
    adgs: [],
    adg_values: [],
    copy_from_mu: copiedMu !== undefined ? copiedMu : 0
  });
  return response;
};

export const EditMU = async (data, egId, timezoneId, id) => {
  const response = await axios.put(`${REACT_APP_ENDPOINT}/api/management-units/${id}/`, {
    mu_name: data.mu_name,
    enterprise_grp_id: egId,
    timezone_id: timezoneId,
    week_first_day: data.firstdayofweek
  });
  return response;
};

export const EditOperatingHours = async (result, id) => {
  const response = await axios.put(`${REACT_APP_ENDPOINT}/api/operating-hours/mu/${id}/`, result);
  return response;
};

export const GetDataByID = async (id) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/management-units/${id}/`);
  return response;
};

export const GetOperatingHoursByID = async (id) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/operating-hours/mu/${id}/`);
  return response;
};

export const GetViewManagementUnit = async (id) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/management-units/${id}/`);
  return response;
};

export const GetAssignmentHistory = async (type, dataID) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/assignment-history/${type}/${dataID}/`);
  return response;
};

export const DisableManagement = async (id, isDisabled) => {
  const response = axios.patch(`${REACT_APP_ENDPOINT}/api/management-units/${id}/`, {
    is_disabled: isDisabled
  });
  return response;
};

export const RestoreManagementUnit = async () => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/disabled-entities/?str_entity_type=MU`);
  return response;
};

export const GetAgentDataGroups = async (id) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/management-units/${id}/`);
  return response;
};

export const GetAgentDataGroupsVLU = async (id, adg) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/management-units/${id}/?adg_id=${adg}`);
  return response;
};

export const PUTAgentDataGroups = async (id, details, right, itemsTwo) => {
  const response = await axios.put(`${REACT_APP_ENDPOINT}/api/management-units/${id}/`, {
    mu_name: details.mu_name,
    enterprise_grp_id: details.enterprise_grp.id,
    timezone_id: details.timezone.id,
    week_first_day: details.week_first_day,
    adgs: right,
    adg_values: itemsTwo
  });
  return response;
};

export const PUTAgentDataGroupsVLU = async (id, details, right, itemsTwo) => {
  const response = await axios.put(`${REACT_APP_ENDPOINT}/api/management-units/${id}/`, {
    mu_name: details.mu_name,
    enterprise_grp_id: details.enterprise_grp.id,
    timezone_id: details.timezone.id,
    week_first_day: details.week_first_day,
    adgs: itemsTwo,
    adg_values: right
  });
  return response;
};
