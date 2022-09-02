import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Popover,
  Grid,
  Button
} from '@material-ui/core';
import { closeFill } from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import { AdgsValueDropDownGet, HandleAdd } from '../../../api/agent/AgentValuesMulti';

const AddValues = ({ chosenMuId, chosenAdgId, setAgentIdList }) => {
  const [anchorEll, setAnchorEll] = useState(null);
  const [addValue, setAddValue] = useState('');
  const [dateVlu, setDateVlu] = useState(new Date().toLocaleDateString().split('/').reverse().join('-'));
  const [dropDownVlu, setDropDownVlu] = useState([]);
  const handleClickk = (event) => {
    setAnchorEll(event.currentTarget);
    getMuDropDownValues();
  };

  const handleClosee = () => {
    setAnchorEll(null);
  };
  const adgId = useSelector((state) => state.agentValueMult.adgId);
  console.log(adgId);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getMuDropDownValues = async () => {
    await AdgsValueDropDownGet(chosenAdgId, chosenMuId).then((response) => {
      setDropDownVlu(response.data);
    });
  };
  const handleAdd = async () => {
    if (chosenAdgId) {
      try {
        await HandleAdd(adgId, dateVlu, addValue, chosenAdgId);
        enqueueSnackbar('Value Added Successfully!', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        setAgentIdList([]);
        handleClosee();
      } catch (error) {
        console.log(error.response);
        enqueueSnackbar('Value Not Added Successfully!', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    } else {
      enqueueSnackbar('Need to select Agent Data Group in filter', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };
  const openAddValues = Boolean(anchorEll);
  const idd = openAddValues ? 'simple-popover' : undefined;
  return (
    <div>
      <MIconButton title="Add Value" aria-describedby={idd} onClick={handleClickk}>
        <Icon icon="bx:add-to-queue" />
      </MIconButton>
      <Popover
        id={idd}
        open={openAddValues}
        anchorEl={anchorEll}
        onClose={handleClosee}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ width: '400px', padding: '25px' }}>
          <Typography
            paragraph
            sx={{
              fontSize: '13pt',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            Add Value
          </Typography>

          {chosenAdgId ? (
            <Typography>{adgId?.length} agent are added</Typography>
          ) : (
            <Typography style={{ color: 'red' }}>Need to select Agent Data Group in filter</Typography>
          )}
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Add Value</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addValue}
                  label="Add Value"
                  variant="standard"
                  style={{ fontSize: '13px' }}
                  onChange={(e) => {
                    setAddValue(e.target.value);
                  }}
                >
                  {dropDownVlu?.map((d, index) => (
                    <MenuItem key={index} value={d?.id}>
                      {d?.adg_value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: 1 }}>
              <TextField
                label="Start Date"
                variant="standard"
                type="date"
                value={dateVlu}
                onChange={(e) => setDateVlu(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '100%' }}
                size="small"
              />
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ display: 'flex', float: 'right', m: 2 }} onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default AddValues;

AddValues.propTypes = {
  chosenMuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chosenAdgId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setAgentIdList: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};
