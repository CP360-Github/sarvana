import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

export const GetQueuesPagination = async (page, search, disableToken) => {
  const response = await axios.get(
    `${REACT_APP_ENDPOINT}/api/queues/?page=${page}&search=${search}&is_disabled=${disableToken}`,
    { headers }
  );
  return response;
};
export const GetQueues = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/queues/?is_disabled=false`, { headers });
  return response;
};

export const GetAcdList = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/acd-params/`, { headers });
  return response;
};

export const GetContactTypeList = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/contact-types/?is_disabled=false`, { headers });
  return response;
};

export const PostQueues = async (data) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/api/queues/`,
    {
      id: data.id,
      queue_name: data.name,
      contact_type_id: data.contactType,
      acd_param_id: data.acd !== '' ? data.acd : 0,
      copy_from_q: data.copyFromId !== '' ? data.copyFromId : 0
    },
    { headers }
  );
  return response;
};

export const GetSingleQueues = async (queueId) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/queues/${queueId}/`, { headers });
  return response;
};

export const DeleteQueue = async (queueId) => {
  const response = await axios.delete(`${REACT_APP_ENDPOINT}/api/queues/${queueId}/`, { headers });
  return response;
};

export const UpdateQueues = async (data, queueId) => {
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/queues/${queueId}/`,
    {
      queue_name: data.name,
      contact_type_id: data.contactType !== null ? data.contactType : 0,
      acd_param_id: data.acd !== '' ? data.acd : 0,
      copy_from_q: data.copyFromId !== '' ? data.copyFromId : 0
    },
    { headers }
  );
  return response;
};

export const GetQueueHistory = async (type, queueId) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/assignment-history/${type}/${queueId}/`, { headers });
  return response;
};

export const GetOperatingHours = async (queueId) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/operating-hours/q/${queueId}/`, { headers });
  return response;
};

export const UpdateOperatingHours = async (data, queueId) => {
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/operating-hours/q/${queueId}/`,
    {
      operating_hrs_data: data
    },
    { headers }
  );
  return response;
};

export const DisableQueue = async (queueId, disableToken) => {
  const response = axios.patch(
    `${REACT_APP_ENDPOINT}/api/queues/${queueId}/`,
    {
      is_disabled: disableToken
    },
    { headers }
  );
  return response;
};
