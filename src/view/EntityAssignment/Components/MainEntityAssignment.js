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
  TableContainer
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MIconButton } from '../../../components/@material-extend';
import Filter from './Filter';
import UnassignOrMove from './UnassignOrMove';

const MainEntityAssignment = () => {
  const navigate = useNavigate();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const [entityType, setEntityType] = useState('');
  // const entityType = useSelector((state) => state.EntityAssignment.selectedEntity);
  const historyData = useSelector((state) => state.EntityAssignment.data);
  const [assignOrMemberToken, setAssignOrMemberToken] = useState('Assigned');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(historyData);
  }, [historyData]);

  const redirectToUnassign = () => {
    navigate('/dashboard/account-setup/entity-unassign');
  };
  return (
    <Card>
      <Box sx={{ mx: 2, mb: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Entity Assignment</Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MIconButton onClick={redirectToUnassign}>
            <Icon icon="mdi:table-large-remove" />
          </MIconButton>
          <Filter setAssignOrMemberToken={setAssignOrMemberToken} pageType="assigned" setEntityType={setEntityType} />
        </div>
      </Box>

      <TableContainer sx={{ Width: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">{assignOrMemberToken === 'Assigned' ? 'Assigned To' : 'Members'} </TableCell>
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
                    <TableCell style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {entityType !== 'EG' ? (
                        <>
                          <UnassignOrMove entityType={entityType} modalType="Un-assign" historyId={entityData.id} />
                          <UnassignOrMove entityType={entityType} modalType="Move to" historyId={entityData.id} />
                        </>
                      ) : (
                        ''
                      )}
                    </TableCell>
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
  );
};
export default MainEntityAssignment;
