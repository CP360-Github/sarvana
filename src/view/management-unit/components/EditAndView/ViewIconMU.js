import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Typography, Modal, Card, Divider, Box, TextField, Stack } from '@material-ui/core';
import cross from '@iconify/icons-eva/close-outline';
import view from '@iconify/icons-eva/eye-fill';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../../../components/@material-extend';
import { GetViewManagementUnit } from '../../../../api/ManagementUnitAPI';

const ViewIconMU = ({ row }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: `80vh`,
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
    overflow: `scroll`
  };

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const [details, setDetails] = useState(['h']);
  const [openModal, setOpenModal] = useState(false);
  const handleViewIcon = () => {
    viewDetails();
    setOpenModal(true);
    console.log(row, 'row');
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const viewDetails = async () => {
    console.log(row?.id, 'row?.id');
    try {
      await GetViewManagementUnit(row?.id).then((response) => {
        setDetails(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWeekDay = (day) => {
    const weekday =
      day === 1
        ? 'Sunday'
        : day === 2
        ? 'Monday'
        : day === 3
        ? 'Tuesday'
        : day === 4
        ? 'Wednesday'
        : day === 5
        ? 'Thursday'
        : day === 6
        ? 'Friday'
        : day === 7
        ? 'Saturday'
        : '';
    return weekday || '';
  };

  return (
    <div>
      <MIconButton onClick={handleViewIcon} size="large">
        <Icon icon={view} width={20} height={20} />
      </MIconButton>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Card sx={style}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h5">
              Management Unit
            </Typography>
            <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
          </Box>
          <Divider />

          <Stack spacing={2}>
            <Box>
              <TextField
                sx={{ mt: 2, width: '100%' }}
                name="ID"
                label="ID"
                variant="outlined"
                value={details?.id || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                sx={{ mt: 2, width: '100%' }}
                name="Name"
                label="Name"
                variant="outlined"
                value={details?.mu_name || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                sx={{ mt: 2, width: '100%' }}
                name="createdBy"
                label="Created By"
                variant="outlined"
                value={details?.created_by?.username || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>

            <Box>
              <TextField
                sx={{ mt: 2, width: '100%' }}
                name="TimeZone"
                label="TimeZone"
                variant="outlined"
                value={details?.timezone?.timezone_name || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                sx={{ mt: 2, width: '100%' }}
                label="Time Assigned"
                variant="outlined"
                value={new Date(details?.time_assigned).toLocaleDateString('en-US', options) || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                sx={{ mt: 2, width: '100%' }}
                label="Assigned to"
                variant="outlined"
                value={details?.enterprise_grp?.eg_name || ''}
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                sx={{ mt: 2, width: '100%' }}
                label="Week First Day"
                variant="outlined"
                value={handleWeekDay(details?.week_first_day)}
                inputProps={{ readOnly: true }}
              />
            </Box>
          </Stack>
        </Card>
      </Modal>
    </div>
  );
};

export default ViewIconMU;

ViewIconMU.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
