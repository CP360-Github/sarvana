import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Button,
  Popover,
  Grid,
  RadioGroup,
  Radio,
  TextField
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import { GetQueues } from '../../../api/Queue';
import { getContactTypes, GetManagementUnits, GetEnterpriseGroup } from '../../../api/EntitySet';
import { GetAssignmentHistory } from '../../../api/EnterPriseGroupAPI';
import {
  GetSelectedEntityAction,
  GetSelectedEntityNameAction,
  GetEntityHistoryAction
} from '../../../ReduxCreated/actions/EntityAssignment.action';
import { GetMemberHistory, GetUnassignEntity } from '../../../api/EntityAssignment';

const Filter = ({ setAssignOrMemberToken, pageType, setEntityType }) => {
  const dispatch = useDispatch();
  const entityType = useSelector((state) => state.EntityAssignment.selectedEntity);
  const [anchorEl, setAnchorEl] = useState(null);
  const [entityData, setEntityData] = useState([]);
  const [selectedEntityValueData, setSelectedEntityValueData] = useState('');
  const [assignOrMemberHistory, setAssignOrMemberHistory] = useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const entityList = useCallback(async () => {
    try {
      let results = [];
      if (entityType === 'EG') {
        const response = await GetEnterpriseGroup();
        results = response.data.results;
      }
      if (entityType === 'CT') {
        const response =
          pageType === 'assigned'
            ? await getContactTypes()
            : await GetUnassignEntity(entityType === 'Queue' ? 'Q' : entityType);
        results = pageType === 'assigned' ? response.data.results : response.data;
      }
      if (entityType === 'Queue') {
        const response =
          pageType === 'assigned'
            ? await GetQueues()
            : await GetUnassignEntity(entityType === 'Queue' ? 'Q' : entityType);
        results = pageType === 'assigned' ? response.data.results : response.data;
      }
      if (entityType === 'MU') {
        const response =
          pageType === 'assigned'
            ? await GetManagementUnits()
            : await GetUnassignEntity(entityType === 'Queue' ? 'Q' : entityType);
        results = pageType === 'assigned' ? response.data.results : response.data;
      }
      setEntityData(results);
    } catch (error) {
      console.log(error);
    }
  }, [entityType, pageType]);
  useEffect(() => {
    entityList();
  }, [entityType, entityList]);
  const resetFilter = () => {
    dispatch(GetSelectedEntityAction('EG'));
    setEntityData([]);
  };

  const applyFilter = async () => {
    try {
      if (setEntityType !== '') {
        setEntityType(entityType);
      }
      dispatch(GetSelectedEntityNameAction(selectedEntityValueData));
      const response =
        assignOrMemberHistory === 'Assigned'
          ? await GetAssignmentHistory(entityType === 'Queue' ? 'Q' : entityType, selectedEntityValueData.split('_')[0])
          : await GetMemberHistory(entityType === 'Queue' ? 'Q' : entityType, selectedEntityValueData.split('_')[0]);

      if (assignOrMemberHistory !== 'Assigned') {
        dispatch(GetEntityHistoryAction(response.data.member_history));
      } else {
        dispatch(GetEntityHistoryAction(response.data));
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setAssignOrMemberHistory(entityType === 'EG' ? 'Member' : 'Assigned');
  }, [entityType]);

  useEffect(() => {
    setAssignOrMemberToken(assignOrMemberHistory);
  }, [assignOrMemberHistory, setAssignOrMemberToken]);

  useEffect(() => {
    dispatch(GetSelectedEntityAction(pageType === 'assigned' ? 'EG' : 'CT'));
  }, [dispatch, pageType]);
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
                  defaultValue="Un-assigned History"
                  row
                  value={assignOrMemberHistory}
                  onChange={(e) => setAssignOrMemberHistory(e.target.value)}
                >
                  <FormControlLabel
                    value="Assigned"
                    disabled={entityType === 'EG'}
                    control={<Radio size="small" />}
                    label="Assigned History"
                  />
                  <FormControlLabel
                    disabled={!(entityType === 'CT' || entityType === 'EG')}
                    value="Member"
                    control={<Radio size="small" />}
                    label="Member History"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '11pt' }}>Entity</InputLabel>
                <Select
                  label="Entity"
                  variant="standard"
                  value={entityType}
                  onChange={(e) => dispatch(GetSelectedEntityAction(e.target.value))}
                >
                  {pageType === 'assigned' && <MenuItem value="EG">EGs</MenuItem>}
                  <MenuItem value="CT">CTs</MenuItem>
                  <MenuItem value="Queue">Queues</MenuItem>
                  <MenuItem value="MU">MUs</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '11pt' }}>{`${entityType}s Value`}</InputLabel>
                <Select
                  label={`${entityType}s Value`}
                  variant="standard"
                  onChange={(e) => setSelectedEntityValueData(e.target.value)}
                  value={selectedEntityValueData}
                >
                  {entityData.map((val) => (
                    <MenuItem
                      key={val.id}
                      value={`${val.id}_${
                        val.eg_name !== undefined
                          ? val.eg_name
                          : val.queue_name !== undefined
                          ? val.queue_name
                          : val.ct_name !== undefined
                          ? val.ct_name
                          : val.mu_name
                      }`}
                    >
                      {`${val.eg_name !== undefined ? val.eg_name : ''}`}
                      {`${val.queue_name !== undefined ? val.queue_name : ''}`}
                      {`${val.ct_name !== undefined ? val.ct_name : ''}`}
                      {`${val.mu_name !== undefined ? val.mu_name : ''}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} mt={2}>
              <TextField
                label="Date Range"
                variant="standard"
                type="date"
                value={new Date().toLocaleDateString().split('/').reverse().join('-')}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '100%' }}
                size="small"
              />
            </Grid>
          </Grid>
          <Button size="small" variant="outlined" color="primary" sx={{ mt: 3 }} onClick={() => applyFilter()}>
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
  setAssignOrMemberToken: PropTypes.func,
  pageType: PropTypes.string,
  setEntityType: PropTypes.func
};
