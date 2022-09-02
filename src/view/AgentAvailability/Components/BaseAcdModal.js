import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Card, Box, Typography, Divider, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { Icon } from '@iconify/react';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import cross from '@iconify/icons-eva/close-outline';
import { MIconButton } from '../../../components/@material-extend';
import { GetACD } from '../../../api/agent/AgentAvailability';

const BaseAcdModal = ({ modalHeading, setSelectedBsc }) => {
  const [dataList, setDataList] = useState('');
  const [searchText, setSearchText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
    getData();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
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

  const getData = async () => {
    try {
      const result = await GetACD();
      if (result.status === 200) {
        setDataList(result.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.entity_set_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  return (
    <>
      <MIconButton style={{ width: '40px', height: '40px' }} onClick={handleOpenModal}>
        <Icon icon={moreHorizontalFill} width={20} height={20} />
      </MIconButton>

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
              <ListItemText primary={` Icon `} />
              <ListItemText primary={` Name `} style={{ textAlign: 'right' }} />
            </ListItem>
            {/* eslint-disable-next-line react/prop-types */}
            {dataList.length !== 0 ? (
              filterData(dataList, searchText).map((elem) => (
                <ListItem
                  key={elem.id}
                  onClick={() => {
                    setSelectedBsc(elem);
                    handleCloseModal();
                  }}
                  sx={{
                    '&:hover': { background: 'lightgrey', borderRadius: '5px' }
                  }}
                >
                  <Icon icon={elem.icon} width="30px" />

                  <ListItemText primary={elem.description} style={{ textAlign: 'right' }} />
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
  );
};

export default BaseAcdModal;

BaseAcdModal.propTypes = {
  modalHeading: PropTypes.string,
  setSelectedBsc: PropTypes.func
};
