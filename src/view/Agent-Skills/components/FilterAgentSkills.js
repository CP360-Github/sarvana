import React, { useState, useEffect } from 'react';
import {
  Card,
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
  Radio
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { MIconButton } from '../../../components/@material-extend';
import '../AgentSkills.css';
import {
  MuDropDownGet,
  MuSetsDropDownGet,
  AdgsDropDownGet,
  AdgsMuSetDropDownGet,
  AdgsValueDropDownGet,
  MuDashboard,
  AdgsValueDropDownGetMuSet
} from '../../../api/agent/AgentSkills';
import AddSkillAgent from './AddSkillAgent';
import MainAgentSkills from './MainAgentSkills';
import { setApplyData } from '../../../ReduxCreated/actions/Agent/AgentSkill';

const FilterAgentSkills = () => {
  const dispatch = useDispatch();
  const [agentIdList, setAgentIdList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [valueMu, setValueMu] = useState('');
  const [valueMuSets, setValueMuSets] = useState('');
  const [valueAgentDataMu, setValueAgentDataMu] = useState('');
  const [agentDataValues, setAgentDataValues] = useState('');
  const [valueAgentDataMuSets, setValueAgentDataMuSets] = useState('');
  /* DropDown Api useStates */
  const [getMuDropDownList, setGetMuDropDownList] = useState();
  const [getMuSetsDropDownList, setGetMuSetsDropDownList] = useState();
  const [getAdgsDropDownList, setAdgsDropDownList] = useState([]);
  const [getAdgsMuSetDropDownList, setAdgsMuSetDropDownList] = useState([]);
  const [getAdgsValues, setGetAdgsValues] = useState([]);
  const [getAdgsValuesMuSet, setGetAdgsValuesMuSet] = useState([]);
  const [getAgentValuesMuSet, setAgentDataValuesMuSet] = useState([]);

  /*  Store the changed Heading for MU/ MU Set */
  const [chosenMuMuSet, setChosenMuMuSet] = useState('');
  /* DropDowns onChange Functions */

  const mUOrMuSets = (e) => {
    if (e.target.value === 'MU') {
      setFilter(false);
    } else {
      setFilter(true);
    }
  };

  const handleChangeMu = (event) => {
    setValueMu(event.target.value);
    getAdgsDropDown(event.target.value.id);
  };

  const handleChangeMuSets = (event) => {
    setValueMuSets(event.target.value);
    getAdgsMuSetDropDown(event.target.value.id);

    console.log(event.target.value.id, 'hello');
  };

  const handleChangeAgentDataMu = (event) => {
    setValueAgentDataMu(event.target.value);
    console.log(valueMu, 'valueMu');
    getAdgsValuesData(event.target.value, valueMu.id);
    console.log(event.target.value);
  };

  const handleChangeAgentDataMuSets = (event) => {
    setValueAgentDataMuSets(event.target.value);
    console.log(event.target.value, 'hello');
    getAdgsValuesDataMuSet(event.target.value, valueMuSets.id);
  };

  /* Integrating Api for DropDowns */

  const getMuDropDown = async () => {
    await MuDropDownGet()
      .then((response) => setGetMuDropDownList(response.data.results))
      .catch((err) => {
        console.log(err);
      });
  };

  const getMuSetsDropDown = async () => {
    await MuSetsDropDownGet()
      .then((response) => {
        setGetMuSetsDropDownList(response.data.results);
        console.log(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdgsDropDown = async (id) => {
    await AdgsDropDownGet(id)
      .then((response) => {
        console.log(response.data);
        setAdgsDropDownList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdgsMuSetDropDown = async (id) => {
    await AdgsMuSetDropDownGet(id)
      .then((response) => {
        setAdgsMuSetDropDownList(response.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // Agent Data Values

  const handleChangeAdgValues = (event) => {
    setAgentDataValues(event.target.value);
    console.log(event.target.value);
  };

  const getAdgsValuesData = async (adgId, muId) => {
    await AdgsValueDropDownGet(adgId, muId)
      .then((response) => {
        console.log(response.data);
        setGetAdgsValues(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeAdgValuesMuSet = (event) => {
    setAgentDataValuesMuSet(event.target.value);
  };

  const getAdgsValuesDataMuSet = async (adgId, muSetId) => {
    console.log(adgId, muSetId);
    await AdgsValueDropDownGetMuSet(adgId, muSetId)
      .then((response) => {
        console.log(response.data);
        setGetAdgsValuesMuSet(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApply = async () => {
    if (!filter) {
      setChosenMuMuSet(valueMu.mu_name);
      await MuDashboard(valueMu?.id, valueAgentDataMu, agentDataValues).then((response) => {
        dispatch(setApplyData(response.data));
      });
    } else {
      setChosenMuMuSet(valueMuSets.set_name);
      await MuDashboard(valueMuSets?.id, valueAgentDataMuSets, getAgentValuesMuSet).then((response) => {
        dispatch(setApplyData(response.data));
      });
    }
  };
  const handleReset = () => {
    setValueMu('');
    setValueMuSets('');
    setChosenMuMuSet('');
    setAdgsDropDownList([]);
    setAdgsMuSetDropDownList([]);
    setValueAgentDataMu('');
    setGetAdgsValuesMuSet([]);
    setAgentDataValuesMuSet([]);
    setAgentDataValues('');
    setValueAgentDataMuSets('');
  };

  useEffect(() => {
    if (!filter) {
      getMuDropDown();
      handleReset();
    } else {
      getMuSetsDropDown();
      handleReset();
    }
  }, [filter]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openFilter = Boolean(anchorEl);
  const id = openFilter ? 'simple-popover' : undefined;
  return (
    <>
      <Card>
        <div style={{ padding: '0px 1rem' }} id="agentAvailabilitySection">
          <Box
            sx={{
              height: '34px',
              mb: 3,
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
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
              <AddSkillAgent agentIdList={agentIdList} setFilter={setFilter} setAgentIdList={setAgentIdList} />
              <Popover
                id={id}
                open={openFilter}
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
                            <Select
                              variant="standard"
                              defaultValue=""
                              value={valueMu}
                              label="MU"
                              onChange={handleChangeMu}
                            >
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
                              label="Agent Data Group"
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
                      <Grid container spacing={1} sx={{ mt: 1 }}>
                        <>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                              <InputLabel sx={{ fontSize: '11pt' }}>Agent Data Values</InputLabel>
                              <Select
                                variant="standard"
                                label="Agent Data Values"
                                value={agentDataValues}
                                onChange={handleChangeAdgValues}
                              >
                                {getAdgsValues?.length === 0 ? (
                                  <MenuItem>No Records</MenuItem>
                                ) : (
                                  getAdgsValues?.map((d, index) => (
                                    <MenuItem key={index} value={d?.id}>
                                      {d?.adg_value}
                                    </MenuItem>
                                  ))
                                )}
                              </Select>
                            </FormControl>
                          </Grid>

                          {/* <Grid item xs={12} md={6}>
                            <TextField
                              label="Date Range"
                              variant="standard"
                              type="date"
                              value=""
                              InputLabelProps={{ shrink: true }}
                              sx={{ width: '100%' }}
                              size="small"
                            />
                          </Grid> */}
                        </>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth size="small">
                            <InputLabel sx={{ fontSize: '11pt' }}>MU Sets</InputLabel>
                            <Select
                              variant="standard"
                              value={valueMuSets}
                              label="MU Sets"
                              onChange={handleChangeMuSets}
                            >
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
                              label="Agent Data Group"
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
                      <Grid container spacing={1} sx={{ mt: 1 }}>
                        <>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                              <InputLabel sx={{ fontSize: '11pt' }}>Agent Data Values</InputLabel>
                              <Select
                                variant="standard"
                                value={getAgentValuesMuSet}
                                label="Agent Data Values"
                                onChange={handleChangeAdgValuesMuSet}
                              >
                                {getAdgsValuesMuSet?.map((d, index) => (
                                  <MenuItem key={index} value={d?.id}>
                                    {d?.adg_value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          {/* <Grid item xs={12} md={6}>
                            <TextField
                              label="Date Range"
                              variant="standard"
                              type="date"
                              value=""
                              InputLabelProps={{ shrink: true }}
                              sx={{ width: '100%' }}
                              size="small"
                            />
                          </Grid> */}
                        </>
                      </Grid>
                    </>
                  )}
                  <Button size="small" variant="outlined" color="primary" sx={{ mt: 3 }} onClick={handleApply}>
                    Apply
                  </Button>
                </Box>
              </Popover>
            </div>
          </Box>
        </div>
        <MainAgentSkills agentIdList={agentIdList} setAgentIdList={setAgentIdList} />
      </Card>
    </>
  );
};

export default FilterAgentSkills;
