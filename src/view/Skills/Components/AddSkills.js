import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import React, { useState, useRef, useEffect } from 'react';
import add from '@iconify/icons-eva/plus-fill';
import cross from '@iconify/icons-eva/close-outline';
import { Button, Modal, Card, Box, Typography, Divider, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { Formik, useFormik } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import { PostSkills } from '../../../api/Skills';
import AddAcdModal from '../../Queues/components/AddAcdModal';
import AddCopyFromModal from '../../Queues/components/AddCopyFromModal';
import { MIconButton } from '../../../components/@material-extend';
import { PostSkillsAction } from '../../../ReduxCreated/actions/Skills.action';

const AddSkills = () => {
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
  const [getAcd, setGetAcd] = useState('');
  const [getQueueData, setGetQueueData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
  };

  const AddSkillsModal = Yup.object().shape({
    id: Yup.string().required('ID is Required!'),
    skillName: Yup.string().required('Skills Name is Required!'),
    acdName: Yup.string().required('ACD is Required!'),
    defaultQueueId: Yup.number().required('Queue Id is Required!'),
    defaultQueueName: Yup.string().required('Queue Name is Required!')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      skillName: '',
      acdName: '',
      defaultQueueId: '',
      defaultQueueName: ''
    },
    validationSchema: AddSkillsModal,
    onSubmit: (values) => {
      addSkills(values);
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, handleChange } = formik;

  useEffect(() => {
    setFieldValue('acdName', getAcd.param_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAcd]);
  useEffect(() => {
    setFieldValue('defaultQueueName', getQueueData.queue_name);
    setFieldValue('defaultQueueId', getQueueData.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getQueueData]);

  const resetAcdTextField = () => {
    setFieldValue('acdName', '');
    setGetAcd({});
  };
  const resetQueueTextField = () => {
    setFieldValue('defaultQueueName', '');
    setFieldValue('defaultQueueId', '');
    setGetQueueData({});
  };

  const addSkills = async (values) => {
    try {
      const data = {
        id: values.id,
        skill_name: values.skillName,
        acd_param_id: getAcd.id,
        queue_id: values.defaultQueueId
      };
      const response = await PostSkills(data);
      if (response.statusText === 'Created') {
        enqueueSnackbar('Skill Successfully Added!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        const respAdd = {
          skill_name: values.skillName,
          acd_param: getAcd,
          id: response.data.id,
          queue: getQueueData,
          is_disabled: false
        };
        dispatch(PostSkillsAction(respAdd));
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
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
                New Skills
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
                    label="Skill Name"
                    variant="outlined"
                    style={{ width: '90%' }}
                    onChange={handleChange}
                    value={values.skillName}
                    {...getFieldProps('skillName')}
                    error={Boolean(touched.skillName && errors.skillName)}
                    helperText={touched.skillName && errors.skillName}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      label="ACD Name"
                      InputLabelProps={{ shrink: values.acdName !== undefined && values.acdName !== '' }}
                      inputProps={{ readOnly: true }}
                      variant="outlined"
                      disabled={Object.keys(getAcd).length !== 0}
                      style={{ width: '90%' }}
                      onChange={handleChange}
                      value={values.acdName}
                      {...getFieldProps('acdName')}
                      error={Boolean(touched.acdName && errors.acdName)}
                      helperText={touched.acdName && errors.acdName}
                    />
                    {Object.keys(getAcd).length !== 0 ? (
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
                    label="Default Queue Id"
                    variant="outlined"
                    style={{ width: '90%' }}
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: values.defaultQueueId !== undefined && values.defaultQueueId !== '' }}
                    value={values.defaultQueueId}
                    onChange={handleChange}
                    disabled={Object.keys(getQueueData).length !== 0}
                    {...getFieldProps('defaultQueueId')}
                    error={Boolean(touched.defaultQueueId && errors.defaultQueueId)}
                    helperText={touched.defaultQueueId && errors.defaultQueueId}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      label="Default Queue Name"
                      variant="outlined"
                      inputProps={{ readOnly: true }}
                      style={{ width: '90%' }}
                      InputLabelProps={{
                        shrink: values.defaultQueueName !== undefined && values.defaultQueueName !== ''
                      }}
                      disabled={Object.keys(getQueueData).length !== 0}
                      value={values.defaultQueueName}
                      onChange={handleChange}
                      {...getFieldProps('defaultQueueName')}
                      error={Boolean(touched.defaultQueueName && errors.defaultQueueName)}
                      helperText={touched.defaultQueueName && errors.defaultQueueName}
                    />
                    {Object.keys(getQueueData).length !== 0 ? (
                      <Icon
                        style={{ width: '20px', height: '50px' }}
                        icon={cross}
                        onClick={resetQueueTextField}
                        color="grey"
                        cursor="pointer"
                      />
                    ) : (
                      <AddCopyFromModal setSelectedValue={setGetQueueData} />
                    )}
                  </div>
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

export default AddSkills;
