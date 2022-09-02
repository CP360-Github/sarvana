import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import add from '@iconify/icons-eva/plus-fill';
import cross from '@iconify/icons-eva/close-outline';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import {
  Button,
  Modal,
  Card,
  Box,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { DesktopDatePicker, TimePicker } from '@material-ui/lab';
import closeFill from '@iconify/icons-eva/close-fill';
import { Form, useFormik, FormikProvider, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import { setClicked, setDataEdit, setDataType } from '../../../ReduxCreated/actions/AgentDataGroups';
import { PostAgentDataGroups, EditAgentData } from '../../../api/AgentDataGroups';

const DataTypeFormik = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;
  const dispatch = useDispatch();
  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
        // This will store value of the dataType DropDown
        dispatch(setDataType(e.target.value));
      }}
    >
      {children}
    </Select>
  );
};

const AddModalAgentData = ({ rowData }) => {
  const style = {
    position: 'absolute',
    priority: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };

  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const dataType = useSelector((state) => state.agentdatagroup.dataType);
  const dataEdit = useSelector((state) => state.agentdatagroup.dataEdit);
  const clicked = useSelector((state) => state.agentdatagroup.clicked);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
    dispatch(setDataEdit(false));
    // Adding this so that when clicked on cancel it will not have the previous value and not show fields according to that previous data type
    dispatch(setDataType(''));
  };

  const handleSave = () => {
    dispatch(setClicked(!clicked));
    console.log(!clicked);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const NewAddModal = Yup.object().shape({
    description: Yup.string().max(128).required('Description is Required'),
    currency: Yup.string().max(10, 'Must be 10 digits')
  });

  useEffect(() => {
    if (rowData?.datatype === 6 && dataType === 5) {
      setFieldValue('min_value', '');
      setFieldValue('max_value', '');
    } else if (rowData?.datatype === 5 && dataType === 6) {
      setFieldValue('min_value', null);
      setFieldValue('max_value', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: dataEdit ? rowData?.description : '',
      datatype: dataEdit ? rowData.datatype : '',
      decimal_places: dataEdit ? rowData?.decimal_places : '',
      min_value: dataEdit
        ? rowData?.datatype === 5 || rowData?.datatype === 4
          ? rowData?.min_value
          : rowData?.datatype === 6
          ? new Date(rowData?.min_value).toLocaleDateString()
          : ''
        : null,
      max_value: dataEdit
        ? rowData?.datatype === 6
          ? new Date(rowData?.max_value).toLocaleDateString()
          : rowData?.datatype === 5 || rowData?.datatype === 4
          ? rowData?.max_value
          : ''
        : null,
      currency: dataEdit ? rowData?.currency : ''
    },
    validationSchema: NewAddModal,
    onSubmit: (values, { resetForm }) => {
      if (dataEdit === true) {
        EditAgentData(rowData, values)
          .then(handleSave())
          .then(handleCloseModal())
          .then(
            enqueueSnackbar('successfully Updated', {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            })
          )
          .then(resetForm());
      } else {
        PostAgentDataGroups(values)
          .then(handleSave())
          .then(handleCloseModal())
          .then(
            enqueueSnackbar('successfully Added', {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            })
          )
          .then(resetForm());
      }
    }
  });
  const { handleSubmit, handleChange, values, errors, touched, getFieldProps, setFieldValue } = formik;
  return (
    <>
      <Button
        ref={modalRef}
        color="primary"
        variant="contained"
        onClick={handleOpenModal}
        endIcon={<Icon icon={add} />}
      >
        Add
      </Button>
      <>
        <Modal open={openModal || dataEdit} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Agent Data Groups
              </Typography>
              <Icon icon={cross} color="grey" cursor="pointer" onClick={handleCloseModal} />
            </Box>
            <Divider />
            <>
              <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' }
                    }}
                    autoComplete="off"
                  >
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.description}
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                    <FormControl variant="outlined">
                      <InputLabel style={{ background: 'white' }}>Data Type</InputLabel>
                      <Field name="datatype" component={DataTypeFormik}>
                        <MenuItem value={1}>Alphanumeric</MenuItem>
                        <MenuItem value={2}>Logical</MenuItem>
                        <MenuItem value={3}>Time</MenuItem>
                        <MenuItem value={4}>Currency</MenuItem>
                        <MenuItem value={5}>Numeric</MenuItem>
                        <MenuItem value={6}>Date</MenuItem>
                        <MenuItem value={7}>System User</MenuItem>
                      </Field>
                    </FormControl>
                    {(rowData?.datatype === 3 &&
                      dataType !== 6 &&
                      dataType !== 1 &&
                      dataType !== 2 &&
                      dataType !== 4 &&
                      dataType !== 5 &&
                      dataType !== 7) ||
                    dataType === 3 ? (
                      <>
                        <TimePicker
                          label="Time"
                          value={values.min_value}
                          onChange={(value) => {
                            setFieldValue('min_value', value);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                          label="Time"
                          value={values.max_value}
                          onChange={(value) => {
                            setFieldValue('max_value', value);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </>
                    ) : (
                      ''
                    )}
                    {
                      // This condition will check if Numeric is selected then show Decimal places otherwise show nothing in that place
                      rowData?.datatype === 5 ||
                      (rowData?.datatype === 4 &&
                        dataType !== 1 &&
                        dataType !== 2 &&
                        dataType !== 3 &&
                        dataType !== 6 &&
                        dataType !== 7) ||
                      dataType === 5 ||
                      dataType === 4 ? (
                        <TextField
                          id="decimal_places"
                          label="Decimal Places"
                          variant="outlined"
                          onChange={(e) => {
                            setFieldValue('decimal_places', e.target.value);
                            setDecimalPlaces(e.target.value);
                          }}
                          value={values.decimal_places}
                        />
                      ) : (
                        ''
                      )
                    }
                    {
                      // This condition will check if Date is selected then date will show otherwise if Numeric is selected then Textfield will show
                      dataEdit === true ? (
                        (rowData.datatype === 6 &&
                          dataType !== 5 &&
                          dataType !== 1 &&
                          dataType !== 2 &&
                          dataType !== 3 &&
                          dataType !== 4 &&
                          dataType !== 7) ||
                        dataType === 6 ? (
                          <>
                            <DesktopDatePicker
                              label="Minimum Value"
                              id="min_value"
                              value={values.min_value}
                              onChange={(value) => {
                                setFieldValue('min_value', value);
                              }}
                              renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
                            />
                            <DesktopDatePicker
                              label="Maximum Value"
                              id="max_value"
                              value={values.max_value}
                              onChange={(value) => {
                                setFieldValue('max_value', value);
                              }}
                              renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
                            />
                          </>
                        ) : rowData.datatype === 5 ||
                          (rowData.datatype === 4 &&
                            dataType !== 6 &&
                            dataType !== 1 &&
                            dataType !== 2 &&
                            dataType !== 3 &&
                            dataType !== 7) ||
                          dataType === 5 ||
                          dataType === 4 ? (
                          <>
                            <TextField
                              label="Minimum Value"
                              id="min_value"
                              value={values.min_value}
                              onChange={(e) => {
                                setFieldValue(
                                  'min_value',
                                  e.target.value
                                    .toString()
                                    .split('.')
                                    .map((el, i) => (i ? el.split('').slice(0, `${decimalPlaces}`).join('') : el))
                                    .join('.')
                                );
                              }}
                            />
                            <TextField
                              label="Maximum Value"
                              id="max_value"
                              value={values.max_value}
                              onChange={(e) => {
                                setFieldValue(
                                  'max_value',
                                  e.target.value
                                    .toString()
                                    .split('.')
                                    .map((el, i) => (i ? el.split('').slice(0, `${decimalPlaces}`).join('') : el))
                                    .join('.')
                                );
                              }}
                            />
                          </>
                        ) : (
                          ''
                        )
                      ) : dataType === 6 ? (
                        <>
                          <DesktopDatePicker
                            label="Minimum Value"
                            id="min_value"
                            value={values.min_value}
                            onChange={(value) => {
                              setFieldValue('min_value', value);
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
                          />
                          <DesktopDatePicker
                            label="Maximum Value"
                            id="max_value"
                            value={values.max_value}
                            onChange={(value) => {
                              setFieldValue('max_value', value);
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
                          />
                        </>
                      ) : dataType === 5 || dataType === 4 ? (
                        <>
                          <TextField
                            label="Minimum Value"
                            id="min_value"
                            value={values.min_value}
                            onChange={(e) => {
                              setFieldValue(
                                'min_value',
                                e.target.value
                                  .toString()
                                  .split('.')
                                  .map((el, i) => (i ? el.split('').slice(0, `${decimalPlaces}`).join('') : el))
                                  .join('.')
                              );
                            }}
                          />
                          <TextField
                            label="Maximum Value"
                            id="max_value"
                            value={values.max_value}
                            onChange={(e) => {
                              setFieldValue(
                                'max_value',
                                e.target.value
                                  .toString()
                                  .split('.')
                                  .map((el, i) => (i ? el.split('').slice(0, `${decimalPlaces}`).join('') : el))
                                  .join('.')
                              );
                            }}
                          />
                        </>
                      ) : (
                        ''
                      )
                    }

                    {(rowData?.datatype === 4 &&
                      dataType !== 6 &&
                      dataType !== 1 &&
                      dataType !== 2 &&
                      dataType !== 3 &&
                      dataType !== 5 &&
                      dataType !== 7) ||
                    dataType === 4 ? (
                      <TextField
                        id="currency"
                        label="Currency"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.currency}
                        {...getFieldProps('currency')}
                        error={Boolean(touched.currency && errors.currency)}
                        helperText={touched.currency && errors.currency}
                      />
                    ) : (
                      ''
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {dataEdit ? 'Update' : 'Save'}
                    </Button>
                  </Box>
                </Form>
              </FormikProvider>
            </>
          </Card>
        </Modal>
      </>
    </>
  );
};

export default AddModalAgentData;

DataTypeFormik.propTypes = {
  children: PropTypes.array,
  form: PropTypes.object,
  field: PropTypes.object
};

AddModalAgentData.propTypes = {
  setClicked: PropTypes.func,
  clicked: PropTypes.bool,
  rowData: PropTypes.object
};
