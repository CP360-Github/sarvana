import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { Button, Popover, TextField, Box, Typography, Divider } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { TimePicker, DesktopDatePicker } from '@material-ui/lab';
import { MIconButton } from '../../../components/@material-extend';
import { PostAgentDataGroupsValue } from '../../../api/AgentDataGroups';

const PopOverValues = ({ row, id }) => {
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreClicked, setMoreClicked] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const open = Boolean(anchorEl);

  const handleClickk = (event) => {
    setAnchorEl(event.currentTarget);
    setMoreClicked(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setValue('');
  };

  const handleSave = async () => {
    await PostAgentDataGroupsValue(moreClicked, value)
      .then(handleClose())
      .then(
        enqueueSnackbar('successfully Added Value', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );
  };

  useEffect(() => {
    console.log(moreClicked, 'moreClicked');
  }, [moreClicked]);

  const handleChange = (e) => {
    if ((moreClicked.datatype === 5 && /^[0-9\b]+$/.test(e.target.value)) || /^$/.test(e.target.value)) {
      setValue(e.target.value);
    } else if ((moreClicked.datatype === 4 && /^[0-9\b]+$/.test(e.target.value)) || /^$/.test(e.target.value)) {
      setValue(e.target.value);
    } else if (moreClicked.datatype === 2) {
      // Do nothing
    } else if (moreClicked.datatype === 1) {
      setValue(e.target.value);
    } else if (moreClicked.datatype === 7) {
      setValue('Ignoring for now!');
    }
  };

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClickk}
        size="small"
        endIcon={<KeyboardArrowDown />}
      >
        More
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 300, left: 1150 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        PaperProps={{
          style: { width: '300px', height: '220px' }
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Add Agent Data
        </Typography>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          {moreClicked?.datatype === 3 ? (
            <TimePicker
              label="Time"
              value={value}
              onChange={(e) => setValue(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : moreClicked?.datatype === 6 ? (
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={(e) => setValue(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            <TextField
              value={value}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              error={value === ''}
              helperText={value === '' ? 'Empty!' : ' '}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{ mr: 3 }} variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ mr: 3 }}
            disabled={value === '' || value === null || value === undefined}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default PopOverValues;

PopOverValues.propTypes = {
  row: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  id: PropTypes.object
};
