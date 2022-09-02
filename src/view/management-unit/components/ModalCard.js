import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
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
  Modal
} from '@material-ui/core';
import { closeFill } from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack5';
import { useSelector, useDispatch } from 'react-redux';
import { Field, useFormik, FormikProvider, Form } from 'formik';
import cross from '@iconify/icons-eva/close-outline';
import { Icon } from '@iconify/react';
import { setTimeZoneValue, setCopiedMU, setSave } from '../../../ReduxCreated/actions/ManagementUnit';
import { setSelectedEg } from '../../../ReduxCreated/actions/EnterPriseGroup';
import { MIconButton } from '../../../components/@material-extend';
import { CopyTimeZone } from './CopyTimeZone';
import { EG } from './EG';
import { CopyFrom } from './CopyFrom';
import { PostMU } from '../../../api/ManagementUnitAPI';

export const ModalCard = ({ openModal, setOpenModal }) => {
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
    dispatch(setTimeZoneValue(undefined));
    dispatch(setSelectedEg(undefined));
    dispatch(setCopiedMU(undefined));
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const postMU = async (values) => {
    try {
      await PostMU(values, dataSelectedEggg?.id, timezonevalue?.id, copiedMu?.id);
      handleCloseModal();
      dispatch(setSave(!onSave));
      enqueueSnackbar('successfully Added', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } catch (error) {
      const errorMsg = error.id;
      enqueueSnackbar(errorMsg[0], {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };
  const timezonevalue = useSelector((state) => state.management.timezonevalue);
  const copiedMu = useSelector((state) => state.management.copiedMu);
  const onSave = useSelector((state) => state.management.onSave);

  const NewAddModal = Yup.object().shape({
    id: Yup.number().required('ID is Required'),
    mu_name: Yup.string().required('Name is Required'),
    enterprise_grp_id: Yup.string().required('Enterprise Group is Required')
  });
  const formik = useFormik({
    initialValues: {
      mu_name: '',
      enterprise_grp_id: '',
      timezone: '',
      copy_from_mu: '',
      firstdayofweek: 1
    },
    validationSchema: NewAddModal,
    onSubmit: (values, { resetForm }) => {
      postMU(values);
      resetForm();
      dispatch(setTimeZoneValue(undefined));
      dispatch(setSelectedEg(undefined));
      dispatch(setCopiedMU(undefined));
    }
  });
  const { handleSubmit, values, setFieldValue, handleChange, touched, errors, getFieldProps } = formik;

  const selectedEg = useSelector((state) => state.details.selectedEg);
  const [dataSelectedEggg, setSelectedEggg] = useState('');

  useEffect(() => {
    if (copiedMu !== undefined) {
      setFieldValue('copy_from_mu', copiedMu?.id + copiedMu?.mu_name);
    }
  }, [copiedMu, setFieldValue]);

  useEffect(() => {
    if (timezonevalue !== undefined) {
      setFieldValue('timezone', timezonevalue?.timezone_name);
    } else {
      setFieldValue('timezone', '');
    }
  }, [timezonevalue, setFieldValue]);
  const textInputCopyFrom = useRef(null);

  useEffect(() => {
    setSelectedEggg(selectedEg);
  }, [selectedEg]);

  const handleRemoveCopyFrom = () => {
    textInputCopyFrom.current.value = '';
    dispatch(setCopiedMU(undefined));
    setFieldValue('copy_from_mu', '');
  };

  useEffect(() => {
    if (dataSelectedEggg === undefined || dataSelectedEggg === '') {
      setFieldValue('enterprise_grp_id', '');
    } else {
      setFieldValue('enterprise_grp_id', dataSelectedEggg?.id + dataSelectedEggg?.eg_name);
    }
  }, [dataSelectedEggg, setFieldValue]);

  return (
    <>
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
              <Box>
                <Box
                  sx={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
                >
                  <Box sx={{ flexDirection: 'row', display: 'flex' }}>
                    <TextField
                      sx={{ width: '510px', mt: '1rem' }}
                      id="id"
                      label="ID"
                      variant="outlined"
                      type="text"
                      value={values.id}
                      onChange={handleChange}
                      {...getFieldProps('id')}
                      error={Boolean(touched.id && errors.id)}
                      helperText={touched.id && errors.id}
                    />

                    <div style={{ padding: 10 }}>
                      <div style={{ width: 20, height: 20 }} />
                    </div>
                  </Box>
                  <Box sx={{ flexDirection: 'row', display: 'flex', marginRight: '6rem' }}>
                    <div>
                      <TextField
                        sx={{ width: '510px', mt: '1rem' }}
                        id="outlined-basic"
                        label="Time Zone"
                        inputProps={{ readOnly: true }}
                        variant="outlined"
                        value={values.timezone}
                        type="text"
                        name="timezone"
                      />
                    </div>
                    <CopyTimeZone />
                  </Box>
                </Box>

                <Box
                  sx={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
                >
                  <Box sx={{ flexDirection: 'row', display: 'flex' }}>
                    <TextField
                      sx={{ width: '510px', mt: '1rem' }}
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
                  </Box>
                  <Box sx={{ flexDirection: 'row', display: 'flex', marginRight: '6rem' }}>
                    <TextField
                      sx={{ width: '510px', mt: '1rem' }}
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
                  </Box>
                </Box>
                <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flexDirection: 'row', display: 'flex' }}>
                    <TextField
                      sx={{ width: '510px', mt: '1rem' }}
                      id="outlined-basic"
                      label="Copy From"
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      type="text"
                      name="copy_from_mu"
                      inputRef={textInputCopyFrom}
                      value={values.copy_from_mu}
                    />
                    {copiedMu !== undefined ? (
                      <Icon
                        icon={cross}
                        onClick={handleRemoveCopyFrom}
                        color="grey"
                        cursor="pointer"
                        style={{ margin: '12px', marginTop: '24px' }}
                      />
                    ) : (
                      <CopyFrom />
                    )}
                  </Box>
                  <FormControl variant="outlined" style={{ width: '510px', marginTop: '1rem' }}>
                    <InputLabel style={{ background: 'white' }}>Firstday of Week</InputLabel>
                    <Field name="firstdayofweek" component={FirstDayOfWeekHandle}>
                      <MenuItem value={1}>Sunday</MenuItem>
                      <MenuItem value={2}>Monday</MenuItem>
                      <MenuItem value={3}>Tuesday</MenuItem>
                      <MenuItem value={4}>Wednesday</MenuItem>
                      <MenuItem value={5}>Thursday</MenuItem>
                      <MenuItem value={6}>Friday</MenuItem>
                      <MenuItem value={7}>Saturday</MenuItem>
                    </Field>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ margin: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Form>
          </FormikProvider>
        </Card>
      </Modal>
    </>
  );
};

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
  children: PropTypes.object,
  form: PropTypes.object,
  field: PropTypes.object
};

ModalCard.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};
