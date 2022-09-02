import PropTypes from 'prop-types';
import { TableContainer, Table, TableBody, TableHead, TableCell, Button, TableRow, Checkbox } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSelectedAgent } from '../../../ReduxCreated/actions/Agent/AgentSkill';
import Scrollbar from '../../../components/Scrollbar';

const MainAgentSkills = ({ agentIdList, setAgentIdList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataApply = useSelector((state) => state.agentSkill.dataApply);

  console.log(dataApply, 'dataApply');

  const handleMultipleSelect = (value) => {
    const currentIndex = agentIdList.indexOf(value?.id);
    const newChecked = [...agentIdList];
    if (currentIndex === -1) {
      newChecked.push(value?.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setAgentIdList(newChecked);
  };
  useEffect(() => {
    dispatch(setSelectedAgent(agentIdList));
    console.log(agentIdList);
  }, [agentIdList, dispatch]);
  return (
    <>
      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                {/* <TableCell>Date Range</TableCell> */}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {dataApply?.length === 0 ? (
                <TableRow>
                  <TableCell />
                  <TableCell align="center">No records Found</TableCell>
                </TableRow>
              ) : (
                dataApply?.map((d, index) => (
                  <TableRow hover key={index} sx={{ cursor: 'pointer' }}>
                    <TableCell>
                      <Checkbox
                        edge="start"
                        checked={agentIdList.indexOf(d?.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        value={d?.id}
                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${d?.id}` }}
                        onChange={() => handleMultipleSelect(d)}
                      />
                    </TableCell>
                    <TableCell onClick={() => handleMultipleSelect(d)}>{d?.id}</TableCell>
                    <TableCell onClick={() => handleMultipleSelect(d)}>{d?.username}</TableCell>
                    {/* {d?.agent.name} */}
                    {/* <TableCell>
                    {d?.date_start === null ? 'null' : d?.date_start}{' '}
                    {d?.date_start === '' && d?.date_end === '' ? 'null' : 'to'}{' '}
                    {d?.date_end === null ? 'null' : d?.date_end}
                  </TableCell> */}
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate(`/dashboard/agents/agent-skills/view-skills/${d?.id}`);
                        }}
                      >
                        View Skills
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  );
};

export default MainAgentSkills;

MainAgentSkills.propTypes = {
  agentIdList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setAgentIdList: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};
