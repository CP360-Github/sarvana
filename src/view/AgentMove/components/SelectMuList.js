import React, { useState } from 'react';
import { Modal, Card, Box, Typography, Divider, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { Icon } from '@iconify/react';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import cross from '@iconify/icons-eva/close-outline';
import { useSelector, useDispatch } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import { selectedMuFromListAction } from '../../../ReduxCreated/actions/Agent/MoveAgents.action';

const SubModal = () => {
  const dispatch = useDispatch();
  const MuList = useSelector((state) => state.MoveAgents.MUList);
  const [searchText, setSearchText] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    // getAcdList();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.mu_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  const style = {
    position: 'absolute',
    priority: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  return (
    <>
      <>
        <MIconButton sx={{ height: '40px' }} onClick={handleOpenModal}>
          <Icon icon={moreHorizontalFill} />
        </MIconButton>
      </>
      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                Management Unit List
              </Typography>
              <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
            </Box>
            <Divider />
            <div style={{ width: '100%', marginTop: '20px' }}>
              <TextField
                id="Search"
                label="Search"
                variant="outlined"
                type="search"
                sx={{ width: '100%' }}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
            </div>
            <List style={{ height: '250px', overflow: 'scroll' }}>
              <ListItem>
                <ListItemText primary={` ID `} />
                <ListItemText primary={` Name `} style={{ textAlign: 'right' }} />
              </ListItem>
              {/* eslint-disable-next-line react/prop-types */}
              {MuList.length !== 0 ? (
                filterData(MuList, searchText).map((elem) => (
                  <ListItem
                    key={elem.id}
                    onClick={() => dispatch(selectedMuFromListAction(elem))}
                    sx={{
                      '&:hover': { background: 'lightgrey', color: 'white', borderRadius: '5px' }
                    }}
                  >
                    <ListItemText primary={elem.id} />
                    <ListItemText primary={elem.mu_name} style={{ textAlign: 'right' }} />
                  </ListItem>
                ))
              ) : (
                <ListItem sx={{ marginTop: '10px' }}>
                  <ListItemText style={{ textAlign: 'center' }} primary={` No Data Available `} />
                </ListItem>
              )}
            </List>
          </Card>
        </Modal>
      </>
    </>
  );
};

export default SubModal;
