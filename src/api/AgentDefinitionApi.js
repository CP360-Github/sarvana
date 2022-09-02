import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

export async function getMuSetData() {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/mu-sets/`, { headers });
    const response = request.data.results;

    const musData =
      response?.map((mData) => ({
        id: mData.id,
        name: mData.set_name
      })) || [];

    return {
      success: true,
      data: musData
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export async function getMuData(search) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/management-units/?search=${search || ''}`, {
      headers
    });
    const response = request.data.results;
    const muData =
      response?.map((mData) => ({
        id: mData.id,
        name: mData.mu_name
      })) || [];
    return {
      success: true,
      data: muData
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export async function getAgentList(e, page, search, filter) {
  try {
    const request = await axios.get(
      `${REACT_APP_ENDPOINT}/apis/api/mu-set/${e?.id}/agent-profiles/?page=${page}&search=${
        search || ''
      }&is_disabled=${filter}`,
      { headers }
    );

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

export async function getAgentLists(e, page, search, filter) {
  try {
    const request = await axios.get(
      `${REACT_APP_ENDPOINT}/apis/api/management-unit/${e?.id}/agents/?page=${page}&search=${
        search || ''
      }&is_disabled=${filter}`,
      {
        headers
      }
    );

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

export const PostAgentDefinitionData = async (
  values,
  dataSelectedMu,
  dataSelectedAcd,
  dataSelectedel,
  dataSelectedeAgent
) => {
  try {
    const request = await axios.post(
      `${REACT_APP_ENDPOINT}/api/agents/`,
      {
        first_name: values?.first_name,
        last_name: values?.last_name,
        username: values?.username,
        email: values?.email,
        user_role: values?.userrole || null,
        email_language_id: dataSelectedeAgent ? dataSelectedeAgent?.email_language?.id : dataSelectedel?.id || '',
        agent_profile: {
          id: values?.id,
          start_date: values?.startDate,
          management_unit_id: dataSelectedeAgent
            ? dataSelectedeAgent.agent_profile.management_unit_id
            : dataSelectedMu.id || '',
          time_of_grp_id: 0,
          acd_param_id: dataSelectedeAgent ? dataSelectedeAgent.agent_profile.acd_param_id : dataSelectedAcd.id || ''
        }
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

export async function getAgentEditData(id) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/agents/${id}/`, { headers });
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

export async function putAgentEditData(id, values) {
  try {
    const request = await axios.put(
      `${REACT_APP_ENDPOINT}/api/agents/${id}/`,
      {
        first_name: values?.first_name,
        last_name: values?.last_name,
        username: values?.username,
        email: values?.email,
        require_pwd_change: values?.require_pwd_change,
        password: values?.password,
        password2: values?.password2,
        email_language_id: 1,
        agent_profile: {
          external_id: values?.external_id,
          personal_id: values?.personal_id,
          user_locked: values?.user_locked,
          seniority_date: values?.seniority_date,
          alt_seniority_date: values?.alt_seniority_date,
          ext: values?.ext || 0,
          rank: values?.rank || 0,
          alt_ext: values?.alt_ext || 0
        }
      },
      { headers }
    );
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

export async function getEmailLanguage(search) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/email-language/?search=${search}`, { headers });
    const response = request.data;
    const elData =
      response?.map((data) => ({
        id: data.id,
        name: data.language_name
      })) || [];
    return {
      success: true,
      data: elData
    };
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }
}

export async function idAvailability(id) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/get-last-id/?str_module=AGENTS&int_type_id=${id}`, {
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

export async function getCopyFromAgents(search) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/api/agents/?search=${search}`, { headers });
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

export async function DisableAgents(id, disableToken) {
  axios.patch(
    `${REACT_APP_ENDPOINT}/apis/api/users/${id}/`,
    {
      is_disabled: disableToken
    },
    { headers }
  );
}

export async function getAgentDefData(id) {
  try {
    const request = await axios.get(`${REACT_APP_ENDPOINT}/apis/api/adg-agent/?int_agent_id=${id}`, { headers });
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

export async function getAllAgent(page, search, filter) {
  try {
    const request = await axios.get(
      `${REACT_APP_ENDPOINT}/apis/api/agents/?page=${page}&search=${search || ''}&is_disabled=${filter}`,
      { headers }
    );
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
