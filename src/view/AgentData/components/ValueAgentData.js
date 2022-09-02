import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Button,
  TableContainer,
  Box,
  Typography
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import useSettings from '../../../hooks/useSettings';
import { GetAgentDataGroupsValue, GetAgentDataGroupsID } from '../../../api/AgentDataGroups';

const ValueAgentData = () => {
  const { themeStretch } = useSettings();
  const options = { hour: '2-digit', minute: '2-digit' };
  const [showData, setShowData] = useState();
  const [data, setData] = useState();
  const { id } = useParams();
  const getAgentDataValues = async () => {
    await GetAgentDataGroupsID(id)
      .then((response) => setData(response.data))
      .catch((err) => {
        console.log(err);
      });
    await GetAgentDataGroupsValue(id)
      .then((response) => setShowData(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    console.log('delete', id);
  };

  const navigate = useNavigate();
  const handleAgentDataGroups = () => {
    navigate('/dashboard/account-setup/agent-group');
  };

  useEffect(() => {
    getAgentDataValues(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="Agent Data Groups Values">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Card>
              <Box sx={{ m: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Typography
                  style={{ cursor: 'pointer' }}
                  id="modal-modal-title"
                  variant="h5"
                  onClick={handleAgentDataGroups}
                >
                  Agent Data Groups
                </Typography>
                <Typography id="modal-modal-title" variant="h5">
                  / Values
                </Typography>
              </Box>
              <Typography sx={{ m: 2, display: 'flex', alignItems: 'center' }} id="modal-modal-title" variant="h6">
                {data?.description}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Values</TableCell>
                        <TableCell align="center" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {showData?.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align="center">
                            {data?.datatype === 6
                              ? new Date(row?.adg_value).toLocaleDateString()
                              : data.datatype === 3
                              ? new Date(row?.adg_value).toLocaleTimeString('en-US', options)
                              : row?.adg_value}
                          </TableCell>

                          <TableCell sx={{ color: 'error.main' }}>
                            <Button variant="outlined" size="small" onClick={() => handleDelete(row?.id)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
              <Divider />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ValueAgentData;
