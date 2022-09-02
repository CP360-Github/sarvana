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
import { GetQueueHistory, GetSingleQueues } from '../../api/Queue';
import Scrollbar from '../../components/Scrollbar';

const QueueHistory = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const navigate = useNavigate();
  const handleEnterpriseClick = () => {
    navigate('/dashboard/account-setup/queues');
  };

  const [historyData, setHistoryData] = useState([]);
  const [singleQueueData, setSingleQueueData] = useState([]);
  const type = 'Q';

  const { id } = useParams();
  const getHistoryData = useCallback(async () => {
    await GetQueueHistory(type, id)
      .then((response) => setHistoryData(response.data))
      .catch((err) => {
        console.log(err);
      });
    await GetSingleQueues(id)
      .then((response) => setSingleQueueData(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, [setHistoryData, id, type]);

  useEffect(() => {
    getHistoryData();
  }, [getHistoryData]);

  return (
    <Card>
      <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Typography style={{ cursor: 'pointer' }} id="modal-modal-title" variant="h5" onClick={handleEnterpriseClick}>
          Queues
        </Typography>
        <Typography id="modal-modal-title" variant="h5">
          / History
        </Typography>
      </Box>

      <Typography sx={{ m: 2, display: 'flex', alignItems: 'center' }} id="modal-modal-title" variant="h6">
        {singleQueueData?.queue_name}/{singleQueueData?.id}
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
              {historyData?.map((historyData, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{historyData?.assigned_to}</TableCell>
                  <TableCell align="center">{historyData?.starting_date}</TableCell>
                  <TableCell align="center">{historyData.ending_date}</TableCell>
                  <TableCell align="center">{historyData.assigned_by}</TableCell>
                  <TableCell align="center">
                    {new Date(historyData.time_assigned).toLocaleDateString('en-US', options)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

export default QueueHistory;
