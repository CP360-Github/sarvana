import React, { useState } from 'react';
import { Modal, Card, Box, Typography, Divider, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { Icon } from '@iconify/react';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import cross from '@iconify/icons-eva/close-outline';
import { MIconButton } from '../../../components/@material-extend';

const SubModal = (props) => {
  const [searchText, setSearchText] = useState('');

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

  // eslint-disable-next-line react/prop-types
  const { handleOpenModal, openModal, handleCloseModal, filterData, dataList, setValueAndToggleModal, modalHeading } =
    props;
  return (
    <>
      <>
        <MIconButton style={{ width: '50px', height: '50px' }} onClick={handleOpenModal}>
          <Icon icon={moreHorizontalFill} width={20} height={20} />
        </MIconButton>
      </>
      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Card sx={style}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h5">
                {modalHeading}
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
              {dataList.length !== 0 ? (
                filterData(dataList, searchText).map((elem) => (
                  <ListItem
                    key={elem.id}
                    onClick={() => setValueAndToggleModal(elem)}
                    sx={{
                      '&:hover': { background: 'gray', color: 'white', borderRadius: '5px' }
                    }}
                  >
                    <ListItemText primary={elem.id} />
                    <ListItemText
                      primary={
                        modalHeading === 'Select Acd'
                          ? elem.param_name
                          : modalHeading === 'Select Contact Type'
                          ? elem.ct_name
                          : modalHeading === 'Select Entity Set'
                          ? elem.set_name
                          : modalHeading === 'Select Enterprise Group'
                          ? elem.eg_name
                          : elem.queue_name
                      }
                      style={{ textAlign: 'right' }}
                    />
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
