import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { GetQueuesPagination } from '../../../api/Queue';
import AddModal from './AddModal';
import { GetQueueAction } from '../../../ReduxCreated/actions/Queue';
import ViewAndEditQueue from './ViewAndEditQueue';
import UseMoreButton from './UseMoreButton';
import { PaginationA } from '../../../sharedComponents/Pagination';
import EnableDisableFilterWithSearch from '../../../sharedComponents/EnableDisableFilterWithSearch';

const MainQueueCodeCode = () => {
  const [filter, setFilter] = useState(false);
  const [volatile, setVolatile] = useState('');
  const [searchText, setSearchText] = useState('');
  const [queuesData, setQueuesData] = useState([]);
  const selector = useSelector((state) => state.queuesData);
  const [page, setPage] = useState(1);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getQueues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText, filter]);

  useEffect(() => {
    setQueuesData(selector);
  }, [selector]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const getQueues = async () => {
    try {
      const result = await GetQueuesPagination(page, searchText, filter);
      if (result.status === 200) {
        setVolatile(result.data);
        dispatch(GetQueueAction(result.data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Box sx={{ mx: 2, mb: 3, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">Queues</Typography>
        <div>
          <AddModal />
        </div>
      </Box>
      <EnableDisableFilterWithSearch
        setFilter={setFilter}
        filter={filter}
        setSearchText={setSearchText}
        searchText={searchText}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2}>ID</TableCell>
              <TableCell rowSpan={2}>Name</TableCell>
              <TableCell rowSpan={2}>Assigned to</TableCell>
              <TableCell rowSpan={2}>Created by</TableCell>
              <TableCell rowSpan={2}>Time assigned</TableCell>
              <TableCell rowSpan={2}> </TableCell>
              <TableCell rowSpan={2}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queuesData.length !== 0 ? (
              queuesData?.map((queueValue) => (
                <TableRow key={queueValue.id}>
                  <TableCell>{queueValue.id}</TableCell>
                  <TableCell>{queueValue.queue_name}</TableCell>
                  <TableCell>{queueValue.contact_type !== null ? queueValue.contact_type.ct_name : ''}</TableCell>
                  <TableCell> {queueValue.created_by?.username}</TableCell>
                  <TableCell> {new Date(queueValue.time_assigned).toLocaleDateString('en-US', options)}</TableCell>
                  <TableCell>
                    {queueValue.is_disabled === false ? (
                      <ViewAndEditQueue modalType="edit" queueId={queueValue.id} />
                    ) : null}
                    <ViewAndEditQueue modalType="view" queueId={queueValue.id} />
                  </TableCell>
                  <TableCell>
                    <UseMoreButton queueId={queueValue.id} isDisable={queueValue.is_disabled} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan="7">
                  No Records Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {queuesData.length !== 0 ? <PaginationA volatile={volatile} handleChange={handleChange} /> : ''}
      <Divider />
    </Card>
  );
};
export default MainQueueCodeCode;
