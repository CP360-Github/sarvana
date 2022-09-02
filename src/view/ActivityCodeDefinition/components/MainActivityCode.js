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
import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import Scrollbar from '../../../components/Scrollbar';
import { MoreMenuButton } from './MoreMenuActivityCode';
import AddModal from './AddModal';
import { GetActivityCodeDefinition, GetSkills } from '../../../api/ActivityCodeDefinition';
import { PaginationA } from '../../../sharedComponents/Pagination';

export default function MainActivityCode() {
  const [showData, setShowData] = useState(['hello']);
  const [clicked, setClicked] = useState(false);
  const [rowID, setRowID] = useState();

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getActivityCodeDefinition = async () => {
    await GetActivityCodeDefinition(page)
      .then((response) => {
        setShowData(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCodeType = (id) => {
    const menuItems = [
      { id: 1, name: 'Normal' },
      { id: 2, name: 'Lunch' },
      { id: 3, name: 'Break' }
    ];
    return (
      <div>
        {menuItems
          .filter((item) => item.id === id)
          .map((filteredItem, i) => (
            <div key={i}>{filteredItem.name}</div>
          ))}
      </div>
    );
  };
  const [storeSkills, setStoreSkills] = useState(['hello']);
  const getSkills = useCallback(async () => {
    await GetSkills()
      .then((response) => setStoreSkills(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getSkills();
  }, [getSkills, clicked]);

  const handleSkills = (id) => (
    <>
      <div>{storeSkills.length === id?.length ? 'All' : id?.length === 0 ? 'None' : 'Some'}</div>
      {/* <div
        style={{
          display: !isHovering ? 'none' : 'block',
          backgroundColor: !isHovering ? 'salmon' : '',
          color: !isHovering ? 'white' : ''
        }}
      >
        {storeSkills
          .filter((item) => id?.includes(item.id))
          .map((filteredItem, i) => (
            <div key={i}>{filteredItem.skill_name}</div>
          ))}
      </div> */}
    </>
  );

  const handleMore = (row) => {
    const menuItems = [];

    if (row.available === true) {
      menuItems.push('Available');
    }
    if (row.in_office === true) {
      menuItems.push('In Office');
    }
    if (row.business === true) {
      menuItems.push('Business');
    }
    if (row.overtime === true) {
      menuItems.push('Overtime');
    }
    if (row.uses_seat === true) {
      menuItems.push('Uses Seat');
    }
    if (row.paid === true) {
      menuItems.push('Paid');
    }
    if (row.work_hours === true) {
      menuItems.push('Work Hours');
    }

    return <div>{menuItems.length > 1 ? menuItems.join(', ') : menuItems}</div>;
  };

  const handleAgent = (id) => {
    const menuItems = [
      { id: 1, name: 'Keep with agent' },
      { id: 2, name: 'Trade with schedule' },
      { id: 3, name: 'keep with agent or no trade' },
      { id: 4, name: 'No trade allowed' },
      { id: 5, name: 'Delete' }
    ];
    return (
      <div>
        {menuItems
          .filter((item) => item.id === id)
          .map((filteredItem, i) => (
            <div key={i}>{filteredItem.name}</div>
          ))}
      </div>
    );
  };

  const handleSupervisor = (id) => {
    const menuItems = [
      { id: 1, name: 'Keep with agent' },
      { id: 2, name: 'Trade with schedule' },
      { id: 3, name: 'keep with agent or no trade' },
      { id: 4, name: 'No trade allowed' },
      { id: 5, name: 'Delete' }
    ];
    return (
      <div>
        {menuItems
          .filter((item) => item.id === id)
          .map((filteredItem, i) => (
            <div key={i}>{filteredItem.name}</div>
          ))}
      </div>
    );
  };

  const handleClick = (row) => {
    setClicked(!clicked);
    setRowID(row);
  };

  useEffect(() => {
    getActivityCodeDefinition();

    // eslint-disable-next-line
  }, [clicked]);

  return (
    <Card>
      <Box sx={{ mb: 3, mt: 2, mx: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">Activity Code Definition</Typography>
        <AddModal rowID={rowID} clicked={clicked} setClicked={setClicked} />
      </Box>

      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>Position</TableCell>
                <TableCell rowSpan={2}>Priority</TableCell>
                <TableCell rowSpan={2}>Icon</TableCell>
                <TableCell rowSpan={2}>Description</TableCell>
                <TableCell rowSpan={2}>Code Type</TableCell>
                <TableCell rowSpan={2}>Open Skills</TableCell>
                <TableCell rowSpan={2}>More</TableCell>
                <TableCell colSpan={2} align="center">
                  Schedule Traders
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ boxShadow: 'none', borderRadius: '0', align: 'center' }} rowSpan={2}>
                  Agent
                </TableCell>
                <TableCell style={{ align: 'center' }} rowSpan={2}>
                  Supervisor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showData.results?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.priority}</TableCell>
                  <TableCell>
                    <Icon id="icon" icon={row.icon} fontSize="40px" />
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{handleCodeType(row.code_type)}</TableCell>
                  <TableCell>{handleSkills(row.open_skills)}</TableCell>
                  <TableCell style={{ width: '100px' }}>{handleMore(row)}</TableCell>
                  <TableCell>{handleAgent(row.agent_trade_status)}</TableCell>
                  <TableCell>{handleSupervisor(row.supervisor_trade_status)}</TableCell>
                  <TableCell align="right" onClick={() => handleClick(row)}>
                    <MoreMenuButton rowID={rowID} setClicked={setClicked} clicked={clicked} />
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
