import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

export const GetTimeZone = async () => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/timezones/`, { headers });
  return response;
};

export const GetEnterpriseGroup = async (page, disableToken) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/enterprise-groups/?page=${page}&is_disabled=${disableToken}`, {
    headers
  });
  return response;
};

export const GetEnterpriseGroupWithoutPage = async () => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/enterprise-groups/`, { headers });
  return response;
};

export const GetEnterPriseSearch = async (search) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/enterprise-groups/?search=${search}`, { headers });
  return response;
};

export const PostEnterPriseGroup = async (data, okValue, dataSelectedEgg) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  console.log(data, okValue, dataSelectedEgg, 'data, okValue, dataSelectedEgg');

  const response = axios.post(
    `${REACT_APP_ENDPOINT}/api/enterprise-groups/`,
    {
      id: data.id,
      eg_name: data.name,
      timezone_id: data.copyfrom !== '' ? 0 : okValue.id,
      week_first_day: data.copyfrom !== '' ? '' : data.week_first_day,
      copy_from_eg: data.copyfrom !== '' ? dataSelectedEgg?.id : 0
    },
    { headers }
  );
  return response;
};

export const DisableEnterpriseGroup = async (id) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.patch(
    `${REACT_APP_ENDPOINT}/api/enterprise-groups/${id}/`,
    {
      is_disabled: true
    },
    { headers }
  );
  return response;
};

export const DisableRestoreEnterpriseGroup = async (id) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.patch(
    `${REACT_APP_ENDPOINT}/api/enterprise-groups/${id}/`,
    {
      is_disabled: false
    },
    { headers }
  );
  return response;
};

export const RestoreEnterpriseGroup = async () => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/disabled-entities/?str_entity_type=EG`, { headers });
  return response;
};

export const EditEnterpriseGroup = async (DataEditing, data, TimeZoneOkValue) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  console.log(TimeZoneOkValue, 'TimeZoneOkValue');
  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/enterprise-groups/${DataEditing.id}/`,
    {
      eg_name: data.name,
      timezone_id: TimeZoneOkValue,
      week_first_day: data.week_first_day
    },
    { headers }
  );
  return response;
};

export const GetEnterpriseGroupIdData = async (e) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/enterprise-groups/${e}/`, { headers });
  return response;
};

export const GetAssignmentHistory = async (type, dataID) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/assignment-history/${type}/${dataID}/`, { headers });
  return response;
};

export const EditAvailabilityEnterprise = async (id, selectedAvailability, IsChecked) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  console.log(selectedAvailability, 'selectedAvailability');
  console.log(IsChecked, 'IsChecked');

  const response = axios.put(
    `${REACT_APP_ENDPOINT}/api/enterprise-grp-availability/${id}/`,
    {
      activity_code_availability: selectedAvailability.id,
      available_activity_code: IsChecked
    },
    { headers }
  );
  return response;
};

export const GetAvailabilityEnterprise = async (e) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/enterprise-grp-availability/${e}/`, { headers });
  return response;
};
