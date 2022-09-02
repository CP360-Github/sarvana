import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import add from '@iconify/icons-eva/plus-fill';
import cross from '@iconify/icons-eva/close-outline';
import {
  Button,
  OutlinedInput,
  Modal,
  Card,
  Box,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover,
  Checkbox,
  Grid
} from '@material-ui/core';
import { Form, useFormik, FormikProvider, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import CarouselIcons from './CarouselIcons';
import { MIconButton } from '../../../components/@material-extend';
import {
  setOpenSkills,
  setDataEdit,
  IconSelected,
  SelectedIconDescription
} from '../../../ReduxCreated/actions/ActivityCodeDefinition';
import { EditActivityCodeDefinition, GetSkills, PostActivityCodes } from '../../../api/ActivityCodeDefinition';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const CustomizedSelectForFormik = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;
  const dispatch = useDispatch();
  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
        dispatch(setOpenSkills(e.target.value));
      }}
    >
      {children}
    </Select>
  );
};

const CustomisedMultiSelectFormik = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      multiple
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      input={<OutlinedInput label="Some Skills" />}
      MenuProps={MenuProps}
    >
      {children}
    </Select>
  );
};

const AgentSelectFormik = ({ children, form, field }) => {
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

const SupervisorSelectFormik = ({ children, form, field }) => {
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
const CodeTypeSelectFormik = ({ children, form, field }) => {
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

const AddModal = ({ rowID, clicked, setClicked }) => {
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

  const openskill = useSelector((state) => state.actiontype.openskill);
  const dataEdit = useSelector((state) => state.actiontype.dataEdit);
  const selectedIcon = useSelector((state) => state.actiontype.selectedIcon);

  const selectedIconDescription = useSelector((state) => state.actiontype.iconDescription);

  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checkedone, setCheckedone] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [storeSkills, setStoreSkills] = useState();

  useEffect(() => {
    if (dataEdit === true) {
      setCheckedone(rowID?.in_office);
      setChecked2(rowID?.business);
      setChecked3(rowID?.available);
      setChecked4(rowID?.overtime);
      setChecked5(rowID?.uses_seat);
      setChecked6(rowID?.paid);
      setChecked7(rowID?.work_hours);
    }
  }, [dataEdit, rowID]);

  const getSkills = useCallback(async () => {
    await GetSkills()
      .then((response) => setStoreSkills(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getSkills();
  }, [openskill, getSkills]);

  const handleSave = () => {
    setClicked(!clicked);
  };

  const handleChangeone = () => {
    setCheckedone(!checkedone);
  };
  const handleChange2 = () => {
    setChecked2(!checked2);
  };
  const handleChange3 = () => {
    setChecked3(!checked3);
  };
  const handleChange4 = () => {
    setChecked4(!checked4);
  };
  const handleChange5 = () => {
    setChecked5(!checked5);
  };
  const handleChange6 = () => {
    setChecked6(!checked6);
  };
  const handleChange7 = () => {
    setChecked7(!checked7);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setClicked(!clicked);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(setDataEdit(false));
    dispatch(IconSelected(''));
    dispatch(SelectedIconDescription(''));
    setOpenSkills([]);
    formik.resetForm();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const PostActivityFormData = async (values, multiskillsData) => {
    await PostActivityCodes(
      values,
      multiskillsData,
      checkedone,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7
    );
    handleCloseModal();
    enqueueSnackbar('successfully Added', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };

  const EditActivity = async (values, multiskillsData) => {
    await EditActivityCodeDefinition(
      rowID,
      values,
      multiskillsData,
      checkedone,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7
    );
    handleCloseModal();
    enqueueSnackbar('successfully Updated', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Formik
  const NewAddModal = Yup.object().shape({
    position: Yup.number().required('Position is Required'),
    priority: Yup.number().required('Priority is Required'),
    description: Yup.string().required('Description is Required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      position: dataEdit ? rowID?.position : '',
      priority: dataEdit ? rowID?.priority : '',
      icon: dataEdit ? rowID?.icon : '',
      description: dataEdit ? rowID?.description : '',
      openskills: dataEdit
        ? rowID.open_skills.length === storeSkills.length
          ? 1
          : rowID.open_skills.length === 0
          ? 2
          : rowID.open_skills.length < storeSkills.length
          ? 3
          : 1
        : [],
      multiskills: dataEdit ? rowID.open_skills : [],
      codetype: dataEdit ? rowID?.code_type : 1,
      agent: dataEdit ? rowID?.agent_trade_status : 1,
      supervisor: dataEdit ? rowID?.supervisor_trade_status : 1
    },
    validationSchema: NewAddModal,
    onSubmit: (values, { resetForm }) => {
      if (dataEdit === false) {
        console.log(values, 'values');
        let multiskillsData;
        if (values.openskills === 2) {
          multiskillsData = [];
        } else if (values.openskills === 1) {
          multiskillsData = storeSkills.map((name) => name.id);
        } else {
          multiskillsData = values.multiskills;
        }

        PostActivityFormData(values, multiskillsData);
      } else {
        console.log(values, 'values');
        let multiskillsData;
        if (values.openskills === 2) {
          multiskillsData = [];
        } else if (values.openskills === 1) {
          multiskillsData = storeSkills.map((name) => name.id);
        } else {
          multiskillsData = values.multiskills;
        }
        EditActivity(values, multiskillsData);
      }
      resetForm();
      setCheckedone(true);
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
      setChecked5(false);
      setChecked6(false);
      setChecked7(false);
      handleSave();
    }
  });

  const { errors, touched, values, handleSubmit, handleChange, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    setFieldValue('icon', selectedIcon);
  }, [selectedIcon, setFieldValue]);

  useEffect(() => {
    setFieldValue('description', selectedIconDescription);
  }, [selectedIconDescription, setFieldValue]);

  return (
    <>
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
      </>
      <>
        <Modal open={openModal || dataEdit} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Activity Code Definition
              </Typography>
              <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
            </Box>
            <Divider />
            <div style={{ paddingBottom: '20px', paddingTop: '20px' }}>
              <CarouselIcons />
            </div>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' }
                  }}
                  autoComplete="off"
                >
                  <TextField
                    id="position"
                    label="Position"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.position}
                    {...getFieldProps('position')}
                    error={Boolean(touched.position && errors.position)}
                    helperText={touched.position && errors.position}
                  />
                  <TextField
                    id="priority"
                    label="Priority"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.priority}
                    {...getFieldProps('priority')}
                    error={Boolean(touched.priority && errors.priority)}
                    helperText={touched.priority && errors.priority}
                  />
                  <Typography>Icon</Typography>
                  <div
                    style={{
                      border: '2px solid #D3D3D3',
                      cursor: 'text',
                      height: '50px',
                      overflow: 'auto',
                      width: '240px',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {dataEdit ? (
                      <Icon id="icon" icon={selectedIcon || rowID?.icon} fontSize="40px" />
                    ) : (
                      <Icon id="icon" icon={selectedIcon} fontSize="40px" />
                    )}
                  </div>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.description}
                    disabled={selectedIconDescription !== ''}
                    {...getFieldProps('description')}
                    inputProps={{ maxLength: 128 }}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <FormControl variant="outlined">
                    <InputLabel style={{ background: 'white' }}>Code Type</InputLabel>
                    <Field name="codetype" component={CodeTypeSelectFormik}>
                      <MenuItem value={1}>Normal</MenuItem>
                      <MenuItem value={2}>Lunch</MenuItem>
                      <MenuItem value={3}>Break</MenuItem>
                    </Field>
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel style={{ background: 'white' }}>Open Skills</InputLabel>
                    <Field name="openskills" component={CustomizedSelectForFormik}>
                      <MenuItem value={1}>All</MenuItem>
                      <MenuItem value={2}>None</MenuItem>
                      <MenuItem value={3}>Some</MenuItem>
                    </Field>
                  </FormControl>
                  {dataEdit === true ? (
                    rowID?.open_skills.length === 0 && openskill !== 3 ? (
                      ''
                    ) : rowID?.open_skills.length < storeSkills?.length ||
                      rowID?.open_skills.length !== storeSkills?.length ||
                      openskill !== 2 ||
                      openskill !== 1 ? (
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Some Skills</InputLabel>
                        <Field name="multiskills" component={CustomisedMultiSelectFormik}>
                          {storeSkills?.map((name) => (
                            <MenuItem key={name} value={name.id}>
                              {name.skill_name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    ) : (
                      ''
                    )
                  ) : openskill === 3 && openskill.length !== 0 && openskill !== 2 && openskill !== 1 ? (
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-name-label">Some Skills</InputLabel>
                      <Field name="multiskills" component={CustomisedMultiSelectFormik}>
                        {storeSkills?.map((name) => (
                          <MenuItem key={name} value={name.id}>
                            {name.skill_name}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  ) : (
                    ''
                  )}
                  <Button variant="outlined" onClick={handleClick}>
                    More
                  </Button>
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
                    <Grid style={{ maxWidth: '400px', overflow: 'hidden' }} container rowSpacing={1}>
                      <Grid item xs={6}>
                        <Checkbox
                          checked={checkedone}
                          onChange={handleChangeone}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Box component="span" sx={{ p: 2 }}>
                          In Office
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Checkbox
                          checked={checked2}
                          onChange={handleChange2}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Box component="span" sx={{ p: 2 }}>
                          Business
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Checkbox
                          checked={checked3}
                          onChange={handleChange3}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Box component="span" sx={{ p: 2 }}>
                          Available
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Checkbox
                          checked={checked4}
                          onChange={handleChange4}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Box component="span" sx={{ p: 2 }}>
                          Over Time
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Checkbox
                          checked={checked5}
                          onChange={handleChange5}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Box component="span" sx={{ p: 2 }}>
                          Uses Seats
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Checkbox
                          checked={checked6}
                          onChange={handleChange6}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Box component="span" sx={{ p: 2 }}>
                          Paid
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Checkbox
                          checked={checked7}
                          onChange={handleChange7}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Box component="span" sx={{ p: 2 }}>
                          Work Hours
                        </Box>
                      </Grid>
                    </Grid>
                  </Popover>
                  <Typography>Schedule Trades</Typography>
                  <FormControl variant="outlined">
                    <InputLabel style={{ background: 'white' }}>Agents</InputLabel>
                    <Field name="agent" component={AgentSelectFormik}>
                      <MenuItem value={1}>Keep with agent</MenuItem>
                      <MenuItem value={2}>Trade with schedule</MenuItem>
                      <MenuItem value={3}>keep with agent or no trade</MenuItem>
                      <MenuItem value={4}>No trade allowed</MenuItem>
                      <MenuItem value={5}>Delete</MenuItem>
                    </Field>
                  </FormControl>

                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel style={{ background: 'white' }} id="demo-multiple-name-label">
                      Supervisor
                    </InputLabel>
                    <Field name="supervisor" component={SupervisorSelectFormik}>
                      <MenuItem value={1}>Keep with agent</MenuItem>
                      <MenuItem value={2}>Trade with schedule</MenuItem>
                      <MenuItem value={3}>keep with agent or no trade</MenuItem>
                      <MenuItem value={4}>No trade allowed</MenuItem>
                      <MenuItem value={5}>Delete</MenuItem>
                    </Field>
                  </FormControl>
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
          </Card>
        </Modal>
      </>
    </>
  );
};

export default AddModal;

CustomizedSelectForFormik.propTypes = {
  children: PropTypes.object,
  form: PropTypes.object,
  field: PropTypes.object
};

CustomisedMultiSelectFormik.propTypes = {
  children: PropTypes.object,
  form: PropTypes.object,
  field: PropTypes.object
};

CodeTypeSelectFormik.propTypes = {
  children: PropTypes.object,
  form: PropTypes.object,
  field: PropTypes.object
};

AgentSelectFormik.propTypes = {
  children: PropTypes.object,
  form: PropTypes.object,
  field: PropTypes.object
};

SupervisorSelectFormik.propTypes = {
  children: PropTypes.object,
  form: PropTypes.object,
  field: PropTypes.object
};

AddModal.propTypes = {
  rowID: PropTypes.object
};

AddModal.propTypes = {
  clicked: PropTypes.bool,
  setClicked: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};
