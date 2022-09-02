// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useRef, useState, useEffect, useCallback } from 'react';
// // import { format } from 'date-fns';
// // import { sentenceCase } from 'change-case';
// import { Icon } from '@iconify/react';
// import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
// import { Link as RouterLink } from 'react-router-dom';
// import shareFill from '@iconify/icons-eva/share-fill';
// import printerFill from '@iconify/icons-eva/printer-fill';
// import downloadFill from '@iconify/icons-eva/download-fill';
// import trash2Outline from '@iconify/icons-eva/trash-2-outline';
// import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// import add from '@iconify/icons-eva/plus-fill';
// import cross from '@iconify/icons-eva/close-outline';
// // material
// import { useTheme } from '@material-ui/core/styles';
// import {
//   Box,
//   Card,
//   Paper,
//   Menu,
//   Stack,
//   Table,
//   RadioGroup,
//   FormLabel,
//   FormControl,
//   Avatar,
//   Button,
//   TextField,
//   Divider,
//   MenuItem,
//   TableRow,
//   TableBody,
//   TableCell,
//   TableHead,
//   // CardHeader,
//   Typography,
//   Container,
//   TableContainer,
//   List,
//   ListItemText,
//   ListItemButton,
//   Radio,
//   FormControlLabel,
//   Modal,
//   Select,
//   InputLabel
// } from '@material-ui/core';
// import { useSelector, useDispatch } from 'react-redux';
// import { Field, useFormik, FormikProvider, Form } from 'formik';
// import {
//   setSelectedEg,
//   SetTimezone,
//   setOkValue,
//   setCopyFrom,
//   setCopiedEg
// } from '../../../ReduxCreated/actions/EnterPriseGroup';
// // utils
// import mockData from '../../../utils/mock-data';
// //
// // import Label from '../../Label';
// import Scrollbar from '../../Scrollbar';
// import { MIconButton } from '../../@material-extend';
// import { Block } from '../../../pages/components-overview/Block';
// import { GetEnterPriseSearch, GetTimeZone } from '../../../api/EnterPriseGroupAPI';

// // ----------------------------------------------------------------------

// BookingDetails.propTypes = {
//   title: PropTypes.string,
//   columnData: PropTypes.array,
//   managementUnits: PropTypes.func
// };

// export default function BookingDetails({ title, columnData, managementUnits }) {
//   console.log(managementUnits?.results);
//   const theme = useTheme();
//   // const isLight = theme.palette.mode === 'light';

//   const handleClickDownload = () => {};
//   const handleClickPrint = () => {};
//   const handleClickShare = () => {};
//   const handleClickDelete = () => {};

//   const modalRef = useRef(null);

//   const [openModal, setOpenModal] = useState(false);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <>
//       <Card>
//         <Container>
//           <Box sx={{ mb: 3, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <Typography variant="h5">{title}</Typography>
//             <Button
//               ref={modalRef}
//               onClick={handleOpenModal}
//               color="primary"
//               variant="contained"
//               endIcon={<Icon icon={add} />}
//             >
//               Add
//             </Button>
//           </Box>
//         </Container>
//         <Scrollbar>
//           <Modal open={openModal} onClose={handleCloseModal}>
//             <ModalCard
//               setOpenModal={setOpenModal}
//               handleCloseModal={handleCloseModal}
//               GetEnterpriseData={managementUnits}
//             />
//           </Modal>

