import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, TextField, Popover, Button } from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack5';
import cross from '@iconify/icons-eva/close-outline';
import { Formik, useFormik } from 'formik';
import { MIconButton } from '../../../components/@material-extend';
import SelectedMuList from './SelectMuList';
import { selectedMuFromListAction, UpdateAgentListAction } from '../../../ReduxCreated/actions/Agent/MoveAgents.action';
import { moveAgents } from '../../../api/agent/MoveAgents';

const MoveAgentsModal = ({ agentName, setAgentIdList }) => {
  const dispatch = useDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const agentIdList = useSelector((state) => state.MoveAgents.agentIdList);
  const selectedMuFromList = useSelector((state) => state.MoveAgents.selectedMUFromList);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    formik.resetForm();
  };
  const ManagementUnitModal = Yup.object().shape({
    ManagementUnit: Yup.string().required('Mu Is Required!'),
    movementDate: Yup.string().required('Date Of Movement Is Required!')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ManagementUnit: '',
      movementDate: ''
    },
    validationSchema: ManagementUnitModal,
    onSubmit: () => {
      moveAgentApi();
    }
  });
  const { errors, touched, values, getFieldProps, setFieldValue, handleChange, handleSubmit } = formik;

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  const moveAgentApi = async () => {
    try {
      const data = {
        agents: agentIdList,
        movement_date: values.movementDate
      };

      const resp = await moveAgents(data, values.ManagementUnit.split(' ')[0]);
      if (resp.statusText === 'OK') {
        dispatch(UpdateAgentListAction(agentIdList));
        setAgentIdList([]);
        handleClose();
        enqueueSnackbar('Agent moved successfully', {
          variant: 'success',
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
  useEffect(() => {
    if (Object.keys(selectedMuFromList).length !== 0) {
      setFieldValue('ManagementUnit', `${selectedMuFromList.id.toString()} ${selectedMuFromList.mu_name}`);
    } else {
      setFieldValue('ManagementUnit', '');
    }
  }, [selectedMuFromList, setFieldValue]);

  return (
    <div>
      <MIconButton
        disabled={agentIdList !== undefined ? agentIdList.length === 0 : true}
        onClick={handleClick}
        sx={{ backgroundColor: 'rgba(99, 115, 129, 0.08)', marginRight: '10px' }}
        title="Assign Agents"
      >
        <Icon icon="fluent:person-arrow-right-20-filled" />
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
          <Box sx={{ width: '450px', padding: '25px' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Move Agents to different MU
              </Typography>
              <Icon icon={closeFill} onClick={handleClose} color="grey" cursor="pointer" />
            </Box>
            <Divider />
            <Formik value={formik}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { width: '100%' }
                }}
                autoComplete="off"
              >
                <div style={{ display: 'flex', gap: '10px', marginBlock: '20px' }}>
                  <Typography variant="h6">
                    {agentIdList?.length === 1 ? `Agent : ${agentName}` : `${agentIdList?.length}  Agents  Selected`}
                  </Typography>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <TextField
                    size="small"
                    label="Management Unit"
                    variant="outlined"
                    InputLabelProps={{ shrink: values.ManagementUnit !== undefined }}
                    inputProps={{ readOnly: true }}
                    value={values.ManagementUnit}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    {...getFieldProps('ManagementUnit')}
                    error={Boolean(touched.ManagementUnit && errors.ManagementUnit)}
                    helperText={touched.ManagementUnit && errors.ManagementUnit}
                  />
                  {Object.keys(selectedMuFromList).length !== 0 ? (
                    <MIconButton sx={{ height: '40px' }} onClick={() => dispatch(selectedMuFromListAction({}))}>
                      <Icon icon={cross} />
                    </MIconButton>
                  ) : (
                    <SelectedMuList />
                  )}
                </div>

                <TextField
                  type="date"
                  size="small"
                  label="Date of Move"
                  variant="outlined"
                  InputLabelProps={{ shrink: values.movementDate !== undefined }}
                  value={values.movementDate}
                  sx={{ width: '100%' }}
                  {...getFieldProps('movementDate')}
                  error={Boolean(touched.movementDate && errors.movementDate)}
                  helperText={touched.movementDate && errors.movementDate}
                />

                <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
                  Apply
                </Button>
              </Box>
            </Formik>
          </Box>
        </Popover>
      </>
    </div>
  );
};

export default React.memo(MoveAgentsModal);

MoveAgentsModal.propTypes = {
  agentName: PropTypes.string,
  setAgentIdList: PropTypes.func
};
