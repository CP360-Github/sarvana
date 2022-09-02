import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

export const GetAgentsAccordingToMu = async (muId, page) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/management-unit/${muId}/agents/?page=${page}`, {
    headers
  });
  return response;
};
export const SearchAgentsAccordingToMu = async (muId, search) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/management-unit/${muId}/agents/?search=${search}`, {
    headers
  });
  return response;
};
export const GetAgentsDataGroupMu = async (muId) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/mu-adgs-list?mu_id=${muId}`, { headers });
  return response;
};
export const GetAgentGroupDataMuSet = async (muSetId) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/musets-adgs-list?mu_set_id=${muSetId}`, { headers });
  return response;
};
export const GetAgentDataValueMu = async (adgId, muId) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/mu-adg-advs-list?mu_id=${muId}&adg_id=${adgId}`, {
    headers
  });
  return response;
};
export const GetACD = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/activity-codes/`, {
    headers
  });
  return response;
};

export const AddDateRange = async (data) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/apis/api/agent-availability_data/`,
    {
      lst_agents_id: data.agentIdList,
      date_start: data.startDate,
      date_end: data.endDate,
      // int_type: data.intType
      bln_confirm: true
    },
    { headers }
  );
  return response;
};
export const EditDateRange = async (data) => {
  const response = axios.patch(
    `${REACT_APP_ENDPOINT}/api/agent-availability/`,
    {
      list_agent_avail_id: data.agentIdList,
      date_start: data.startDate,
      date_end: data.endDate,
      // int_type: data.intType
      bln_confirm: true
    },
    { headers }
  );
  return response;
};
export const DeleteDateRange = async (data) => {
  const response = axios.delete(
    `${REACT_APP_ENDPOINT}/apis/api/agent-availability_data/`,
    {
      int_delete_type: data.deleteType,
      list_agent_avail_id: data.agentIdList,
      date_start: data.startDate,
      date_end: data.endDate
    },
    { headers }
  );
  return response;
};
export const GetAgentsForFilter = async (muId, muSetId, adgId, adgValueId, date) => {
  const response = await axios.get(
    `${REACT_APP_ENDPOINT}/api/agent-availability_data/?int_mu_id=${muId}&int_mu_set_id=${muSetId}&int_adg_id=${adgId}&int_adg_value_id=${adgValueId} ${
      date !== '' ? `&date_check=${date}` : ''
    } `,
    {
      headers
    }
  );
  return response;
};

export const AddWorkRules = async (data, agentId) => {
  const response = axios.post(
    `${REACT_APP_ENDPOINT}/apis/api/agent/${agentId}/availability/`,
    {
      date_start: null,
      date_end: null,
      base_schedule_code_id: null,
      force_to_work: false,
      work_status: null,
      weekly_rule: null,
      default_pref_exists: '',
      weekly_hrs: null,
      cons_day_off: null,
      max_schedule_len: null,
      cons_day_to_work: '',
      min_time_btw_sched: null,
      min_rst_period_per_wrk: null,
      max_avg_weekly_hrs: null,
      min_days_off: null,
      in_no_of_weeks: null,
      in_no_of_days: null,
      mark_avl: false,
      status: null
    },
    { headers }
  );
  return response;
};
