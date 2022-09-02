import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import { KeyboardArrowDown } from '@material-ui/icons';
import add from '@iconify/icons-eva/plus-fill';
import cross from '@iconify/icons-eva/close-outline';
import view from '@iconify/icons-eva/eye-fill';
import { Field, Formik } from 'formik';
import {
  Box,
  Menu,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TextField,
  Modal,
  Stack,
  TableContainer,
  alpha,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { useSnackbar } from 'notistack5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import closeFill from '@iconify/icons-eva/close-fill';
import { Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';
import {
  DisableEnterpriseGroup,
  GetEnterpriseGroup,
  GetTimeZone,
  PostEnterPriseGroup,
  EditEnterpriseGroup,
  GetEnterpriseGroupIdData,
  GetEnterPriseSearch,
  DisableRestoreEnterpriseGroup
} from '../../../api/EnterPriseGroupAPI';
import { PaginationA } from '../../../sharedComponents/Pagination';
import {
  setVolatile,
  SetTimezone,
  RecordDeleted,
  EditData,
  setSelectedIndex,
  setCopiedEg,
  setOkValue,
  setCopyFrom,
  setDataID,
  setSavee
} from '../../../ReduxCreated/actions/EnterPriseGroup';
import { EditIcon } from '../../../sharedComponents/EditIcon';
import AlertDialog from '../../../pages/components-overview/material-ui/dialog/AlertDialog';
import { setShowData } from '../../../ReduxCreated/actions/ActivityCodeDefinition';
// import cross from '@iconify/icons-eva/close-outline';
import EnableDisableFilterWithSearch from '../../../sharedComponents/EnableDisableFilterWithSearch';
import dots from '../../../assets/images/dots.svg';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

function MoreMenuButton({ anchorEl, handleClose, open, dataId }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openn, setOpenn] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const handleHistory = () => {
    navigate(`/dashboard/account-setup/enterprise-group-history/${dataId.id}`);
  };

  const handleAvailability = async () => {
    navigate(`/dashboard/account-setup/enterprise-group-availability/${dataId.id}`);
  };

  const handleDelete = useCallback(async () => {
    await DisableEnterpriseGroup(dataId?.id)
      .then(dispatch(RecordDeleted(true)))
      .then(
        enqueueSnackbar(`successfully ${dataId?.is_disabled === false ? `Disabled` : `Enabled`} `, {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );
    handleClose();
    setTimeout(dispatch(RecordDeleted(false)), 1000);
  }, [dataId?.id, dataId?.is_disabled, dispatch, enqueueSnackbar, handleClose, closeSnackbar]);

  useEffect(() => {
    if (agreed === true) {
      handleDelete();
      setAgreed(false);
      setOpenn(false);
    } else {
      setOpenn(false);
    }
  }, [agreed, handleDelete]);

  const handleOpen = () => {
    setOpenn(true);
  };
  return (
    <>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAvailability} sx={{ display: 'flex', justifyContent: 'center' }}>
          Availability
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={handleHistory} sx={{ display: 'flex', justifyContent: 'center' }}>
          History
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={handleOpen} sx={{ color: 'error.main', display: 'flex', justifyContent: 'center' }}>
          Disable
        </MenuItem>
        <AlertDialog
          setAgreed={setAgreed}
          setOpenn={setOpenn}
          openn={openn}
          Content="Are you sure you want to disable?"
          description=""
        />
      </StyledMenu>
    </>
  );
}

MoreMenuButton.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  dataId: PropTypes.object
};
const CopyTimeZone = () => {
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const menuRef = useRef(null);
  const [openCopyFormModal, setOpenCopyFormModal] = useState(false);
  const [valueData, setValueData] = useState('');
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.details.timezone);
  const [search, setSearch] = useState('');

  const getTimezone = useCallback(async () => {
    await GetTimeZone()
      .then((response) => dispatch(SetTimezone(response.data)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    getTimezone();
  }, [getTimezone]);

  const handleClick = () => {
    setOpenCopyFormModal(true);
  };
  const handleClose = () => {
    setOpenCopyFormModal(false);
  };

  const handleOk = () => {
    dispatch(setOkValue(valueData));
    setOpenCopyFormModal(false);
  };

  const filterData = (timezone, search) =>
    timezone?.filter((el) => el.timezone_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleClick}>
          <Icon icon={moreHorizontalFill} width={20} height={20} />
        </MIconButton>
      </>
      <>
        <Modal open={openCopyFormModal} onClose={handleClose}>
          <Card sx={style1}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Select Timezone
              </Typography>
              <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gridColumnGap: '25px' }}>
              <Box>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Box>
                  <Box
                    sx={{
                      mt: 2,
                      pt: 1,
                      pb: 1,
                      display: 'flex',
                      justifyContent: 'space-around'
                    }}
                  >
                    <Box>Name</Box>
                    <Box>GMT Offset</Box>
                  </Box>
                  <Box sx={{ height: '250px', overflow: 'scroll' }}>
                    {filterData(timezone, search)?.map((e) => (
                      <Box
                        key={e?.id}
                        style={{
                          cursor: 'pointer',
                          paddingTop: '10px',
                          paddingBottom: '5px',
                          display: 'flex',
                          justifyContent: 'space-around',
                          backgroundColor: valueData?.id === e?.id ? 'grey' : '',
                          color: valueData?.id === e?.id ? 'white' : ''
                        }}
                        onClick={() => {
                          setValueData(e);
                        }}
                      >
                        <div>{e?.timezone_name}</div>
                        <div>{e?.gmt_offset}</div>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography id="modal-modal-title" variant="h6" sx={{ pl: 1 }}>
                  Zone
                </Typography>
                <Box sx={{ height: '334px' }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateRows: '1fr 1fr',
                      m: 0.5
                    }}
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        p: 1,
                        alignItems: 'center'
                      }}
                    >
                      <Typography id="modal-modal-title" sx={{ fontSize: 14, fontWeight: 400 }}>
                        GMT Offset(hrs)
                      </Typography>
                      <TextField size="small" id="outlined-basic" variant="outlined" value={valueData.gmt_offset} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button sx={{ mr: 3 }} type="submit" variant="contained" color="primary" onClick={handleOk}>
                Ok
              </Button>
              <Button variant="outlined" color="warning" onClick={() => setOpenCopyFormModal(false)}>
                Cancel
              </Button>
            </Box>
          </Card>
        </Modal>
      </>
    </>
  );
};

