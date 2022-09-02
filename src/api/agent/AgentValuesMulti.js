import axios from '../../utils/axios';

const { REACT_APP_ENDPOINT } = process.env;

export const MuDropDownGet = async () => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/management-units/?is_disabled=false`);
  return response;
};

export const AdgsDropDownGet = async (id) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/mu-adgs-list?mu_id=${id}`);
  return response;
};

export const MuSetsDropDownGet = async () => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/mu-sets/`);
  return response;
};

export const AdgsMuSetDropDownGet = async (id) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/musets-adgs-list?mu_set_id=${id}`);
  return response;
};

export const dashboardMuGet = async (dateCheck, adgId, muId) => {
  const response =
    axios.get(`${REACT_APP_ENDPOINT}/api/agent-data-value/?date_check=${dateCheck}&int_adg_id=${adgId}&int_mu_id=${muId}
  `);
  return response;
};

export const dashboardMuSetGet = async (dateCheck, adgId, muSetId) => {
  const response =
    axios.get(`${REACT_APP_ENDPOINT}/api/agent-data-value/?date_check=${dateCheck}&int_adg_id=${adgId}&int_mu_set_id=${muSetId}
  `);
  return response;
};

export const AdgsValueDropDownGetMuSet = async (adgId, muSetId) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/muset-adg-advs-list?mu_set_id=${muSetId}&adg_id=${adgId}`);
  return response;
};

export const AdgsValueDropDownGet = (adgId, muId) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/mu-adg-advs-list?mu_id=${muId}&adg_id=${adgId}`);
  return response;
};

export const HandleAdd = async (adgId, dateVlu, addValue, chosenAdgId) => {
  console.log(adgId, dateVlu, addValue, chosenAdgId);
  const response = axios.post(`${REACT_APP_ENDPOINT}/api/agent-data-value/`, {
    lst_agents_id: adgId,
    date_start: dateVlu,
    int_adg_value: addValue,
    int_adg_id: chosenAdgId
  });

  return response;
};

export const ViewValue = async (id) => {
  const response = axios.get(`${REACT_APP_ENDPOINT}/api/agent/${id}/adg-values/`);
  return response;
};

export const EditValue = async () => {
  // const response = axios.patch(`${REACT_APP_ENDPOINT}/api/agent-data-value/`, {
  //   int_agent_adg_value_id: int_agent_adg_value_id,
  //   date_start: date_start,
  //   int_adg_value: int_adg_value,
  //   int_adg_id: int_adg_id
  // });
  // return response;
};

export const DeleteVlu = async (id) => {
  const response = axios.delete(`${REACT_APP_ENDPOINT}/api/agent-data-value/?int_agent_adg_value_id=${id}`);
  return response;
};
