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
import React, { useState, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import cross from '@iconify/icons-eva/close-outline';
import closeFill from '@iconify/icons-eva/close-fill';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { PutData } from '../../../api/UsersPermissions/UsersAndPermissions';
import { GetTimeZone } from '../../../api/EnterPriseGroupAPI';
import { setDataTypee, setOkValuee } from '../../../ReduxCreated/actions/UsersAndPermissions/UsersAndPermissions';
import { MIconButton } from '../../../components/@material-extend';
import Timezone from './Timezone';

const Edit = ({ editOpen, setEditOpen, data, setData, getUlDd, getMwDd, sendId, deletee, setDeleted }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
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
  const getTimezone = useCallback(async () => {
    await GetTimeZone()
      .then((response) => dispatch(setDataTypee(response.data)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  const okValuee = useSelector((state) => state.UsersAndPermissionss.okValuee);

  const [openCopyFormModal, setOpenCopyFormModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    setEdit(true);
    setOpenCopyFormModal(true);
    getTimezone();
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const PostData = async (values) => {
    try {
      await PutData(sendId, values, okValuee ? okValuee?.id : data?.timezone?.id);
      enqueueSnackbar('Added Successfully!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      setDeleted(!deletee);
      handleClose();
    } catch (error) {
      const r = error;
      const k = Object.values(r)[0];
      const l = Object.keys(r)[0];
      const rr = l.concat(':').concat(k);
      enqueueSnackbar(rr, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  const AddSkillsModal = Yup.object().shape({
    loginid: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required')
  });
  const formik = useFormik({
    initialValues: {
      loginid: data?.username || '',
      userlevel: data?.user_role?.id || '',
      email: data?.email || '',
      password: '',
      confirmpassword: '',
      firstname: data?.first_name || '',
      lastname: data?.last_name || '',
      modulewisepermission: [data?.allowed_modules?.map((d) => d?.id)][0] || [''],
      timezone_name: data?.timezone?.timezone_name || '',
      checkedone: data?.service_account || false,
      checkedone2: data?.require_pwd_change || false
    },
    validationSchema: AddSkillsModal,
    enableReinitialize: true,
    onSubmit: (values) => {
      PostData(values);
    }
  });

  const handleClose = () => {
    setEditOpen(false);
    setData([]);
    dispatch(setOkValuee(''));
    resetForm();
  };

  const { values, getFieldProps, touched, errors, handleChange, handleSubmit, setFieldValue, resetForm } = formik;
  return (
    <Modal open={editOpen} onClose={handleClose}>
      <Card sx={style}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" variant="h5">
            Edit User
          </Typography>
          <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" width="20px" />
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
                value={values.loginid}
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
                  value={values.userlevel}
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
                value={values.firstname}
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
                value={values.lastname}
                label="Last Name"
              />
              <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel style={{ background: 'white' }} id="demo-multiple-name-label">
                  Module-wise Permission
                </InputLabel>
                <Select
                  value={values.modulewisepermission}
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
                value={values.password}
                label="Password "
              />
              <TextField
                style={{ width: '25ch' }}
                {...getFieldProps('confirmpassword')}
                error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                helperText={touched.confirmpassword && errors.confirmpassword}
                name="confirmpassword"
                value={values.confirmpassword}
                label="Confirm Password "
              />
              <TextField
                style={{ width: '25ch' }}
                value={values.timezone_name}
                name="timezone_name"
                label="Time Zone "
              />
              <MIconButton ref={menuRef} onClick={handleClick}>
                <Icon icon={moreHorizontalFill} width={20} height={20} />
              </MIconButton>
              <Timezone
                edit={edit}
                setEdit={setEdit}
                openCopyFormModal={openCopyFormModal}
                setOpenCopyFormModal={setOpenCopyFormModal}
              />
              <TextField
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                name="email"
                style={{ width: '25ch' }}
                value={values.email}
                label="Email Address "
              />
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Box component="span">
                <Checkbox
                  checked={values.checkedone}
                  onChange={() => setFieldValue('checkedone', !values.checkedone)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                Service Account
              </Box>
              <Box component="span">
                <Checkbox
                  checked={values.checkedone2}
                  onChange={() => setFieldValue('checkedone2', !values.checkedone2)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                Required Password change after new login
              </Box>
            </Box>
            <Box style={{ display: 'flex', float: 'right', flexDirection: 'row' }}>
              <Button sx={{ m: 1 }} variant="contained" onClick={handleClose}>
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

export default Edit;

Edit.propTypes = {
  editOpen: PropTypes.bool,
  setEditOpen: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  getUlDd: PropTypes.array,
  getMwDd: PropTypes.array,
  sendId: PropTypes.number,
  deletee: PropTypes.bool,
  setDeleted: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};
