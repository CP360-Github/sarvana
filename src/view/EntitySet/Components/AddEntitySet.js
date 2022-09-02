import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState, useRef, useEffect } from 'react';
import add from '@iconify/icons-eva/plus-fill';
import cross from '@iconify/icons-eva/close-outline';
import {
  Button,
  Modal,
  Card,
  Box,
  Typography,
  Divider,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { Formik, useFormik } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import view from '@iconify/icons-eva/eye-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import TimeZoneModal from './TimeZoneModal';
import { PostEntitySetAction, UpdateEntitySetAction } from '../../../ReduxCreated/actions/EntitySet.action';
import { MIconButton } from '../../../components/@material-extend';
import CopyFromEntitySet from './CopyFromEntitySet';
import { PostEntitySet, GetSingleEntitySet, UpdateEntitySet } from '../../../api/EntitySet';
import { GetTimeZone } from '../../../api/EnterPriseGroupAPI';

const AddEntitySet = ({ modalType, entitySetId, entitySetType }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const style = {
    position: 'absolute',
    priority: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const modalRef = useRef(null);
  const [copyFrom, setCopyFrom] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [timezone, setTimezone] = useState({});
  const [timezoneList, setTimezoneList] = useState([]);
  const [timezoneToken, setTimezoneToken] = useState(false);
  const [entitySetData, setEntitySetData] = useState({});
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setOpenModal(true);
    timeZone();
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setTimezone({});
    setCopyFrom({});
    setEntitySetData({});
    setTimezoneToken(false);
    formik.resetForm();
  };

  const AddEntitySetModal = Yup.object().shape({
    id: Yup.string().required('Id is Required!'),
    setType: Yup.string().required('Set Type is Required!'),
    name: Yup.string().required('Name is Required!'),
    firstDayOfWeek: Yup.string().required('Week Day is Required!'),
    timezone: Yup.string().nullable().required('Timezone is Required!')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      setType: 1,
      name: '',
      firstDayOfWeek: 1,
      timezone: '',
      copyFrom: ''
    },
    validationSchema: AddEntitySetModal,
    onSubmit: (values) => {
      if (modalType === 'add') {
        addEntitySet(values);
      } else {
        editEntitySet(values);
      }
    }
  });
  const addEntitySet = async (values) => {
    try {
      const data = {
        id: values.id,
        entity_set_name: values.name,
        set_type: values.setType,
        firstDayOfWeek: values.firstDayOfWeek,
        timezone: timezone.id,
        copyFrom: Object.keys(copyFrom).length !== 0 ? copyFrom.id : 0
      };
      const response = await PostEntitySet(data);
      if (response.statusText === 'Created') {
        enqueueSnackbar('Entity Set Successfully Added!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        dispatch(PostEntitySetAction(response.data, values.setType, entitySetType));
        handleCloseModal();
      } else {
        enqueueSnackbar('Something Went Wrong!', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const generateEntitySetAccToType = () => {
    if (entitySetType === 1) {
      const data = {
        set_name: values.name,
        week_first_day: values.firstDayOfWeek,
        timezone_id: timezone.id,
        eg_set_eg_include: entitySetData.eg_set_eg_include
      };
      return data;
    }
    if (entitySetType === 2) {
      const data = {
        set_name: values.name,
        week_first_day: values.firstDayOfWeek,
        timezone_id: timezone.id,
        eg_include: entitySetData.eg_include,
        mu_include: entitySetData.mu_include
      };
      return data;
    }
    const data = {
      set_name: values.name,
      week_first_day: values.firstDayOfWeek,
      timezone_id: timezone.id,
      ct_set_eg_include: entitySetData.ct_set_eg_include,
      ct_include: entitySetData.ct_include
    };
    return data;
  };
  const editEntitySet = async (values) => {
    try {
      const data = generateEntitySetAccToType(values);
      const response = await UpdateEntitySet(data, entitySetId, entitySetType);
      if (response.statusText === 'OK') {
        enqueueSnackbar('Entity Set Successfully Updated!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        dispatch(UpdateEntitySetAction(response.data));
        handleCloseModal();
      } else {
        enqueueSnackbar('Something Went Wrong!', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, handleChange } = formik;

  useEffect(() => {
    if (Object.keys(copyFrom).length !== 0) {
      setFieldValue('copyFrom', Object.keys(copyFrom).length !== 0 ? copyFrom.id + copyFrom.set_name : '');
      setFieldValue('firstDayOfWeek', Object.keys(copyFrom).length !== 0 ? copyFrom.week_first_day : '');
      if (timezoneFilter(copyFrom.timezone) !== undefined) {
        setTimezone(timezoneFilter(copyFrom.timezone));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyFrom]);

  const timezoneFilter = (zoneId) => {
    if (zoneId !== null) {
      const filterData = timezoneList.filter((zone) => zone.id === zoneId);
      return filterData[0];
    }
    return { timezone_name: null, id: 0 };
  };
  const timeZone = async () => {
    const timezoneList = await GetTimeZone();
    if (timezoneList.data.length !== 0) {
      setTimezoneList(timezoneList.data);
      setTimezoneToken(true);
    }
  };

  useEffect(() => {
    if (entitySetId !== '' && entitySetType !== '' && timezoneToken !== false) {
      getSingleEntitySetList(entitySetId, entitySetType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezoneToken]);

  const resetCopyFrom = () => {
    setFieldValue('copyFrom', '');
    setCopyFrom({});
  };
  const resetTimezone = () => {
    setFieldValue('timezone', '');
    setTimezone({});
  };
  useEffect(() => {
    setFieldValue('timezone', Object.keys(timezone).length !== 0 ? timezone.timezone_name : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone]);
  const getSingleEntitySetList = async (entitySetId, entityType) => {
    try {
      const result = await GetSingleEntitySet(entitySetId, entityType);
      if (result.status === 200) {
        setEntitySetData(result.data);
        setFieldValue('id', result.data.id);
        setFieldValue('setType', entityType);
        setFieldValue('name', result.data.set_name);
        setFieldValue('firstDayOfWeek', result.data.week_first_day);
        setTimezone(timezoneFilter(result.data.timezone));
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        <Button
          ref={modalRef}
          onClick={handleOpenModal}
          color="primary"
          variant="contained"
          endIcon={<Icon icon={add} />}
        >
          Add
        </Button>
      )}

      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                {modalType === 'edit'
                  ? 'Edit Details Of Entity Set'
                  : modalType === 'view'
                  ? 'Show Details Of Entity Set'
                  : ' New Entity Set'}
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
                    label="Id"
                    variant="outlined"
                    InputLabelProps={{ shrink: values.id !== undefined && values.id !== '' }}
                    inputProps={{ readOnly: modalType !== 'add' }}
                    style={{ width: '89%' }}
                    onChange={handleChange}
                    value={values.id}
                    type="number"
                    {...getFieldProps('id')}
                    error={Boolean(touched.id && errors.id)}
                    helperText={touched.id && errors.id}
                  />

                  <FormControl style={{ width: '89%' }}>
                    <InputLabel id="set-type-label">Set Type</InputLabel>
                    <Select
                      labelId="set-type-label"
                      id="set-type-select"
                      value={values.setType}
                      label="Set Type"
                      inputProps={{ readOnly: modalType === 'view' }}
                      name="setType"
                      disabled={Object.keys(copyFrom).length !== 0 || modalType === 'edit'}
                      onChange={handleChange}
                      {...getFieldProps('setType')}
                      error={Boolean(touched.setType && errors.setType)}
                      helperText={touched.setType && errors.setType}
                    >
                      <MenuItem value={1}>EnterPrise Group</MenuItem>
                      <MenuItem value={2}>Management Unit</MenuItem>
                      <MenuItem value={3}>Contact Type</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    label="Name"
                    InputLabelProps={{ shrink: values.name !== undefined && values.name !== '' }}
                    variant="outlined"
                    inputProps={{ readOnly: modalType === 'view' }}
                    style={{ width: '89%' }}
                    onChange={handleChange}
                    value={values.name}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <FormControl style={{ width: '89%' }}>
                    <InputLabel id="set-week-label">First Day of Week</InputLabel>
                    <Select
                      labelId="set-week-label"
                      id="set-week-select"
                      value={values.firstDayOfWeek}
                      label="First Day of Week"
                      inputProps={{ readOnly: modalType === 'view' }}
                      onChange={handleChange}
                      disabled={Object.keys(copyFrom).length !== 0}
                      {...getFieldProps('firstDayOfWeek')}
                      error={Boolean(touched.firstDayOfWeek && errors.firstDayOfWeek)}
                      helperText={touched.firstDayOfWeek && errors.firstDayOfWeek}
                    >
                      <MenuItem value={1}>Sunday</MenuItem>
                      <MenuItem value={2}>Monday</MenuItem>
                      <MenuItem value={3}>Tuesday</MenuItem>
                      <MenuItem value={4}>Wednesday</MenuItem>
                      <MenuItem value={5}>Thursday</MenuItem>
                      <MenuItem value={6}>Friday</MenuItem>
                      <MenuItem value={7}>Saturday</MenuItem>
                    </Select>
                  </FormControl>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      label="Timezone"
                      variant="outlined"
                      inputProps={{ readOnly: true }}
                      style={{ width: '89%' }}
                      InputLabelProps={{
                        shrink: values.timezone !== undefined && values.timezone !== ''
                      }}
                      disabled={Object.keys(copyFrom).length !== 0}
                      value={values.timezone}
                      onChange={handleChange}
                      {...getFieldProps('timezone')}
                      error={Boolean(touched.timezone && errors.timezone)}
                      helperText={touched.timezone && errors.timezone}
                    />
                    {modalType !== 'view' ? (
                      Object.keys(copyFrom).length === 0 ? (
                        Object.keys(timezone).length !== 0 ? (
                          <MIconButton style={{ width: '50px', height: '50px' }} onClick={resetTimezone}>
                            <Icon width="20px" height="20px" icon={cross} />
                          </MIconButton>
                        ) : (
                          <TimeZoneModal setZone={setTimezone} timezoneList={timezoneList} />
                        )
                      ) : (
                        ''
                      )
                    ) : null}
                  </div>
                  {modalType === 'add' ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <TextField
                        label="Copy From"
                        variant="outlined"
                        inputProps={{ readOnly: true }}
                        style={{ width: '89%' }}
                        InputLabelProps={{
                          shrink: values.copyFrom !== undefined && values.copyFrom !== ''
                        }}
                        disabled={Object.keys(copyFrom).length !== 0}
                        value={values.copyFrom}
                        onChange={handleChange}
                        {...getFieldProps('copyFrom')}
                        error={Boolean(touched.copyFrom && errors.copyFrom)}
                        helperText={touched.copyFrom && errors.copyFrom}
                      />
                      {Object.keys(copyFrom).length !== 0 ? (
                        <MIconButton style={{ width: '50px', height: '50px' }} onClick={resetCopyFrom}>
                          <Icon width="20px" height="20px" icon={cross} />
                        </MIconButton>
                      ) : (
                        <CopyFromEntitySet setSelectedValue={setCopyFrom} setType={values.setType} />
                      )}
                    </div>
                  ) : null}
                </Box>
                {modalType !== 'view' ? (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                      {modalType === 'add' ? 'Save' : 'Update'}
                    </Button>
                  </Box>
                ) : null}
              </div>
            </Formik>
          </Card>
        </Modal>
      </>
    </>
  );
};

export default AddEntitySet;

AddEntitySet.propTypes = {
  modalType: PropTypes.string,
  entitySetId: PropTypes.number,
  entitySetType: PropTypes.number
};