//           <TableContainer sx={{ minWidth: 720 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {columnData.map((data, index) => (
//                     <TableCell key={index} sx={{ minWidth: 190 }}>
//                       {data}
//                     </TableCell>
//                   ))}
//                   <TableCell />
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {managementUnits?.results?.map((row) => (
//                   <TableRow key={row.id}>
//                     <TableCell>
//                       <Stack direction="row" alignItems="center" spacing={2}>
//                         <Typography variant="subtitle2">{row.id}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell>
//                       <Stack direction="row" alignItems="center" spacing={2}>
//                         <Avatar alt={row?.mu_name} src={row?.avatar} />
//                         <Typography variant="subtitle2">{row.mu_name}</Typography>
//                       </Stack>
//                     </TableCell>

//                     <TableCell align="right">
//                       <MoreMenuButton
//                         onDownload={handleClickDownload}
//                         onPrint={handleClickPrint}
//                         onShare={handleClickShare}
//                         onDelete={handleClickDelete}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <Divider />

//         <Box sx={{ p: 2, textAlign: 'right' }}>
//           <Button
//             to="#"
//             size="small"
//             color="inherit"
//             component={RouterLink}
//             endIcon={<Icon icon={arrowIosForwardFill} />}
//           >
//             View All
//           </Button>
//         </Box>
//       </Card>
//     </>
//   );
// }

// const FirstDayOfWeekHandle = ({ children, form, field }) => {
//   const { name, value } = field;
//   const { setFieldValue } = form;
//   return (
//     <Select
//       name={name}
//       value={value}
//       onChange={(e) => {
//         setFieldValue(name, e.target.value);
//       }}
//     >
//       {children}
//     </Select>
//   );
// };

// FirstDayOfWeekHandle.propTypes = {
//   children: PropTypes.object,
//   form: PropTypes.object,
//   field: PropTypes.object
// };
// export const ModalCard = ({ handleCloseModal, GetEnterpriseData }) => {
//   const style = {
//     position: 'absolute',
//     top: '40%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 1200,
//     border: '1px solid grey',
//     boxShadow: 24,
//     p: 4
//   };

//   const selectedEg = useSelector((state) => state.details.selectedEg);
//   const [value, setValue] = useState();
//   const [dataSelectedEg, setSelectedEg] = useState();

//   useEffect(() => setSelectedEg(selectedEg), [selectedEg]);

//   const handleChangee = (event) => {
//     setValue(event.target.value);
//   };
//   const [focus, setFocus] = useState(false);

//   const NewAddModal = Yup.object().shape({});
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {},
//     validationSchema: NewAddModal,
//     onSubmit: (values) => {
//       console.log(values, 'values');
//     }
//   });

//   const { handleSubmit } = formik;
//   return (
//     <>
//       <Card sx={style}>
//         <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Typography id="modal-modal-title" variant="h5">
//             Management Unit
//           </Typography>
//           <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
//         </Box>
//         <Divider />
//         <FormikProvider value={formik}>
//           <Form onSubmit={handleSubmit}>
//             <Box>
//               <Box
//                 sx={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
//               >
//                 <TextField sx={{ mt: 2, width: '45%' }} id="outlined-basic" label="ID" variant="outlined" type="text" />

//                 <TextField
//                   sx={{ mt: 2, width: '45%' }}
//                   id="outlined-basic"
//                   label="Name"
//                   variant="outlined"
//                   type="text"
//                 />
//               </Box>
//               <Box
//                 sx={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
//               >
//                 <TextField
//                   sx={{ mt: 2, width: '45%' }}
//                   id="outlined-basic"
//                   label="EG"
//                   variant="outlined"
//                   type="text"
//                   value={dataSelectedEg !== undefined ? dataSelectedEg?.id + dataSelectedEg?.eg_name : ''}
//                 />

//                 <div style={{ marginLeft: '-2rem', marginTop: '1rem' }}>
//                   <EG GetEnterpriseData={GetEnterpriseData} />
//                 </div>
//                 <div style={{ marginRight: '-2rem', marginTop: '1rem' }}>
//                   <CopyFromData />
//                 </div>
//                 <TextField
//                   sx={{ mt: 2, width: '45%' }}
//                   id="outlined-basic"
//                   label="Copy From"
//                   variant="outlined"
//                   type="text"
//                 />
//               </Box>
//               <Box
//                 sx={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
//               >
//                 <TextField
//                   sx={{ mt: 2, width: '45%' }}
//                   id="outlined-basic"
//                   label="Time Zone"
//                   variant="outlined"
//                   type="text"
//                 />
//                 <div style={{ marginLeft: '-5rem', marginTop: '1rem' }}>
//                   <CopyTimeZone />
//                 </div>

//                 <FormControl variant="outlined" style={{ width: '510px', marginTop: '1rem' }}>
//                   <InputLabel style={{ background: 'white' }}>Firstday of Week</InputLabel>
//                   <Field name="firstdayofweek" component={FirstDayOfWeekHandle}>
//                     <MenuItem value={1}>Sunday</MenuItem>
//                     <MenuItem value={2}>Monday</MenuItem>
//                     <MenuItem value={3}>Monday</MenuItem>
//                     <MenuItem value={4}>Wednesday</MenuItem>
//                     <MenuItem value={5}>Thursday</MenuItem>
//                     <MenuItem value={6}>Friday</MenuItem>
//                     <MenuItem value={7}>Saturday</MenuItem>
//                   </Field>
//                 </FormControl>
//               </Box>
//               <Typography style={{ margin: 2 }} variant="h5">
//                 Operating Hours
//               </Typography>
//               <Paper sx={{ mt: '5px' }} elevation={3}>
//                 <Box
//                   sx={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}
//                 >
//                   <MenuButton />
//                   <FormControl>
//                     <FormLabel id="demo-radio-buttons-group-label">Open</FormLabel>
//                     <RadioGroup value={value} onChange={handleChangee}>
//                       <FormControlLabel value="open all day" control={<Radio />} label="open all day" />
//                       <FormControlLabel
//                         onClick={() => {
//                           setFocus(true);
//                         }}
//                         value="open partial day"
//                         control={<Radio />}
//                         label="open partial day"
//                       />
//                       <FormControlLabel value="closed" control={<Radio />} label="closed" />
//                     </RadioGroup>
//                   </FormControl>
//                   <Typography>From</Typography>
//                   {focus ? (
//                     <TextField
//                       inputRef={(input) => {
//                         if (input != null) {
//                           input.focus();
//                         }
//                       }}
//                       disabled={value !== 'open partial day'}
//                     />
//                   ) : (
//                     <TextField />
//                   )}
//                   <Typography>To</Typography>
//                   <TextField disabled={value !== 'open partial day'} />
//                 </Box>
//               </Paper>
//             </Box>
//             <Box sx={{ margin: 2, display: 'flex', justifyContent: 'flex-end' }}>
//               <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleCloseModal}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="contained" color="primary">
//                 Save
//               </Button>
//             </Box>
//           </Form>
//         </FormikProvider>
//       </Card>
//     </>
//   );
// };

// ModalCard.propTypes = {
//   handleCloseModal: PropTypes.func,
//   GetEnterpriseData: PropTypes.func
// };

// const CopyFromData = () => {
//   const style1 = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     border: '1px solid grey',
//     boxShadow: 24,
//     p: 4
//   };
//   const dispatch = useDispatch();
//   const menuRef = useRef(null);
//   const [openCopyFormData, setOpenCopyFormData] = useState(false);
//   const [search, setSearch] = useState('');
//   const [searchedData, setSearchedData] = useState();

//   const handleClick = () => {
//     setOpenCopyFormData(true);
//     dispatch(setCopyFrom(true));
//   };
//   const handleClose = () => {
//     setOpenCopyFormData(false);
//   };

//   const handleSelected = (e) => {
//     dispatch(setCopiedEg(e));
//     setOpenCopyFormData(false);
//   };

//   const getSearchedData = useCallback(async (search) => {
//     await GetEnterPriseSearch(search)
//       .then((response) => setSearchedData(response.data.results))
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     getSearchedData(search);
//   }, [search, getSearchedData]);

//   const filterData = (searchedData, search) =>
//     searchedData?.filter((el) => el.eg_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

//   return (
//     <>
//       <>
//         <MIconButton ref={menuRef} size="large" onClick={handleClick}>
//           <Icon icon={moreHorizontalFill} width={20} height={20} />
//         </MIconButton>
//       </>
//       <>
//         <Modal open={openCopyFormData} onClose={handleClose}>
//           <Card sx={style1}>
//             <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <Typography id="modal-modal-title" variant="h5">
//                 Enterprise Group
//               </Typography>
//               <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
//             </Box>
//             <Divider sx={{ mb: 2 }} />
//             <Box>
//               <TextField
//                 fullWidth
//                 id="outlined-basic"
//                 label="Search"
//                 variant="outlined"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                 }}
//               />
//               <Box>
//                 <Box
//                   sx={{
//                     mt: 1,
//                     pt: 1,
//                     pb: 1,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between'
//                   }}
//                 >
//                   <Box sx={{ ml: 3 }}>ID</Box>
//                   <Box sx={{ mr: 3 }}>Name</Box>
//                 </Box>
//                 <Box sx={{ overflow: 'scroll', height: 200 }}>
//                   {filterData(searchedData, search)?.map((e) => (
//                     <Box
//                       key={e?.id}
//                       sx={{ cursor: 'pointer', pt: 1, pb: 1, display: 'flex', justifyContent: 'space-between' }}
//                       onClick={() => handleSelected(e)}
//                     >
//                       <Box sx={{ ml: 3 }}>{e?.id}</Box>
//                       <Box sx={{ mr: 3 }}>{e?.eg_name}</Box>
//                     </Box>
//                   ))}
//                 </Box>
//               </Box>
//             </Box>
//           </Card>
//         </Modal>
//       </>
//     </>
//   );
// };

// const CopyTimeZone = () => {
//   const style1 = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 700,
//     border: '1px solid grey',
//     boxShadow: 24,
//     p: 4
//   };
//   const menuRef = useRef(null);
//   const [openCopyFormModal, setOpenCopyFormModal] = useState(false);
//   const [valueData, setValueData] = useState('');
//   const dispatch = useDispatch();
//   const timezone = useSelector((state) => state.details.timezone);
//   const [search, setSearch] = useState('');

//   const getTimezone = useCallback(async () => {
//     await GetTimeZone()
//       .then((response) => dispatch(SetTimezone(response.data)))
//       .catch((error) => console.log(error));
//   }, [dispatch]);

//   useEffect(() => {
//     getTimezone();
//   }, [getTimezone]);

//   const handleClick = () => {
//     setOpenCopyFormModal(true);
//   };
//   const handleClose = () => {
//     setOpenCopyFormModal(false);
//   };

//   const handleOk = () => {
//     dispatch(setOkValue(valueData));
//     setOpenCopyFormModal(false);
//   };

//   const filterData = (timezone, search) =>
//     timezone?.filter((el) => el.timezone_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);
//   return (
//     <>
//       <>
//         <MIconButton ref={menuRef} size="large" onClick={handleClick}>
//           <Icon icon={moreHorizontalFill} width={20} height={20} />
//         </MIconButton>
//       </>
//       <>
//         <Modal open={openCopyFormModal} onClose={handleClose}>
//           <Card sx={style1}>
//             <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <Typography id="modal-modal-title" variant="h5">
//                 Select Timezone
//               </Typography>
//               <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
//             </Box>
//             <Divider sx={{ mb: 2 }} />
//             <Box sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gridColumnGap: '25px' }}>
//               <Box>
//                 <TextField
//                   fullWidth
//                   id="outlined-basic"
//                   label="Search"
//                   variant="outlined"
//                   value={search}
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                   }}
//                 />
//                 <Box>
//                   <Box
//                     sx={{
//                       mt: 2,
//                       pt: 1,
//                       pb: 1,
//                       display: 'flex',
//                       justifyContent: 'space-around'
//                     }}
//                   >
//                     <Box>Name</Box>
//                     <Box>GMT Offset</Box>
//                   </Box>
//                   <Box sx={{ height: '250px', overflow: 'scroll' }}>
//                     {filterData(timezone, search)?.map((e) => (
//                       <Box
//                         key={e?.id}
//                         style={{
//                           cursor: 'pointer',
//                           paddingTop: '10px',
//                           paddingBottom: '5px',
//                           display: 'flex',
//                           justifyContent: 'space-around',
//                           backgroundColor: valueData?.id === e?.id ? 'grey' : '',
//                           color: valueData?.id === e?.id ? 'white' : ''
//                         }}
//                         onClick={() => {
//                           setValueData(e);
//                         }}
//                       >
//                         <div>{e?.timezone_name}</div>
//                         <div>{e?.gmt_offset}</div>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               </Box>
//               <Box>
//                 <Typography id="modal-modal-title" variant="h6" sx={{ pl: 1 }}>
//                   Zone
//                 </Typography>
//                 <Box sx={{ height: '334px' }}>
//                   <Box
//                     sx={{
//                       display: 'grid',
//                       gridTemplateRows: '1fr 1fr',
//                       m: 0.5
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: 'grid',
//                         gridTemplateColumns: '1fr 1fr',
//                         p: 1,
//                         alignItems: 'center'
//                       }}
//                     >
//                       <Typography id="modal-modal-title" sx={{ fontSize: 14, fontWeight: 400 }}>
//                         GMT Offset(hrs)
//                       </Typography>
//                       <TextField size="small" id="outlined-basic" variant="outlined" value={valueData.gmt_offset} />
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button sx={{ mr: 3 }} type="submit" variant="contained" color="primary" onClick={handleOk}>
//                 Ok
//               </Button>
//               <Button variant="outlined" color="warning" onClick={() => setOpenCopyFormModal(false)}>
//                 Cancel
//               </Button>
//             </Box>
//           </Card>
//         </Modal>
//       </>
//     </>
//   );
// };

// export const MenuButton = () => {
//   const style = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '200px'
//   };
//   const [isOpenList, setOpenList] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(1);

//   const handleClickListItem = (event) => {
//     setOpenList(event.currentTarget);
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     setOpenList(null);
//   };

//   const handleClose = () => {
//     setOpenList(null);
//   };

//   const OPTIONS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//   return (
//     <Block title="Day" sx={style}>
//       <List component="nav" aria-label="Device settings">
//         <ListItemButton aria-haspopup="true" onClick={handleClickListItem}>
//           <ListItemText
//             sx={{ border: '2px solid grey', borderRadius: '10px', padding: '5px' }}
//             primary={OPTIONS[selectedIndex]}
//           />
//         </ListItemButton>
//       </List>
//       <Menu keepMounted anchorEl={isOpenList} onClose={handleClose} open={Boolean(isOpenList)}>
//         {OPTIONS.map((option, index) => (
//           <MenuItem
//             key={option}
//             selected={index === selectedIndex}
//             onClick={(event) => handleMenuItemClick(event, index)}
//           >
//             {option}
//           </MenuItem>
//         ))}
//       </Menu>
//     </Block>
//   );
// };

// export const EG = ({ GetEnterpriseData }) => {
//   const style1 = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     border: '1px solid grey',
//     boxShadow: 24,
//     p: 4
//   };
//   const dispatch = useDispatch();
//   const egRef = useRef(null);

//   const [openEgModal, setOpenEgModal] = useState();
//   const [EgDetails, setEgDetails] = useState();
//   const [search, setSearch] = useState('');

//   const FetchEgData = async () => {
//     const result = await GetEnterpriseData();
//     setEgDetails(result.data.results);
//   };

//   const handleClick = () => {
//     setOpenEgModal(true);
//     FetchEgData();
//   };

//   const handleClose = () => {
//     setOpenEgModal(false);
//   };

//   const handleSelected = (e) => {
//     dispatch(setSelectedEg(e));
//     setOpenEgModal(false);
//   };

//   const filterData = (EgDetails, search) =>
//     EgDetails?.filter((el) => el.eg_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

//   return (
//     <>
//       <>
//         <MIconButton ref={egRef} size="large" onClick={handleClick}>
//           <Icon icon={moreHorizontalFill} width={20} height={20} />
//         </MIconButton>
//       </>
//       <>
//         <Modal open={openEgModal} onClose={handleClose}>
//           <Card sx={style1}>
//             <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <Typography id="modal-modal-title" variant="h5">
//                 Enterprise Group
//               </Typography>
//               <Icon icon={cross} onClick={handleClose} color="grey" cursor="pointer" />
//             </Box>
//             <Divider sx={{ mb: 2 }} />
//             <Box>
//               <TextField
//                 fullWidth
//                 id="outlined-basic"
//                 label="Search"
//                 variant="outlined"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                 }}
//               />
//               <Box>
//                 <Box
//                   sx={{
//                     mt: 1,
//                     pt: 1,
//                     pb: 1,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between'
//                   }}
//                 >
//                   <Box sx={{ ml: 3 }}>ID</Box>
//                   <Box sx={{ mr: 3 }}>Name</Box>
//                 </Box>
//                 <Box sx={{ overflow: 'scroll', height: 200 }}>
//                   {filterData(EgDetails, search)?.map((e) => (
//                     <Box
//                       key={e?.id}
//                       sx={{
//                         cursor: 'pointer',
//                         pt: 1,
//                         pb: 1,
//                         display: 'flex',
//                         justifyContent: 'space-between'
//                       }}
//                       onClick={() => handleSelected(e)}
//                     >
//                       <Box sx={{ ml: 3 }}>{e?.id}</Box>
//                       <Box sx={{ mr: 3 }}>{e?.eg_name}</Box>
//                     </Box>
//                   ))}
//                 </Box>
//               </Box>
//             </Box>
//           </Card>
//         </Modal>
//       </>
//     </>
//   );
// };

// EG.propTypes = {
//   GetEnterpriseData: PropTypes.func
// };

// const MOCK_BOOKINGS = [...Array(5)].map((_, index) => ({
//   id: mockData.id(index),
//   name: mockData.name.fullName(index),
//   avatar: mockData.image.avatar(index),
//   checkIn: mockData.time(index),
//   checkOut: mockData.time(index),
//   phoneNumber: mockData.phoneNumber(index),
//   status: (index === 1 && 'pending') || (index === 3 && 'un_paid') || 'paid',
//   roomType: (index === 1 && 'double') || (index === 3 && 'king') || 'single'
// }));

// // ----------------------------------------------------------------------

// MoreMenuButton.propTypes = {
//   onDelete: PropTypes.func,
//   onDownload: PropTypes.func,
//   onPrint: PropTypes.func,
//   onShare: PropTypes.func
// };

// function MoreMenuButton({ onDownload, onPrint, onShare, onDelete }) {
//   const menuRef = useRef(null);
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <>
//         <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
//           <Icon icon={moreVerticalFill} width={20} height={20} />
//         </MIconButton>
//       </>

//       <Menu
//         open={open}
//         anchorEl={menuRef.current}
//         onClose={handleClose}
//         PaperProps={{
//           sx: { width: 200, maxWidth: '100%' }
//         }}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <MenuItem onClick={onDownload}>
//           <Icon icon={downloadFill} width={20} height={20} />
//           <Typography variant="body2" sx={{ ml: 2 }}>
//             Download
//           </Typography>
//         </MenuItem>
//         <MenuItem onClick={onPrint}>
//           <Icon icon={printerFill} width={20} height={20} />
//           <Typography variant="body2" sx={{ ml: 2 }}>
//             Print
//           </Typography>
//         </MenuItem>
//         <MenuItem onClick={onShare}>
//           <Icon icon={shareFill} width={20} height={20} />
//           <Typography variant="body2" sx={{ ml: 2 }}>
//             Share
//           </Typography>
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
//           <Icon icon={trash2Outline} width={20} height={20} />
//           <Typography variant="body2" sx={{ ml: 2 }}>
//             Delete
//           </Typography>
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }
