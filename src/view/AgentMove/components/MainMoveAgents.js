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
  TextField,
  Checkbox,
  Button
} from '@material-ui/core';
import '../AgentMove.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import cross from '@iconify/icons-eva/close-outline';
import { MIconButton } from '../../../components/@material-extend';
import Filter from './FIlter';
import { SelectedAgentIdListAction, GetAgentListAction } from '../../../ReduxCreated/actions/Agent/MoveAgents.action';
import MoveAgentsModal from './MoveAgentsModal';
import { SearchAgentsAccordingToMu } from '../../../api/agent/AgentAvailability';

import { PaginationA } from '../../../sharedComponents/Pagination';

const MainMoveAgents = () => {
  const [page, setPage] = useState('');
  const [volatile, setVolatile] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('not available');
  const selectedMu = useSelector((state) => state.MoveAgents.selectedMu);
  const agentListSelector = useSelector((state) => state.MoveAgents.agentList);
  const muOrTogSet = useSelector((state) => state.MoveAgents.MuOrTogToken);
  const [agentData, setAgentData] = useState([]);
  const [agentSingleName, setAgentSingleName] = useState('');
  const [agentIdList, setAgentIdList] = useState([]);
  const [selectedMuForTable, setSelectedMuForTable] = useState({});

  useEffect(() => {
    setSelectedMuForTable(selectedMu);
    setAgentData(agentListSelector);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentListSelector]);

  const handleMultipleSelect = (value) => {
    const currentIndex = agentIdList.indexOf(value.id);
    const newChecked = [...agentIdList];
    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setAgentSingleName(`${value.first_name} ${' '} ${value.last_name}`);
    setAgentIdList(newChecked);
  };

  const geAgentsList = useCallback(
    async (searchText) => {
      try {
        if (Object.keys(selectedMuForTable).length !== 0) {
          const result = await SearchAgentsAccordingToMu(selectedMuForTable.id, searchText);
          if (result.status === 200) {
            dispatch(GetAgentListAction(result.data.results));
          }
        } else if (searchText !== '') {
          enqueueSnackbar('Please select MU from filter! ', {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={cross} />
              </MIconButton>
            )
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, selectedMuForTable]
  );

  useEffect(() => {
    if (search !== 'not available') {
      geAgentsList(search);
    } else if (search === '') {
      geAgentsList('');
    }
  }, [geAgentsList, search]);

  useEffect(() => {
    dispatch(SelectedAgentIdListAction(agentIdList));
  }, [agentIdList, dispatch]);

  const redirectToAssignmentHistory = (agentId) => {
    navigate(`/dashboard/agents/move-agents-history/${agentId}/${muOrTogSet}`);
  };
  const handleChange = (event, value) => {
    setPage(value);
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
                  {`MU  :  ${selectedMuForTable.mu_name !== undefined ? selectedMuForTable.mu_name : ''}`}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <MoveAgentsModal agentName={agentSingleName} setAgentIdList={setAgentIdList} />
            <Filter page={page} setVolatile={setVolatile} />
          </div>
        </Box>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '1rem'
          }}
        >
          <Typography paragraph mb="0">
            No. of agents : {agentData.length}
          </Typography>
          <TextField
            id="Search"
            label="Search"
            variant="outlined"
            type="search"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                {' '}
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Agent
              </TableCell>
              <TableCell align="center" colSpan={2}>
                MU
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Starting
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Ending
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Assignment history
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" style={{ boxShadow: 'none', borderTopLeftRadius: '0' }}>
                ID
              </TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center" style={{ boxShadow: 'none', borderBottomRightRadius: '0' }}>
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agentData.length !== 0 ? (
              agentData?.map((data) => (
                <TableRow key={data.id}>
                  <TableCell align="center">
                    <Checkbox
                      edge="start"
                      checked={agentIdList.indexOf(data.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      value={data.id}
                      inputProps={{ 'aria-labelledby': `checkbox-list-label-${data.id}` }}
                      onChange={() => handleMultipleSelect(data)}
                    />
                  </TableCell>
                  {/* <TableCell align="center"> {data.agent_profile?.id} </TableCell> */}
                  <TableCell align="center"> {data.id} </TableCell>
                  <TableCell align="center">
                    {data.first_name} &nbsp; &nbsp; {data.last_name}
                  </TableCell>
                  <TableCell align="center"> {data.agent_profile?.management_unit_id}</TableCell>
                  <TableCell align="center"> {selectedMuForTable.mu_name} </TableCell>
                  <TableCell align="center"> {data.agent_profile?.start_date} </TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" sx={{ mt: 3 }} onClick={() => redirectToAssignmentHistory(data.id)}>
                      Assignment History
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan="9">
                  No Records Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {agentData.length !== 0 ? <PaginationA volatile={volatile} handleChange={handleChange} /> : ''}
      </TableContainer>
      <Divider />
    </Card>
  );
};

export default MainMoveAgents;
