import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import { Box, Popover, Button, TextField, Typography, Divider, FormControl } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';

const CopyFromAgentWorkRule = memo(({ agentName, setAgentIdList }) => {
  const agentIdList = useSelector((state) => state.AgentAvailability.agentIdList);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // formik.resetForm();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <MIconButton
        title="Copy From"
        disabled={agentIdList !== undefined ? agentIdList.length === 0 : true}
        sx={{ backgroundColor: 'rgba(99, 115, 129, 0.08)' }}
        onClick={handleClick}
      >
        <Icon icon="fluent:copy-arrow-right-24-regular" />
      </MIconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        {/* <Formik value={formik}> */}
        <Box sx={{ width: '400px', padding: '25px' }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h6">
              Agent Work Rule
            </Typography>
            <Icon icon="ep:close-bold" onClick={handleClose} color="grey" cursor="pointer" />
          </Box>
          <Divider />
          <div style={{ display: 'flex', gap: '10px', marginBlock: '20px' }}>
            <Typography variant="h6">
              {agentIdList?.length === 1 ? `Agent : ${agentName}` : `${agentIdList?.length}  Agents  Selected`}
            </Typography>
          </div>
          <Box sx={{ mt: '20px', display: 'flex' }}>
            <FormControl fullWidth size="small">
              <TextField size="small" label="Copy From" variant="outlined" />
            </FormControl>
            <MIconButton style={{ width: '40px', height: '40px' }}>
              <Icon icon={moreHorizontalFill} width={20} height={20} />
            </MIconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained" color="warning">
              Cancel
            </Button>
            <Button variant="contained">Apply</Button>
          </Box>
        </Box>
        {/* </Formik> */}
      </Popover>
    </div>
  );
});

export default CopyFromAgentWorkRule;

CopyFromAgentWorkRule.propTypes = {
  agentName: PropTypes.string,
  setAgentIdList: PropTypes.func
};
