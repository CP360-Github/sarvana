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
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEntitySet from './AddEntitySet';
import { GetEntitySetPagination } from '../../../api/EntitySet';
import { GetEntitySetAction } from '../../../ReduxCreated/actions/EntitySet.action';
import UseMoreButton from './UseMoreButton';
import { PaginationA } from '../../../sharedComponents/Pagination';

const MainEntitySetCode = () => {
  const [volatile, setVolatile] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState(2);
  const selector = useSelector((state) => state.EntitySet);
  const dispatch = useDispatch();
  const [entitySetData, setEntitySetData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setEntitySetData(selector);
  }, [selector]);

  useEffect(() => {
    getEntitySetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType, page, searchText]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const getEntitySetList = async () => {
    try {
      const resp = await GetEntitySetPagination(searchType, page, searchText);
      if (resp.statusText === 'OK') {
        setVolatile(resp.data);
        dispatch(GetEntitySetAction(resp.data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <div style={{ padding: '0px 1rem' }}>
        <Box sx={{ mb: 3, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">Entity Set</Typography>
          <AddEntitySet modalType="add" entitySetId="" entitySetType={searchType} />
        </Box>
      </div>
      <div style={{ padding: '0px 1rem' }}>
        <Box sx={{ mb: 3, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextField
            style={{ marginBottom: '1.5rem' }}
            size="small"
            label="Search"
            variant="outlined"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
          />
          <FormControl style={{ width: '200px', marginBottom: '1.5rem' }} size="small">
            <InputLabel id="set-type-label">Filter</InputLabel>
            <Select
              labelId="set-type-label"
              label="Filter"
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
              defaultValue="2"
            >
              <MenuItem value={1}>EnterPrise Group</MenuItem>
              <MenuItem value={2}>Management Unit</MenuItem>
              <MenuItem value={3}>Contact Type</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2}> ID</TableCell>
              <TableCell rowSpan={2}> Name</TableCell>
              <TableCell rowSpan={2}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entitySetData.length !== 0 ? (
              entitySetData.map((EntitySet, i) => (
                <TableRow key={i}>
                  <TableCell> {EntitySet.id} </TableCell>
                  <TableCell> {EntitySet.set_name} </TableCell>
                  <TableCell style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                    <AddEntitySet modalType="edit" entitySetId={EntitySet.id} entitySetType={searchType} />
                    <AddEntitySet modalType="view" entitySetId={EntitySet.id} entitySetType={searchType} />
                    <UseMoreButton entitySetId={EntitySet.id} entitySetType={searchType} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan="3">
                  No Records Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {entitySetData.length !== 0 ? <PaginationA volatile={volatile} handleChange={handleChange} /> : ''}
      <Divider />
    </Card>
  );
};

export default MainEntitySetCode;
