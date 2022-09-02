import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Button,
  Popover,
  Grid,
  RadioGroup,
  Radio
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import { GetManagementUnits } from '../../../api/EntitySet';
import {
  SelectedMuAction,
  SelectedMuOrTog,
  GetAgentListAction,
  GetMUListAction
} from '../../../ReduxCreated/actions/Agent/MoveAgents.action';
import { GetAgentsAccordingToMu } from '../../../api/agent/MoveAgents';

const Filter = ({ page, setVolatile }) => {
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const [managementUnits, setManagementUnits] = useState([]);
  const selectedMu = useSelector((state) => state.MoveAgents.selectedMu);
  const muOrTogSet = useSelector((state) => state.MoveAgents.MuOrTogToken);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const runFilter = () => {
    geAgentsList(1);
    handleClose();
  };

  const resetFilter = () => {
    setDate('');
    dispatch(SelectedMuOrTog('MU'));
    dispatch(SelectedMuAction({}));
    dispatch(GetAgentListAction([]));
  };

  useEffect(() => {
    getManagementUnits(muOrTogSet);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muOrTogSet]);

  const getManagementUnits = async (token) => {
    try {
      setManagementUnits([]);
      const result = token === 'MU' ? await GetManagementUnits() : '';
      if (result.status === 200) {
        dispatch(GetMUListAction(result.data.results));
        setManagementUnits(result.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const geAgentsList = useCallback(
    async (pageNum) => {
      try {
        const result = await GetAgentsAccordingToMu(selectedMu.id, pageNum, date);
        if (result.status === 200) {
          dispatch(GetAgentListAction(result.data.results));
          setVolatile(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [date, dispatch, selectedMu.id, setVolatile]
  );

  useEffect(() => {
    if (page !== '') {
      geAgentsList(page);
    }
  }, [geAgentsList, page]);
  return (
    <div>
      {/* Filter Popup Design start */}
      <MIconButton title="Filter" aria-describedby={id} onClick={handleClick}>
        <Icon icon="bi:filter" />
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
        <Box sx={{ width: '400px', padding: '25px' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Typography paragraph sx={{ fontSize: '13pt' }}>
                Filter
              </Typography>
              <Typography paragraph color="primary" sx={{ fontSize: '13pt', cursor: 'pointer' }} onClick={resetFilter}>
                Reset
              </Typography>
            </div>
            <Icon icon="akar-icons:cross" cursor="pointer" onClick={handleClose} />
          </div>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <RadioGroup
                  defaultValue="MU"
                  value={muOrTogSet}
                  row
                  onChange={(e) => {
                    dispatch(SelectedMuOrTog(e.target.value));
                    dispatch(GetAgentListAction([]));
                  }}
                >
                  <FormControlLabel value="MU" control={<Radio size="small" />} label="MU" />
                  <FormControlLabel value="TOGs" control={<Radio size="small" />} label="TOGs" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '11pt' }}>{muOrTogSet}</InputLabel>
                <Select
                  label={muOrTogSet}
                  variant="standard"
                  value={selectedMu}
                  onChange={(e) => dispatch(SelectedMuAction(e.target.value))}
                >
                  {managementUnits.map((val) => (
                    <MenuItem key={val.id} value={val}>
                      {`${val.id}`}
                      &nbsp; &nbsp;
                      {`${val.mu_name !== undefined ? val.mu_name : ''}
                  ${val.set_name !== undefined ? val.set_name : ''}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} sx={{ mt: 2 }}>
              <TextField
                label="Date Range"
                variant="standard"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '100%' }}
                size="small"
              />
            </Grid>
          </Grid>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => (Object.keys(selectedMu).length !== 0 ? runFilter() : '')}
          >
            Apply
          </Button>
        </Box>
      </Popover>
      {/* Filter Popup Design End */}
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  page: PropTypes.number,
  setVolatile: PropTypes.func
};
