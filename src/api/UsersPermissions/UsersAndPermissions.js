import axios from '../../utils/axios';

const { REACT_APP_ENDPOINT } = process.env;

export const PostAddForm = async (checkedone, checkedone2, values, okValue) => {
  console.log(values, 'submit');
  const response = axios.post(`${REACT_APP_ENDPOINT}/api/users/`, {
    email: values.email,
    username: values.loginid,
    password: values.password,
    password2: values.confirmpassword,
    first_name: values.firstname,
    last_name: values.lastname,
    user_role: values.userlevel,
    require_pwd_change: checkedone2,
    // email_language_id: 1,
    is_disabled: false,
    timezone_id: okValue?.id,
    service_account: checkedone,
    allowed_modules: values.modulewisepermission
  });
  return response;
};

export const GetUserLevelDropDown = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/user-roles`);
  return response;
};

export const GetModuleWiseDropDown = async () => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/module-list`);
  return response;
};

export const GetUsersAndPermissions = async (search) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/users/?is_disabled=false&search=${search}`);
  return response;
};
export const GetUsersAndPermissionDisabled = async (search) => {
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/users/?is_disabled=true&search=${search}`);
  return response;
};

export const DeleteUsersAndPermissions = async (id) => {
  const response = axios.patch(`${REACT_APP_ENDPOINT}/api/users/${id}/`, {
    is_disabled: true
  });
  return response;
};

export const RestoreUserPermission = async (id) => {
  const response = axios.patch(`${REACT_APP_ENDPOINT}/api/users/${id}/`, {
    is_disabled: false
  });
  return response;
};

export const GetDataById = async (id) => {
  console.log(id, 'p');
  const response = await axios.get(`${REACT_APP_ENDPOINT}/api/users/${id}/`);
  return response;
};

export const PutData = async (id, values, okValuee) => {
  const response = await axios.put(`${REACT_APP_ENDPOINT}/api/users/${id}/`, {
    email: values.email,
    username: values.loginid,
    password: values.password,
    password2: values.confirmpassword,
    first_name: values.first_name,
    last_name: values.last_name,
    user_role: values.userlevel,
    require_pwd_change: values.checkedone2,
    // email_language_id: 1,
    timezone_id: okValuee,
    service_account: values.checkedone,
    allowed_modules: values.modulewisepermission
  });
  return response;
};
