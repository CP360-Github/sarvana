import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import edit from '@iconify/icons-eva/edit-2-fill';
import cross from '@iconify/icons-eva/close-outline';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import add from '@iconify/icons-eva/plus-fill';
import { Form, Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setMuOrMuSet, setSavee, setselectedData } from '../../ReduxCreated/actions/AgenDefinition';
import { MIconButton } from '../../components/@material-extend';
import Scrollbar from '../../components/Scrollbar';
import { PaginationA } from '../../sharedComponents/Pagination';
import {
  getAgentList,
  getAgentLists,
  getAllAgent,
  getEmailLanguage,
  getMuData,
  getMuSetData,
  idAvailability,
  PostAgentDefinitionData
} from '../../api/AgentDefinitionApi';
import { CopyAcdData, CopyFromAgentData, CopyMuData } from './CopyAgentData';
import AgentMoreButton from './AgentMoreButton';
import AgentEdit from './AgentEdit';
import EnableDisableFilterWithSearch from '../../sharedComponents/EnableDisableFilterWithSearch';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  border: '1px solid grey',
  boxShadow: 24,
  minWidth: 400,
  maxWidth: 700,
  p: 4
};

function AgentDefinition() {
  const [openModal, setOpenModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [dataSelectedAcd, setSelectedAcd] = useState();
  const [dataSelectedMu, setSelectedMu] = useState();
  const [dataSelectedel, setSelectedel] = useState();
  const [dataSelectedeAgent, setSelectedAgent] = useState();
  const [agentList, setAgentList] = useState();
  const [muData, setMuData] = useState([]);
  // const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const [emailData, setEmailData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState(false);
  const [tvalue, setTvalue] = useState(false);

  const NewAddModal = Yup.object().shape({
    first_name: Yup.string().required('First Name is Required'),
    last_name: Yup.string().required('Last Name is Required'),
    startDate: Yup.string().required('Start-date is Required'),
    email: Yup.string().required('email is Required').email('Invalid format')
  });
  const formik = useFormik({
    validationSchema: NewAddModal,
    initialValues: {
      id: '',
      first_name: '',
      last_name: '',
      username: '',
      startDate: '',
      mu: '',
      email: '',
      email_language_id: '',
      // userrole: '',
      acd: ''
    },
    onSubmit: async (values) => {
      const response = await PostAgentDefinitionData(
        values,
        dataSelectedMu,
        dataSelectedAcd,
        dataSelectedel,
        dataSelectedeAgent
      );

      if (response.success) {
        enqueueSnackbar('Saved success', { variant: 'success' });
        setOpenModal(false);
        resetForm();
        setSelectedAcd();
        setSelectedMu();
        setSelectedAgent();
        setIdValidToken({ token: false, msg: '' });
      } else {
        enqueueSnackbar('Something went wrong try again later', {
          variant: 'error'
        });
      }
    }
  });
  const { errors, touched, values, setFieldValue, handleSubmit, getFieldProps, handleChange, resetForm } = formik;
  const [idValidToken, setIdValidToken] = useState({ token: false, msg: '' });
  // eslint-disable-next-line consistent-return
  const idAvailabilityProvider = async () => {
    if (values.id !== '') {
      const response = await idAvailability(parseInt(values.id, 10));
      if (response?.success) {
        if (response.status === 'The Given ID is available') {
          return response;
        }

        setIdValidToken({ token: true, msg: response.data?.status });
      }
    } else {
      setIdValidToken({ token: true, msg: 'ID is Required!' });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAcd();
    setSelectedMu();
    setSelectedAgent();
    resetForm();
    setIdValidToken({ token: false, msg: '' });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  async function fetchMuDetails() {
    const response = await getMuData();

    if (response.success) {
      setMuData(response?.data);
    }
  }

  async function fetchMusDetails() {
    const response = await getMuSetData();

    if (response.success) {
      setMuData(response?.data);
    }
  }

  async function getAgentDataMuset(e, page, search, filter) {
    const response = await getAgentList(e, page, search, filter);
    if (response.success) {
      setAgentList(response.data.results);
      setTvalue(response.data);
    }
  }
  async function getAgentDataMu(e, page, search, filter) {
    const response = await getAgentLists(e, page, search, filter);
    console.log('hh', response);
    if (response.success) {
      setAgentList(response.data.results);
      setTvalue(response.data);
    }
  }

  async function fetchAllAgent(page, search, filter) {
    const response = await getAllAgent(page, search, filter);
    if (response.success) {
      setAgentList(response.data.results);
      setTvalue(response.data);
    }
  }

  const AcdValue = useSelector((state) => state.AgentDef.AcdValue);
  const MuValue = useSelector((state) => state.AgentDef.MuValue);
  // const EmailValue = useSelector((state) => state.AgentDef.EmailLang);
  const CopiedAgent = useSelector((state) => state.AgentDef.copiedAgent);
  const EditSaved = useSelector((state) => state.AgentDef.savee);
  const muOrMuSet = useSelector((state) => state.AgentDef.muOrMuSet);
  const selectedData = useSelector((state) => state.AgentDef.selectedData);
  const deleted = useSelector((state) => state.AgentDef.deleted);

  useEffect(() => setSelectedAcd(AcdValue), [AcdValue]);
  useEffect(() => setSelectedMu(MuValue), [MuValue]);
  useEffect(() => setSelectedAgent(CopiedAgent), [CopiedAgent]);
  useEffect(() => {
    handleApply(page, search, filter);
    // eslint-disable-next-line
  }, [EditSaved, search, deleted, filter]);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (muOrMuSet === 'MU') {
      fetchMuDetails();
    } else if (muOrMuSet === 'MU Sets') {
      fetchMusDetails();
    }
  }, [muOrMuSet]);

  const handleClickpop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosepop = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleApply = (page, search, filter) => {
    if (muOrMuSet === 'MU') {
      getAgentDataMu(selectedData, page, search, filter);
    } else if (muOrMuSet === 'MU Sets') {
      getAgentDataMuset(selectedData, page, search, filter);
    } else {
      fetchAllAgent(page, search, filter);
    }
    handleClosepop();
  };

  const handleChanges = (event, value) => {
    setPage(value);
    handleApply(value, search, filter);
  };

  const handleReset = () => {
    dispatch(setselectedData(undefined));
    setMuData(undefined);
  };

  async function fetchElanguageDetails() {
    const response = await getEmailLanguage();

    if (response.success) {
      setEmailData(response.data);
    }
  }

  useEffect(() => {
    fetchElanguageDetails();
  }, [dataSelectedel]);

  const handleRemoveAcd = () => {
    setSelectedAcd();
  };

  const handleRemoveMu = () => {
    setSelectedMu();
  };

  const handleRemoveCopyFrom = () => {
    setSelectedAgent();
  };

  const handleEmailLanguage = (e, value) => {
    setSelectedel(value);
    setFieldValue('email_language_id', value?.label);
  };

  return (
    <>
      <Card sx={{ p: 1 }}>
        <Box sx={{ mb: 1, ml: 2, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5"> Agent Definition</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              // ref={modalRef}
              onClick={handleOpenModal}
              color="primary"
              variant="contained"
              endIcon={<Icon icon={add} />}
            >
              Add
            </Button>
          </Box>
        </Box>

        <Stack direction="row" justifyContent="flex-end">
          <Grid md={12}>
            <EnableDisableFilterWithSearch
              setFilter={setFilter}
              filter={filter}
              setSearchText={setSearch}
              searchText={search}
            />
          </Grid>
          <Grid md={1} mt={2}>
            <MIconButton title="Filter" aria-describedby={id} onClick={handleClickpop}>
              <Icon icon="bi:filter" />
            </MIconButton>
          </Grid>
        </Stack>
        <Grid mb={2} md={12} gutterBottom>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Grid md={12}>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosepop}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <Box sx={{ width: '300px', padding: '25px' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <Typography paragraph sx={{ fontSize: '13pt' }}>
                        Filter
                      </Typography>
                      <Typography
                        paragraph
                        onclick={handleReset}
                        color="primary"
                        sx={{ fontSize: '13pt', cursor: 'pointer' }}
                      >
                        Reset
                      </Typography>
                    </div>
                    <Icon icon="akar-icons:cross" cursor="pointer" onClick={handleClosepop} />
                  </div>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <RadioGroup value={muOrMuSet} row onChange={(e) => dispatch(setMuOrMuSet(e.target.value))}>
                          <FormControlLabel value="MU" control={<Radio size="small" />} label="MU" />
                          <FormControlLabel value="MU Sets" control={<Radio size="small" />} label="MU Sets" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={10}>
                      <FormControl fullWidth>
                        <Autocomplete
                          id="combo-box-demo"
                          size="small"
                          options={
                            muData?.map((emp) => ({
                              label: emp.name,
                              id: emp.id
                            })) || []
                          }
                          value={selectedData?.name || ''}
                          onChange={(e, value) => {
                            dispatch(setselectedData(value));
                            // setselectedData(value);
                          }}
                          renderInput={(params) => <TextField size="small" label={muOrMuSet} {...params} />}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={() => handleApply(page, search, filter)}
                  >
                    Apply
                  </Button>
                </Box>
              </Popover>
            </Grid>
          </Stack>
        </Grid>

        {/* Agent Table */}
        <AgentDefinitionTable agentList={agentList} />
        <PaginationA volatile={tvalue} handleChange={handleChanges} />
      </Card>
      <>
        <Modal open={openModal} onClose={handleCloseModal} sx={{ mt: 10 }}>
          <Card sx={style}>
            <Box p={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography id="modal-modal-title" variant="h5">
                  New Agent
                </Typography>
                <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
              </Stack>
              <Divider />
              <Grid>
                <Formik>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack direction="row" spacing={4}>
                      <Grid xs={12} md={6}>
                        <TextField
                          sx={{ mt: 2 }}
                          required
                          label="WFM ID"
                          fullWidth
                          name="id"
                          value={values.id}
                          error={Boolean(idValidToken.token)}
                          helperText={idValidToken.token !== false ? idValidToken.msg : errors.id}
                          {...getFieldProps('id')}
                          onBlur={() => idAvailabilityProvider()}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          sx={{ mt: 2 }}
                          required
                          fullWidth
                          name="startDate"
                          type="date"
                          label="Start Date"
                          {...getFieldProps('startDate')}
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                          error={Boolean(touched.startDate && errors.startDate)}
                          helperText={touched.startDate && errors.startDate}
                        />
                      </Grid>
                    </Stack>
                    <Stack direction="row" spacing={4}>
                      <Grid xs={12} md={6}>
                        <TextField
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
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          required
                          sx={{ mt: 2 }}
                          {...getFieldProps('last_name')}
                          name="last_name"
                          label="Last Name"
                          error={Boolean(touched.last_name && errors.last_name)}
                          helperText={touched.last_name && errors.last_name}
                        />
                      </Grid>
                    </Stack>

                    <Stack direction="row" spacing={4}>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          required
                          sx={{ mt: 2 }}
                          {...getFieldProps('username')}
                          name="username"
                          label="Login ID"
                        />
                      </Grid>

                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          required
                          type="email"
                          sx={{ mt: 2 }}
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                          name="email"
                          label="Email Address"
                        />
                      </Grid>
                    </Stack>
                    <Stack direction="row" spacing={4}>
                      <Grid xs={12} md={6}>
                        <FormControl fullWidth>
                          <Autocomplete
                            name="email_language_id"
                            sx={{ mt: 2 }}
                            options={
                              emailData?.map((emp) => ({
                                label: emp.name,
                                id: emp.id
                              })) || []
                            }
                            value={values?.email_language_id || ''}
                            onChange={(e, value) => {
                              handleEmailLanguage(e, value);
                            }}
                            renderInput={(params) => <TextField label="Email Language" {...params} />}
                          />
                        </FormControl>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField fullWidth sx={{ mt: 2 }} name="TOG" label="TOG" />
                      </Grid>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Stack direction="row">
                        <Grid xs={12} md={8}>
                          <TextField
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={dataSelectedeAgent !== undefined}
                            value={(values.mu = dataSelectedMu?.name || '')}
                            onChange={handleChange}
                            name="mu"
                            label="MU"
                          />
                        </Grid>
                        {dataSelectedMu ? (
                          <Icon
                            icon={cross}
                            onClick={handleRemoveMu}
                            color="grey"
                            cursor="pointer"
                            style={{ 'margin-top': '35px' }}
                          />
                        ) : (
                          <CopyMuData />
                        )}
                      </Stack>
                      <Stack direction="row">
                        <Grid xs={12} md={8}>
                          <TextField
                            fullWidth
                            sx={{ mt: 2 }}
                            name="acd"
                            label="ACD"
                            disabled={dataSelectedeAgent !== undefined}
                            value={(values.acd = dataSelectedAcd?.param_name || '')}
                            onChange={handleChange}
                          />
                        </Grid>
                        {dataSelectedAcd ? (
                          <Icon
                            icon={cross}
                            onClick={handleRemoveAcd}
                            color="grey"
                            cursor="pointer"
                            style={{ 'margin-top': '35px' }}
                          />
                        ) : (
                          <CopyAcdData />
                        )}
                      </Stack>
                      <Stack direction="row">
                        <Grid xs={12} md={8}>
                          <TextField
                            fullWidth
                            sx={{ mt: 2 }}
                            value={dataSelectedeAgent?.first_name + dataSelectedeAgent?.last_name || ''}
                            name="copyfrom"
                            label="Copy From"
                          />
                        </Grid>
                        {dataSelectedeAgent ? (
                          <Icon
                            icon={cross}
                            onClick={handleRemoveCopyFrom}
                            color="grey"
                            cursor="pointer"
                            style={{ 'margin-top': '35px' }}
                          />
                        ) : (
                          <CopyFromAgentData />
                        )}
                      </Stack>
                    </Stack>

                    <Grid mt={2}>
                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" color="warning" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                          Save
                        </Button>
                      </Stack>
                    </Grid>
                  </Form>
                </Formik>
              </Grid>
            </Box>
            <Box />
          </Card>
        </Modal>
      </>
    </>
  );
}

AgentDefinitionTable.propTypes = {
  agentList: PropTypes.object
};

function AgentDefinitionTable({ agentList }) {
  const TABLE_HEAD = [
    { id: 'ID.', label: 'ID.' },
    { id: 'mu_name', label: 'Name' }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [value, setValue] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (e) => {
    dispatch(setSavee(true));
    setOpenModal(true);
    setValue(e?.id);
  };
  if (openModal) {
    return <AgentEdit id={value} openModal={openModal} setOpenModal={setOpenModal} />;
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Scrollbar>
      <TableContainer sx={{ Width: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((headCell) => (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              ))}
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {agentList?.map((bodycell) => (
              <TableRow key={bodycell.id}>
                <TableCell>{bodycell?.agent_profile?.id}</TableCell>
                <TableCell>
                  {bodycell?.first_name} {bodycell?.last_name}{' '}
                </TableCell>
                <TableCell />
                <TableCell>
                  <MIconButton onClick={() => handleEdit(bodycell)} size="large">
                    <Icon icon={edit} width={20} height={20} />
                  </MIconButton>
                </TableCell>
                <TableCell>
                  <AgentMoreButton
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    open={open}
                    dataIds={bodycell}
                    handleClick={handleClick}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}

export default AgentDefinition;
