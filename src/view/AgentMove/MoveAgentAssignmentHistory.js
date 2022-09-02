import {
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Card,
  Box,
  Typography,
  Divider
} from '@material-ui/core';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetAgentData, GetAgentHistoryForMu } from '../../api/agent/MoveAgents';
import Scrollbar from '../../components/Scrollbar';

const MoveAgentAssignmentHistory = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const navigate = useNavigate();

  const redirectBackToDashboard = () => {
    navigate('/dashboard/agents/move-agents');
  };

  const [historyData, setHistoryData] = useState([]);
  const [agentData, setAgentData] = useState([]);

  const { id, MuOrTogToken } = useParams();

  const getHistoryData = useCallback(async () => {
    if (MuOrTogToken === 'MU') {
      await GetAgentHistoryForMu(id)
        .then((response) => setHistoryData(response.data))
        .catch((err) => {
          console.log(err);
        });
    }
    await GetAgentData(id)
      .then((response) => setAgentData(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, [MuOrTogToken, id]);

  useEffect(() => {
    getHistoryData();
  }, [getHistoryData]);

  return (
    <Card>
      <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Typography style={{ cursor: 'pointer' }} id="modal-modal-title" variant="h5" onClick={redirectBackToDashboard}>
          {MuOrTogToken}
        </Typography>
        <Typography id="modal-modal-title" variant="h5">
          / History
        </Typography>
      </Box>

      <Typography sx={{ m: 2, display: 'flex', alignItems: 'center' }} id="modal-modal-title" variant="h6">
        {agentData.first_name !== undefined ? `${agentData.first_name} ${agentData.last_name}` : ''}/{agentData?.id}
      </Typography>

      <Divider sx={{ mb: 2 }} />
      <Scrollbar>
        <TableContainer sx={{ Width: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Assigned To</TableCell>
                <TableCell align="center">Starting Date</TableCell>
                <TableCell align="center">Ending Date</TableCell>
                <TableCell align="center"> Assigned By</TableCell>
                <TableCell align="center"> Time Assigned</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {historyData.length !== 0 ? (
                historyData?.map((data, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{data.agent?.username}</TableCell>
                    <TableCell align="center">{data.starting_date}</TableCell>
                    <TableCell align="center">{data.ending_date}</TableCell>
                    <TableCell align="center">{data.assigned_by?.username}</TableCell>
                    <TableCell align="center">
                      {new Date(data.time_assigned).toLocaleDateString('en-US', options)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" align="center">
                    No Records Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

export default MoveAgentAssignmentHistory;
