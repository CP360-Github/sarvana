import {
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAgentDefData } from '../../api/AgentDefinitionApi';
import Scrollbar from '../../components/Scrollbar';
import AgentDataMore from './AgentDataMore';

function AgentDefData() {
  const TABLE_HEAD = [
    { id: 'position.', label: 'Position' },
    { id: 'description', label: 'Description' },
    { id: 'data_range', label: 'Data Range' },
    { id: 'value', label: 'Value' }
  ];
  const { id } = useParams();
  const [agentData, setAgentData] = useState();
  async function fetchAgentData(id) {
    const response = await getAgentDefData(id);

    if (response.success) {
      setAgentData(response?.data);
    }
  }

  useEffect(() => {
    fetchAgentData(id);
    // eslint-disable-next-line
  }, [id]);
  console.log('hh', agentData);
  return (
    <Card sx={{ p: 1 }}>
      <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Typography variant="h5"> Agent-Data</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Scrollbar>
        <TableContainer sx={{ Width: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {agentData?.map((row) => (
                <TableRow key={row?.int_adg_id}>
                  <TableCell>{row?.int_adg_id}</TableCell>
                  <TableCell>{row?.description}</TableCell>
                  <TableCell>
                    {row?.date_start}- {row?.date_end}
                  </TableCell>
                  <TableCell>{row?.value}</TableCell>
                  <TableCell>
                    <AgentDataMore id={id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}

export default AgentDefData;
