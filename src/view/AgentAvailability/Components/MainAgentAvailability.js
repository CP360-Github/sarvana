import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
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
  Radio,
  Checkbox
} from '@material-ui/core';
import editFill from '@iconify/icons-eva/edit-fill';
import '../AgentAvailability.css';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MIconButton } from '../../../components/@material-extend';
import { GetManagementUnits, GetEntitySet } from '../../../api/EntitySet';
// import { PaginationA } from '../../../sharedComponents/Pagination';
import {
  GetAgentsDataGroupMu,
  GetAgentGroupDataMuSet,
  GetAgentDataValueMu,
  GetAgentsForFilter
} from '../../../api/agent/AgentAvailability';
import DateRangeAdd from './DateRangeAdd';
import {
  GetAgentListAction,
  SelectedMuAction,
  SelectedAgentIdListAction,
  SelectedMuOrMuSet
} from '../../../ReduxCreated/actions/Agent/AgentAvailability.action';
import CopyFromAgentWorkRule from './CopyFromAgentWorkRule';

const MainAgentAvailability = () => {
  const navigate = useNavigate();
  // const [volatile, setVolatile] = useState('');
  // const [page, setPage] = useState('');
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [date, setDate] = useState('');
  const agentListSelector = useSelector((state) => state.AgentAvailability.agentList);
  const selectedMu = useSelector((state) => state.AgentAvailability.selectedMu);
  const muOrMuSet = useSelector((state) => state.AgentAvailability.MuOrSetToken);
  // states
  const [managementUnits, setManagementUnits] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [agentDataListValue, setAgentDataValueList] = useState([]);
  const [agentDataGroupList, setAgentDataGroupList] = useState([]);
  const [agentSingleName, setAgentSingleName] = useState('');
  const [agentIdList, setAgentIdList] = useState([]);
  const [selectedAgentDataGroup, setSelectedAgentDataGroup] = useState({});
  const [selectedMuForTable, setSelectedMuForTable] = useState({});
  const [selectedAgentDataGroupValue, setSelectedAgentDataGroupValue] = useState('');
  // const [dateStartRange, setDateStartRange] = useState('');
  // const [dateEndRange, setDateEndRange] = useState('');
  useEffect(() => {
    getManagementUnitsSets(muOrMuSet);
  }, [muOrMuSet]);
  const getManagementUnitsSets = async (token) => {
    try {
      const result = token === 'MU' ? await GetManagementUnits() : await GetEntitySet(2);
      if (result.status === 200) {
        setManagementUnits(result.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleChange = (event, value) => {
  //   // setPage(value);
  // };
  useEffect(() => {
    setAgentData(agentListSelector);
    setSelectedMuForTable(selectedMu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentListSelector]);

  useEffect(() => {
    if (Object.keys(selectedMu).length !== 0) {
      geAgentsDataGroup(selectedMu);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMu]);

  const geAgentsDataGroup = async (muData) => {
    try {
      const result =
        muData.mu_name !== undefined ? await GetAgentsDataGroupMu(muData.id) : await GetAgentGroupDataMuSet(muData.id);
      if (result.status === 200) {
        setAgentDataGroupList(result.data);
      }
    } catch (error) {
      const errorMsg = error.response.data?.detail;
      enqueueSnackbar(errorMsg === 'Not found.' ? 'Agent data group not found for selected mu sets' : '', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  useEffect(() => {
    if (selectedMu !== '' && selectedAgentDataGroup?.id !== undefined) {
      geAgentsDataValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMu, selectedAgentDataGroup]);
  const geAgentsDataValue = async () => {
    try {
      const result =
        selectedMu.mu_name !== undefined ? await GetAgentDataValueMu(selectedAgentDataGroup.id, selectedMu.id) : '';
      if (result.status === 200) {
        setAgentDataValueList(result.data);
      }
    } catch (error) {
      const errorMsg = error.response.data?.detail;
      enqueueSnackbar(errorMsg === 'Not found.' ? 'Agent data group not found for selected mu sets' : '', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };
  const geAgentsList = useCallback(async () => {
    try {
      const result =
        muOrMuSet === 'MU'
          ? await GetAgentsForFilter(
              selectedMu.id,
              '',
              selectedAgentDataGroup?.id !== undefined ? selectedAgentDataGroup?.id : '',
              selectedAgentDataGroupValue,
              date
            )
          : await GetAgentsForFilter(
              '',
              selectedMu.id,
              selectedAgentDataGroup?.id !== undefined ? selectedAgentDataGroup?.id : '',
              selectedAgentDataGroupValue,
              date
            );
      if (result.status === 200) {
        // setVolatile(result.data);
        // dispatch(GetAgentListAction(result.data.results));
        dispatch(GetAgentListAction(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [muOrMuSet, selectedMu.id, selectedAgentDataGroup?.id, selectedAgentDataGroupValue, date, dispatch]);

  // useEffect(() => {
  //   if (page !== '') {
  //     geAgentsList(page);
  //   }
  // }, [geAgentsList, page]);

  const runFilter = () => {
    // geAgentsList(1);
    geAgentsList();
    handleClose();
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleMultipleSelect = (value) => {
    const currentIndex = agentIdList.indexOf(value.agent?.id);
    const newChecked = [...agentIdList];
    if (currentIndex === -1) {
      newChecked.push(value.agent?.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    // console.log(value);
    setAgentSingleName(`${value.agent?.first_name} ${' '} ${value.agent?.last_name}`);
    setAgentIdList(newChecked);
  };
  useEffect(() => {
    dispatch(SelectedAgentIdListAction(agentIdList));
  }, [agentIdList, dispatch]);

  const resetFilter = () => {
    setDate('');
    setSelectedAgentDataGroup({});
    dispatch(SelectedMuOrMuSet('MU'));
    dispatch(SelectedMuAction({}));
    setSelectedAgentDataGroup({});
    setAgentData([]);
  };

  const redirectToWorkRule = () => {
    navigate('/dashboard/agents/agent-workrule-availability');
  };
  return (
    <Card>
      <div style={{ padding: '0px 1rem' }} id="agentAvailabilitySection">
        <Box
          sx={{ height: '34px', mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <ul>
            {Object.keys(selectedMuForTable).length !== 0 ? (
              <li>
                <Typography variant="h5">
                  {`MU  :  ${selectedMuForTable.mu_name !== undefined ? selectedMuForTable.mu_name : ''} ${
                    selectedMuForTable.set_name !== undefined ? selectedMuForTable.set_name : ''
                  }`}
                </Typography>
              </li>
            ) : (
              <li> </li>
            )}
            <li>
              <p>Agent Data Group </p>
            </li>
            <li>
              <p> Agent Value </p>
            </li>
          </ul>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <CopyFromAgentWorkRule agentName={agentSingleName} setAgentIdList={setAgentIdList} />
            <DateRangeAdd modalType="add" agentName={agentSingleName} setAgentIdList={setAgentIdList} />
            <DateRangeAdd modalType="edit" agentName={agentSingleName} setAgentIdList={setAgentIdList} />
            <DateRangeAdd modalType="remove" agentName={agentSingleName} setAgentIdList={setAgentIdList} />
            <MIconButton sx={{ backgroundColor: 'rgba(99, 115, 129, 0.08)' }} title="Export">
              <Icon icon="clarity:export-solid" width={20} height={20} />
            </MIconButton>
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
                    <Typography
                      paragraph
                      color="primary"
                      sx={{ fontSize: '13pt', cursor: 'pointer' }}
                      onClick={resetFilter}
                    >
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
                        value={muOrMuSet}
                        row
                        onChange={(e) => dispatch(SelectedMuOrMuSet(e.target.value))}
                      >
                        <FormControlLabel value="MU" control={<Radio size="small" />} label="MU" />
                        <FormControlLabel value="MU Sets" control={<Radio size="small" />} label="MU Sets" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ fontSize: '11pt' }}>{muOrMuSet}</InputLabel>
                      <Select
                        label={muOrMuSet}
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
                  <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ fontSize: '11pt' }}>Agent Data Group</InputLabel>
                      <Select
                        size="small"
                        label="Agent Data Group"
                        variant="standard"
                        value={Object.keys(selectedAgentDataGroup).length !== 0 ? selectedAgentDataGroup : ''}
                        onChange={(e) => setSelectedAgentDataGroup(e.target.value)}
                      >
                        {agentDataGroupList.length !== 0 ? (
                          agentDataGroupList.map((val) => (
                            <MenuItem key={val.id} value={val}>
                              {`${val.id}`}
                              &nbsp; &nbsp;
                              {`${val.description}`}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Records Found</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ fontSize: '11pt' }}>Agent Data Value</InputLabel>
                      <Select
                        size="small"
                        label="Agent Data Value"
                        variant="standard"
                        value={selectedAgentDataGroupValue}
                        onChange={(e) => setSelectedAgentDataGroupValue(e.target.value)}
                      >
                        {agentDataListValue.length !== 0 ? (
                          agentDataListValue.map((val) => (
                            <MenuItem key={val.id} value={val.id}>
                              {`${val.id}`}
                              &nbsp; &nbsp;
                              {`${val.adg_value}`}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>No Records Found</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                    <TextField
                      label="Date Range"
                      variant="standard"
                      type="date"
                      // value={date !== '' ? date : new Date().toLocaleDateString().split('/').reverse().join('-')}
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
        </Box>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                {' '}
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                ID
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Name
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Date Range
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Status
              </TableCell>
              <TableCell colSpan={2} align="center">
                Modified
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                {' '}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" style={{ boxShadow: 'none' }}>
                By
              </TableCell>
              <TableCell align="center" style={{ boxShadow: 'none' }}>
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agentData.length !== 0 ? (
              agentData?.map((agentValue) => (
                <TableRow key={agentValue.agent?.id}>
                  <TableCell align="center">
                    <Checkbox
                      edge="start"
                      checked={agentIdList.indexOf(agentValue.agent?.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      value={agentValue.id}
                      inputProps={{ 'aria-labelledby': `checkbox-list-label-${agentValue.agent?.id}` }}
                      onChange={() => handleMultipleSelect(agentValue)}
                    />
                  </TableCell>
                  <TableCell align="center">{agentValue.agent?.id}</TableCell>
                  <TableCell align="center">{`${agentValue.agent?.first_name}   ${agentValue.agent?.last_name}`}</TableCell>
                  <TableCell align="center">
                    {agentValue.date_start} - {agentValue.date_end}
                  </TableCell>
                  <TableCell align="center"> {agentValue.status} </TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center">
                    <MIconButton>
                      <Icon onClick={() => redirectToWorkRule()} icon={editFill} width={20} height={20} />
                    </MIconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan="7">
                  No Records Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* {agentData.length !== 0 ? <PaginationA volatile={volatile} handleChange={handleChange} /> : ''} */}
      </TableContainer>
      <Divider />
    </Card>
  );
};

export default MainAgentAvailability;
