import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState, useRef, useEffect } from 'react';
import cross from '@iconify/icons-eva/close-outline';
import { Button, Modal, Card, Box, Typography, Divider, TextField } from '@material-ui/core';
import { Formik, useFormik } from 'formik';
import editFill from '@iconify/icons-eva/edit-fill';
import view from '@iconify/icons-eva/eye-fill';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import { GetSingleSkills, UpdateSkills } from '../../../api/Skills';
import { UpdateSkillsAction } from '../../../ReduxCreated/actions/Skills.action';
import AddAcdModal from '../../Queues/components/AddAcdModal';
import AddCopyFromModal from '../../Queues/components/AddCopyFromModal';

const ViewAndEditQueue = ({ modalType, skillId }) => {
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

  const dispatch = useDispatch();
  const [getAcd, setGetAcd] = useState('');
  const [getQueueData, setGetQueueData] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [skillData, setSkillData] = useState({});

  const handleOpenModal = () => {
    setOpenModal(true);
    getSingleSkillData();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSkillData({});
    formik.resetForm();
  };

  const AddSkillsModal = Yup.object().shape({
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
      editSkills(values);
    }
  });
  const editSkills = async (skills) => {
    try {
      const data = {
        name: skills.skillName,
        acd: getAcd.id,
        queue_id: skills.defaultQueueId
      };

      const response = await UpdateSkills(data, skillData.id);
      if (response.statusText === 'OK') {
        enqueueSnackbar('Skill Updated Successfully!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        const respAdd = {
          skill_name: skills.skillName,
          acd_param: getAcd,
          id: response.data.id,
          queue: getQueueData
        };
        dispatch(UpdateSkillsAction(respAdd));
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, handleChange } = formik;

  const getSingleSkillData = async () => {
    try {
      const result = await GetSingleSkills(skillId);
      if (result.status === 200) {
        setSkillData(result.data);
        setFieldValue('id', result.data.id);
        setFieldValue('skillName', result.data.skill_name);
        setFieldValue('acdName', result.data.acd_param.param_name);
        setFieldValue('defaultQueueId', result.data.queue.id);
        setFieldValue('defaultQueueName', result.data.queue.queue_name);
        setGetAcd(result.data.acd_param);
        setGetQueueData(result.data.queue);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetQueueTextField = () => {
    setFieldValue('defaultQueueName', '');
    setFieldValue('defaultQueueId', '');
    setGetQueueData({});
  };
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
  return (
    <>
      {modalType === 'edit' ? (
        <MIconButton onClick={handleOpenModal} ref={modalRef}>
          <Icon icon={editFill} width={20} height={20} />
        </MIconButton>
      ) : (
        <MIconButton onClick={handleOpenModal} ref={modalRef}>
          <Icon icon={view} width={20} height={20} />
        </MIconButton>
      )}

      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                {modalType === 'edit' ? 'Edit Details Of Skills' : 'Show Details Of Skills'}
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
                    style={{ width: '89%' }}
                    value={values.id}
                    type="number"
                    inputProps={{ readOnly: true }}
                    {...getFieldProps('id')}
                    error={Boolean(touched.id && errors.id)}
                    helperText={touched.id && errors.id}
                  />
                  <TextField
                    label="Skill Name"
                    variant="outlined"
                    InputLabelProps={{ shrink: values.skillName !== undefined && values.skillName !== '' }}
                    inputProps={{ readOnly: modalType !== 'edit' }}
                    style={{ width: '90%', marginTop: '20px' }}
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
                      style={{ width: '90%' }}
                      onChange={handleChange}
                      value={values.acdName}
                      {...getFieldProps('acdName')}
                      error={Boolean(touched.acdName && errors.acdName)}
                      helperText={touched.acdName && errors.acdName}
                    />
                    {modalType === 'edit' ? (
                      Object.keys(getAcd).length !== 0 ? (
                        <Icon
                          style={{ width: '20px', height: '50px' }}
                          icon={cross}
                          onClick={resetAcdTextField}
                          color="grey"
                          cursor="pointer"
                        />
                      ) : (
                        <AddAcdModal setSelectedValue={setGetAcd} />
                      )
                    ) : (
                      ''
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
                      value={values.defaultQueueName}
                      onChange={handleChange}
                      {...getFieldProps('defaultQueueName')}
                      error={Boolean(touched.defaultQueueName && errors.defaultQueueName)}
                      helperText={touched.defaultQueueName && errors.defaultQueueName}
                    />
                    {modalType === 'edit' ? (
                      Object.keys(getQueueData).length !== 0 ? (
                        <Icon
                          style={{ width: '20px', height: '50px' }}
                          icon={cross}
                          onClick={resetQueueTextField}
                          color="grey"
                          cursor="pointer"
                        />
                      ) : (
                        <AddCopyFromModal setSelectedValue={setGetQueueData} />
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </Box>

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
  skillId: PropTypes.number
};
