import { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import {
  alpha,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import edit from '@iconify/icons-eva/edit-2-fill';
import { KeyboardArrowDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import add from '@iconify/icons-eva/plus-fill';
import { Form, Formik, useFormik } from 'formik';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import { useDispatch, useSelector } from 'react-redux';
import view from '@iconify/icons-eva/eye-fill';
import cross from '@iconify/icons-eva/close-outline';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
import { PaginationA } from '../../sharedComponents/Pagination';
import { fDateTime } from '../../utils/formatTime';
import {
  setAcdValue,
  SetTimezone,
  setCopiedCt,
  setOkValue,
  setCopiedegg,
  RecordDeleted,
  DataEdit,
  EditData,
  setSavee,
  setDataId
} from '../../ReduxCreated/actions/ContactType';
import Scrollbar from '../../components/Scrollbar';
import { GetEnterPriseSearch } from '../../api/EnterPriseGroupAPI';
import {
  ctidAvailability,
  DisableContactTypes,
  EditContactType,
  getAcdData,
  getContactTypes,
  getCopyFromCT,
  getCtIdData,
  GetCtTimeZone,
  PostContactType
} from '../../api/ContactTypeApi';
import { MIconButton } from '../../components/@material-extend';
import AlertDialog from '../../pages/components-overview/material-ui/dialog/AlertDialog';
import EnableDisableFilterWithSearch from '../../sharedComponents/EnableDisableFilterWithSearch';

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

function MoreMenuButton({ anchorEl, handleClose, open, dataIds, handleClick }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openn, setOpenn] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const dataId = useSelector((state) => state.contact.dataId);
  const handleHistory = (data) => {
    navigate(`/dashboard/account-setup/contact-type-assignment/${data?.id}`);
  };

  const handleDelete = useCallback(async () => {
    await DisableContactTypes(dataId?.id, !dataId?.is_disabled)
      .then(dispatch(RecordDeleted(!dataId?.is_disabled)))
      .then(
        enqueueSnackbar(`successfully ${dataId?.is_disabled === false ? `Disabled` : `Restored`} `, {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );
    handleClose();
    setTimeout(dispatch(RecordDeleted(dataId?.is_disabled)), 1000);
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

  const handleOpen = (data) => {
    setOpenn(true);
    dispatch(setDataId(data));
  };

  const handleClicktData = (e, data) => {
    handleClick(e);
    dispatch(setDataId(data));
  };

  console.log('data2', dataId);

  return (
    <>
      {dataIds.is_disabled === false ? (
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          size="small"
          disableElevation
          onClick={(event) => handleClicktData(event, dataIds)}
          endIcon={<KeyboardArrowDown />}
        >
          More
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={() => handleOpen(dataIds)}>
          Restore
        </Button>
      )}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={() => handleHistory(dataId)} sx={{ display: 'flex', justifyContent: 'center' }}>
          Assignment History
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => handleOpen(dataId)}
          sx={{ color: 'error.main', display: 'flex', justifyContent: 'center' }}
        >
          Disable
        </MenuItem>
      </StyledMenu>
      <AlertDialog
        setAgreed={setAgreed}
        setOpenn={setOpenn}
        openn={openn}
        Content={`Are you sure you want to ${dataId?.is_disabled === false ? `disable` : `restore`} ?`}
        description=""
      />
    </>
  );
}

MoreMenuButton.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  dataIds: PropTypes.object,
  handleClick: PropTypes.func
};

const CopyAcd = () => {
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
  const [acdDatas, setAcdDatas] = useState([]);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const getAcdDetails = useCallback(async (search) => {
    await getAcdData(search)
      .then((response) => setAcdDatas(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getAcdDetails();
  }, [search, getAcdDetails]);

  const handleClick = () => {
    setOpenCopyFormModal(true);
  };
  const handleClose = () => {
    setOpenCopyFormModal(false);
  };

  const handleOk = () => {
    dispatch(setAcdValue(valueData));
    setOpenCopyFormModal(false);
  };

  const filterData = (acdDatas, search) =>
    acdDatas?.filter((el) => el.param_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);
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
                Select ACD
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
                    <Box>ID</Box>
                    <Box>Name</Box>
                  </Box>
                  <Box sx={{ height: '250px', overflow: 'scroll' }}>
                    {filterData(acdDatas, search)?.map((e) => (
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
                        <div>{e?.id}</div>
                        <div>{e?.param_name}</div>
                      </Box>
                    ))}
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
  const timezone = useSelector((state) => state.contact.timezone);
  const [search, setSearch] = useState('');

  const getTimezone = useCallback(async () => {
    await GetCtTimeZone()
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

const CopyFromEg = () => {
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
  // const [copyFromEg, setCopyFromEg] = useState(false);
  const [searchedData, setSearchedData] = useState();

  const handleClick = () => {
    setOpenCopyFormData(true);
    //  setCopyFromEg(true);
  };
  const handleClose = () => {
    setOpenCopyFormData(false);
  };

  const handleSelected = (e) => {
    dispatch(setCopiedegg(e));
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

  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.eg_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

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
                  {filterData(searchedData, search)?.map((e) => (
                    <Box
                      key={e?.id}
                      sx={{ cursor: 'pointer', pt: 1, pb: 1, display: 'flex', justifyContent: 'space-between' }}
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
  const [searchedData, setSearchedData] = useState();

  const handleClick = () => {
    setOpenCopyFormData(true);
    // getSearchedData();
    // setCopyFrom(true);
  };
  const handleClose = () => {
    setOpenCopyFormData(false);
  };

  const handleSelected = (e) => {
    dispatch(setCopiedCt(e));
    setOpenCopyFormData(false);
  };

  const getSearchedData = useCallback(async (search) => {
    await getCopyFromCT(search)
      .then((response) => setSearchedData(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSearchedData(search);
  }, [search, getSearchedData]);

  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.ct_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

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
                Contact Type
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
                  {filterData(searchedData, search)?.map((e) => (
                    <Box
                      key={e?.id}
                      sx={{ cursor: 'pointer', pt: 1, pb: 1, display: 'flex', justifyContent: 'space-between' }}
                      onClick={() => handleSelected(e)}
                    >
                      <Box sx={{ ml: 3 }}>{e?.id}</Box>
                      <Box sx={{ mr: 3 }}>{e?.ct_name}</Box>
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

export default function ContactType() {
  const [contactData, setContactData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [addData, setAddData] = useState(false);
  const [searchh, setSearchh] = useState('');
  const [tvalue, setTvalue] = useState(false);
  const [page, setPage] = useState(1);
  const textInputCopyFrom = useRef(null);
  const textInputEg = useRef(null);
  const textInputAcd = useRef(null);
  const dispatch = useDispatch();
  const okValue = useSelector((state) => state.contact.okValue);
  const copiedegg = useSelector((state) => state.contact.copiedegg);
  const copiedCt = useSelector((state) => state.contact.copiedCt);
  const AcdValue = useSelector((state) => state.contact.AcdValue);
  const isEditing = useSelector((state) => state.contact.edited);
  const DataEditing = useSelector((state) => state.contact.dataedit);
  const deleted = useSelector((state) => state.contact.deleted);
  const savee = useSelector((state) => state.contact.savee);
  const [filter, setFilter] = useState(false);

  async function fetchContactTypeDetails(page, disableOrEnable) {
    const response = await getContactTypes(page, disableOrEnable);

    if (response.success) {
      setContactData(response.data);
      setTvalue(response.value);
    }
  }

  useEffect(() => {
    fetchContactTypeDetails(page, filter);
  }, [addData, page, savee, deleted, filter]);

  const EditFormData = async (data) => {
    let TimeZoneOkValue;
    if (okValue === undefined) {
      TimeZoneOkValue = DataEditing.timezone.id;
    } else {
      TimeZoneOkValue = okValue?.id;
    }
    const response = await EditContactType(DataEditing, data, TimeZoneOkValue, dataSelectedAcd, dataSelectedEg).then(
      dispatch(setSavee(true))
    );
    if (response.success) {
      enqueueSnackbar('successfully Updated', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } else {
      enqueueSnackbar(response.message || 'Something went wrong try again later', {
        variant: 'error'
      });
    }
    setOpenModal(false);
    setOpenModal(false);
    setTimeout(dispatch(setSavee(false)), 1000);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(EditData(false));
    dispatch(setOkValue(undefined));
    setSelectedCt(undefined);
    setSelectedEg(undefined);
    setSelectedAcd(undefined);
    resetForm();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    // setSelectedEgg(undefined);
  };

  useEffect(() => {
    if (isEditing === true) {
      setSelectedEg(undefined);
      setSelectedAcd(undefined);
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [isEditing, DataEditing]);

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    border: '1px solid grey',
    boxShadow: 24,
    minWidth: 700,
    p: 4
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [dataSelectedCt, setSelectedCt] = useState();
  const [dataSelectedAcd, setSelectedAcd] = useState();
  const [dataSelectedEg, setSelectedEg] = useState();
  useEffect(() => setSelectedCt(copiedCt), [copiedCt]);
  useEffect(() => setSelectedAcd(AcdValue), [AcdValue]);
  useEffect(() => setSelectedEg(copiedegg), [copiedegg]);

  const handleRemoveCopyFrom = () => {
    textInputCopyFrom.current.value = '';
    setSelectedCt(undefined);
  };

  const handleRemoveCopyEg = () => {
    textInputEg.current.value = '';
    setSelectedEg(undefined);
  };

  const handleRemoveAcd = () => {
    textInputAcd.current.value = '';
    setSelectedAcd(undefined);
  };

  const handleChanges = (event, value) => {
    setPage(value);
  };

  const NewAddModal = Yup.object().shape({
    ct_name: Yup.string().required('Name is Required')
  });
  const formik = useFormik({
    validationSchema: NewAddModal,
    initialValues: {
      id: isEditing === true ? DataEditing.id : '',
      ct_name: isEditing === true ? DataEditing.ct_name : '',
      ct_type: isEditing === true ? DataEditing.ct_type : '',
      copyfrom: '',
      eg: '',
      fdw: isEditing === true ? DataEditing.week_first_day : 1,
      acd: '',
      sub_type: '',
      timezone: ''
    },
    onSubmit: async (values) => {
      if (isEditing === false) {
        const response = await PostContactType(
          values,
          dataSelectedCt,
          okValue,
          dataSelectedAcd,
          dataSelectedEg,
          DataEditing
        );
        if (response.success) {
          enqueueSnackbar('Saved success', { variant: 'success' });
          setOpenModal(false);
          setSelectedCt(undefined);
          setSelectedEg(undefined);
          setSelectedAcd(undefined);
          dispatch(setOkValue(undefined));
          setAddData(true);
          resetForm();
          SetTimezone();
        } else {
          enqueueSnackbar('Something went wrong try again later', {
            variant: 'error'
          });
        }
      } else {
        EditFormData(values);
        dispatch(setOkValue(undefined));
        setSelectedEg(undefined);
      }
    }
  });
  const { values, handleChange, setFieldValue, handleSubmit, errors, touched, getFieldProps, resetForm } = formik;

  const [idValidToken, setIdValidToken] = useState({ token: false, msg: '' });
  // eslint-disable-next-line consistent-return
  const idAvailabilityProvider = async () => {
    if (values.id !== '') {
      const response = await ctidAvailability(parseInt(values.id, 10));
      if (response?.success) {
        if (response.status === 'The Given ID is available') {
          return response;
        }

        setIdValidToken({ token: true, msg: response.data?.status });
      }
    } else {
      setIdValidToken({ token: true, msg: 'ID is Required!' });
    }
  };

  return (
    <>
      <Card sx={{ p: 1 }}>
        <Box sx={{ mb: 1, ml: 2, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">Contact Type</Typography>
          <Button
            // ref={modalRef}
            onClick={handleOpenModal}
            color="primary"
            variant="contained"
            endIcon={<Icon icon={add} />}
          >
            Add
          </Button>
        </Box>
        <EnableDisableFilterWithSearch
          setFilter={setFilter}
          filter={filter}
          setSearchText={setSearchh}
          searchText={searchh}
        />
        <ContactTypeTable tableData={contactData} searchh={searchh} />
        <PaginationA volatile={tvalue} handleChange={handleChanges} />
      </Card>

      <>
        <Modal open={openModal} onClose={handleCloseModal} sx={{ mt: 10 }}>
          <Card sx={style}>
            <Box>
              <Typography id="modal-modal-title" variant="h5">
                Contact Type
              </Typography>
              <Divider />
            </Box>
            <Box>
              <Formik>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <Grid xs={12} md={6}>
                        <TextField
                          sx={{ mt: 2 }}
                          required
                          label="ID"
                          fullWidth
                          name="id"
                          value={values.id}
                          error={Boolean(idValidToken.token)}
                          helperText={idValidToken.token !== false ? idValidToken.msg : errors.id}
                          {...getFieldProps('id')}
                          onBlur={() => idAvailabilityProvider()}
                        />
                      </Grid>

                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2 }}
                          name="name"
                          value={values.ct_name}
                          label="Name"
                          variant="outlined"
                          {...getFieldProps('ct_name')}
                          error={Boolean(touched.ct_name && errors.ct_name)}
                          helperText={touched.ct_name && errors.ct_name}
                        />
                      </Grid>
                    </Stack>
                    <Stack direction="row">
                      <Grid xs={4} md={2}>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            CT Type:
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid>
                        <Box>
                          <FormControl>
                            {/* <FormLabel id="demo-radio-buttons-group-label"> CT Type</FormLabel> */}
                            <RadioGroup
                              value={values?.ct_type}
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                              //  onChange={handleCTtypes}
                            >
                              {' '}
                              <Stack direction="column">
                                <FormControlLabel
                                  value={1}
                                  control={<Radio />}
                                  name="ct_type"
                                  onChange={() => setFieldValue('ct_type', 1)}
                                  label="Inbound"
                                />

                                {values.ct_type === 1 && (
                                  <FormControlLabel
                                    onChange={() => setFieldValue('sub_type', 1)}
                                    control={<Checkbox sx={{ ml: 2 }} />}
                                    label="Use Work load Requirement Calculation"
                                  />
                                )}
                              </Stack>
                              <Stack direction="column">
                                <FormControlLabel
                                  value={2}
                                  control={<Radio />}
                                  name="ct_type"
                                  onChange={() => setFieldValue('ct_type', 2)}
                                  label="Outbound"
                                />

                                {values.ct_type === 2 && (
                                  <FormControlLabel
                                    name="Use campaign distribution"
                                    onChange={() => setFieldValue('sub_type', 2)}
                                    control={<Checkbox sx={{ ml: 4 }} />}
                                    label="Use campaign distribution"
                                  />
                                )}
                              </Stack>
                              <Box>
                                <FormControlLabel
                                  value={3}
                                  control={<Radio />}
                                  onChange={() => setFieldValue('ct_type', 3)}
                                  label="Email"
                                />
                                <FormControlLabel
                                  value={4}
                                  control={<Radio />}
                                  onChange={() => setFieldValue('ct_type', 4)}
                                  label="Chat"
                                />
                                <FormControlLabel
                                  value={5}
                                  control={<Radio />}
                                  onChange={() => setFieldValue('ct_type', 5)}
                                  label="Back Office"
                                />
                                <FormControlLabel
                                  value={6}
                                  control={<Radio />}
                                  onChange={() => setFieldValue('ct_type', 6)}
                                  label="Social Media"
                                />
                              </Box>
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Grid xs={12} md={6}>
                        <TextField
                          sx={{ mt: 2, width: '80%' }}
                          name="EG"
                          label="EG"
                          variant="outlined"
                          disabled={dataSelectedCt !== undefined}
                          inputRef={textInputEg}
                          // error={Boolean(touched.eg && errors.eg)}
                          value={
                            (values.eg = isEditing
                              ? dataSelectedEg === undefined
                                ? DataEditing?.enterprise_grp.eg_name
                                : dataSelectedEg?.eg_name || ''
                              : dataSelectedEg?.eg_name || '')
                          }
                          onChange={() => setFieldValue('eg', values.eg)}
                          // helperText={touched.eg && errors.eg}
                        />
                        {dataSelectedCt ? (
                          <Icon
                            icon={cross}
                            onClick={handleRemoveCopyEg}
                            color="grey"
                            cursor="pointer"
                            style={{ 'margin-top': '20px' }}
                          />
                        ) : (
                          <CopyFromEg />
                        )}
                      </Grid>
                      <Grid xs={12} md={6}>
                        <FormControl sx={{ width: 250 }}>
                          <InputLabel>First Day Of Week</InputLabel>
                          <Select
                            sx={{ mt: 2 }}
                            value={values?.fdw ? values?.fdw : 1}
                            disabled={dataSelectedCt !== undefined}
                            label="First Day Of Week"
                            onChange={(e) => setFieldValue('fdw', e.target.value)}
                          >
                            <MenuItem value={1}>Sunday</MenuItem>
                            <MenuItem value={2}>Monday</MenuItem>
                            <MenuItem value={3}>Tuesday</MenuItem>
                            <MenuItem value={4}>Wednesday</MenuItem>
                            <MenuItem value={5}>Thursday</MenuItem>
                            <MenuItem value={6}>Friday</MenuItem>
                            <MenuItem value={7}>Saturday</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Grid xs={12} md={6}>
                        <TextField
                          sx={{ mt: 2, width: '80%' }}
                          name="ACD's"
                          label="Default ACD's"
                          disabled={dataSelectedCt !== undefined}
                          inputRef={textInputAcd}
                          variant="outlined"
                          value={
                            (values.acd = isEditing
                              ? dataSelectedAcd === undefined
                                ? DataEditing?.acd_param?.param_name
                                : dataSelectedAcd?.param_name || ''
                              : dataSelectedAcd?.param_name || '')
                          }
                          onChange={handleChange}
                          // inputProps={{ readOnly: true }}
                        />
                        {dataSelectedCt ? (
                          <Icon
                            icon={cross}
                            onClick={handleRemoveAcd}
                            color="grey"
                            cursor="pointer"
                            style={{ 'margin-top': '20px' }}
                          />
                        ) : (
                          <CopyAcd />
                        )}
                      </Grid>

                      <Grid>
                        <TextField
                          sx={{ mt: 2, width: '80%' }}
                          id="outlined-basic"
                          label="Time Zone"
                          variant="outlined"
                          name="timezone"
                          disabled={dataSelectedCt !== undefined}
                          value={
                            (values.acd = isEditing
                              ? okValue === undefined
                                ? DataEditing?.timezone?.timezone_name
                                : okValue?.timezone_name || ''
                              : okValue?.timezone_name || '')
                          }
                          inputProps={{ readOnly: true }}
                          onChange={handleChange}
                        />
                        {dataSelectedCt ? '' : <CopyTimeZone />}
                      </Grid>
                    </Stack>

                    {!isEditing && (
                      <Grid xs={12} md={6}>
                        <TextField
                          sx={{ mt: 2, width: '80%' }}
                          name="Copy From"
                          label="Copy From"
                          variant="outlined"
                          inputRef={textInputCopyFrom}
                          value={(values.copyfrom = dataSelectedCt ? dataSelectedCt?.id + dataSelectedCt?.ct_name : '')}
                          onChange={handleChange}
                          error={Boolean(touched.eg && errors.eg)}
                          helperText={touched.eg && errors.eg}
                        />
                        {dataSelectedCt ? (
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
                      </Grid>
                    )}
                    <Stack>
                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" color="warning" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                          {isEditing === true ? 'Update' : 'Save'}
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Form>
              </Formik>
            </Box>
          </Card>
        </Modal>
      </>
    </>
  );
}

ContactTypeTable.propTypes = {
  tableData: PropTypes.object,
  searchh: PropTypes.object
};

const EditIcon = ({ e }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(e, 'eeee');
    dispatch(DataEdit(e));
    dispatch(EditData(true));
  };
  return (
    <>
      <MIconButton onClick={handleClick} size="large">
        <Icon icon={edit} width={20} height={20} />
      </MIconButton>
    </>
  );
};

EditIcon.propTypes = {
  e: PropTypes.object
};

const ViewIcon = ({ e }) => {
  const style = {
    mt: 5,
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };

  const [showData, setShowData] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const getCtData = async (e) => {
    await getCtIdData(e)
      .then((response) => setShowData(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewIcon = () => {
    getCtData(e);
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
              Show Details of Contact Types
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
                name="ct_name"
                label="CT Name"
                variant="outlined"
                value={showData?.ct_name || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Grid xs={4} md={2}>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  CT Type:
                </Typography>
              </Box>
            </Grid>
            <Grid>
              <Box>
                <FormControl>
                  <RadioGroup
                    sx={{ justifyContent: 'space-between' }}
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <Box>
                      <FormControlLabel
                        value="inbound"
                        control={<Radio disabled={showData?.ct_type !== 1} checked={showData?.ct_type === 1} />}
                        label="Inbound"
                      />

                      <FormControlLabel
                        value="outbound"
                        control={<Radio disabled={showData?.ct_type !== 2} checked={showData?.ct_type === 2} />}
                        label="Outbound"
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        value="email"
                        control={<Radio disabled={showData?.ct_type !== 3} checked={showData?.ct_type === 3} />}
                        label="Email"
                      />

                      <FormControlLabel
                        value="chat"
                        control={<Radio disabled={showData?.ct_type !== 4} checked={showData?.ct_type === 4} />}
                        label="Chat"
                      />
                      <FormControlLabel
                        value="backoffice"
                        control={<Radio disabled={showData?.ct_type !== 5} checked={showData?.ct_type === 5} />}
                        label="Back Office"
                      />
                      <FormControlLabel
                        value="socialmedia"
                        control={<Radio disabled={showData?.ct_type !== 6} checked={showData?.ct_type === 6} />}
                        label="Social Media"
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Box>
              <TextField
                sx={{ mt: 2, width: '80%' }}
                name="EG"
                label="EG"
                variant="outlined"
                value={showData?.enterprise_grp?.eg_name || ''}
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
            <Box>
              <TextField
                sx={{ mt: 2, width: '80%' }}
                name="ACD's"
                label="ACD's"
                variant="outlined"
                value={showData?.acd_param?.param_name || ''}
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

function ContactTypeTable({ tableData, searchh }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const TABLE_HEAD = [
    { id: 'ID.', label: 'ID.' },
    { id: 'ct_name', label: 'Name' },
    { id: 'ct_type', label: 'CT Type' },
    { id: 'assingedTo', label: 'Assigned To' },
    { id: 'createdBy', label: 'Created By' },
    { id: 'time', label: 'Time Assigned' }
  ];

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const re = /^[0-9\b]+$/;
  const filterData = (tableData, searchh) =>
    re.test(searchh) === true
      ? tableData?.filter((el) => el.id?.toString().indexOf(searchh) !== -1)
      : tableData?.filter((el) => el.ct_name?.toLowerCase().indexOf(searchh.toLowerCase()) !== -1);

  return (
    <Scrollbar>
      <TableContainer sx={{ Width: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((headCell) => (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData(tableData, searchh)?.map((bodyCell) => (
              <TableRow key={bodyCell.name}>
                <TableCell>{bodyCell?.id}</TableCell>
                <TableCell>{bodyCell?.ct_name}</TableCell>
                {bodyCell.ct_type === 1 && <TableCell>Inbound</TableCell>}
                {bodyCell.ct_type === 2 && <TableCell>Outbound</TableCell>}
                {bodyCell.ct_type === 3 && <TableCell>Email</TableCell>}
                {bodyCell.ct_type === 4 && <TableCell>Chat</TableCell>}
                {bodyCell.ct_type === 5 && <TableCell>Back Office</TableCell>}
                {bodyCell.ct_type === 6 && <TableCell>Social Media</TableCell>}
                <TableCell>{bodyCell.enterprise_grp?.eg_name}</TableCell>
                <TableCell>{bodyCell.created_by?.username}</TableCell>
                <TableCell>{fDateTime(bodyCell?.time_assigned)} </TableCell>
                <TableCell align="center">
                  <ViewIcon e={bodyCell} />
                  {bodyCell.is_disabled === false ? <EditIcon e={bodyCell} /> : null}
                </TableCell>
                <TableCell align="center">
                  <MoreMenuButton
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    open={open}
                    dataIds={bodyCell}
                    handleClick={handleClick}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
