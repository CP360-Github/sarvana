import React, { useState } from 'react';
import { Box, Card, Modal, Typography, Divider, TextField, Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import cross from '@iconify/icons-eva/close-outline';
import { useDispatch, useSelector } from 'react-redux';
import { setOkValue, setOkValuee } from '../../../ReduxCreated/actions/UsersAndPermissions/UsersAndPermissions';

const Timezone = ({ openCopyFormModal, setOpenCopyFormModal, setEdit, edit }) => {
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
  const [valueData, setValueData] = useState('');
  const dispatch = useDispatch();
  const dataType = useSelector((state) => state.UsersAndPermissionss.dataType);
  const dataTypee = useSelector((state) => state.UsersAndPermissionss.dataTypee);
  const [search, setSearch] = useState('');

  const handleClose = () => {
    setOpenCopyFormModal(false);
    setEdit(false);
  };

  const handleOk = () => {
    dispatch(setOkValue(valueData));
    dispatch(setOkValuee(valueData));
    setOpenCopyFormModal(false);
  };

  const filterData = (dataType, search) =>
    dataType?.filter((el) => el.timezone_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  return (
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
                  {filterData(edit ? dataTypee : dataType, search)?.map((e) => (
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
                        console.log(e, 'e');
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
  );
};

export default Timezone;

Timezone.propTypes = {
  openCopyFormModal: PropTypes.bool,
  setOpenCopyFormModal: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  edit: PropTypes.bool,
  setEdit: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};
