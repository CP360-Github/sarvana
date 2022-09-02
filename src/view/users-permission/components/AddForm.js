import {
  Box,
  Card,
  Divider,
  Modal,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import cross from '@iconify/icons-eva/close-outline';
import closeFill from '@iconify/icons-eva/close-fill';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetModuleWiseDropDown,
  GetUserLevelDropDown,
  PostAddForm
} from '../../../api/UsersPermissions/UsersAndPermissions';
import { GetTimeZone } from '../../../api/EnterPriseGroupAPI';
import { setDataType, setOkValue } from '../../../ReduxCreated/actions/UsersAndPermissions/UsersAndPermissions';
import { MIconButton } from '../../../components/@material-extend';
import Timezone from './Timezone';

const AddForm = ({ openModal, setOpenModal, deletee, setDeleted }) => {
  const style = {
    position: 'absolute',
    priority: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const menuRef = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
    dispatch(setOkValue(''));
  };

  const AddSkillsModal = Yup.object().shape({
    loginid: Yup.string().required('Required'),
    // username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmpassword: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required')
  });
  const formik = useFormik({
    initialValues: {
      loginid: '',
      modulewisepermission: [],
      firstname: ''
    },
    validationSchema: AddSkillsModal,
    onSubmit: (values) => {
      console.log(values);
      handleSubmitAdd(values);
    }
  });
  const [checkedone, setCheckedone] = useState(true);
  const [checkedone2, setCheckedone2] = useState(false);
  const okValue = useSelector((state) => state.UsersAndPermissionss.okValue);

  console.log(okValue, 'okValue');
  const { values, getFieldProps, touched, errors, handleChange, handleSubmit, setFieldValue, resetForm } = formik;

  const [getMwDd, setGetMwDd] = useState();
  const [getUlDd, setGetUlDd] = useState();
  const [openCopyFormModal, setOpenCopyFormModal] = useState(false);
  const handleClick = () => {
    setOpenCopyFormModal(true);
    getTimezone();
  };

  const GetMwDropDown = async () => {
    try {
      await GetModuleWiseDropDown().then((response) => {
        setGetMwDd(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const GetUlDropDown = async () => {
    try {
      await GetUserLevelDropDown().then((response) => {
        setGetUlDd(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAdd = async (values) => {
    try {
      await PostAddForm(checkedone, checkedone2, values, okValue);
      handleCloseModal();
      setDeleted(!deletee);
      enqueueSnackbar('Added Successfully!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } catch (error) {
      const r = error;
      enqueueSnackbar(Object.values(r)[0], {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  const getTimezone = useCallback(async () => {
    await GetTimeZone()
      .then((response) => dispatch(setDataType(response.data)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    GetMwDropDown();
    GetUlDropDown();
  }, []);

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Card sx={style}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" variant="h5">
            New User
          </Typography>
          <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" width="20px" />
        </Box>
        <Divider />
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                '& > :not(style)': { m: 1 }
              }}
              autoComplete="off"
            >
              <TextField
                style={{ width: '25ch' }}
                label="UserName"
                name="loginid"
                value={values.loginid || ''}
                onChange={handleChange}
                {...getFieldProps('loginid')}
                error={Boolean(touched.loginid && errors.loginid)}
                helperText={touched.loginid && errors.loginid}
              />

              <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel style={{ background: 'white' }} id="demo-multiple-name-label">
                  User Level
                </InputLabel>
                <Select
                  value={values.userlevel || ''}
                  name="userlevel"
                  label="User Level"
                  style={{ fontSize: '13px', width: '25inch' }}
                  onChange={(e) => setFieldValue('userlevel', e.target.value)}
                >
                  {getUlDd?.map((d, index) => (
                    <MenuItem key={index} value={d?.id}>
                      {d?.role_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="firstname"
                style={{ width: '25ch' }}
                value={values.firstname || ''}
                label="First Name"
                {...getFieldProps('firstname')}
                error={Boolean(touched.firstname && errors.firstname)}
                helperText={touched.firstname && errors.firstname}
              />
              <TextField
                style={{ width: '25ch' }}
                {...getFieldProps('lastname')}
                error={Boolean(touched.lastname && errors.lastname)}
                helperText={touched.lastname && errors.lastname}
                name="lastname"
                value={values.lastname || ''}
                label="Last Name"
              />
              <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel style={{ background: 'white' }} id="demo-multiple-name-label">
                  Module-wise Permission
                </InputLabel>
                <Select
                  value={values.modulewisepermission || ''}
                  name="modulewisepermission"
                  multiple
                  label="Module-wise Permission"
                  style={{ fontSize: '13px' }}
                  onChange={(e) => setFieldValue('modulewisepermission', e.target.value)}
                >
                  {getMwDd?.map((d, index) => (
                    <MenuItem key={index} value={d?.id}>
                      {d?.module_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                name="password"
                style={{ width: '25ch' }}
                value={values.password || ''}
                label="Password "
              />
              <TextField
                style={{ width: '25ch' }}
                {...getFieldProps('confirmpassword')}
                error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                helperText={touched.confirmpassword && errors.confirmpassword}
                name="confirmpassword"
                value={values.confirmpassword || ''}
                label="Confirm Password "
              />

              <TextField style={{ width: '25ch' }} value={okValue?.timezone_name || ''} label="Time Zone " />
              <MIconButton ref={menuRef} onClick={handleClick}>
                <Icon icon={moreHorizontalFill} width={20} height={20} />
              </MIconButton>
              <Timezone openCopyFormModal={openCopyFormModal} setOpenCopyFormModal={setOpenCopyFormModal} />
              <TextField
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                name="email"
                style={{ width: '25ch' }}
                value={values.email || ''}
                label="Email Address "
              />
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box component="span">
                <Checkbox
                  checked={checkedone}
                  onChange={() => setCheckedone(!checkedone)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                Service Account
              </Box>
              <Box component="span">
                <Checkbox
                  checked={checkedone2}
                  onChange={() => setCheckedone2(!checkedone2)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                Required Password change after new login
              </Box>
            </Box>
            <Box style={{ display: 'flex', float: 'right', flexDirection: 'row' }}>
              <Button sx={{ m: 1 }} variant="contained" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button sx={{ m: 1 }} variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Card>
    </Modal>
  );
};

export default AddForm;

AddForm.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  deletee: PropTypes.bool,
  setDeleted: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};
