import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
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
import closeFill from '@iconify/icons-eva/close-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import Scrollbar from '../../../components/Scrollbar';
import { MIconButton } from '../../../components/@material-extend';
import EnableDisableFilterWithSearch from '../../../sharedComponents/EnableDisableFilterWithSearch';
import {
  DeleteUsersAndPermissions,
  GetDataById,
  GetModuleWiseDropDown,
  GetUserLevelDropDown,
  GetUsersAndPermissions,
  GetUsersAndPermissionDisabled,
  RestoreUserPermission
} from '../../../api/UsersPermissions/UsersAndPermissions';
import AddForm from './AddForm';
import AlertDialog from '../../../pages/components-overview/material-ui/dialog/AlertDialog';
import Edit from './Edit';

// ----------------------------------------------------------------------

export default function MainUserPermission() {
  const modalRef = useRef(null);

  const [openModal, setOpenModal] = useState(false);
  const [searchh, setSearchh] = useState('');
  const [filter, setFilter] = useState(false);
  const [getData, setGetData] = useState();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const GetUsersAndPermissionsss = async () => {
    await GetUsersAndPermissions(searchh).then((response) => {
      setGetData(response.data);
    });
  };
  const GetUsersAndPermissionDisabledd = async () => {
    await GetUsersAndPermissionDisabled(searchh).then((response) => {
      setGetData(response.data);
    });
  };
  const [deletee, setDeleted] = useState(false);
  useEffect(() => {
    if (filter) {
      setGetData([]);
      GetUsersAndPermissionDisabledd();
    } else {
      setGetData([]);
      GetUsersAndPermissionsss();
    }
    // eslint-disable-next-line
  }, [searchh, deletee, filter]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [agreed, setAgreed] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [getMwDd, setGetMwDd] = useState();

  const GetMwDropDown = async () => {
    try {
      await GetModuleWiseDropDown().then((response) => {
        setGetMwDd(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const GetDataByIdEdit = async (id) => {
    await GetDataById(id).then((response) => {
      setData(response.data);
      console.log(response.data);
      console.log([response.data?.allowed_modules?.map((d) => d?.id)]);
    });
  };
  const [getUlDd, setGetUlDd] = useState();
  const GetUlDropDown = async () => {
    try {
      await GetUserLevelDropDown().then((response) => {
        setGetUlDd(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [sendId, setSendId] = useState();

  const handleDataEditOpen = (id) => {
    setEditOpen(true);
    GetDataByIdEdit(id);
    GetUlDropDown();
    GetMwDropDown();
    setSendId(id);
  };

  const handleDelete = async () => {
    try {
      await DeleteUsersAndPermissions(id).then(() => setDeleted(!deletee));
      enqueueSnackbar('Disabled Successfully!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await RestoreUserPermission(id).then(() => setDeleted(!deletee));
      enqueueSnackbar('Restored Successfully!', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (agreed === true) {
      handleDelete();
      setAgreed(false);
      setOpenn(false);
    }

    // eslint-disable-next-line
  }, [agreed]);
  return (
    <Card>
      <Box sx={{ mt: 2, mx: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">User Permissions</Typography>
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
        setSearchText={setSearchh}
        searchText={searchh}
      />
      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">User level</TableCell>
                {filter ? (
                  <TableCell align="center" />
                ) : (
                  <>
                    <TableCell align="center" />
                    <TableCell align="center" />
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {getData?.map((d, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{d?.id}</TableCell>
                  <TableCell align="center">{d?.username}</TableCell>
                  <TableCell align="center">{d?.user_role?.role_name}</TableCell>
                  {filter ? (
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={() => handleRestore(d?.id)}>
                        Restore
                      </Button>
                    </TableCell>
                  ) : (
                    <>
                      <TableCell align="center">
                        <MIconButton onClick={() => handleDataEditOpen(d?.id)} ref={modalRef}>
                          <Icon icon={editFill} width={20} height={20} />
                        </MIconButton>
                        <Edit
                          setDeleted={setDeleted}
                          deletee={deletee}
                          getMwDd={getMwDd}
                          getUlDd={getUlDd}
                          data={data}
                          setData={setData}
                          editOpen={editOpen}
                          setEditOpen={setEditOpen}
                          sendId={sendId}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'error.main' }}>
                        <Button
                          cursor="pointer"
                          width={20}
                          height={20}
                          onClick={() => {
                            setOpenn(true);
                            setId(d?.id);
                          }}
                        >
                          Disable
                        </Button>
                      </TableCell>
                    </>
                  )}
                  <AlertDialog
                    setAgreed={setAgreed}
                    setOpenn={setOpenn}
                    openn={openn}
                    Content="Are you sure you want to disable?"
                    description=""
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Divider />
      <AddForm setOpenModal={setOpenModal} openModal={openModal} setDeleted={setDeleted} deletee={deletee} />
    </Card>
  );
}
