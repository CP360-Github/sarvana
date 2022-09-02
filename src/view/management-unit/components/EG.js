import React, { useState, useRef } from 'react';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import cross from '@iconify/icons-eva/close-outline';
import { Icon } from '@iconify/react';
import { Box, TextField, Modal, Card, Typography, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import MIconButton from '../../../components/@material-extend/MIconButton';
import { setSelectedEg } from '../../../ReduxCreated/actions/EnterPriseGroup';
import { GetEnterpriseGroupWithoutPage } from '../../../api/EnterPriseGroupAPI';

export const EG = () => {
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
  const egRef = useRef(null);

  const [openEgModal, setOpenEgModal] = useState();
  const [EgDetails, setEgDetails] = useState();
  const [search, setSearch] = useState('');

  const FetchEgData = async () => {
    const result = await GetEnterpriseGroupWithoutPage();
    setEgDetails(result.data.results);
  };

  const handleClick = () => {
    setOpenEgModal(true);
    FetchEgData();
  };

  const handleClose = () => {
    setOpenEgModal(false);
  };

  const handleSelected = (e) => {
    dispatch(setSelectedEg(e));
    setOpenEgModal(false);
  };

  const filterData = (EgDetails, search) =>
    EgDetails?.filter((el) => el.eg_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <>
      <>
        <MIconButton ref={egRef} size="large" onClick={handleClick}>
          <Icon icon={moreHorizontalFill} width={20} height={20} />
        </MIconButton>
      </>
      <>
        <Modal open={openEgModal} onClose={handleClose}>
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
                  {filterData(EgDetails, search)?.map((e) => (
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
