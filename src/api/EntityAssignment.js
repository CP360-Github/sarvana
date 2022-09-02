import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};
export const GetMemberHistory = async (type, dataID) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/entities-history/${type}/${dataID}/`, { headers });
  return response;
};

export const MoveEntity = async (data) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/api/entity-assignment/?date_assign=${data.date_assign}&type=${data.type}&type_id=${data.type_id}&to_type_id=${data.to_type_id}`,
    {},
    { headers }
  );
  return response;
};

export const UnAssignEntity = async (data) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/api/entity-unassign/?date_assign=${data.date_assign}&type=${data.type}&type_id=${data.type_id}`,
    {},
    { headers }
  );
  return response;
};

export const GetUnassignEntity = async (type) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/apis/api/entity-unassign/?type=${type}`, { headers });
  return response;
};
