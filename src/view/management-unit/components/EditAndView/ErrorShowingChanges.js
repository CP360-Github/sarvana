import edit from '@iconify/icons-eva/edit-2-fill';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  FormControl,
  Button,
  TextField,
  Divider,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  Modal,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { closeFill } from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack5';
import { useSelector, useDispatch } from 'react-redux';
import { Field, useFormik, FormikProvider, Form } from 'formik';
import cross from '@iconify/icons-eva/close-outline';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../../../components/@material-extend';
import { setSave, setTimeZoneValue } from '../../../../ReduxCreated/actions/ManagementUnit';
import { setSelectedEg } from '../../../../ReduxCreated/actions/EnterPriseGroup';
import { CopyTimeZone } from '../CopyTimeZone';
import { EG } from '../EG';
import { EditMU, GetDataByID, GetOperatingHoursByID, EditOperatingHours } from '../../../../api/ManagementUnitAPI';

const EditIconMU = ({ row }) => {
  const style = {
    position: 'absolute',
    priority: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 'auto',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll'
  };
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [operatingHours, setOperatingHours] = useState([]);

  const handleClick = () => {
    dispatch(setSave(!onSave));
    setOpenModal(true);
    getDataByID(row?.id);
    getOperatingHoursByID(row?.id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
    dispatch(setTimeZoneValue(undefined));
    dispatch(setSelectedEg(undefined));
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

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onSave = useSelector((state) => state.management.onSave);
  const editMU = async (data) => {
    let response = {};
    try {
      const resp = await EditMU(data, dataSelectedEggg?.id, timezonevalue?.id, row?.id);

      if (resp.status === 200) {
        response = { token: true, msg: '' };
      }
    } catch (err) {
      response = { token: false, msg: err };
    }
    return response;
  };
  const handleComparison = async () => {
    let response = {};
    try {
      const payload = {
        operating_hrs_data: mergeRepeatedDays(allOHValue)
      };
      const res = await EditOperatingHours(payload, row?.id);
      if (res.statusText === 'OK') {
        response = { token: true, msg: '' };
      }
    } catch (error) {
      const r = error;
      const errorMsg = Object.values(r)[0];
      response = { token: false, msg: errorMsg };
    }
    return response;
  };
  const handleSubmitButton = async (data) => {
    const operatingResp = await handleComparison();
    if (operatingResp.token === true) {
      const editResp = await editMU(data);
      if (editResp.token === true) {
        dispatch(setSave(!onSave));
        enqueueSnackbar('MU Updated Successfully!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        formik.resetForm();
        setOperatingHours([]);
        dispatch(setTimeZoneValue(undefined));
        dispatch(setSelectedEg(undefined));
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

  const NewAddModal = Yup.object().shape({
    mu_name: Yup.string().required('Name is Required'),
    enterprise_grp_id: Yup.string().required('Enterprise Group is Required')
  });
  const mergeRepeatedDays = (arr) => {
    const uniqueDayData = arr.reduce((prev, cur) => {
      if (cur.day !== undefined) {
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
      }
      return prev;
    }, []);
    return uniqueDayData;
  };
  const [allOHValue, setAllOHValue] = useState([]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mu_name: '',
      enterprise_grp_id: '',
      timezone: '',
      firstdayofweek: ''
    },
    validationSchema: NewAddModal,
    onSubmit: (values) => {
      const data = {
        mu_name: values.mu_name,
        enterprise_grp_id: values.enterprise_grp_id,
        timezone: values.timezone,
        firstdayofweek: values.firstdayofweek
      };
      handleSubmitButton(data);
    }
  });

  const { handleSubmit, handleChange, values, setFieldValue, touched, errors, getFieldProps } = formik;

  const selectedEg = useSelector((state) => state.details.selectedEg);
  const [dataSelectedEggg, setSelectedEggg] = useState('');
  const timezonevalue = useSelector((state) => state.management.timezonevalue);
  useEffect(() => setSelectedEggg(selectedEg), [selectedEg]);

  useEffect(() => {
    if (dataSelectedEggg === undefined || dataSelectedEggg === '') {
      setFieldValue('enterprise_grp_id', '');
    } else {
      setFieldValue('enterprise_grp_id', dataSelectedEggg?.id + dataSelectedEggg?.eg_name);
    }
  }, [dataSelectedEggg, setFieldValue]);

  const getDataByID = async () => {
    try {
      await GetDataByID(row?.id).then((response) => {
        setFieldValue('mu_name', response.data.mu_name);
        setSelectedEggg(response.data.enterprise_grp);
        dispatch(setTimeZoneValue(response.data.timezone));
        setFieldValue('firstdayofweek', response.data.week_first_day);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOperatingHoursByID = async () => {
    try {
      await GetOperatingHoursByID(row?.id).then((response) => {
        setOperatingHours(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (values.day_OperatingHours !== undefined) {
      const Data = {
        day: values.day_OperatingHours,
        id: values.ID_OperatingHours,
        open_status: values['open_status'.concat(values.ID_OperatingHours)],
        from_time:
          values['open_status'.concat(values.ID_OperatingHours)] === 2
            ? values['from_time'.concat(values.ID_OperatingHours)]
            : null,
        to_time:
          values['open_status'.concat(values.ID_OperatingHours)] === 2
            ? values['to_time'.concat(values.ID_OperatingHours)]
            : null
      };
      setAllOHValue((prev) => [...prev, Data]);
    }
  }, [values]);

  const CheckFromTime = (e) => (
    <TextField
      id={e.id}
      label="Time"
      InputLabelProps={{ shrink: true }}
      type="time"
      style={{ width: '100%' }}
      name={'from_time'.concat(e.id)}
      format="HH:mm"
      disabled={
        (e.open_status !== 2 && values['open_status'.concat(e.id)] === undefined) ||
        values['open_status'.concat(e.id)] === 1 ||
        values['open_status'.concat(e.id)] === 3
      }
      focused={values['open_status'.concat(e.id)] === 2}
      defaultValue={e.from_time}
      value={values['from_time'.concat(e.id)] || null}
      onChange={(val) => {
        setFieldValue('ID_OperatingHours', e.id);
        setFieldValue('day_OperatingHours', e.day);
        setFieldValue('open_status'.concat(e.id), 2);
        console.log('to_time'.concat(e.id), e.to_time);
        console.log(e.from_time, 'e.from_time');
        setFieldValue(val.target.name, val.target.value);
      }}
    />
  );

  const CheckToTime = (e) => (
    <TextField
      id={e.id}
      label="Time"
      InputLabelProps={{ shrink: true }}
      type="time"
      style={{ width: '100%' }}
      disabled={changeTime(e)}
      format="HH:mm"
      name={'to_time'.concat(e.id)}
      defaultValue={e.to_time}
      value={values['to_time'.concat(e.id)] || null}
      onChange={(val) => {
        setFieldValue('ID_OperatingHours', e.id);
        setFieldValue('day_OperatingHours', e.day);
        setFieldValue('open_status'.concat(e.id), 2);
        console.log('from_time'.concat(e.id), e.from_time);
        console.log(e.to_time, 'e.to_time');
        setFieldValue(val.target.name, val.target.value);
      }}
    />
  );

  const changeTime = (e) =>
    (e.open_status !== 2 && values['open_status'.concat(e.id)] === undefined) ||
    values['open_status'.concat(e.id)] === 1 ||
    values['open_status'.concat(e.id)] === 3;

  useEffect(() => {
    if (timezonevalue) {
      setFieldValue('timezone', timezonevalue?.timezone_name);
    } else {
      setFieldValue('timezone', '');
    }
  }, [timezonevalue, setFieldValue]);

  useEffect(() => {
    if (openModal) {
      getDataByID(row?.id);
      getOperatingHoursByID(row?.id);
    }

    // eslint-disable-next-line
  }, [onSave]);

  return (
    <div>
      <>
        <MIconButton onClick={handleClick} size="large">
          <Icon icon={edit} width={20} height={20} />
        </MIconButton>
      </>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Card sx={style}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5">
              Management Unit
            </Typography>
            <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
          </Box>
          <Divider />
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '100%' }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="mu_name"
                    label="Name"
                    variant="outlined"
                    type="text"
                    value={values.mu_name}
                    onChange={handleChange}
                    {...getFieldProps('mu_name')}
                    error={Boolean(touched.mu_name && errors.mu_name)}
                    helperText={touched.mu_name && errors.mu_name}
                  />
                  <div style={{ padding: 10 }}>
                    <div style={{ width: 20, height: 20 }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    sx={{ width: '100%', mt: 1 }}
                    id="enterprise_grp_id"
                    label="EG"
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    type="text"
                    value={values.enterprise_grp_id}
                    {...getFieldProps('enterprise_grp_id')}
                    error={Boolean(touched.enterprise_grp_id && errors.enterprise_grp_id)}
                    helperText={touched.enterprise_grp_id && errors.enterprise_grp_id}
                  />
                  <EG />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    sx={{ width: '100%', mt: 1 }}
                    id="outlined-basic"
                    label="Time Zone"
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    value={values.timezone}
                    type="text"
                  />

                  <CopyTimeZone />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormControl variant="outlined" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <InputLabel style={{ background: 'white' }}>Firstday of Week</InputLabel>
                    <Field name="firstdayofweek" component={FirstDayOfWeekHandle}>
                      <MenuItem value={1}>Sunday</MenuItem>
                      <MenuItem value={2}>Monday</MenuItem>
                      <MenuItem value={3}>Monday</MenuItem>
                      <MenuItem value={4}>Wednesday</MenuItem>
                      <MenuItem value={5}>Thursday</MenuItem>
                      <MenuItem value={6}>Friday</MenuItem>
                      <MenuItem value={7}>Saturday</MenuItem>
                    </Field>
                  </FormControl>
                  <div style={{ padding: 10 }}>
                    <div style={{ width: 20, height: 20 }} />
                  </div>
                </div>
              </Box>

              <Paper sx={{ width: '100%', height: '380px', overflow: 'scroll', overflowX: 'hidden' }}>
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
                      {operatingHours?.map((value, index) => (
                        <>
                          <TableRow key={index}>
                            <TableCell align="center" style={{ fontSize: '13px' }}>
                              {weekdayProvider(value.day)}
                            </TableCell>
                            <TableCell align="center">
                              <FormControl fullWidth>
                                <InputLabel style={{ background: 'white' }}>Open Status</InputLabel>
                                <Select
                                  id={value.id}
                                  style={{ fontSize: '13px' }}
                                  name={'open_status'.concat(value.id)}
                                  defaultValue={value.open_status}
                                  value={values['open_status'.concat(value.id)]}
                                  onChange={(e) => {
                                    setFieldValue(e.target.name, e.target.value);
                                    setFieldValue('ID_OperatingHours', value.id);
                                    setFieldValue('day_OperatingHours', value.day);
                                  }}
                                >
                                  <MenuItem value={1}>Open All Day</MenuItem>
                                  <MenuItem value={2}>Open Partial Day</MenuItem>
                                  <MenuItem value={3}>Closed</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell align="center">{CheckFromTime(value)}</TableCell>
                            <TableCell align="center">{CheckToTime(value)}</TableCell>
                            <TableCell style={{ display: 'none' }}>
                              <TextField label="ID" name="ID_OperatingHours" value={value.id} onChange={handleChange} />
                              <TextField
                                label="day"
                                name="day_OperatingHours"
                                value={value.day}
                                onChange={handleChange}
                              />
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </Box>
            </Form>
          </FormikProvider>
        </Card>
      </Modal>
    </div>
  );
};

export default EditIconMU;

const FirstDayOfWeekHandle = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;
  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </Select>
  );
};

FirstDayOfWeekHandle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  form: PropTypes.object,
  field: PropTypes.object
};

EditIconMU.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
