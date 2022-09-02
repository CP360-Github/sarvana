import * as Yup from 'yup';
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
  TextField
  // Checkbox,
  // FormGroup,
  // FormControlLabel
} from '@material-ui/core';
// import { DesktopDatePicker } from '@material-ui/lab';
import { Formik, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import AddAcdModal from './AddAcdModal';
import AddContactTypeModal from './AddContactTypeModal';
import AddCopyFromModal from './AddCopyFromModal';
import { PostQueues, GetSingleQueues } from '../../../api/Queue';
import { MIconButton } from '../../../components/@material-extend';
import { PostQueueAction } from '../../../ReduxCreated/actions/Queue';

const AddModal = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showDateContainer, setShowDateContainer] = useState(false);
  const [getAcd, setGetAcd] = useState('');
  const [acdId, setAcdId] = useState('');
  const [getContactType, setGetContactType] = useState('');
  const [contactTypeId, setContactTypeId] = useState('');
  const [getCopyFrom, setGetCopyFrom] = useState({});
  const [copyFromId, setCopyFromId] = useState('');
  const [disableInput, setDisableInput] = useState(false);
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

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
    setCopyFromId('');
    setAcdId('');
    setGetAcd('');
    setContactTypeId('');
    setGetContactType({});
    setGetCopyFrom({});
    setDisableInput(false);
  };
  useEffect(() => {
    setFieldValue('acd', getAcd.param_name);
    setAcdId(getAcd.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAcd]);

  useEffect(() => {
    setFieldValue('ct', getContactType.ct_name);
    setContactTypeId(getContactType.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getContactType]);

  useEffect(() => {
    copyFromFunctionality(getCopyFrom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCopyFrom]);

  const resetAcdTextField = () => {
    setFieldValue('acd', '');
    setAcdId('');
    setGetAcd({});
  };

  const resetContactTypeTextField = () => {
    setFieldValue('ct', '');
    setContactTypeId('');
    setGetContactType({});
  };
  const resetCopyFromTextField = () => {
    setFieldValue('copyFrom', '');
    setGetCopyFrom({});
    setShowDateContainer(false);
    setDisableInput(false);
  };

  const copyFromFunctionality = (copyFromData) => {
    if (Object.keys(copyFromData).length !== 0) {
      setFieldValue('acd', copyFromData.acd_param.param_name);
      setFieldValue('ct', copyFromData.contact_type === null ? '' : copyFromData.contact_type.ct_name);
      setFieldValue('copyFrom', copyFromData.id + copyFromData.queue_name);
      setContactTypeId(copyFromData.contact_type === null ? '' : copyFromData.contact_type.id);
      setGetContactType(copyFromData.contact_type === null ? {} : copyFromData.contact_type);
      setCopyFromId(copyFromData.id);
      setAcdId(copyFromData.acd_param.id);
      setGetAcd(copyFromData.acd_param);
      setDisableInput(true);
    }
  };

  const AddQueueModal = Yup.object().shape({
    id: Yup.string().required('ID is Required!'),
    name: Yup.string().required('Name is Required!'),
    ct: Yup.string().required('Contact Type is Required!'),
    acd: Yup.string().required('ACD is Required!')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      name: '',
      acd: '',
      acdQueueTags: '',
      ct: '',
      copyFrom: ''
    },
    validationSchema: AddQueueModal,
    onSubmit: (values, { resetForm }) => {
      addQueue(values, resetForm);
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, handleChange } = formik;

  const addQueue = async (values, resetFunc) => {
    try {
      console.log(showDateContainer);
      const data = { id: values.id, name: values.name, contactType: contactTypeId, acd: acdId, copyFromId };
      const response = await PostQueues(data);
      if (response.statusText === 'Created') {
        enqueueSnackbar('Queue Successfully Added!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        const getQueueData = await GetSingleQueues(response.data.id);
        dispatch(PostQueueAction({ ...getQueueData.data, is_disabled: false }));
        resetFunc();
        handleCloseModal();
      }
    } catch (error) {
      const errorMsg = error.response.data?.id[0];
      const UpperCase = errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1);
      enqueueSnackbar(UpperCase, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };
  return (
    <>
      <Button
        ref={modalRef}
        onClick={handleOpenModal}
        color="primary"
        variant="contained"
        endIcon={<Icon icon={add} />}
      >
        Add
      </Button>
      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                New Queues
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
                    label="ID"
                    variant="outlined"
                    style={{ width: '89%' }}
                    onChange={handleChange}
                    value={values.id}
                    type="number"
                    {...getFieldProps('id')}
                    error={Boolean(touched.id && errors.id)}
                    helperText={touched.id && errors.id}
                  />
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    style={{ width: '89%' }}
                    onChange={handleChange}
                    value={values.name}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      id="acd"
                      label="ACD"
                      InputLabelProps={{ shrink: values.acd !== undefined && values.acd !== '' }}
                      disabled={disableInput}
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      style={{ width: '90%' }}
                      onChange={handleChange}
                      value={values.acd}
                      {...getFieldProps('acd')}
                      error={Boolean(touched.acd && errors.acd)}
                      helperText={touched.acd && errors.acd}
                    />
                    {disableInput ? (
                      ''
                    ) : Object.keys(getAcd).length !== 0 ? (
                      <Icon
                        style={{ width: '20px', height: '50px' }}
                        icon={cross}
                        onClick={resetAcdTextField}
                        color="grey"
                        cursor="pointer"
                      />
                    ) : (
                      <AddAcdModal setSelectedValue={setGetAcd} />
                    )}
                  </div>

                  <TextField
                    id="acd_queue_tag"
                    label="ACD Queue Tag"
                    variant="outlined"
                    style={{ width: '89%' }}
                    inputProps={{ maxLength: 64 }}
                    value={values.acdQueueTags}
                    onChange={handleChange}
                    {...getFieldProps('acdQueueTags')}
                    error={Boolean(touched.acdQueueTags && errors.acdQueueTags)}
                    helperText={touched.acdQueueTags && errors.acdQueueTags}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      id="CT"
                      label="CT"
                      variant="outlined"
                      disabled={disableInput}
                      inputProps={{ readOnly: true }}
                      style={{ width: '90%' }}
                      InputLabelProps={{ shrink: values.ct !== undefined && values.ct !== '' }}
                      value={values.ct}
                      onChange={handleChange}
                      {...getFieldProps('ct')}
                      error={Boolean(touched.ct && errors.ct)}
                      helperText={touched.ct && errors.ct}
                    />
                    {disableInput ? (
                      ''
                    ) : Object.keys(getContactType).length !== 0 ? (
                      <Icon
                        style={{ width: '20px', height: '50px' }}
                        icon={cross}
                        onClick={resetContactTypeTextField}
                        color="grey"
                        cursor="pointer"
                      />
                    ) : (
                      <AddContactTypeModal setSelectedValue={setGetContactType} />
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      id="copy_from"
                      label="Copy From"
                      variant="outlined"
                      inputProps={{ readOnly: true }}
                      style={{ width: '90%' }}
                      value={values.copyFrom}
                      onChange={handleChange}
                      {...getFieldProps('copyFrom')}
                      error={Boolean(touched.copyFrom && errors.copyFrom)}
                      helperText={touched.copyFrom && errors.copyFrom}
                    />
                    {Object.keys(getCopyFrom).length !== 0 ? (
                      <Icon
                        style={{ width: '20px', height: '50px' }}
                        icon={cross}
                        onClick={resetCopyFromTextField}
                        color="grey"
                        cursor="pointer"
                      />
                    ) : (
                      <AddCopyFromModal setSelectedValue={setGetCopyFrom} />
                    )}
                  </div>
                  {/* {Object.keys(getCopyFrom).length !== 0 ? (
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onChange={(e) => setShowDateContainer(e.target.checked)} />}
                        label="Copy Queue History"
                      />
                    </FormGroup>
                  ) : (
                    ''
                  )} */}

                  {/* {Object.keys(getCopyFrom).length !== 0 && showDateContainer === true ? (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                      <DesktopDatePicker
                        value={new Date()}
                        onChange={console.log}
                        renderInput={(props) => <TextField {...props} helperText="" />}
                      />
                      <DesktopDatePicker
                        value={new Date()}
                        onChange={console.log}
                        renderInput={(props) => <TextField {...props} helperText="" />}
                      />
                    </div>
                  ) : (
                    ''
                  )} */}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                  </Button>
                </Box>
              </div>
            </Formik>
          </Card>
        </Modal>
      </>
    </>
  );
};

export default AddModal;
