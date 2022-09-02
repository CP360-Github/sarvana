import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import { setSavee } from '../../ReduxCreated/actions/AgenDefinition';

import { getAgentEditData, putAgentEditData } from '../../api/AgentDefinitionApi';

AgentEdit.propTypes = {
  id: PropTypes.object,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func
};

function AgentEdit({ id, openModal, setOpenModal }) {
  const [agentData, setAgentData] = useState({});
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  // const [openModal, setOpenModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();
  // const { id } = useParams();

  const NewAddModal = Yup.object().shape({
    id: Yup.string().required('id is Required'),
    first_name: Yup.string().required('First Name is Required'),
    last_name: Yup.string().required('Last Name is Required'),
    password: Yup.string().required('Password is Required'),
    password2: Yup.string()
      .required('Password is Required')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
    email: Yup.string().required('email is Required').email('Invalid format')
  });

  const handleCancelClick = () => {
    //  navigate('/dashboard/agents/agent-definition');
    handleCloseModal();
  };

  async function fetchagentdetails(id) {
    const response = await getAgentEditData(id);

    if (response.success) {
      setAgentData(response?.data);
    }
  }

  useEffect(() => {
    fetchagentdetails(id);
  }, [id, update]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      sx={{ alignContent: 'center', display: 'flex', alignItems: 'center', ml: '20%' }}
    >
      <Card sx={{ p: 2, maxWidth: 900 }}>
        <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Typography variant="h5"> Agent-Edit</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid>
          <Formik
            enableReinitialize="true"
            validationSchema={NewAddModal}
            initialValues={{
              id: agentData?.id || '',
              first_name: agentData?.first_name || '',
              last_name: agentData?.last_name || '',
              password: '',
              password2: '',
              // mu: agentData?.agent_profile?.management_unit_id || '',
              email: agentData?.email || '',
              external_id: agentData?.agent_profile?.external_id || '',
              personal_id: agentData?.agent_profile?.personal_id || '',
              seniority_date: agentData?.agent_profile?.seniority_date || '',
              alt_seniority_date: agentData?.agent_profile?.alt_seniority_date || '',
              ext: agentData?.agent_profile?.ext || '',
              alt_ext: agentData?.agent_profile?.alt_ext || '',
              rank: agentData?.agent_profile?.rank || '',
              require_pwd_change: agentData?.require_pwd_change || false,
              user_locked: agentData?.agent_profile?.user_locked || false
              // acd: agentData?.agent_profile?.acd_param_id || ''
            }}
            onSubmit={async (values) => {
              const response = await putAgentEditData(id, values);
              if (response.success) {
                enqueueSnackbar('Saved success', { variant: 'success' });
                setUpdate(true);
                handleCancelClick();
                dispatch(setSavee(false));
              } else {
                console.log('re', response);
                enqueueSnackbar('Something went wrong try again later', { variant: 'error' });
              }
            }}
          >
            {({ values, setFieldValue, handleSubmit, errors, touched, getFieldProps }) => (
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid md={12} direction="column" spacing={4} px={2}>
                  <Stack direction="row" spacing={2} mt={2}>
                    <Grid md={4}>
                      <TextField
                        value={values?.first_name}
                        fullWidth
                        required
                        sx={{ mt: 2 }}
                        {...getFieldProps('first_name')}
                        name="first_name"
                        label="First Name"
                        error={Boolean(touched.first_name && errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                      />
                    </Grid>
                    <Grid md={4}>
                      <TextField
                        fullWidth
                        required
                        value={values?.last_name}
                        sx={{ mt: 2 }}
                        {...getFieldProps('last_name')}
                        name="last_name"
                        label="Last Name"
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField
                        fullWidth
                        sx={{ mt: 2 }}
                        value={values?.external_id}
                        {...getFieldProps('external_id')}
                        name="external_id"
                        label="External ID"
                      />
                    </Grid>
                  </Stack>
                  <Stack direction="row" spacing={2} mt={2}>
                    <Grid xs={12} md={4}>
                      <TextField
                        fullWidth
                        sx={{ mt: 2 }}
                        name="personal_id"
                        {...getFieldProps('personal_id')}
                        label="Personal ID"
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        values={values?.email}
                        {...getFieldProps('email')}
                        sx={{ mt: 2 }}
                        name="email"
                        label="Email Address"
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField fullWidth sx={{ mt: 2 }} {...getFieldProps('rank')} name="rank" label="Rank" />
                    </Grid>
                  </Stack>
                  <Stack direction="row" spacing={2} mt={2}>
                    <Grid xs={12} md={6}>
                      <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        name=" Seniority Date"
                        type="date"
                        label="Seniority Date"
                        {...getFieldProps('seniority_date')}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        error={Boolean(touched.seniority_date && errors.seniority_date)}
                        helperText={touched.seniority_date && errors.seniority_date}
                      />
                    </Grid>
                    <Grid xs={12} md={3}>
                      <TextField fullWidth {...getFieldProps('ext')} sx={{ mt: 2 }} name="ext" label="Extension" />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        type="date"
                        label=" Alt Seniority Date"
                        {...getFieldProps('alt_seniority_date')}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        error={Boolean(touched.alt_seniority_date && errors.alt_seniority_date)}
                        helperText={touched.alt_seniority_date && errors.alt_seniority_date}
                      />
                    </Grid>
                    <Grid xs={12} md={3}>
                      <TextField
                        fullWidth
                        {...getFieldProps('alt_ext')}
                        sx={{ mt: 2 }}
                        name="alt_ext"
                        label="Alt Extension"
                      />
                    </Grid>
                  </Stack>
                  <Stack direction="row" spacing={2} mt={2}>
                    <Grid xs={12} md={4}>
                      <TextField
                        fullWidth
                        sx={{ mt: 2 }}
                        // value={dataSelectedeAgent?.first_name + dataSelectedeAgent?.last_name || ''}
                        name="TOG"
                        label="TOG"
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        sx={{ mt: 2 }}
                        {...getFieldProps('password')}
                        name="password"
                        label="Password"
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        sx={{ mt: 2 }}
                        {...getFieldProps('password2')}
                        name="password2"
                        label="Confirm Password"
                        error={Boolean(touched.password2 && errors.password2)}
                        helperText={touched.password2 && errors.password2}
                      />
                    </Grid>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box>
                      <FormControlLabel
                        onChange={(e) => setFieldValue('require_pwd_change', e.target.checked)}
                        control={<Checkbox checked={values?.require_pwd_change} sx={{ mt: 2 }} />}
                        name="require_pwd_change"
                        label="Require Password Change"
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        onChange={(e) => setFieldValue('user_locked', e.target.checked)}
                        control={<Checkbox checked={values?.user_locked} sx={{ mt: 2 }} />}
                        name="user_locked"
                        label="User Locked"
                      />
                    </Box>
                  </Stack>
                </Grid>
                <Grid m={2}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="contained" color="warning" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                  </Stack>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Card>
    </Modal>
  );
}

export default AgentEdit;
