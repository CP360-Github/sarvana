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
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddSkills from './AddSkills';
import { GetSkillsPagination } from '../../../api/Skills';
import { GetSkillsAction } from '../../../ReduxCreated/actions/Skills.action';
import ViewAndEditSkills from './ViewAndEditSkills';
import { PaginationA } from '../../../sharedComponents/Pagination';
import EnableDisableButton from './EnableDisableButton';
import EnableDisableFilterWithSearch from '../../../sharedComponents/EnableDisableFilterWithSearch';

const MainSkillsCode = () => {
  const [volatile, setVolatile] = useState('');
  const selector = useSelector((state) => state.skillsData);
  const dispatch = useDispatch();
  const [skillsData, setSkillsData] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(false);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setSkillsData(selector);
  }, [selector]);

  useEffect(() => {
    getSkillsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, searchText]);
  const handleChange = (value) => {
    setPage(value);
  };
  const getSkillsList = async () => {
    try {
      const resp = await GetSkillsPagination(page, filter, searchText);
      if (resp.statusText === 'OK') {
        setVolatile(resp.data);
        dispatch(GetSkillsAction(resp.data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Box sx={{ mx: 2, mb: 3, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">Skills</Typography>
        <AddSkills />
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
              <TableCell rowSpan={2}>Skill ID</TableCell>
              <TableCell rowSpan={2}>Skill Name</TableCell>
              <TableCell rowSpan={2}>ACD Name</TableCell>
              <TableCell rowSpan={2}>Default Queue Id</TableCell>
              <TableCell rowSpan={2}>Default Queue Name</TableCell>
              <TableCell rowSpan={2}> </TableCell>
              <TableCell rowSpan={2}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skillsData.length !== 0 ? (
              skillsData.map((skills, i) => (
                <TableRow key={i}>
                  <TableCell> {skills.id} </TableCell>
                  <TableCell> {skills.skill_name} </TableCell>
                  <TableCell> {skills.acd_param?.param_name} </TableCell>
                  <TableCell> {skills.queue?.id} </TableCell>
                  <TableCell> {skills.queue?.queue_name} </TableCell>
                  <TableCell>
                    {skills.is_disabled === false ? <ViewAndEditSkills modalType="edit" skillId={skills.id} /> : null}
                    <ViewAndEditSkills modalType="view" skillId={skills.id} />
                  </TableCell>
                  <TableCell>
                    {skills.is_disabled === false ? (
                      <EnableDisableButton skillsId={skills.id} buttonType="disable" />
                    ) : (
                      <EnableDisableButton skillsId={skills.id} buttonType="restore" />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan="6">
                  No Records Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {skillsData.length !== 0 ? <PaginationA volatile={volatile} handleChange={handleChange} /> : ''}
      <Divider />
    </Card>
  );
};

export default MainSkillsCode;
