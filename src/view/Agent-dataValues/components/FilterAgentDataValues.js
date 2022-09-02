import React, { useState, useEffect } from 'react';
import {
  Card,
  Box,
  Typography,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Popover,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Checkbox
} from '@material-ui/core';

import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { MIconButton } from '../../../components/@material-extend';
import '../MainAgent.css';
import {
  MuDropDownGet,
  AdgsDropDownGet,
  MuSetsDropDownGet,
  AdgsMuSetDropDownGet,
  dashboardMuGet,
  dashboardMuSetGet
} from '../../../api/agent/AgentValuesMulti';
import {
  setAdgsDropDownList,
  setAdgsMuSetDropDownList,
  setChosenAdgId,
  setChosenMuId,
  setChosenMuMuSet,
  setDashboardMu,
  setGetMuDropDownList,
  setGetMuSetsDropDownList,
  setSelectedAgent,
  setValueAgentDataMu,
  setValueAgentDataMuSets,
  setValueMu,
  setValueMuSets
} from '../../../ReduxCreated/actions/Agent/AgentValuesMulti';
import AddValues from './AddValues';

const MainAgentDataValues = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const valueMu = useSelector((state) => state.agentValueMult.valueMu);
  const valueMuSets = useSelector((state) => state.agentValueMult.valueMuSets);
  const valueAgentDataMu = useSelector((state) => state.agentValueMult.valueAgentDataMu);
  const valueAgentDataMuSets = useSelector((state) => state.agentValueMult.valueAgentDataMuSets);
  console.log(valueMu, 'valueMu');
  /* DropDown Api useStates */
  const getMuDropDownList = useSelector((state) => state.agentValueMult.getMuDropDownList);
  const getAdgsDropDownList = useSelector((state) => state.agentValueMult.getAdgsDropDownList);
  const getMuSetsDropDownList = useSelector((state) => state.agentValueMult.getMuSetsDropDownList);
  const getAdgsMuSetDropDownList = useSelector((state) => state.agentValueMult.getAdgsMuSetDropDownList);
  const chosenMuMuSet = useSelector((state) => state.agentValueMult.chosenMuMuSet);
  const [date, setDate] = useState(new Date().toLocaleDateString().split('/').reverse().join('-'));
  const chosenMuId = useSelector((state) => state.agentValueMult.chosenMuId);
  const chosenAdgId = useSelector((state) => state.agentValueMult.chosenAdgId);
  /*  Store the changed Heading for MU/ MU Set */
  // filter
  const [filter, setFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  /* DropDowns onChange Functions */

  const mUOrMuSets = (e) => {
    if (e.target.value === 'MU') {
      setFilter(false);
      handleReset();
    } else {
      setFilter(true);
      getMuSetsDropDown();
      handleReset();
    }
  };

  const handleChangeMu = (event) => {
    dispatch(setValueMu(event.target.value));
    getAdgsDropDown(event.target.value.id);
    dispatch(setChosenMuId(event.target.value.id));
  };

  const handleChangeMuSets = (event) => {
    dispatch(setValueMuSets(event.target.value));
    getAdgsMuSetDropDown(event.target.value.id);
    dispatch(setChosenMuId(event.target.value.id));
  };

  const handleChangeAgentDataMu = (event) => {
    dispatch(setValueAgentDataMu(event.target.value));
    dispatch(setChosenAdgId(event.target.value));
  };

  const handleChangeAgentDataMuSets = (event) => {
    dispatch(setValueAgentDataMuSets(event.target.value));
    dispatch(setChosenAdgId(event.target.value));
  };

  /* Integrating Api for DropDowns */

  const getMuDropDown = async () => {
    await MuDropDownGet()
      .then((response) => dispatch(setGetMuDropDownList(response.data.results)))
      .catch((err) => {
        console.log(err);
      });
  };

  const getMuSetsDropDown = async () => {
    await MuSetsDropDownGet()
      .then((response) => {
        dispatch(setGetMuSetsDropDownList(response.data.results));
        console.log(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = () => {
    setDate(new Date().toLocaleDateString().split('/').reverse().join('-'));
    dispatch(setValueAgentDataMu(''));
    dispatch(setValueMu(''));
    dispatch(setChosenMuMuSet(''));
    dispatch(setAdgsDropDownList([]));
    dispatch(setAdgsMuSetDropDownList([]));
    dispatch(setChosenMuId(''));
    dispatch(setChosenAdgId(''));
  };

  const getAdgsDropDown = async (id) => {
    await AdgsDropDownGet(id)
      .then((response) => {
        console.log(response.data);
        dispatch(setAdgsDropDownList(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdgsMuSetDropDown = async (id) => {
    await AdgsMuSetDropDownGet(id)
      .then((response) => {
        console.log(response.data);
        dispatch(setAdgsMuSetDropDownList(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const muDash = useSelector((state) => state.agentValueMult.muDash);

  const getDashboard = async () => {
    if (!filter) {
      await dashboardMuGet(date, valueAgentDataMu, valueMu.id).then((response) => {
        dispatch(setDashboardMu(response.data));
      });
      dispatch(setChosenMuMuSet(valueMu.mu_name));
    } else {
      await dashboardMuSetGet(date, valueAgentDataMu, valueMuSets.id).then((response) => {
        dispatch(setDashboardMu(response.data));
      });
      dispatch(setChosenMuMuSet(valueMuSets.set_name));
    }
  };

  const handleApplyClicked = () => {
    getDashboard();
  };

  const [agentIdList, setAgentIdList] = useState([]);
  const handleViewValues = (id) => {
    navigate(`/dashboard/agents/agent-dataValues/view-skills/${id}`);
  };
  const handleMultipleSelect = (value) => {
    const currentIndex = agentIdList.indexOf(value?.int_agent);
    const newChecked = [...agentIdList];
    if (currentIndex === -1) {
      newChecked.push(value?.int_agent);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setAgentIdList(newChecked);
  };
  useEffect(() => {
    dispatch(setSelectedAgent(agentIdList));
    console.log(agentIdList);
  }, [agentIdList, dispatch]);

  const openfilter = Boolean(anchorEl);
  const id = openfilter ? 'simple-popover' : undefined;

  useEffect(() => {
    getMuDropDown();
    // eslint-disable-next-line
  }, []);

  console.log(getMuDropDownList, 'getMuDropDownList');

  return (
    <Card>
      <div style={{ padding: '0px 1rem' }} id="agentAvailabilitySection">
        <Box
          sx={{ height: '34px', mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ marginInline: '10px' }}>
            <ul>
              {chosenMuMuSet !== '' ? (
                <li>
                  <Typography variant="h6">{`MU: ${chosenMuMuSet}`}</Typography>
                </li>
              ) : (
                <li> </li>
              )}

              <li>
                <p>Agent Data Group </p>
              </li>
              <li>
                <p>Agent Value </p>
              </li>
            </ul>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <MIconButton title="Filter" aria-describedby={id} onClick={handleClick}>
              <Icon icon="bi:filter" />
            </MIconButton>
            <Popover
              id={id}
              open={openfilter}
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
                      onClick={handleReset}
                    >
                      Reset
                    </Typography>
                  </div>
                  <Icon icon="akar-icons:cross" cursor="pointer" onClick={handleClose} />
                </div>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <RadioGroup defaultValue="MU" row onChange={(e) => mUOrMuSets(e)}>
                        <FormControlLabel value="MU" control={<Radio size="small" />} label="MU" />
                        <FormControlLabel value="MU Sets" control={<Radio size="small" />} label="MU Sets" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                {!filter ? (
                  <>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel sx={{ fontSize: '11pt' }}>MU</InputLabel>
                          <Select variant="standard" value={valueMu} label="MU" onChange={handleChangeMu}>
                            {getMuDropDownList?.map((d, index) => (
                              <MenuItem key={index} value={d}>
                                {`${d.id}`} &nbsp; &nbsp; {`${d.mu_name}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel sx={{ fontSize: '11pt' }}>Agent Data</InputLabel>
                          <Select
                            variant="standard"
                            value={valueAgentDataMu}
                            label="Agent Data"
                            onChange={handleChangeAgentDataMu}
                          >
                            {getAdgsDropDownList?.map((d, index) => (
                              <MenuItem key={index} value={d.id}>
                                {`${d.id}`}
                                &nbsp; &nbsp;
                                {`${d.description}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel sx={{ fontSize: '11pt' }}>MU Sets</InputLabel>
                          <Select variant="standard" value={valueMuSets} label="MU Sets" onChange={handleChangeMuSets}>
                            {getMuSetsDropDownList?.map((d, index) => (
                              <MenuItem key={index} value={d}>
                                {`${d.id}`}
                                &nbsp; &nbsp;
                                {`${d.set_name}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel sx={{ fontSize: '11pt' }}>Agent Data</InputLabel>
                          <Select
                            variant="standard"
                            value={valueAgentDataMuSets}
                            label="Agent Data"
                            onChange={handleChangeAgentDataMuSets}
                          >
                            {getAdgsMuSetDropDownList?.map((d, index) => (
                              <MenuItem key={index} value={d.id}>
                                {`${d.id}`}
                                &nbsp; &nbsp;
                                {`${d.description}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
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
                <Button size="small" variant="outlined" color="primary" sx={{ mt: 3 }} onClick={handleApplyClicked}>
                  Apply
                </Button>
              </Box>
            </Popover>
            <AddValues chosenMuId={chosenMuId} chosenAdgId={chosenAdgId} setAgentIdList={setAgentIdList} />
          </div>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" />
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {muDash?.map((agentValue, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      edge="start"
                      checked={agentIdList.indexOf(agentValue?.int_agent) !== -1}
                      tabIndex={-1}
                      disableRipple
                      value={agentValue?.int_agent}
                      inputProps={{ 'aria-labelledby': `checkbox-list-label-${agentValue?.int_agent}` }}
                      onChange={() => handleMultipleSelect(agentValue)}
                    />
                  </TableCell>
                  <TableCell align="center">{agentValue?.int_agent}</TableCell>
                  <TableCell align="center">{agentValue?.str_agent_name}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewValues(agentValue?.int_agent)}>View Values</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
      </div>
    </Card>
  );
};

export default MainAgentDataValues;