const CopyFromData = () => {
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [openCopyFormData, setOpenCopyFormData] = useState(false);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const handleClick = () => {
    setOpenCopyFormData(true);
    dispatch(setCopyFrom(true));
  };
  const handleClose = () => {
    setOpenCopyFormData(false);
  };

  const handleSelected = (e) => {
    dispatch(setCopiedEg(e));
    setOpenCopyFormData(false);
  };

  const getSearchedData = useCallback(async (search) => {
    await GetEnterPriseSearch(search)
      .then((response) => setSearchedData(response.data.results))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSearchedData(search);
  }, [search, getSearchedData]);

  // const filterData = (searchedData, search) =>
  //   searchedData?.filter((el) => el.eg_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleClick}>
          <Icon icon={moreHorizontalFill} width={20} height={20} />
        </MIconButton>
      </>
      <>
        <Modal open={openCopyFormData} onClose={handleClose}>
          <Card sx={style1}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Enterprise Group
              </Typography>
              <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Box>
                <Box
                  sx={{
                    mt: 1,
                    pt: 1,
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ ml: 3 }}>ID</Box>
                  <Box sx={{ mr: 3 }}>Name</Box>
                </Box>
                <Box sx={{ overflow: 'scroll', height: 200 }}>
                  {searchedData?.map((e) => (
                    <Box
                      key={e?.id}
                      sx={{
                        cursor: 'pointer',
                        pt: 1,
                        pb: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        '&:hover': { background: 'gray', color: 'white', borderRadius: '5px' }
                      }}
                      onClick={() => handleSelected(e)}
                    >
                      <Box sx={{ ml: 3 }}>{e?.id}</Box>
                      <Box sx={{ mr: 3 }}>{e?.eg_name}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Modal>
      </>
    </>
  );
};

const FirstDayWeek = ({ children, form, field }) => {
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

FirstDayWeek.propTypes = {
  children: PropTypes.array,
  form: PropTypes.object,
  field: PropTypes.object
};

// Main Modal in form
const OpenModal = ({ searchh, setSearchh, filter, setFilter }) => {
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const isEditing = useSelector((state) => state.details.edited);
  const DataEditing = useSelector((state) => state.details.dataedit);
  const copiedEg = useSelector((state) => state.details.copiedEg);

  const handleRemoveCopyFrom = () => {
    textInputCopyFrom.current.value = '';
    setSelectedEgg(undefined);
  };

  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(EditData(false));
    dispatch(setOkValue(undefined));
    setSelectedEgg(undefined);
    dispatch(setSelectedIndex(0));
    setTouchedd(false);
  };

  useEffect(() => {
    if (isEditing === true) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [isEditing, DataEditing]);

  const [dataSelectedEgg, setSelectedEgg] = useState();
  const okValue = useSelector((state) => state.details.okValue);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const PostFormData = async (data) => {
    try {
      await PostEnterPriseGroup(data, okValue, dataSelectedEgg).then(dispatch(setSavee(true)));
      setOpenModal(false);
      enqueueSnackbar('successfully Added', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      setTimeout(dispatch(setSavee(false)), 1000);
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

  const EditFormData = async (data) => {
    let TimeZoneOkValue;
    if (okValue === undefined) {
      TimeZoneOkValue = DataEditing.timezone.id;
    } else {
      TimeZoneOkValue = okValue.id;
    }

    await EditEnterpriseGroup(DataEditing, data, TimeZoneOkValue)
      .then(dispatch(setSavee(true)))
      .then(
        enqueueSnackbar('successfully Updated', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );
    setOpenModal(false);
    setTimeout(dispatch(setSavee(false)), 1000);
  };

  useEffect(() => setSelectedEgg(copiedEg), [copiedEg]);
  const [touchedd, setTouchedd] = useState(false);

  useEffect(() => {
    if (okValue !== undefined || isEditing === true) {
      setTouchedd(false);
    }
  }, [touchedd, okValue, isEditing]);

  const textInputCopyFrom = React.useRef(null);

  const NewAddModal = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    id: Yup.number().required('ID is Required')
  });

  return (
    <>
      <Box sx={{ mt: 2, mx: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">Enterprise Group</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            ref={modalRef}
            onClick={handleOpenModal}
            color="primary"
            variant="contained"
            endIcon={<Icon icon={add} />}
          >
            Add
          </Button>
        </Box>
      </Box>
      <EnableDisableFilterWithSearch
        setFilter={setFilter}
        filter={filter}
        setSearchText={setSearchh}
        searchText={searchh}
      />
      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Enterprise Group
              </Typography>
              <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
            </Box>
            <Divider />
            <Box>
              <Formik
                validationSchema={NewAddModal}
                initialValues={{
                  id: isEditing === true ? DataEditing.id : '',
                  name: isEditing === true ? DataEditing.eg_name : '',
                  timezone: '',
                  copyfrom: '',
                  week_first_day: isEditing === true ? DataEditing.week_first_day : 1
                }}
                onSubmit={(data) => {
                  if (isEditing === false) {
                    PostFormData(data);
                    dispatch(setOkValue(undefined));
                    setSelectedEgg(undefined);
                    dispatch(setSelectedIndex(0));
                    setTouchedd(false);
                  } else {
                    EditFormData(data);
                    dispatch(setOkValue(undefined));
                    setSelectedEgg(undefined);
                    setTouchedd(false);
                  }
                }}
              >
                {({ values, handleChange, handleSubmit, errors, touched, getFieldProps }) => (
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                      {isEditing === false ? (
                        <Box>
                          <TextField
                            sx={{ mt: 2, width: '80%' }}
                            id="outlined-basic"
                            name="id"
                            label="ID"
                            variant="outlined"
                            type="text"
                            value={values.id}
                            onChange={handleChange}
                            {...getFieldProps('id')}
                            error={Boolean(touched.id && errors.id)}
                            helperText={touched.id && errors.id}
                          />
                        </Box>
                      ) : (
                        <Box style={{ display: 'none' }}>
                          <TextField
                            sx={{ mt: 2, width: '80%' }}
                            id="outlined-basic"
                            name="id"
                            label="ID"
                            variant="outlined"
                            type="text"
                            value={values.id}
                            onChange={handleChange}
                            {...getFieldProps('id')}
                            error={Boolean(touched.id && errors.id)}
                            helperText={touched.id && errors.id}
                          />
                        </Box>
                      )}
                      <Box>
                        <TextField
                          sx={{ mt: 2, width: '80%' }}
                          id="outlined-basic"
                          name="name"
                          label="Name"
                          variant="outlined"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Box>
                      <Box>
                        <TextField
                          sx={{ width: '80%' }}
                          id="outlined-basic"
                          label="Time Zone"
                          variant="outlined"
                          name="timezone"
                          onFocus={() => setTouchedd(true)}
                          error={touchedd && okValue === undefined}
                          helperText={touchedd && okValue === undefined ? 'Timezone is required' : ''}
                          inputProps={{ readOnly: true }}
                          disabled={dataSelectedEgg !== undefined}
                          value={
                            (values.timezone =
                              isEditing === true && okValue === undefined
                                ? DataEditing.timezone.timezone_name
                                : okValue
                                ? okValue?.timezone_name
                                : values.timezone)
                          }
                          onChange={handleChange}
                        />
                        {dataSelectedEgg ? '' : <CopyTimeZone />}
                      </Box>

                      <Box>
                        {isEditing === true ? (
                          ''
                        ) : (
                          <TextField
                            sx={{ width: '80%' }}
                            id="outlined-basic"
                            label="Copy From"
                            name="copyfrom"
                            variant="outlined"
                            inputProps={{ readOnly: true }}
                            inputRef={textInputCopyFrom}
                            value={
                              (values.copyfrom = dataSelectedEgg ? dataSelectedEgg?.id + dataSelectedEgg?.eg_name : '')
                            }
                            onChange={handleChange}
                          />
                        )}

                        {dataSelectedEgg ? (
                          <Icon
                            icon={cross}
                            onClick={handleRemoveCopyFrom}
                            color="grey"
                            cursor="pointer"
                            style={{ 'margin-top': '20px' }}
                          />
                        ) : isEditing === true ? (
                          ''
                        ) : (
                          <CopyFromData />
                        )}
                      </Box>

                      <Box>
                        <FormControl sx={{ width: 430 }} variant="outlined" disabled={dataSelectedEgg !== undefined}>
                          <InputLabel style={{ background: 'white' }}>First Day of Week</InputLabel>
                          <Field name="week_first_day" component={FirstDayWeek}>
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

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                          {isEditing === true ? 'Update' : 'Save'}
                        </Button>
                      </Box>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Box>
          </Card>
        </Modal>
      </>
    </>
  );
};

OpenModal.propTypes = {
  setSearchh: PropTypes.func,
  searchh: PropTypes.string,
  setFilter: PropTypes.func,
  filter: PropTypes.bool
};

const ViewIcon = ({ e }) => {
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };

  const dispatch = useDispatch();
  const showData = useSelector((state) => state.actiontype.showData);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const getEnterpriseGroupData = async (e) => {
    await GetEnterpriseGroupIdData(e.id)
      .then((response) => dispatch(setShowData(response.data)))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleViewIcon = () => {
    getEnterpriseGroupData(e);
    setOpen(true);
  };
  const OPTIONS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <>
      <MIconButton onClick={handleViewIcon} size="large">
        <Icon icon={view} width={20} height={20} />
      </MIconButton>

      <Modal open={open} onClose={handleClose}>
        <Card sx={style}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5">
              Show Details of EnterPrise Group
            </Typography>
            <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
          </Box>
          <Divider />
          <Stack spacing={2}>
            <Box>
              <TextField
                sx={{ mt: 2, width: '80%' }}
                name="ID"
                label="ID"
                variant="outlined"
                value={showData?.id || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                sx={{ mt: 2, width: '80%' }}
                name="Name"
                label="Name"
                variant="outlined"
                value={showData?.eg_name || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                sx={{ mt: 2, width: '80%' }}
                name="TimeZone"
                label="TimeZone"
                variant="outlined"
                value={showData?.timezone?.timezone_name || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                sx={{ mt: 2, width: '80%' }}
                name="FirstDay of Week"
                label="FirstDay of Week"
                variant="outlined"
                value={OPTIONS[e?.week_first_day - 1] || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
          </Stack>
        </Card>
      </Modal>
    </>
  );
};

ViewIcon.propTypes = {
  e: PropTypes.object
};

export default function AppNewInvoice() {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchh, setSearchh] = useState('');
  const [filter, setFilter] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event, e) => {
    setAnchorEl(event.currentTarget);
    dispatch(setDataID(e));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const volatile = useSelector((state) => state.details.data);
  const dataId = useSelector((state) => state.details.dataId);
  const isDeleted = useSelector((state) => state.details.deleted);
  const [page, setPage] = useState(1);
  const savee = useSelector((state) => state.details.savee);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getEnterpriseGroup = useCallback(async () => {
    await GetEnterpriseGroup(page, filter)
      .then((response) => dispatch(setVolatile(response.data)))
      .catch((err) => {
        console.log(err);
      });
  }, [page, filter, dispatch]);
  const re = /^[0-9\b]+$/;
  const filterData = (searchedData, searchh) =>
    re.test(searchh) === true
      ? searchedData?.filter((el) => el.id?.toString().indexOf(searchh) !== -1)
      : searchedData?.filter((el) => el.eg_name.includes(searchh) && el);
  useEffect(() => {
    getEnterpriseGroup();
  }, [savee, getEnterpriseGroup, isDeleted, filter]);

  const [openPopup, setOpenPopup] = useState();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleRestore = useCallback(
    async (id) => {
      await DisableRestoreEnterpriseGroup(id)
        .then(dispatch(RecordDeleted(false)))
        .then(
          enqueueSnackbar('successfully Restored', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        );
      setTimeout(dispatch(RecordDeleted(true)), 1000);
      setOpenPopup(false);
    },
    [dispatch, enqueueSnackbar, closeSnackbar]
  );

  const [popOpen, setPopOpen] = useState(false);
  const handlePopOpen = (event) => {
    setPopOpen(event.currentTarget);
  };

  const handlePopClose = () => {
    setPopOpen(null);
  };

  const popBool = Boolean(popOpen);
  const popId = popBool ? 'simple-popover' : undefined;

  return (
    <>
      <Card>
        <OpenModal
          copyData={volatile}
          setSearchh={setSearchh}
          searchh={searchh}
          filter={filter}
          setFilter={setFilter}
        />
        <Scrollbar>
          <TableContainer sx={{ Width: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID.</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Created By</TableCell>
                  <TableCell align="center">Time Assigned</TableCell>
                  <TableCell align="center">actions</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {filterData(volatile.results, searchh)?.map((e) => (
                  <TableRow key={e?.id}>
                    <TableCell align="center">{e?.id}</TableCell>
                    <TableCell align="center">{e?.eg_name}</TableCell>
                    <TableCell align="center">{e?.created_by}</TableCell>
                    <TableCell align="center">
                      {new Date(e?.time_assigned).toLocaleDateString('en-US', options)}
                    </TableCell>
                    <TableCell align="center">
                      {/* <img src={dots} alt="img" className="threeDots" /> */}
                      <MoreVertIcon style={{ cursor: `pointer` }} onClick={handlePopOpen} />
                      <Popover
                        id={popId}
                        open={popBool}
                        anchorEl={popOpen}
                        onClose={handlePopClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left'
                        }}
                      >
                        <>
                          <ViewIcon e={e} />
                          {e.is_disabled === false ? <EditIcon e={e} /> : null}
                        </>
                      </Popover>
                    </TableCell>
                    <TableCell align="center">
                      {e.is_disabled === false ? (
                        <>
                          <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="outlined"
                            size="small"
                            disableElevation
                            onClick={(event) => handleClick(event, e)}
                            endIcon={<KeyboardArrowDown />}
                          >
                            More
                          </Button>
                          <MoreMenuButton anchorEl={anchorEl} handleClose={handleClose} open={open} dataId={dataId} />{' '}
                        </>
                      ) : (
                        <>
                          <Button variant="outlined" color="primary" onClick={() => setOpenPopup(true)}>
                            Restore
                          </Button>
                          <AlertDialog
                            setAgreed={() => handleRestore(e?.id)}
                            setOpenn={setOpenPopup}
                            openn={openPopup}
                            Content="Are you sure you want to Restore Enterprise Group?"
                            description=""
                          />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <PaginationA volatile={volatile} handleChange={handleChange} />
      </Card>
    </>
  );
}
