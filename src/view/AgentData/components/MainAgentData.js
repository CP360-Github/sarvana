import React, { useState, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import Scrollbar from '../../../components/Scrollbar';
import AddModalAgentData from './AddModalAgentData';
import { MoreAgentData } from './MoreAgentData';
import { GetAgentDataGroups } from '../../../api/AgentDataGroups';
import { setClicked } from '../../../ReduxCreated/actions/AgentDataGroups';
import PopOverValues from './PopOverValues';
import { PaginationA } from '../../../sharedComponents/Pagination';

export default function MainAgentData() {
  const dispatch = useDispatch();
  const options = { hour: '2-digit', minute: '2-digit' };

  const [showData, setShowData] = useState(['hello']);
  const [rowData, setRowData] = useState();

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const clicked = useSelector((state) => state.agentdatagroup.clicked);

  const handleEditClick = (row) => {
    dispatch(setClicked(!clicked));
    setRowData(row);
  };

  const getAgentData = async () => {
    await GetAgentDataGroups(page)
      .then((response) => setShowData(response.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAgentData();
    // eslint-disable-next-line
  }, [clicked, page]);

  return (
    <Card>
      <Box sx={{ mb: 3, mt: 2, mx: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">Agent Data</Typography>
        <AddModalAgentData setRowData={setRowData} rowData={rowData} />
      </Box>

      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Data Type</TableCell>
                <TableCell align="center">Decimal Places</TableCell>
                <TableCell align="center">Minimum Values</TableCell>
                <TableCell align="center">Maximum Values</TableCell>
                <TableCell align="center">Currency Symbol</TableCell>
                <TableCell align="center" />
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {showData.results?.map((row, id) => (
                <TableRow key={id}>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{dataType[row.datatype]}</TableCell>
                  <TableCell align="center">{row.decimal_places}</TableCell>
                  <TableCell align="center">
                    {row?.min_value
                      ? row.datatype === 6
                        ? new Date(row?.min_value).toLocaleDateString()
                        : row.datatype === 3
                        ? new Date(row?.min_value).toLocaleTimeString('en-US', options)
                        : row.datatype === 5 || row.datatype === 4
                        ? row?.min_value
                        : ''
                      : ''}
                  </TableCell>
                  <TableCell align="center">
                    {row?.max_value
                      ? row.datatype === 6
                        ? new Date(row?.max_value).toLocaleDateString()
                        : row.datatype === 3
                        ? new Date(row?.max_value).toLocaleTimeString('en-US', options)
                        : row.datatype === 5 || row.datatype === 4
                        ? row?.max_value
                        : ''
                      : ''}
                  </TableCell>
                  <TableCell align="center">{row.currency}</TableCell>
                  <TableCell onClick={() => handleEditClick(row)}>
                    <MoreAgentData row={row} id={id} />
                  </TableCell>
                  <TableCell>
                    <PopOverValues row={row} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Divider />
      <PaginationA volatile={showData} handleChange={handleChange} />
    </Card>
  );
}

const dataType = ['', 'Alphanumeric', 'Logical', 'Time', 'Currency', 'Numeric', 'Date', 'System User'];
