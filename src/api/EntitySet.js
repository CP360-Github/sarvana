import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

export const GetEntitySetPagination = async (setType, page, search) => {
  const response = await axios.get(
    setType === 1
      ? `${REACT_APP_ENDPOINT}/api/eg-sets/?page=${page}&search=${search}`
      : setType === 2
      ? `${REACT_APP_ENDPOINT}/api/mu-sets/?page=${page}&search=${search}`
      : `${REACT_APP_ENDPOINT}/api/ct-sets/?page=${page}&search=${search}`,
    { headers }
  );
  return response;
};

export const GetEntitySet = async (setType) => {
  const response = await axios.get(
    setType === 1
      ? `${REACT_APP_ENDPOINT}/api/eg-sets/`
      : setType === 2
      ? `${REACT_APP_ENDPOINT}/api/mu-sets/`
      : `${REACT_APP_ENDPOINT}/api/ct-sets/`,
    { headers }
  );
  return response;
};

export const PostEntitySet = (data) => {
  if (data.set_type === 1) {
    const resp = apiEgSetPost(data);
    return resp;
  }
  if (data.set_type === 2) {
    const resp = apiMuSetPost(data);
    return resp;
  }
  if (data.set_type === 3) {
    const resp = apiCtSetPost(data);
    return resp;
  }
  return [];
};

const apiMuSetPost = async (data) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/api/mu-sets/`,
    {
      id: data.id,
      set_name: data.entity_set_name,
      week_first_day: data.firstDayOfWeek,
      timezone: data.timezone,
      copy_from_mu_set: data.copyFrom
    },
    { headers }
  );
  return response;
};

const apiEgSetPost = async (data) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/api/eg-sets/`,
    {
      id: data.id,
      set_name: data.entity_set_name,
      week_first_day: data.firstDayOfWeek,
      timezone: data.timezone,
      copy_from_eg_set: data.copyFrom
    },
    { headers }
  );
  return response;
};

const apiCtSetPost = async (data) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/api/ct-sets/`,
    {
      id: data.id,
      set_name: data.entity_set_name,
      week_first_day: data.firstDayOfWeek,
      timezone: data.timezone,
      copy_from_ct_set: data.copyFrom
    },
    { headers }
  );
  return response;
};

export const DeleteEntitySet = async (setId, setType) => {
  const response = await axios.delete(
    setType === 1
      ? `${REACT_APP_ENDPOINT}/api/eg-sets/${setId}/`
      : setType === 2
      ? `${REACT_APP_ENDPOINT}/api/mu-sets/${setId}/`
      : `${REACT_APP_ENDPOINT}/api/ct-sets/${setId}/`,
    { headers }
  );
  return response;
};

export const GetSingleEntitySet = async (setId, setType) => {
  const response = await axios.get(
    setType === 1
      ? `${REACT_APP_ENDPOINT}/api/eg-sets/${setId}/`
      : setType === 2
      ? `${REACT_APP_ENDPOINT}/api/mu-sets/${setId}/`
      : `${REACT_APP_ENDPOINT}/api/ct-sets/${setId}/`,
    { headers }
  );
  return response;
};

export const UpdateEntitySet = (data, setId, setType) => {
  if (setType === 1) {
    const resp = apiEgSetPut(data, setId);
    return resp;
  }
  if (setType === 2) {
    const resp = apiMuSetPut(data, setId);
    return resp;
  }
  if (setType === 3) {
    const resp = apiCtSetPut(data, setId);
    return resp;
  }
  return [];
};

export const apiMuSetPut = async (data, setId) => {
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/mu-sets/${setId}/`,
    {
      set_name: data.set_name,
      week_first_day: data.week_first_day !== null ? data.week_first_day : 0,
      timezone_id: data.timezone_id !== null ? data.timezone_id : 0,
      eg_include: data.eg_include,
      mu_include: data.mu_include
    },
    { headers }
  );
  return response;
};

export const apiEgSetPut = async (data, setId) => {
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/eg-sets/${setId}/`,
    {
      set_name: data.set_name,
      week_first_day: data.week_first_day !== null ? data.week_first_day : 0,
      timezone_id: data.timezone_id !== null ? data.timezone_id : 0,
      eg_set_eg_include: data.eg_set_eg_include
    },
    { headers }
  );
  return response;
};

export const apiCtSetPut = async (data, setId) => {
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/ct-sets/${setId}/`,
    {
      set_name: data.set_name,
      week_first_day: data.week_first_day !== null ? data.week_first_day : 0,
      timezone_id: data.timezone_id !== null ? data.timezone_id : 0,
      ct_set_eg_include: data.ct_set_eg_include,
      ct_include: data.ct_include
    },
    { headers }
  );
  return response;
};

export const GetEnterpriseGroup = async () => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/enterprise-groups/?is_disabled=${false}`, { headers });
  return response;
};

export const GetManagementUnits = async () => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/management-units/?is_disabled=${false}`, { headers });
  return response;
};

export async function getContactTypes() {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/contact-types/?is_disabled=${false}`, { headers });
  return response;
}
