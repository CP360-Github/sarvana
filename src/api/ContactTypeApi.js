import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

export async function getContactTypes(page, disableToken) {
  try {
    const request = await axios.get(
      `${REACT_APP_ENDPOINT}/api/contact-types/?page=${page}&is_disabled=${disableToken}`,
      {
        headers
      }
    );
    const response = request.data;
    return {
      success: true,
      count: response.count,
      data: response.results,
      value: response
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export async function getCopyFromCT(search) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/contact-types/?search=${search}`, { headers });
    const response = request.data;
    return {
      success: true,
      count: response.count,
      data: response.results,
      value: response
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export const PostContactType = async (values, dataSelectedCt, okValue, dataSelectedAcd, dataSelectedEg) => {
  try {
    const request = await axios.post(
      `${REACT_APP_ENDPOINT}/api/contact-types/`,
      {
        id: values?.id,
        ct_name: values.ct_name || 0,
        ct_type: values.ct_type || 0,
        copy_from_ct: values?.copyfrom !== '' ? dataSelectedCt?.id : 0,
        enterprise_grp_id: values?.copyfrom !== '' ? dataSelectedCt?.enterprise_grp.id : dataSelectedEg?.id,
        week_first_day: values.copyfrom !== '' ? dataSelectedCt?.week_first_day : values?.fdw,
        acd_param_id: values?.copyfrom !== '' ? dataSelectedCt?.acd_param.id : dataSelectedAcd?.id,
        ct_sub_type: values?.sub_type || 0,
        timezone_id: values?.copyfrom !== '' ? dataSelectedCt?.timezone.id : okValue.id
      },
      { headers }
    );
    const response = request.data;

    return {
      success: true,
      count: response.count,
      data: response.results
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
};
// api/contact-types/{id}/

export async function getCtIdData(e) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/contact-types/${e.id}/`, { headers });
    const response = request;
    return {
      success: true,
      count: response.count,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}
export async function getAcdData(search) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/acd-params/?search=${search}`, { headers });
    const response = request.data;
    return {
      success: true,
      // count: response.count,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export const GetCtTimeZone = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/timezones/`, { headers });
  return response;
};

export const DisableContactTypes = async (id, disableToken) =>
  axios.patch(
    `${REACT_APP_ENDPOINT}/api/contact-types/${id}/`,
    {
      is_disabled: disableToken
    },
    { headers }
  );

export const RestoreDisableCT = async (id) => {
  try {
    axios.patch(
      `${REACT_APP_ENDPOINT}/api/contact-types/${id}/`,
      {
        is_disabled: false
      },
      { headers }
    );
    return { success: true };
  } catch (error) {
    return {
      success: false
    };
  }
};
export const RestoreContactTypes = async () => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/disabled-entities/?str_entity_type=CT`, { headers });
  return response;
};

export const GetCTAssignmentHistory = async (type, dataID) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/assignment-history/${type}/${dataID}/`, { headers });
  return response;
};

export async function getCtHistoryIdData(id) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/contact-types/${id}/`, { headers });
    const response = request;
    return {
      success: true,
      count: response.count,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export async function getCtRestoreData(id) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/contact-types/${id}/`, { headers });
    const response = request;
    return {
      success: true,
      count: response.count,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export const EditContactType = async (DataEditing, data, TimeZoneOkValue, dataSelectedAcd, dataSelectedEg) => {
  try {
    const request = axios.put(
      `${REACT_APP_ENDPOINT}/api/contact-types/${DataEditing.id}/`,
      {
        ct_name: data.ct_name || 0,
        ct_type: data?.ct_type || 0,
        ct_sub_type: data?.sub_type || 0,
        enterprise_grp_id: dataSelectedEg ? dataSelectedEg?.id : DataEditing?.enterprise_grp.id,
        week_first_day: data?.fdw,
        acd_param_id: dataSelectedAcd ? dataSelectedAcd?.id : DataEditing?.acd_param.id,
        timezone_id: TimeZoneOkValue
      },
      { headers }
    );
    return {
      success: true,
      response: request
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
};

export async function ctidAvailability(id) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/get-last-id/?str_module=CT&int_type_id=${id}`, {
      headers
    });
    const response = request.data;
    return {
      success: true,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}
