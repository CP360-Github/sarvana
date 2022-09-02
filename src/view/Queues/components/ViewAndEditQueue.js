import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState, useRef, useEffect } from 'react';
import cross from '@iconify/icons-eva/close-outline';
import {
  Button,
  Modal,
  Card,
  Box,
  Typography,
  Divider,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { Formik, useFormik } from 'formik';
import editFill from '@iconify/icons-eva/edit-fill';
import view from '@iconify/icons-eva/eye-fill';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch, useSelector } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import { GetSingleQueues, UpdateQueues, GetOperatingHours, UpdateOperatingHours } from '../../../api/Queue';
import { UpdateQueueAction } from '../../../ReduxCreated/actions/Queue';
import { GetOperatingHoursQueueAction } from '../../../ReduxCreated/actions/QueueOperatingHours.action';

const ViewAndEditQueue = ({ modalType, queueId }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.queueOH);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const style = {
    position: 'absolute',
    priority: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: modalType === 'edit' ? 700 : 500,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [queue, setQueue] = useState({});
  const [operatingHours, setOperatingHours] = useState([]);
  const [sentData, setSentData] = useState([]);
  const [queueUpdatedToken, setQueueUpdatedToken] = useState({ queue: false });

  const handleOpenModal = () => {
    setOpenModal(true);
    getSingleQueue();
    getOperatingHourList();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOperatingHours([]);
    setQueue({});
    formik.resetForm();
  };

  const AddQueueModal = Yup.object().shape({
    name: Yup.string().required('Name is Required!')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      acd: '',
      acdQueueTags: '',
      ct: '',
      copyFrom: ''
    },
    validationSchema: AddQueueModal,
    onSubmit: (values) => {
      handleSubmitButton(values);
    }
  });

  const handleSubmitButton = async (values) => {
    const operatingResp = await operatingHourAPI();
    if (operatingResp.token === true) {
      if (queueUpdatedToken.queue === true) {
        const editResp = await editQueue(values);
        if (editResp.token === true) {
          enqueueSnackbar('Queue Updated Successfully!', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        }
      }
    } else {
      enqueueSnackbar(operatingResp.msg, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  const editQueue = async (queueData) => {
    let resp;
    try {
      const data = {
        name: queueData.name,
        contactType: queue.contact_type.id,
        acd: queue.acd_param.id,
        copyFromId: ''
      };
      const response = await UpdateQueues(data, queue.id);
      if (response.statusText === 'OK') {
        const respAdd = {
          acd_param: queue.acd_param,
          contact_type: queue.contact_type.id,
          id: queueData.id,
          queue_name: queueData.name
        };
        dispatch(UpdateQueueAction(respAdd));
        resp = { token: true, msg: '' };
      }
    } catch (error) {
      resp = { token: false, msg: error };
    }
    return resp;
  };
  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue } = formik;

  const getSingleQueue = async () => {
    try {
      const result = await GetSingleQueues(queueId);
      if (result.status === 200) {
        setQueue(result.data);
        setFieldValue('id', result.data.id);
        setFieldValue('name', result.data.queue_name);
        setFieldValue('acd', result.data.acd_param.param_name);
        setFieldValue('acdQueueTags', '');
        setFieldValue('ct', result.data.contact_type.ct_name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setOperatingHours(selector);
  }, [selector]);

  const getOperatingHourList = async () => {
    try {
      const data = await GetOperatingHours(queueId);
      if (data.statusText === 'OK') {
        dispatch(GetOperatingHoursQueueAction(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const focusOnTimePicker = (operatingDay, inputId) => {
    if (operatingDay === 2) {
      const timePicker = document.getElementById(`fromTime_${inputId}`);
      if (timePicker !== null) {
        setTimeout(() => {
          timePicker.focus();
        }, 100);
      }
    }
  };
  const updateOpen = async (day, openStatus, fromTime, toTome, hoursId) => {
    try {
      const data = {
        day,
        open_status: openStatus,
        from_time: fromTime === '' ? null : fromTime,
        to_time: toTome === '' ? null : toTome,
        entity_type: 'Q',
        id: hoursId
      };
      const updated = operatingHours.filter((val) => {
        if (day === val.day) {
          val.open_status = openStatus;
        }
        if (day === val.day) {
          if (fromTime !== '' && openStatus === 2) {
            val.from_time = fromTime;
          } else {
            val.from_time = '';
          }
          if (toTome !== '' && openStatus === 2) {
            val.to_time = toTome;
          } else {
            val.to_time = '';
          }
        }
        return val;
      });
      dispatch(GetOperatingHoursQueueAction(updated));
      setSentData((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };
  const mergeRepeatedDays = (arr) => {
    const uniqueDayData = arr.reduce((prev, cur) => {
      const index = prev.findIndex((v) => v.day === cur.day);
      if (index === -1) {
        prev.push(cur);
      } else {
        prev[index].day = cur.day;
        prev[index].open_status = cur.open_status;
        prev[index].from_time = cur.from_time;
        prev[index].to_time = cur.to_time;
        prev[index].id = cur.id;
      }
      return prev;
    }, []);
    return uniqueDayData;
  };

  const operatingHourAPI = async () => {
    let response;
    try {
      const payload = mergeRepeatedDays(sentData);
      const resp = await UpdateOperatingHours(payload, queueId);
      if (resp.status === 200) {
        response = { token: true, msg: '' };
      }
    } catch (error) {
      const errorMsg = error.response.data?.ValidationError;
      const UpperCase = errorMsg?.charAt(0).toUpperCase() + errorMsg?.slice(1);
      response = { token: false, msg: UpperCase };
    }
    return response;
  };
  const weekdayProvider = (operatingDayNumber) => {
    const weekday =
      operatingDayNumber === 1
        ? 'Sunday'
        : operatingDayNumber === 2
        ? 'Monday'
        : operatingDayNumber === 3
        ? 'Tuesday'
        : operatingDayNumber === 4
        ? 'Wednesday'
        : operatingDayNumber === 5
        ? 'Thursday'
        : operatingDayNumber === 6
        ? 'Friday'
        : operatingDayNumber === 7
        ? 'Saturday'
        : '';
    return weekday;
  };

  useEffect(() => {
    if (values.name !== '') {
      if (values.name !== queue.queue_name) {
        setQueueUpdatedToken({ queue: true });
      } else {
        setQueueUpdatedToken({ queue: false });
      }
    }
  }, [queue.queue_name, values]);

  return (
    <>
      {modalType === 'edit' ? (
        <MIconButton onClick={handleOpenModal} ref={modalRef}>
          <Icon icon={editFill} width={20} height={20} />
        </MIconButton>
      ) : modalType === 'view' ? (
        <MIconButton onClick={handleOpenModal} ref={modalRef}>
          <Icon icon={view} width={20} height={20} />
        </MIconButton>
      ) : (
        <Button style={{ marginRight: 2 }} variant="outlined" size="small" onClick={handleOpenModal}>
          View
        </Button>
      )}

      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                {modalType === 'edit' ? 'Edit Details Of Queue' : 'Show Details Of Queue'}
              </Typography>
              <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
            </Box>
            <Divider />
            <Formik value={formik}>
              <div>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '100%' }
                  }}
                  autoComplete="off"
                >
                  <TextField
                    id="id"
                    InputLabelProps={{ shrink: values.id !== undefined }}
                    label="ID"
                    variant="outlined"
                    style={{ width: '100%' }}
                    value={values.id}
                    type="number"
                    inputProps={{ readOnly: true }}
                    {...getFieldProps('id')}
                    error={Boolean(touched.id && errors.id)}
                    helperText={touched.id && errors.id}
                  />
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    style={{ width: '100%' }}
                    inputProps={{ readOnly: modalType !== 'edit' }}
                    value={values.name}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      id="acd"
                      label="ACD"
                      variant="outlined"
                      InputLabelProps={{ shrink: values.acd !== undefined }}
                      inputProps={{ readOnly: true }}
                      style={{ width: '100%' }}
                      onChange={(e) => console.log(e.target.value)}
                      value={values.acd}
                      {...getFieldProps('acd')}
                      error={Boolean(touched.acd && errors.acd)}
                      helperText={touched.acd && errors.acd}
                    />
                  </div>

                  <TextField
                    id="acd_queue_tag"
                    label="ACD Queue Tag"
                    variant="outlined"
                    style={{ width: '100%' }}
                    inputProps={{ maxLength: 64, readOnly: true }}
                    value={values.acdQueueTags}
                    onChange={(e) => console.log(e.target.value)}
                    {...getFieldProps('acdQueueTags')}
                    error={Boolean(touched.acdQueueTags && errors.acdQueueTags)}
                    helperText={touched.acdQueueTags && errors.acdQueueTags}
                  />
                  {modalType === 'edit' ? (
                    ''
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <TextField
                        id="CT"
                        label="CT"
                        variant="outlined"
                        style={{ width: '100%' }}
                        value={values.ct}
                        inputProps={{ readOnly: true }}
                        onChange={(e) => console.log(e.target.value)}
                        {...getFieldProps('ct')}
                        error={Boolean(touched.ct && errors.ct)}
                        helperText={touched.ct && errors.ct}
                      />
                    </div>
                  )}
                </Box>
                {modalType === 'edit' ? (
                  <Paper sx={{ width: '100%', height: '380px', overflow: 'scroll' }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={4} align="center" style={{ boxShadow: 'none' }}>
                              Operating Hours
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center" style={{ boxShadow: 'none' }}>
                              Day
                            </TableCell>
                            <TableCell align="center">Open</TableCell>
                            <TableCell align="center">From</TableCell>
                            <TableCell align="center" style={{ boxShadow: 'none' }}>
                              To
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {operatingHours.map((operatingHour) => (
                            <TableRow key={operatingHour.id}>
                              <TableCell align="center"> {weekdayProvider(operatingHour.day)}</TableCell>
                              <TableCell align="center">
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Operating Day</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={operatingHour.open_status}
                                    label="Operating Day"
                                    style={{ fontSize: '13px' }}
                                    onChange={(e) => {
                                      updateOpen(operatingHour.day, e.target.value, '', '', operatingHour.id);
                                      focusOnTimePicker(e.target.value, operatingHour.id);
                                    }}
                                  >
                                    <MenuItem value={1}>Open All Day</MenuItem>
                                    <MenuItem value={2}>Open Partial Day</MenuItem>
                                    <MenuItem value={3}>Closed</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  id={`fromTime_${operatingHour.id}`}
                                  type="time"
                                  label="Time"
                                  value={operatingHour.from_time === null ? '' : operatingHour.from_time}
                                  InputLabelProps={{
                                    shrink:
                                      operatingHour.from_time === null ||
                                      operatingHour.from_time !== '' ||
                                      operatingHour.from_time === ''
                                  }}
                                  disabled={operatingHour.open_status !== 2}
                                  format="HH:mm"
                                  onChange={(e) =>
                                    updateOpen(
                                      operatingHour.day,
                                      operatingHour.open_status,
                                      e.target.value,
                                      operatingHour.to_time,
                                      operatingHour.id
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  type="time"
                                  label="Time"
                                  value={operatingHour.to_time === null ? '' : operatingHour.to_time}
                                  InputLabelProps={{
                                    shrink:
                                      operatingHour.to_time === null ||
                                      operatingHour.to_time !== '' ||
                                      operatingHour.to_time === ''
                                  }}
                                  disabled={operatingHour.open_status !== 2}
                                  format="HH:mm"
                                  onChange={(e) =>
                                    updateOpen(
                                      operatingHour.day,
                                      operatingHour.open_status,
                                      operatingHour.from_time,
                                      e.target.value,
                                      operatingHour.id
                                    )
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                ) : (
                  ''
                )}

                {modalType === 'edit' ? (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                      Update
                    </Button>
                  </Box>
                ) : (
                  ''
                )}
              </div>
            </Formik>
          </Card>
        </Modal>
      </>
    </>
  );
};

export default ViewAndEditQueue;

ViewAndEditQueue.propTypes = {
  modalType: PropTypes.string,
  queueId: PropTypes.number
};
