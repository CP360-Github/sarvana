import React, { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { closeFill } from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import { useParams, useNavigate } from 'react-router-dom';
import { MIconButton } from '../../../../components/@material-extend';
import Page from '../../../../components/Page';
import AgentDataGroupList from './components/AgentDataGroupList';
import {
  GetAgentDataGroups,
  PUTAgentDataGroups,
  PUTAgentDataGroupsVLU,
  GetAgentDataGroupsVLU
} from '../../../../api/ManagementUnitAPI';
import { GetAgentDataGroupsNoPage } from '../../../../api/AgentDataGroups';

const AgentDataMU = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState();

  const [search, setSearch] = useState();
  const [buttonClick, setButtonClick] = useState(false);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);
  const [details, setDetails] = useState();
  const [detailsVLU, setDetailsVLU] = useState();
  const [agentDataDropDown, setAgentDataDropDown] = useState();

  const [rightSideadgs, setRightSideadgs] = useState();
  const [rightSideadgsVlu, setRightSideadgsVlu] = useState();

  const [leftVlu, setLeftVlu] = useState([0, 1, 2, 3]);
  const [rightVlu, setRightVlu] = useState([4, 5, 6, 7]);

  const [allRightVLU, setAllRightVLU] = useState([]);

  const handleAgentData = () => {
    navigate('/admin/management-unit');
  };

  const handleButtonClickGroup = () => {
    setButtonClick(false);
  };
  const handleButtonClickValues = () => {
    setButtonClick(true);
  };

  const getAgentDataMu = async () => {
    await GetAgentDataGroups(id)
      .then((response) => {
        setDetails(response.data);
        setLeft(response.data.available_adgs);
        setRight(response.data.adgs);
      })
      .catch((err) => console.log(err));
  };

  const getAgentDataVLU = async () => {
    await GetAgentDataGroupsVLU(id, value).then((response) => {
      setDetailsVLU(response.data);
      setLeftVlu(response.data.available_adg_values);
      setRightVlu(response.data.selected_adg_values);
      setAllRightVLU(response.data.adg_values);
    });
  };

  const getAgentDataGroupsDropDown = async () => {
    try {
      await GetAgentDataGroupsNoPage().then((response) => {
        setAgentDataDropDown(response.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAgentDataMu();
    if (buttonClick === true) {
      getAgentDataGroupsDropDown();
    }

    // eslint-disable-next-line
  }, [buttonClick]);

  useEffect(() => {
    if (buttonClick === true) {
      getAgentDataVLU();
    }

    // eslint-disable-next-line
  }, [value]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const putAgentDataMU = async () => {
    try {
      const itemsAre = [];
      rightSideadgs?.forEach((d) => {
        itemsAre.push(d.id);
      });
      const itemsTwo = [];
      details.adg_values.forEach((e) => {
        itemsTwo.push(e.id);
      });
      const response = await PUTAgentDataGroups(id, details, itemsAre, itemsTwo);
      if (response.statusText === 'OK') {
        enqueueSnackbar('successfully Added', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const putAgentDataMUVLU = async () => {
    try {
      const itemsAre = [];

      const result = allRightVLU.filter((o1) => !leftVlu.some((o2) => o1.id === o2.id));

      const resultAgain = rightSideadgsVlu.filter((o1) => !leftVlu.some((o2) => o1.id === o2.id));

      result?.forEach((d) => {
        itemsAre.push(d.id);
      });

      resultAgain?.forEach((d) => {
        itemsAre.push(d.id);
      });

      const itemsTwo = [];
      detailsVLU.adgs.forEach((e) => {
        itemsTwo.push(e.id);
      });
      const response = await PUTAgentDataGroupsVLU(id, detailsVLU, itemsAre, itemsTwo);
      if (response.statusText === 'OK') {
        enqueueSnackbar('successfully Added', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVluSave = () => {
    putAgentDataMUVLU();
  };

  const handleSave = () => {
    putAgentDataMU();
  };

  return (
    <Page title="Management Unit - Agent Data Groups | SCHEDULY">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <Typography style={{ cursor: 'pointer' }} onClick={handleAgentData} variant="h5">
                Management Unit
              </Typography>
              <Typography variant="h5">/ Agent Data</Typography>
            </Box>

            <Divider />
            <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box>
                      <Button
                        size="large"
                        onClick={handleButtonClickGroup}
                        style={{
                          borderRadius: '16px'
                        }}
                        variant={buttonClick === true ? 'outlined' : 'contained'}
                      >
                        Agent data groups
                      </Button>
                      {buttonClick === false ? null : (
                        <FormControl style={{ borderRadius: '16px', marginLeft: 4 }}>
                          <InputLabel>Agent Data Group</InputLabel>
                          <Select
                            id="demo-simple-select"
                            value={value || ''}
                            label="Agent Data Group"
                            onChange={(event) => {
                              setValue(event.target.value);
                            }}
                            style={{
                              width: '200px',
                              padding: 4,
                              height: '48px',
                              borderRadius: '16px'
                            }}
                            variant="outlined"
                          >
                            {agentDataDropDown?.map((d, index) => (
                              <MenuItem key={index} value={d.id}>
                                {d.description}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  </Box>
                  <div
                    style={{
                      marginTop: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '30px',
                      width: '100%'
                    }}
                  >
                    <Button
                      size="large"
                      onClick={handleButtonClickValues}
                      style={{
                        borderRadius: '16px'
                      }}
                      variant={buttonClick === true ? 'contained' : 'outlined'}
                    >
                      Agent data values
                    </Button>
                    <div style={{ marginInline: '20px', marginTop: '5px' }}>
                      {buttonClick === true ? (
                        <>
                          <AgentDataGroupList
                            left={leftVlu}
                            buttonClick={buttonClick}
                            setLeft={setLeftVlu}
                            right={rightVlu}
                            setRight={setRightVlu}
                            setRightSideadgs={setRightSideadgsVlu}
                            title1="Agent Data Values"
                            title2="Preferred Values"
                            value={value}
                          />
                        </>
                      ) : (
                        <>
                          <AgentDataGroupList
                            left={left}
                            buttonClick={buttonClick}
                            setLeft={setLeft}
                            right={right}
                            setRight={setRight}
                            setRightSideadgs={setRightSideadgs}
                            title1="Agent Data Groups"
                            title2="Preferred Groups"
                            value={value}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </Box>
              </Box>
              <Box>
                <TextField
                  style={{ width: '300px' }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  size="small"
                  label="Search"
                  variant="outlined"
                  placeholder="Search"
                />
              </Box>
            </Box>

            <Box sx={{ margin: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={buttonClick === true ? handleVluSave : handleSave}
              >
                Save
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default AgentDataMU;
