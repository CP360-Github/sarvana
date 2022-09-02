import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Popover,
  Button,
  FormLabel
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack5';
import { AddDateRange, EditDateRange, DeleteDateRange } from '../../../api/agent/AgentAvailability';
import { MIconButton } from '../../../components/@material-extend';
import {
  UpdateAgentListAction,
  DeleteAgentListAction
} from '../../../ReduxCreated/actions/Agent/AgentAvailability.action';

const DateRangeAdd = ({ modalType, agentName, setAgentIdList }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const agentIdList = useSelector((state) => state.AgentAvailability.agentIdList);
  const [anchorEl, setAnchorEl] = useState(null);
  const [handleDeleteToken, setHandleDeleteToken] = useState('1');
  const [handleCurrentOrDate, setHandleCurrentOrDate] = useState('current');

  const ManagementUnitModal = Yup.object().shape({
    startDate:
      modalType !== 'remove'
        ? Yup.string().required('Start Date is Required!')
        : handleCurrentOrDate !== 'current'
        ? Yup.string().required('Start Date is Required!')
        : '',
    endDate:
      modalType !== 'remove'
        ? Yup.string().required('End Date is Required!')
        : handleCurrentOrDate !== 'current'
        ? Yup.string().required('End Date is Required!')
        : ''
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      startDate: '',
      endDate: ''
    },
    validationSchema: ManagementUnitModal,
    onSubmit: (values) => {
      if (modalType === 'add') {
        addDateRangeAPI(values);
      } else if (modalType === 'edit') {
        editDateRangeAPI(values);
      } else {
        deleteDateRangeAPI(values);
      }
    }
  });

  const { errors, touched, values, getFieldProps, handleSubmit } = formik;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    formik.resetForm();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const addDateRangeAPI = async () => {
    try {
      const data = {
        startDate: values.startDate,
        endDate: values.endDate,
        agentIdList
      };
      const resp = await AddDateRange(data);
      if (resp.statusText === 'OK') {
        dispatch(UpdateAgentListAction(data));
        setAgentIdList([]);
        handleClose();
        enqueueSnackbar(`Date Range Added Successfully`, { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editDateRangeAPI = async () => {
    try {
      const data = {
        startDate: values.startDate,
        endDate: values.endDate,
        agentIdList
      };
      const resp = await EditDateRange(data);
      if (resp.statusText === 'OK') {
        dispatch(UpdateAgentListAction(data));
        setAgentIdList([]);
        handleClose();
        enqueueSnackbar(`Date Range Edited Successfully`, { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDateRangeAPI = async () => {
    try {
      const data = {
        deleteType: handleDeleteToken,
        startDate: handleCurrentOrDate !== 'current' ? values.startDate : '',
        endDate: handleCurrentOrDate !== 'current' ? values.endDate : '',
        agentIdList
      };

      const resp = await DeleteDateRange(data);
      if (resp.statusText === 'OK') {
        dispatch(DeleteAgentListAction(data));
        setAgentIdList([]);
        handleClose();
        enqueueSnackbar(`Date Range Deleted Successfully`, { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <MIconButton
        disabled={agentIdList !== undefined ? agentIdList.length === 0 : true}
        onClick={handleClick}
        sx={{ backgroundColor: 'rgba(99, 115, 129, 0.08)', marginRight: '10px' }}
        title={modalType === 'add' ? 'Add Date Range' : modalType === 'edit' ? 'Edit Date Range' : 'Remove Date Range'}
      >
        {modalType === 'add' ? (
          <Icon icon="zondicons:date-add" width={20} height={20} />
        ) : modalType === 'edit' ? (
          <Icon icon="bxs:calendar-edit" width={23} height={23} />
        ) : (
          <Icon icon="mdi:calendar-remove" width={23} height={23} />
        )}
      </MIconButton>
      <>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Formik value={formik}>
            <Box sx={{ width: modalType !== 'remove' ? '450px' : '500px', padding: '25px' }}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography id="modal-modal-title" variant="h5">
                  {modalType === 'add'
                    ? 'Add Date Range'
                    : modalType === 'edit'
                    ? 'Edit Date Range'
                    : 'Delete Date Range'}
                </Typography>
                <Icon icon={closeFill} onClick={handleClose} color="grey" cursor="pointer" />
              </Box>
              <Divider />
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { width: '100%' }
                }}
                autoComplete="off"
              >
                {modalType === 'add' || modalType === 'edit' ? (
                  <>
                    <div style={{ display: 'flex', gap: '10px', marginBlock: '20px' }}>
                      <Typography variant="h6">
                        {agentIdList?.length === 1
                          ? `Agent : ${agentName}`
                          : `${agentIdList?.length}  Agents  Selected`}
                      </Typography>
                    </div>
                    <Grid container spacing={1} mt={1}>
                      <Grid item xs={6} md={6}>
                        <TextField
                          type="date"
                          size="small"
                          label="Start date"
                          variant="outlined"
                          InputLabelProps={{ shrink: values.startDate !== undefined }}
                          value={values.startDate}
                          sx={{ width: '100%' }}
                          {...getFieldProps('startDate')}
                          error={Boolean(touched.startDate && errors.startDate)}
                          helperText={touched.startDate && errors.startDate}
                          InputProps={{
                            inputProps: { min: new Date().toLocaleDateString().split('/').reverse().join('-') }
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextField
                          InputProps={{
                            inputProps: { min: new Date().toLocaleDateString().split('/').reverse().join('-') }
                          }}
                          type="date"
                          size="small"
                          label="End date"
                          variant="outlined"
                          InputLabelProps={{ shrink: values.endDate !== undefined }}
                          value={values.endDate}
                          sx={{ width: '100%' }}
                          {...getFieldProps('endDate')}
                          error={Boolean(touched.endDate && errors.endDate)}
                          helperText={touched.endDate && errors.endDate}
                        />
                      </Grid>
                      {modalType === 'add' && (
                        <Grid item xs={12} md={12} mt={2}>
                          <FormControl fullWidth>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="female"
                              name="radio-buttons-group"
                            >
                              {/* <FormControlLabel
                              value="CopyDefault"
                              control={<Radio />}
                              label="Copy From Agents Default Record"
                            />
                            <FormControlLabel value="LeaveBlank" control={<Radio />} label="Leave Fields Blank" /> */}
                              <div style={{ display: 'flex' }}>
                                <FormControlLabel
                                  sx={{ width: '160px' }}
                                  value="copyFrom"
                                  control={<Radio size="small" />}
                                  label="Copy From"
                                />
                                <FormControl fullWidth size="small">
                                  <Select label="" variant="outlined" name="dateRange">
                                    <MenuItem value={1}> Default </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>
                  </>
                ) : (
                  <div>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label"> </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="current"
                        name="radio-buttons-group"
                        onChange={(e) => {
                          setHandleCurrentOrDate(e.target.value);
                          setHandleDeleteToken(e.target.value === 'current' ? '1' : '2');
                        }}
                      >
                        <FormControlLabel value="current" control={<Radio />} label="Currently Selected Date Range" />

                        <div style={{ marginTop: '1rem' }}>
                          <FormControlLabel value="dateRange" control={<Radio />} label="Date Rang" />

                          <TextField
                            type="date"
                            size="small"
                            label="Beginning"
                            variant="outlined"
                            disabled={handleCurrentOrDate === 'current'}
                            InputLabelProps={{ shrink: values.startDate !== undefined }}
                            value={values.startDate}
                            {...getFieldProps('startDate')}
                            error={Boolean(touched.startDate && errors.startDate)}
                            helperText={touched.startDate && errors.startDate}
                          />

                          <TextField
                            type="date"
                            size="small"
                            label="Ending"
                            variant="outlined"
                            disabled={handleCurrentOrDate === 'current'}
                            InputLabelProps={{ shrink: values.endDate !== undefined }}
                            value={values.endDate}
                            {...getFieldProps('endDate')}
                            error={Boolean(touched.endDate && errors.endDate)}
                            helperText={touched.endDate && errors.endDate}
                          />
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormControl disabled={handleCurrentOrDate === 'current'}>
                      <FormLabel id="delete-radio-buttons-group-label"> </FormLabel>
                      <RadioGroup
                        aria-labelledby="delete-radio-buttons-group-label"
                        defaultValue="2"
                        name="radio-buttons-group-delete"
                        onChange={(e) => setHandleDeleteToken(e.target.value)}
                        sx={{ marginLeft: '10px', marginTop: '10px' }}
                      >
                        <FormControlLabel value="2" control={<Radio />} label="Remove date ranges that match exactly" />
                        <p
                          style={{
                            marginLeft: '25px',
                            fontSize: '13px',
                            color: handleCurrentOrDate === 'current' ? '#919EAB' : ''
                          }}
                        >
                          Note: Only agent date range records with start and end dates that match exactly the start and
                          end dates specified above will be removed. Records that overlap the specified date range will
                          not be removed or shortened
                        </p>
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="Remove all date ranges for this time period"
                        />
                        <p
                          style={{
                            marginLeft: '25px',
                            fontSize: '13px',
                            color: handleCurrentOrDate === 'current' ? '#919EAB' : ''
                          }}
                        >
                          Note: it an agent has a date range that spans the specified date range to remove, then the
                          Default parameters will apply Full for the specified range to remove, and the existing date
                          range may either be shortened or split into two separate data ranges. Agent date range records
                          that are contained wholely in the specified date range above will be deleted.
                        </p>
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}

                <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
                  Apply
                </Button>
              </Box>
            </Box>
          </Formik>
        </Popover>
      </>
    </div>
  );
};

export default React.memo(DateRangeAdd);

DateRangeAdd.propTypes = {
  modalType: PropTypes.string,
  agentName: PropTypes.string,
  setAgentIdList: PropTypes.func
};
