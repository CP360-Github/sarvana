import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import cross from '@iconify/icons-eva/close-outline';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import {
  Modal,
  Card,
  Typography,
  Box,
  Divider,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import { Form, useFormik, FormikProvider } from 'formik';
import { MIconButton } from '../../../components/@material-extend';
import { GetSkills, PostAddSkills } from '../../../api/agent/AgentSkills';
// import { NotificationCatch } from 'src/sharedComponents/CatchError';
// import { NotificationCatch } from '../../../sharedComponents/CatchError';

const AddSkillAgent = ({ setFilter, agentIdList, setAgentIdList }) => {
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
  // For opening the modal of add skill

  const modalRef = useRef(null);

  const [openModal, setOpenModal] = useState(false);
  const [skillsDropDown, setSkillsDropDown] = useState([]);

  const handleOpenModal = () => {
    setOpenModal(true);
    setFilter(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setFilter(false);
    resetForm();
  };

  const getSkills = async () => {
    await GetSkills().then((response) => {
      setSkillsDropDown(response.data.results);
    });
  };

  // Delete in Add Skill Agent

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handlePost = async (values) => {
    try {
      await PostAddSkills(values, agentIdList);
      enqueueSnackbar('Skill Updated Successfully!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      setAgentIdList([]);
    } catch (error) {
      const errorMsg = error?.ValidationError;
      enqueueSnackbar(errorMsg, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  const NewAddModal = Yup.object().shape({
    level: Yup.number().required('Level is Required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      skillsdropdown: '',
      dateCalendere: null,
      reserveValue: false,
      level: ''
    },
    validationSchema: NewAddModal,
    onSubmit: (values) => {
      handlePost(values);
      handleCloseModal();
    }
  });

  const { errors, touched, values, handleSubmit, handleChange, getFieldProps, setFieldValue, resetForm } = formik;

  useEffect(() => {
    getSkills();
  }, []);
  return (
    <>
      <>
        <MIconButton title="Add Skill" ref={modalRef} onClick={handleOpenModal}>
          <Icon icon="akar-icons:person-add" />
        </MIconButton>
      </>
      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Card sx={style}>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                  }}
                >
                  <Box sx={{ flexDirection: 'column' }}>
                    <Typography id="modal-modal-title" variant="h5">
                      Add Skills
                    </Typography>
                    <Typography>{agentIdList?.length} agents are added</Typography>
                  </Box>
                  <Box>
                    <Icon
                      style={{ width: '20px', height: '50px' }}
                      icon={cross}
                      onClick={handleCloseModal}
                      color="grey"
                      cursor="pointer"
                    />
                  </Box>
                </Box>
                <Divider />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Skills</TableCell>
                      <TableCell>Date Range</TableCell>
                      <TableCell>Level</TableCell>
                      <TableCell>Reserve</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <FormControl fullWidth>
                          <Select
                            value={values.skillsdropdown}
                            onChange={(e) => setFieldValue('skillsdropdown', e.target.value)}
                            size="small"
                            variant="outlined"
                            name="skillsdropdown"
                          >
                            {skillsDropDown?.map((d, index) => (
                              <MenuItem key={index} value={d}>
                                {d?.skill_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell width="20px">
                        <TextField
                          label="Date Range"
                          variant="standard"
                          type="date"
                          name="dateCalender"
                          value={values.dateCalender}
                          onChange={(e) => {
                            setFieldValue('dateCalendere', e.target.value);
                          }}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={values.level}
                          onChange={handleChange}
                          name="level"
                          {...getFieldProps('level')}
                          error={Boolean(touched.level && errors.level)}
                          helperText={touched.level && errors.level}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          className="checkk"
                          style={{ border: 'none' }}
                          value={values.reserveValue}
                          onChange={handleChange}
                          name="reserveValue"
                          type="checkbox"
                        />
                      </TableCell>
                      <TableCell
                        sx={{ color: 'error.main' }}
                        onClick={() => {
                          resetForm();
                          console.log(values);
                        }}
                      >
                        <Icon icon={trash2Outline} cursor="pointer" width={20} height={20} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                  <Button onClick={handleCloseModal} variant="contained">
                    Cancel
                  </Button>

                  <Box sx={{ ml: 2 }}>
                    <Button type="submit" variant="contained">
                      Ok
                    </Button>
                  </Box>
                </Box>
              </Form>
            </FormikProvider>
          </Card>
        </Modal>
      </>
    </>
  );
};

export default AddSkillAgent;

AddSkillAgent.propTypes = {
  setFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  agentIdList: PropTypes.array,
  setAgentIdList: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};
