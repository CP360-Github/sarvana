import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Modal, Card, Divider, TextField } from '@material-ui/core';
import { Icon } from '@iconify/react';
import cross from '@iconify/icons-eva/close-outline';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import { useDispatch } from 'react-redux';
import { setCopyFromMU, setCopiedMU } from '../../../ReduxCreated/actions/ManagementUnit';
import { GetManagementUnitSearch } from '../../../api/ManagementUnitAPI';
import { MIconButton } from '../../../components/@material-extend';

export const CopyFrom = () => {
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
    dispatch(setCopyFromMU(true));
  };
  const handleClose = () => {
    setOpenCopyFormData(false);
  };

  const handleSelected = (e) => {
    dispatch(setCopiedMU(e));
    setOpenCopyFormData(false);
  };

  const getSearchedData = async (search) => {
    await GetManagementUnitSearch(search).then((response) => setSearchedData(response.data.results));
  };
  useEffect(() => {
    getSearchedData(search);
  }, [search]);

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
                Management Unit
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
                      <Box sx={{ mr: 3 }}>{e?.mu_name}</Box>
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
