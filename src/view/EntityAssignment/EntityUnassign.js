import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Container,
  Grid
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import Filter from './Components/Filter';

const EntityUnassign = () => {
  const { themeStretch } = useSettings();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const historyData = useSelector((state) => state.EntityAssignment.data);
  const [assignOrMemberToken, setAssignOrMemberToken] = useState('Assigned');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(historyData);
  }, [historyData]);

  return (
    <Page title="Entity Un-assign">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Card>
              <Box sx={{ mx: 2, mb: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Entity Un assign</Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Filter setAssignOrMemberToken={setAssignOrMemberToken} pageType="unassigned" setEntityType="" />
                </div>
              </Box>

              <TableContainer sx={{ Width: 720 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        {assignOrMemberToken === 'Assigned' ? 'Assigned To' : 'Members'}{' '}
                      </TableCell>
                      <TableCell align="center">Starting Date</TableCell>
                      <TableCell align="center">Ending Date</TableCell>
                      <TableCell align="center"> Assigned By</TableCell>
                      <TableCell align="center"> Time Assigned</TableCell>
                      <TableCell align="center"> </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data.length !== 0 ? (
                      data?.map((entityData, i) =>
                        entityData?.assigned_to !== 'Unassigned' ? (
                          <TableRow key={i}>
                            <TableCell align="center">{entityData?.assigned_to}</TableCell>
                            <TableCell align="center">{entityData?.starting_date}</TableCell>
                            <TableCell align="center">{entityData.ending_date}</TableCell>
                            <TableCell align="center">{entityData.assigned_by}</TableCell>
                            <TableCell align="center">
                              {new Date(entityData.time_assigned).toLocaleDateString('en-US', options)}
                            </TableCell>
                            <TableCell style={{ display: 'flex', alignItems: 'center', gap: '10px' }}> </TableCell>
                          </TableRow>
                        ) : (
                          ''
                        )
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan="6" align="center">
                          No Records Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default EntityUnassign;
