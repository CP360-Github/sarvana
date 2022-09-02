import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import cross from '@iconify/icons-eva/close-outline';
import {
  Box,
  Card,
  Divider,
  Typography,
  TextField,
  Modal,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { GetEnterpriseGroupIdData } from '../../api/EnterPriseGroupAPI';

const RestoreView = ({ setOpen, open, rowRestore }) => {
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
  const [showData, setShowData] = useState(['h']);

  const handleClose = () => setOpen(false);
  const getEnterpriseGroupData = async (rowRestore) => {
    await GetEnterpriseGroupIdData(rowRestore.id)
      .then((response) => setShowData(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (open === true) {
      getEnterpriseGroupData(rowRestore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
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
              <FormControl sx={{ width: 430 }} variant="outlined">
                <InputLabel style={{ background: 'white' }}>Week First Day</InputLabel>
                <Select
                  labelId="Week First Day"
                  id="Week First Day"
                  value={showData?.week_first_day || ''}
                  label="Week First Day"
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
            </Box>
          </Stack>
        </Card>
      </Modal>
    </>
  );
};
export default RestoreView;

RestoreView.propTypes = {
  rowRestore: PropTypes.object,
  setOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};
