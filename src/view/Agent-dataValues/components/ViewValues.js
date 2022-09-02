import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Modal,
  Divider,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { closeFill } from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack5';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import cross from '@iconify/icons-eva/close-outline';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import { useNavigate, useParams } from 'react-router';
import Scrollbar from '../../../components/Scrollbar';
import Page from '../../../components/Page';
import { ViewValue, DeleteVlu, AdgsValueDropDownGet } from '../../../api/agent/AgentValuesMulti';
import { MIconButton } from '../../../components/@material-extend';

export default function ViewValues() {
  const style = {
    position: 'absolute',
    priority: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewVlu, setViewValues] = useState([]);
  const [data, setData] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [dropDownVlu, setDropDownVlu] = useState([]);
  const [allValues, setAllValues] = useState({
    startDate: null,
    endDate: null,
    values: ''
  });

  const changeHandler = (e) => {
    setAllValues({
      ...allValues,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const viewValues = async () => {
    try {
      await ViewValue(id).then((response) => setViewValues(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (d) => {
    getMuDropDownValues(d);
    setData(d);
    setOpenModal(true);
  };

  const handleSave = () => {
    console.log(allValues);
  };

  // const handleEditt = async (d) => {
  //   try {

  //     await EditValue();
  //   } catch (error) {
  //     console.log(error);
  //   }

  // int_agent_adg_value_id: int_agent_adg_value_id,
  // date_start: date_start,
  // int_adg_value: int_adg_value,
  // int_adg_id: int_adg_id
  // };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getMuDropDownValues = async (d) => {
    const muId = 3;
    await AdgsValueDropDownGet(d?.adg_id, muId).then((response) => {
      setDropDownVlu(response.data);
    });
  };

  const [valueDeleted, setDeleted] = useState(false);
  const handleDelete = async (id) => {
    try {
      await DeleteVlu(id);
      setDeleted(!valueDeleted);
      enqueueSnackbar('Skill Deleted Successfully!', {
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
    viewValues();
    // eslint-disable-next-line
  }, [valueDeleted]);
  return (
    <Page title="View Values">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Card>
            <Box sx={{ mb: 3, mt: 2, mx: 2, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h5"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/dashboard/agents/agent-dataValues/');
                }}
              >
                AgentData Values And Multi
              </Typography>
              <Typography variant="h5">/ View Values </Typography>
            </Box>

            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell rowSpan={2}>Start Date</TableCell>
                      <TableCell rowSpan={2}>End Date</TableCell>
                      <TableCell rowSpan={2}>Value</TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {viewVlu?.map((d, index) => (
                      <TableRow key={index}>
                        <TableCell>{d?.date_start}</TableCell>
                        <TableCell>{d?.date_end}</TableCell>
                        <TableCell>{d?.adg_value}</TableCell>
                        <TableCell>
                          <MIconButton onClick={() => handleEdit(d)}>
                            <Icon icon={editFill} width={20} height={20} />
                          </MIconButton>
                        </TableCell>
                        <TableCell>
                          <MIconButton onClick={() => handleDelete(d?.id)} sx={{ color: 'error.main' }} size="small">
                            <Icon icon={trash2Outline} width={20} height={20} />
                          </MIconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
            <Modal open={openModal} onClose={handleCloseModal}>
              <Card sx={style}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography id="modal-modal-title" variant="h5">
                    Edit Agent Data Value
                  </Typography>
                  <Icon icon={cross} onClick={handleCloseModal} color="grey" cursor="pointer" />
                </Box>
                <Divider />

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell rowSpan={2}>Start Date</TableCell>
                      <TableCell rowSpan={2}>Value</TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label="Start Date"
                          variant="standard"
                          type="date"
                          name="startDate"
                          value={
                            allValues.startDate ||
                            new Date(data?.date_start).toLocaleDateString().split('/').reverse().join('-')
                          }
                          onChange={changeHandler}
                          InputLabelProps={{ shrink: true }}
                          sx={{ width: '100%' }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl style={{ width: '130px' }}>
                          <InputLabel id="demo-simple-select-label">Add Value</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="values"
                            value={allValues.values || data?.adg_value}
                            label="Value"
                            variant="standard"
                            sx={{ fontSize: '13px' }}
                            onChange={changeHandler}
                          >
                            {dropDownVlu?.map((d, index) => (
                              <MenuItem key={index} value={d?.id}>
                                {d?.adg_value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button onClick={handleSave} variant="outlined" sx={{ display: 'flex', float: 'right', m: 2 }}>
                  Save
                </Button>
              </Card>
            </Modal>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}
