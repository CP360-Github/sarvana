import { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import add from '@iconify/icons-eva/plus-fill';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Scrollbar from '../../../components/Scrollbar';
import { ModalCard } from './ModalCard';
import { MoreMenuButton } from './MoreMenuButton';
import { PaginationA } from '../../../sharedComponents/Pagination';
import { GetManagementUnits } from '../../../api/ManagementUnitAPI';
import ViewIconMU from './EditAndView/ViewIconMU';
import EditIconMU from './EditAndView/EditIconMU';
import EnableDisableFilterWithSearch from '../../../sharedComponents/EnableDisableFilterWithSearch';

// ----------------------------------------------------------------------

export default function ManagementUnitList() {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const [managementUnits, setManagementUnits] = useState(['h']);
  const isDeleted = useSelector((state) => state.management.deleted);
  const onSave = useSelector((state) => state.management.onSave);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const getManagementUnits = async (page, search, filter) => {
    await GetManagementUnits(page, search, filter)
      .then((response) => {
        setManagementUnits(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getManagementUnits(page, search, filter);
    // eslint-disable-next-line
  }, [onSave, isDeleted, page, search, filter]);

  const modalRef = useRef(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card>
        <Box sx={{ mt: 2, mx: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">Management Unit</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button
              ref={modalRef}
              onClick={handleOpenModal}
              color="primary"
              variant="contained"
              endIcon={<Icon icon={add} />}
            >
              Add
            </Button>
          </Box>
        </Box>
        <EnableDisableFilterWithSearch
          setFilter={setFilter}
          filter={filter}
          setSearchText={setSearch}
          searchText={search}
        />
        {openModal && <ModalCard openModal={openModal} setOpenModal={setOpenModal} />}

        <Scrollbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" spacing={2}>
                    ID
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    Name
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    EG Name : Assigned to
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    Created by
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    Time assigned
                  </TableCell>
                  <TableCell align="center" spacing={2} />
                  <TableCell align="center" spacing={2} />
                  <TableCell align="center" spacing={2} />
                </TableRow>
              </TableHead>
              <TableBody>
                {managementUnits.results?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" spacing={2}>
                      {row?.id}
                    </TableCell>
                    <TableCell align="center" spacing={2}>
                      {row?.mu_name}
                    </TableCell>
                    <TableCell align="center" spacing={2}>
                      {row?.enterprise_grp?.eg_name}
                    </TableCell>
                    <TableCell align="center" spacing={2}>
                      {row?.created_by?.username}
                    </TableCell>
                    <TableCell align="center" spacing={2}>
                      {new Date(row?.time_assigned).toLocaleDateString('en-US', options)}
                    </TableCell>
                    <TableCell align="center" spacing={2}>
                      {row.is_disabled === false ? <ViewIconMU row={row} /> : null}
                    </TableCell>
                    <TableCell align="center" spacing={2}>
                      <EditIconMU row={row} />
                    </TableCell>

                    <TableCell align="center" spacing={2}>
                      <MoreMenuButton
                        anchorEl={anchorEl}
                        handleClose={handleClose}
                        open={open}
                        dataRow={row}
                        handleClick={handleClick}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Divider />
        <PaginationA volatile={managementUnits} handleChange={handleChange} />
      </Card>
    </>
  );
}
